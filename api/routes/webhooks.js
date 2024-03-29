const express = require("express");
const router = express.Router();
const { checkAuth } = require("../middlewares/authentication.js");
var mqtt = require("mqtt");
const axios = require("axios");
const colors = require("colors");

import Data from "../models/data.js";
import Device from "../models/device.js";
import AlarmRule from "../models/emqx_alarm_rule.js";
import Notification from "../models/notifications.js";
import EmqxAuthRule from "../models/emqx_auth.js";
import Template from "../models/template.js";
import MqttAclRule from "../models/mqtt_acl.js";

var client;

var oldUserId;

//******************
//**** A P I *******
//******************

//SAVER WEBHOOK
router.post("/saver-webhook", async (req, res) => {
  try {
    if (req.headers.token != process.env.EMQX_API_TOKEN) {
      res.status(404).json();
      return;
    }

    const data = req.body.payload;

    //console.log(data);

    const splittedTopic = data.topic.split("/");
    const userId = data.userId;
    const dId = splittedTopic[1];
    const variable = splittedTopic[2];

    //console.log(splittedTopic);

    var result = await Device.find({ dId: dId, userId: userId });

    if (result.length == 1) {
      Data.create({
        userId: userId,
        dId: dId,
        variable: variable,
        value: data.payload.value,
        time: Date.now(),
      });
      console.log("Data created");
    }

    return res.status(200).json();
  } catch (error) {
    console.log(error);
    return res.status(500).json();
  }
});

