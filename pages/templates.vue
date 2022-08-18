<template>
  <div>
    <h1>Templates</h1>

    <!--WIDGETS CONFIGURATOR -->
    <div class="row">
      <card>
        <div slot="header">
          <h4 class="card-title">Widgets</h4>
        </div>

        <div class="row">
          <!--WIDGET SELECTOR AND FORMS -->
          <div class="col-6">
            <el-select
              v-model="widgetType"
              class="select-info"
              placeholder="Select Widget"
              style="width: 100%"
            >
              <el-option
                class="text-dark"
                value="numberchart"
                label="Number Chart (INPUT) <--"
              >
              </el-option>
              <el-option
                class="text-dark"
                value="indicator"
                label="Boolean Indicator (INPUT) <--"
              >
              </el-option>
              <el-option
                class="text-dark"
                value="button"
                label="Button (OUTPUT) -->"
              >
              </el-option>
              <el-option
                class="text-dark"
                value="switch"
                label="Switch (OUTPUT) -->"
              >
              </el-option>
            </el-select>
            <br />
            <br />

            <!--FORM NUMBER CHART TYPE -->
            <div v-if="widgetType == 'numberchart'">
              <base-input
                v-model="iotNumberChartConfig.variableFullName"
                label="Var Name"
                type="text"
              >
              </base-input>
              <base-input
                v-model="iotNumberChartConfig.unit"
                label="Unit"
                type="text"
              >
              </base-input>
              <base-input
                v-model.number="iotNumberChartConfig.decimalPlaces"
                label="Decimal Places"
                type="number"
              >
              </base-input>
              <base-input
                v-model="iotNumberChartConfig.icon"
                label="Icon"
                type="text"
              >
              </base-input>
              <base-input
                v-model.number="iotNumberChartConfig.chartTime"
                label="Time to chart (mins)"
                type="number"
              >
              </base-input>

              <base-input
                v-model.number="iotNumberChartConfig.variableSendFreq"
                label="Send Freq"
                type="number"
              ></base-input>

              <label>Class</label>
              <el-select
                v-model="iotNumberChartConfig.class"
                class="select-info"
                placeholder="Select Class"
                style="width: 100%"
              >
                <el-option
                  class="text-success"
                  value="success"
                  label="Success"
                ></el-option>
                <el-option
                  class="text-primary"
                  value="primary"
                  label="Primary"
                ></el-option>
                <el-option
                  class="text-warning"
                  value="warning"
                  label="Warning"
                ></el-option>
                <el-option
                  class="text-danger"
                  value="danger"
                  label="Danger"
                ></el-option>
                <el-option
                  class="text-info"
                  value="info"
                  label="Info"
                ></el-option>
              </el-select>

              <br />
              <label>Column</label>
              <el-select
                v-model="iotNumberChartConfig.column"
                class="select-info"
                placeholder="Select Column Width"
                style="width: 100%"
              >
                <el-option
                  class="text-dark"
                  value="col-3"
                  label="col-3"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-4"
                  label="col-4"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-5"
                  label="col-5"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-6"
                  label="col-6"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-7"
                  label="col-7"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-8"
                  label="col-8"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-9"
                  label="col-9"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-10"
                  label="col-10"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-11"
                  label="col-11"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-12"
                  label="col-12"
                ></el-option>
              </el-select>
            </div>

            <!--FORM SWITCH TYPE -->
            <div v-if="widgetType == 'switch'">
              <base-input
                v-model="iotSwitchConfig.variableFullName"
                label="Var Name"
                type="text"
              >
              </base-input>

              <base-input
                v-model="iotSwitchConfig.icon"
                label="Icon"
                type="text"
              ></base-input>

              <label>Class</label>
              <el-select
                v-model="iotSwitchConfig.class"
                class="select-info"
                placeholder="Select Class"
                style="width: 100%"
              >
                <el-option
                  class="text-success"
                  value="success"
                  label="Success"
                ></el-option>
                <el-option
                  class="text-primary"
                  value="primary"
                  label="Primary"
                ></el-option>
                <el-option
                  class="text-warning"
                  value="warning"
                  label="Warning"
                ></el-option>
                <el-option
                  class="text-danger"
                  value="danger"
                  label="Danger"
                ></el-option>
                <el-option
                  class="text-info"
                  value="info"
                  label="Info"
                ></el-option>
              </el-select>

              <br><br>
              <label>Column</label>
              <el-select
                v-model="iotSwitchConfig.column"
                class="select-info"
                placeholder="Select Column Width"
                style="width: 100%"
              >
                <el-option
                  class="text-dark"
                  value="col-3"
                  label="col-3"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-4"
                  label="col-4"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-5"
                  label="col-5"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-6"
                  label="col-6"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-7"
                  label="col-7"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-8"
                  label="col-8"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-9"
                  label="col-9"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-10"
                  label="col-10"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-11"
                  label="col-11"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-12"
                  label="col-12"
                ></el-option>
              </el-select>
            </div>

            <!--FORM BUTTON TYPE -->
            <div v-if="widgetType == 'button'">
              <base-input
                v-model="iotButtonConfig.variableFullName"
                label="Var Name"
                type="text"
              >
              </base-input>

              <base-input
                v-model="iotButtonConfig.message"
                label="Message to send"
                type="text"
              >
              </base-input>

              <base-input
                v-model="iotButtonConfig.text"
                label="Button Text"
                type="text"
              >
              </base-input>

              <base-input
                v-model="iotButtonConfig.icon"
                label="Icon"
                type="text"
              ></base-input>

              <label>Class</label>
              <el-select
                v-model="iotButtonConfig.class"
                class="select-info"
                placeholder="Select Class"
                style="width: 100%"
              >
                <el-option
                  class="text-success"
                  value="success"
                  label="Success"
                ></el-option>
                <el-option
                  class="text-primary"
                  value="primary"
                  label="Primary"
                ></el-option>
                <el-option
                  class="text-warning"
                  value="warning"
                  label="Warning"
                ></el-option>
                <el-option
                  class="text-danger"
                  value="danger"
                  label="Danger"
                ></el-option>
                <el-option
                  class="text-info"
                  value="info"
                  label="Info"
                ></el-option>
              </el-select>

              <br><br>
              <label>Column</label>
              <el-select
                v-model="iotButtonConfig.column"
                class="select-info"
                placeholder="Select Column Width"
                style="width: 100%"
              >
                <el-option
                  class="text-dark"
                  value="col-3"
                  label="col-3"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-4"
                  label="col-4"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-5"
                  label="col-5"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-6"
                  label="col-6"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-7"
                  label="col-7"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-8"
                  label="col-8"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-9"
                  label="col-9"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-10"
                  label="col-10"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-11"
                  label="col-11"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-12"
                  label="col-12"
                ></el-option>
              </el-select>
            </div>

            <!--FORM INDICATOR TYPE -->
            <div v-if="widgetType == 'indicator'">
              <base-input
                v-model="iotIndicatorConfig.variableFullName"
                label="Var Name"
                type="text"
              >
              </base-input>

              <base-input
                v-model="iotIndicatorConfig.icon"
                label="Icon"
                type="text"
              ></base-input>

              <br />

              <base-input
                v-model="iotIndicatorConfig.variableSendFreq"
                label="Send Freq"
                type="text"
              ></base-input>

              <label>Class</label>
              <el-select
                v-model="iotIndicatorConfig.class"
                class="select-info"
                placeholder="Select Class"
                style="width: 100%"
              >
                <el-option
                  class="text-success"
                  value="success"
                  label="Success"
                ></el-option>
                <el-option
                  class="text-primary"
                  value="primary"
                  label="Primary"
                ></el-option>
                <el-option
                  class="text-warning"
                  value="warning"
                  label="Warning"
                ></el-option>
                <el-option
                  class="text-danger"
                  value="danger"
                  label="Danger"
                ></el-option>
                <el-option
                  class="text-info"
                  value="info"
                  label="Info"
                ></el-option>
              </el-select>

              <br><br>
              <label>Column</label>
              <el-select
                v-model="iotIndicatorConfig.column"
                class="select-info"
                placeholder="Select Column Width"
                style="width: 100%"
              >
                <el-option
                  class="text-dark"
                  value="col-3"
                  label="col-3"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-4"
                  label="col-4"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-5"
                  label="col-5"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-6"
                  label="col-6"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-7"
                  label="col-7"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-8"
                  label="col-8"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-9"
                  label="col-9"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-10"
                  label="col-10"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-11"
                  label="col-11"
                ></el-option>
                <el-option
                  class="text-dark"
                  value="col-12"
                  label="col-12"
                ></el-option>
              </el-select>
            </div>
          </div>

          <!--WIDGET PREVIEW -->
          <div class="col-6" style="margin: auto 0">
            <IotIndicator
              v-if="widgetType == 'indicator'"
              :config="iotIndicatorConfig"
            >
            </IotIndicator>
            <IotButton v-if="widgetType == 'button'" :config="iotButtonConfig">
            </IotButton>
            <IotNumberChart
              v-if="widgetType == 'numberchart'"
              :config="iotNumberChartConfig"
            >
            </IotNumberChart>
            <IotSwitch v-if="widgetType == 'switch'" :config="iotSwitchConfig">
            </IotSwitch>
          </div>
        </div>

        <!--ADD WIDGET BUTTON -->
        <div class="row pull-right">
          <div class="col-12">
            <base-button
              native-type="submit"
              round type="info"
              class="mb-3"
              size="lg"
              @click="addNewWidget()"
            >
              Add Widget
            </base-button>
          </div>
        </div>
      </card>
    </div>

    <!-- DASHBOARD PREVIEW -->
    <div class="row">
      <div
        v-for="(widget, index) in widgets"
        :key="index"
        :class="[widget.column]"
      >
        <i
          aria-hidden="true"
          class="fa fa-trash text-warning pull-right"
          @click="deleteWidget(index)"
          style="margin-bottom: 10px"
        ></i>

        <IotNumberChart
          v-if="widget.widget == 'numberchart'"
          :config="widget"
        ></IotNumberChart>

        <IotSwitch
          v-if="widget.widget == 'switch'"
          :config="widget"
        ></IotSwitch>

        <IotButton
          v-if="widget.widget == 'button'"
          :config="widget"
        ></IotButton>

        <IotIndicator
          v-if="widget.widget == 'indicator'"
          :config="widget"
        ></IotIndicator>
      </div>
    </div>

    <!-- SAVE TEMPLATE FORM-->
    <div class="row" v-if="widgets.length > 0">
      <card>
        <div slot="header">
          <h4 class="card-title">Save Template</h4>
        </div>

        <div class="row">
          <base-input
            class="col-4"
            v-model="templateName"
            label="Template Name"
            type="text"
          >
          </base-input>

          <base-input
            class="col-8"
            v-model="templateDescription"
            label="Template Description"
            type="text"
          >
          </base-input>
        </div>

        <br /><br />

        <div class="row">
          <div class="col-12">
            <base-button
              native-type="submit"
              round type="info"
              class="mb-3 pull-right"
              size="lg"
              @click="saveTemplate()"
              :disabled="widgets.length == 0"
            >
              Save Template
            </base-button>
          </div>
        </div>
      </card>
    </div>

    <!-- TEMPLATES TABLE -->
    <div class="row">
      <card>
        <div slot="header">
          <h4 class="card-title">Templates</h4>
        </div>

        
          <el-table 
          :data="templates"
          :header-cell-style="{ background: '#27293d' }"
          >
            <el-table-column 
            min-width="50" 
            label="#" 
            type="index"
            >
            </el-table-column>
            <el-table-column prop="name" label="Name"></el-table-column>
            <el-table-column prop="description" label="Description"></el-table-column>
            <el-table-column
              prop="widgets.length"
              label="Widgets"
              align="center"
            ></el-table-column>

            <el-table-column label="Actions">
              <div
                slot-scope="{ row }"
              >
                <el-tooltip
                  content="Delete"
                  effect="light"
                  :open-delay="300"
                  placement="top"
                  style="margin: 0 auto"
                >
                  <base-button
                    @click="deleteTemplate(row)"
                    type="danger"
                    icon
                    size="sm"
                    class="btn-link"
                  >
                    <i class="tim-icons icon-simple-remove"></i>
                  </base-button>
                </el-tooltip>
              </div>
            </el-table-column>
          </el-table>
        
      </card>
    </div>

    <Json :value="widgets"></Json>
  </div>
