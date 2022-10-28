<template>
  <card>
    <div slot="header">
      <h4 class="card-title">
        {{ config.selectedDevice.name }} - {{ config.variableFullName }}
      </h4>
    </div>

    <i
      class="fa"
      :class="[config.icon, getIconColorClass()]"
      style="font-size: 30px"
    ></i>
  </card>
</template>

<script>
export default {
  name: "iotindicator",
  props: ["config"],
  data() {
    return {
      value: true,
      topic: "",
      props: ["config"],
    };
  },
  beforeDestroy() {
    this.$nuxt.$off(this.topic);
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
  methods: {
    processReceiverData(data) {
      try {
        this.value = data.value;
      } catch (error) {
        console.log(error);
      }
    },

    getIconColorClass() {
      if (!this.value) {
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
