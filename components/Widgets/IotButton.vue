<template>
  <card>
    <div slot="header">
      <h4 class="card-title">
        {{ config.selectedDevice.name }} - {{ config.variableFullName }}
      </h4>
    </div>

    <i class="fa " :class="[config.icon, getIconColorClass()]" style="font-size:30px"></i>
    
    <base-button @click="sendValue()" :type="config.class" class="mb-3 pull-right" size="lg">{{config.text}}</base-button>
  </card>
</template>

<script>
export default {
  name: "iotbutton",
  props: ['config'],
  data() {
    return {
      sending: false
    };
  },
  methods: {

    sendValue(){
      this.sending = true;
      setTimeout(() => {
        this.sending = false
      }, 1500);

      const toSend = {
        topic: this.config.userId + "/" + this.config.selectedDevice.dId +  "/" + this.config.variable + "/actdata",
        msg: {
          value: this.config.message
        }
      };

      this.$nuxt.$emit('mqtt-sender', toSend);

    },

    getIconColorClass() {
      if (!this.sending) {
        return "text-dark";
      }
      if (this.config.class == "success") {
        return "text-success";
      }
      if (this.config.class == "primary") {
        return "text-primary";
      }
      if (this.config.class == "warning") {
        return "text-warning";
      }
      if (this.config.class == "danger") {
        return "text-danger";
      }
      if (this.config.class == "info") {
        return "text-info";
      }
    },
  },
};
</script>