</template>

<script>
import Json from "~/components/Json.vue";
import { Table, TableColumn } from "element-ui";
import { Select, Option } from "element-ui";

export default {
  middleware: 'authenticated',
  components: {
    Json,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Option.name]: Option,
    [Select.name]: Select,
  },
  data() {
    return {
      widgets: [],
      templates: [],
      templateName: "",
      templateDescription: "",
      widgetType: "",

      iotNumberChartConfig: {
        userId: "userid",
        selectedDevice: {
          name: "Home",
          dId: "12345",
          templateName: "PowerSensor",
          templateId: "1234jkhkjlj",
          saveRule: false,
        },
        variableFullName: "Pump",
        variable: "uniquestr",
        variableType: "input",
        variableSendFreq: "30",
        icon: "fa-sun",
        column: "col-6",
        widget: "numberchart",
        class: "success",
        message: "PROBEMSG",
        unit: "Volts",
        decimalPlaces: 0,
        chartTime: 60,
        demo: true,
      },

      iotButtonConfig: {
        userId: "userid",
        selectedDevice: {
          name: "Home",
          dId: "12345"
        },
        variableFullName: "Pump",
        variable: "uniquestr",
        icon: "fa-sun",
        column: "col-6",
        widget: "button",
        class: "info",
        message: "PROBEMSG",
        text: "SEND",
      },

      iotIndicatorConfig: {
        userId: "userid",
        selectedDevice: {
          name: "Home",
          dId: "12345"
        },
        variableFullName: "Pump",
        variable: "uniquestr",
        variableSendFreq: "60",
        icon: "fa-sun",
        column: "col-6",
        widget: "indicator",
        class: "danger",
      },

      iotSwitchConfig: {
        userId: "userid",
        selectedDevice: {
          name: "Home",
          dId: "12345",
        },
        variableFullName: "Pump",
        variable: "uniquestr",
        icon: "fa-sun",
        column: "col-6",
        widget: "switch",
        class: "danger",
      },
    };
  },
  mounted(){
    this.getTemplates();
  },
  methods: {

    //Get Templates
    async getTemplates() {
      const axiosHeaders = {
        headers: {
          token: this.$store.state.auth.token
        }
      };

      try {
        const res = await this.$axios.get("/template", axiosHeaders);
        console.log(res.data);

        if (res.data.status == "success") {
          this.templates = res.data.data;
        }
      } catch (error) {
        this.$notify({
          type: "danger",
          icon: "tim-icons icon-alert-circle-exc",
          message: "Error getting templates..."
        });
        console.log(error);
        return;
      }
    },

    //Save Template
    async saveTemplate() {
      const axiosHeaders = {
        headers: {
          token: this.$store.state.auth.token
        }
      };

      console.log(axiosHeaders);

      const toSend = {
        template: {
          name: this.templateName,
          description: this.templateDescription,
          widgets: this.widgets
        }
      };

      try {
        const res = await this.$axios.post("/template", toSend, axiosHeaders);

        if (res.data.status == "success") {
          this.$notify({
            type: "success",
            icon: "tim-icons icon-alert-circle-exc",
            message: "Template created!"
          });
          this.getTemplates();

          this.widgets = [];
        }
      } catch (error) {
        this.$notify({
          type: "danger",
          icon: "tim-icons icon-alert-circle-exc",
          message: "Error creating template..."
        });
        console.log(error);
        return;
      }
    },

    //Delete Template
    async deleteTemplate(template) {
      
      const axiosHeaders = {
        headers: {
          token: this.$store.state.auth.token
        },
        params:{
          templateId:template._id
        }
      };

      console.log(axiosHeaders);

      try {

        const res = await this.$axios.delete("/template", axiosHeaders);

        console.log(res.data)

        if (res.data.status == "fail" && res.data.error == "template in use") {

          this.$notify({
            type: "danger",
            icon: "tim-icons icon-alert-circle-exc",
            message: template.name + " is in use. First remove the devices linked to the template!"
          });
          
          return;
        }

        if (res.data.status == "success") {
          this.$notify({
            type: "success",
            icon: "tim-icons icon-check-2",
            message: template.name + " was deleted!"
          });
          
          this.getTemplates();
        }
      } catch (error) {
        this.$notify({
          type: "danger",
          icon: "tim-icons icon-alert-circle-exc",
          message: "Error getting templates..."
        });
        console.log(error);
        return;
      }
    },

    addNewWidget() {
      if (this.widgetType == "numberchart") {
        this.iotNumberChartConfig.variable = this.makeid(10);
        this.widgets.push(
          JSON.parse(JSON.stringify(this.iotNumberChartConfig))
        );
      }

      if (this.widgetType == "switch") {
        this.iotSwitchConfig.variable = this.makeid(10);
        this.widgets.push(JSON.parse(JSON.stringify(this.iotSwitchConfig)));
      }

      if (this.widgetType == "button") {
        this.iotButtonConfig.variable = this.makeid(10);
        this.widgets.push(JSON.parse(JSON.stringify(this.iotButtonConfig)));
      }

      if (this.widgetType == "indicator") {
        this.iotIndicatorConfig.variable = this.makeid(10);
        this.widgets.push(JSON.parse(JSON.stringify(this.iotIndicatorConfig)));
      }
    },
    //Delete Widget
    deleteWidget(index) {
      this.widgets.splice(index, 1);
    },
    makeid(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },
  },
};
</script>