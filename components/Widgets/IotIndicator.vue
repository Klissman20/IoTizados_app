<template>
    <card>
        <div slot="header">
            <h4 class="card-title">{{config.selectedDevice.name}} - {{config.variableFullName}}</h4>
        </div>

        <i class="fa " :class="[config.icon, getIconColorClass()]" style="font-size:30px"></i>
    </card>
</template>

<script>
    export default {
        name: "iotindicator",
        props: ['config'],
        data() {
            return {
                value: true
            }
        },
        mounted(){
            //TOPIC: /userId/dId/{variable}/sdata    sdata:inbound    actdata:outbound
            const topic = this.config.userId + "/" + this.config.selectedDevice.dId +  "/" + this.config.variable + "/sdata"
            this.$nuxt.$on(topic, this.processReceiverData)//Evento de escucha .$on
        },
        beforeDestroy(){
            this.$nuxt.$off(this.config.userId + "/" + this.config.selectedDevice.dId +  "/" + this.config.variable + "/sdata", this.processReceiverData);
        },
        methods: {

            processReceiverData(data){
                console.log(data);
                console.log("received");
                this.value = data.value;
            },

            getIconColorClass (){
                if(!this.value){
                    return "text-dark"
                }
                if(this.config.class == "success"){
                    return "text-success"
                }
                if(this.config.class == "primary"){
                    return "text-primary"
                }
                if(this.config.class == "warning"){
                    return "text-warning"
                }
                if(this.config.class == "danger"){
                    return "text-danger"
                }
                if (this.config.class == "info") {
                    return "text-info"
                }
            }
        }
    }
</script>