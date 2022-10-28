<template>
  <card>
    <template slot="header">
      <h5 class="card-category">
        {{ config.selectedDevice.name }} - {{ config.variableFullName }}
      </h5>

      <h3 class="card-title">
        <i
          class="fa"
          :class="[config.icon, getIconColorClass()]"
          aria-hidden="true"
          style="font-size: 30px"
        ></i>
        <base-switch
          @click="
            value = !value;
            sendValue();
          "
          :value="value"
          on-text="ON"
          off-text="OFF"
          style="margin-top: 10px"
          class="pull-right"
        >
        </base-switch>
      </h3>
    </template>
  </card>
</template>

<script>
export default {
  name: "iotswitch",
  props: ["config"],

  data() {
    return {
      value: false,
      vIcon: false,
      topic: "",
    };
  },
  watch: {
    config: {
      immediate: true,
      deep: true,
      handler() {
        setTimeout(() => {
          this.value = false;
          this.$nuxt.$off(this.topic);

          //usrId/dId/uniquestr/sdata
          this.topic =
            this.config.userId +
            "/" +
            this.config.selectedDevice.dId +
            "/" +
            this.config.variable +
            "/sdata";
          this.$nuxt.$on(this.topic, this.processReceiverData); //Evento de escucha .$on
        }, 300);
      },
    },
  },
  beforeDestroy() {
    this.$nuxt.$off(this.topic);
  },
  methods: {
    processReceiverData(data) {
      try {
        this.vIcon = data.value;
        this.value = data.value;
      } catch (error) {
        console.log(error);
      }
    },

    getIconColorClass() {
      //para apagar el icono
      if (!this.vIcon) {
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

    sendValue() {
      this.sending = true;
      setTimeout(() => {
        this.sending = false;
      }, 1500);

      const toSend = {
        topic:
          this.config.userId +
          "/" +
          this.config.selectedDevice.dId +
          "/" +
          this.config.variable +
          "/actdata",
        msg: {
          value: this.value,
        },
      };

      this.$nuxt.$emit("mqtt-sender", toSend);
    },
  },
};
</script>
<style></style>