//ALARMS WEBHOOK
router.post("/alarm-webhook", async (req, res) => {
  try {
    if (req.headers.token != process.env.EMQX_API_TOKEN) {
      res.status(404).json();
      return;
    }

    res.status(200).json();

    const incomingAlarm = req.body.payload;

    //console.log(incomingAlarm);

    updateAlarmCounter(incomingAlarm.emqxRuleId);

    const lastNotif = await Notification.find({
      dId: incomingAlarm.dId,
      emqxRuleId: incomingAlarm.emqxRuleId,
    })
      .sort({ time: -1 }) //metodo para consultar y obtener la ultima notificacion
      .limit(1);

    if (lastNotif == 0) {
      console.log("FIRST TIME ALARM");
      saveNotifToMongo(incomingAlarm);
      sendMqttNotif(incomingAlarm);
    } else {
      //se calcula el tiempo transcurrido entre la ultima notificacion y la nueva
      const lastNotifToNowMins = (Date.now() - lastNotif[0].time) / 1000 / 60;

      if (lastNotifToNowMins > incomingAlarm.triggerTime) {
        console.log("TRIGGERED");
        saveNotifToMongo(incomingAlarm);
        sendMqttNotif(incomingAlarm);
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json();
  }
});

//DEVICE CREDENTIALS WEBHOOK
router.post("/getdevicecredentials", async (req, res) => {
  try {
    const dId = req.body.dId;

    const password = req.body.password;

    const device = await Device.findOne({ dId: dId });

    if (password != device.password) {
      return res.status(401).json();
    }

    const userId = device.userId;

    var credentials = await getDeviceMqttCredentials(dId, userId);

    await MqttAclRule.updateOne(
      { type: "device", dId: dId },
      {
        $set: {
          username: credentials.username,
          updatedTime: Date.now(),
        },
      }
    );

    var template = await Template.findOne({ _id: device.templateId });

    var variables = [];

    template.widgets.forEach((widget) => {
      var v = (({
        variable,
        variableFullName,
        variableType,
        variableSendFreq,
      }) => ({
        variable,
        variableFullName,
        variableType,
        variableSendFreq,
      }))(widget);

      variables.push(v);
    });

    const response = {
      username: credentials.username,
      password: credentials.pass,
      topic: userId + "/" + dId + "/",
      variables: variables,
    };

    res.json(response);

    setTimeout(() => {
      getDeviceMqttCredentials(dId, userId);
      console.log("Device Credentials Updated");
    }, 10000);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//GET NOTIFICATIONS
router.get("/notifications", checkAuth, async (req, res) => {
  try {
    const userId = req.userData._id;

    const notifications = await getNotifications(userId);

    const response = {
      status: "success",
      data: notifications,
    };

    res.json(response);
  } catch (error) {
    console.log("ERROR GETTING NOTIFICATIONS");
    console.log(error);

    const response = {
      status: "error",
      error: error,
    };

    return res.status(500).json(response);
  }
});

//UPDATE NOTIFICATION (readed status)
router.put("/notifications", checkAuth, async (req, res) => {
  try {
    const userId = req.userData._id;

    const notificationId = req.body.notifId;

    await Notification.updateOne(
      { userId: userId, _id: notificationId },
      { readed: true }
    );

    const response = {
      status: "success",
    };

    res.json(response);
  } catch (error) {
    console.log("ERROR UPDATING NOTIFICATION STATUS");
    console.log(error);

    const response = {
      status: "error",
      error: error,
    };

    return res.status(500).json(response);
  }
});

//**********************
//**** FUNCTIONS *******
//**********************

async function getDeviceMqttCredentials(dId, userId) {
  try {
    var rule = await EmqxAuthRule.find({
      type: "device",
      userId: userId,
      dId: dId,
    });

    if (rule.length == 0) {
      const newRule = {
        userId: userId,
        dId: dId,
        username: makeid(10),
        pass: makeid(10),
        is: "false",
        type: "device",
        time: Date.now(),
        updatedTime: Date.now(),
      };

      const result = await EmqxAuthRule.create(newRule);

      const authzRule = {
        userId: userId,
        dId: dId,
        username: newRule.username,
        action: "all",
        permission: "allow",
        topics: [
          userId + "/" + dId + "/+/sdata",
          userId + "/" + dId + "/+/actdata",
        ],
        time: newRule.time,
        type: "device",
        updatedTime: newRule.updatedTime,
      };
      await MqttAclRule.create(authzRule);

      const toReturn = {
        username: result.username,
        pass: result.pass,
      };

      return toReturn;
    }

    const newUserName = makeid(10);
    const newPassword = makeid(10);

    const result = await EmqxAuthRule.updateOne(
      { type: "device", dId: dId },
      {
        $set: {
          username: newUserName,
          pass: newPassword,
          updatedTime: Date.now(),
        },
      }
    );

    // update response example
    //{ n: 1, nModified: 1, ok: 1 }

    if (result.n == 1 && result.ok == 1) {
      return {
        username: newUserName,
        pass: newPassword,
      };
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

function startMqttClient() {
  //MQTT 3
  /*const options = {
    port: 1883,
    host: process.env.EMQX_API_HOST,
    clientId:
      "webhook_superuser" + Math.round(Math.random() * (0 - 10000) * -1),
    username: process.env.EMQX_NODE_SUPERUSER_USER,
    password: process.env.EMQX_NODE_SUPERUSER_PASSWORD,
    keepalive: 60,
    reconnectPeriod: 5000,
    protocolId: "MQIsdp",
    protocolVersion: 3,
    clean: true,
    encoding: "utf8"
  };*/

  //MQTT 5.0
  const options = {
    wsOptions: {
      port: 1883,
      host: process.env.EMQX_NODE_HOST,
    },
    clientId:
      "webhook_superuser" + Math.round(Math.random() * (0 - 10000) * -1),
    username: process.env.EMQX_NODE_SUPERUSER_USER,
    password: process.env.EMQX_NODE_SUPERUSER_PASS,
    keepalive: 60,
    reconnectPeriod: 5000,
    protocolId: "MQTT",
    protocolVersion: 5,
    clean: true,
    //encoding: "utf8"
  };

  client = mqtt.connect("mqtt://" + process.env.EMQX_NODE_HOST, options);

  client.on("connect", function () {
    console.log("MQTT CONNECTION -> SUCCESS;".green);
    console.log("\n");
  });

  client.on("reconnect", (error) => {
    console.log("RECONNECTING MQTT");
    console.log(error);
  });

  client.on("error", (error) => {
    console.log("MQTT CONNECTION FAIL -> ");
    console.log(error);
  });
}

function sendMqttNotif(notif) {
  const topic = notif.userId + "/dummy-did/dummy-var/notif";
  const msg =
    "The rule: when the " +
    notif.variableFullName +
    " is " +
    notif.condition +
    " than " +
    notif.value;
  client.publish(topic, msg);
}

//GET ALL NOT READED NOTIFICATIONS
async function getNotifications(userId) {
  try {
    const res = await Notification.find({ userId: userId, readed: false });
    return res;
  } catch (error) {
    console.log(error);
    return false;
  }
}

function saveNotifToMongo(incomingAlarm) {
  try {
    var newNotif = incomingAlarm;
    newNotif.time = Date.now();
    newNotif.readed = false;
    Notification.create(newNotif);
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function updateAlarmCounter(emqxRuleId) {
  try {
    await AlarmRule.updateOne(
      { emqxRuleId: emqxRuleId },
      { $inc: { counter: 1 } }
    );
  } catch (error) {
    console.log(error);
    return false;
  }
}

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

setTimeout(() => {
  startMqttClient();
}, 3000);

module.exports = router;
