<template>
  <div>
    <h1>Dashboard</h1>

    <div class="row" v-if="$store.state.devices.length > 0">
      <div
        v-for="(widget, index) in $store.state.selectedDevice.template.widgets"
        :key="index"
        :class="[widget.column]"
      > 

        <Json :value="fixWidget(widget)"></Json>

        <IotNumberChart
          v-if="widget.widget == 'numberchart'"
          :config="fixWidget(widget)"
        ></IotNumberChart>

        <IotSwitch
          v-if="widget.widget == 'switch'"
          :config="fixWidget(widget)"
        ></IotSwitch>

        <IotButton
          v-if="widget.widget == 'button'"
          :config="fixWidget(widget)"
        ></IotButton>

        <IotIndicator
          v-if="widget.widget == 'indicator'"
          :config="fixWidget(widget)"
        ></IotIndicator>
      </div>
    </div>
  </div>
</template>

<script>
import Json from "~/components/Json.vue";
export default {
  middleware: "authenticated",
  name: "Dashboard",
  components: {
    Json
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {
    fixWidget(widget) {
      var widgetCopy = JSON.parse(JSON.stringify(widget));
      widgetCopy.selectedDevice.templateName =this.$store.state.selectedDevice.templateName;
      widgetCopy.selectedDevice.templateId =this.$store.state.selectedDevice.templateId;
      widgetCopy.selectedDevice.dId = this.$store.state.selectedDevice.dId;
      widgetCopy.selectedDevice.name = this.$store.state.selectedDevice.name;
      widgetCopy.userId = this.$store.state.selectedDevice.userId;

      if (widget.widget == "numberchart") {
        widgetCopy.demo = false;
      }

      return widgetCopy;
    },
  },
};
</script>
