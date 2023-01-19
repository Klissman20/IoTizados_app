const express = require("express");
const router = express.Router();
const axios = require("axios");
const colors = require("colors");

//import EmqxAuthRule from "../models/emqx_auth.js";

const auth = {
  auth: {
    username: "admin",
    password: process.env.EMQX_DEFAULT_APPLICATION_SECRET,
  },
};

global.saverResource = null;
global.alarmResource = null;

// ****************************************
// ******** EMQX RESOURCES MANAGER ********
// ****************************************

/* This manager corroborates that there are 2 resources,
If there are none, then create them.
If there are one or more than two, issue a warning.
To manually delete the resources and restart node */

/* Este administrador corrobora que existan 2 recursos,
Si no hay ninguno, entonces los crea.
Si hay uno o más de dos, lanza advertencia. 
Para borrar manualmente los recursos y reiniciemos node */

//https://docs.emqx.io/en/broker/v4.1/advanced/http-api.html#response-code

//list resources
async function listResources() {
  try {
    //const url = "http://localhost:18083/api/v5/bridges/";
    const url = "http://" + process.env.EMQX_API_HOST + "bridges/";

    const res = await axios.get(url, auth);

    //console.log(res.data);

    const size = res.data.length;

    if (res.status === 200) {
      if (size == 0) {
        console.log("***** Creating emqx webhook resources *****".green);

        createResources();
      } else if (size == 2) {
        res.data.forEach((resource) => {
          if (resource.name == "alarm-webhook") {
            global.alarmResource = resource;

            console.log("▼ ▼ ▼ ALARM RESOURCE FOUND ▼ ▼ ▼ ".bgMagenta);
            console.log(global.alarmResource);
            console.log("▲ ▲ ▲ ALARM RESOURCE FOUND ▲ ▲ ▲ ".bgMagenta);
            console.log("\n");
            console.log("\n");
          }

          if (resource.name == "saver-webhook") {
            global.saverResource = resource;

            console.log("▼ ▼ ▼ SAVER RESOURCE FOUND ▼ ▼ ▼ ".bgMagenta);
            console.log(global.saverResource);
            console.log("▲ ▲ ▲ SAVER RESOURCE FOUND ▲ ▲ ▲ ".bgMagenta);
            console.log("\n");
            console.log("\n");
          }
        });
      } else {
        function printWarning() {
          console.log(
            "DELETE ALL WEBHOOK EMQX RESOURCES AND RESTART NODE - youremqxdomain:8085/#/resources"
              .red
          );
          setTimeout(() => {
            printWarning();
          }, 1000);
        }

        printWarning();
      }
    } else {
      console.log("Error in emqx api");
    }
  } catch (error) {
    console.log("Error listing emqx resources");
    console.log(error);
  }
}

//create resources
async function createResources() {
  try {
    //const url = "http://localhost:18083/api/v5/bridges/";
    const url = "http://" + process.env.EMQX_API_HOST + "bridges/";

    const data1 = {
      body: '{"payload":${payload}}',
      direction: "egress",
      connect_timeout: "15s",
      enable: true,
      enable_pipelining: 100,
      local_topic: "web_hook/saver_Rule",
      max_retries: 3,
      method: "post",
      name: "saver-webhook",
      pool_size: 4,
      pool_type: "random",
      request_timeout: "15s",
      ssl: {
        enable: false,
      },
      headers: {
        "content-type": "application/json",
        token: process.env.EMQX_API_TOKEN,
      },
      type: "webhook",
      url:
        "http://" +
        process.env.API_HOST +
        ":" +
        process.env.API_PORT +
        "/api/saver-webhook",
    };

    /*const data1 = {
      type: "webhook",
      config: {
        //url: "http://" + process.env.WEBHOOKS_HOST + ":3001/api/saver-webhook",
        url: "http://localhost:18083/api/v5/bridges/",
        headers: {
          token: process.env.EMQX_API_TOKEN,
        },
        method: "POST",
      },
      name: "saver-webhook",
    };*/

    const data2 = {
      body: '{"payload":${payload}}',
      connect_timeout: "15s",
      enable: true,
      enable_pipelining: 100,
      local_topic: "web_hook/alarm_Rule",
      max_retries: 3,
      method: "post",
      name: "alarm-webhook",
      pool_size: 4,
      pool_type: "random",
      request_timeout: "15s",
      ssl: {
        enable: false,
      },
      headers: {
        "content-type": "application/json",
        token: process.env.EMQX_API_TOKEN,
      },
      type: "webhook",
      url:
        "http://" +
        process.env.API_HOST +
        ":" +
        process.env.API_PORT +
        "/api/alarm-webhook",
    };

    /*const data2 = {
      type: "webhook",
      config: {
        url: "http://localhost:18083/api/v5/bridges/",
        //url: "http://" + process.env.WEBHOOKS_HOST + ":3001/api/alarm-webhook",
        headers: {
          token: process.env.EMQX_API_TOKEN,
        },
        method: "POST",
      },
      name: "alarm-webhook",
    };*/

    const res1 = await axios.post(url, data1, auth);

    if (res1.status === 200) {
      console.log("Saver resource created!".green);
    }

    const res2 = await axios.post(url, data2, auth);

    if (res2.status === 200) {
      console.log("Alarm resource created!".green);
    }

    setTimeout(() => {
      console.log("***** Emqx WH resources created! :) *****".green);
      listResources();
    }, 1000);
  } catch (error) {
    console.log("Error creating resources");
    console.log(error);
  }
}

//check if superuser exist if not we create one
global.check_mqtt_superuser = async function checkMqttSuperUser() {
  try {
    const superusers = await EmqxAuthRule.find({ type: "superuser" });

    if (superusers.length > 0) {
      return;
    } else if (superusers.length == 0) {
      const newRule = {
        userId: "emqxmqttsuperuser",
        username: process.env.EMQX_NODE_SUPERUSER_USER,
        pass: process.env.EMQX_NODE_SUPERUSER_PASSWORD,
        is: "true",
        type: "superuser",
        time: Date.now(),
        updatedTime: Date.now(),
      };
      const result = await EmqxAuthRule.create(newRule);

      const authzRule = {
        userId: "emqxmqttsuperuser",
        username: process.env.EMQX_NODE_SUPERUSER_USER,
        action: "all",
        permission: "allow",
        topics: ["#"],
        time: newRule.time,
        type: "superuser",
        updatedTime: newRule.updatedTime,
      };
      await MqttAclRule.create(authzRule);

      console.log("Mqtt super user created");
    }
  } catch (error) {
    console.log("error creating mqtt superuser ");
    console.log(error);
  }
};

setTimeout(() => {
  console.log("LISTING RESORUCES!!!!!!!!!");
  listResources();
}, process.env.EMQX_RESOURCES_DELAY);

module.exports = router;
