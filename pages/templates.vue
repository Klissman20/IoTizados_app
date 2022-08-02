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
              class="select-success"
              placeholder="Select Widget"
              style="width: 100%"
            >
              <el-option
                class="text-dark"
                value="numberchart"
                label="Number Chart INPUT <--"
              >
              </el-option>
              <el-option
                class="text-dark"
                value="indicator"
                label="Boolean Indicator INPUT <--"
              >
              </el-option>
              <el-option
                class="text-dark"
                value="button"
                label="Button OUTPUT -->"
              >
              </el-option>
              <el-option
                class="text-dark"
                value="switch"
                label="Switch OUTPUT -->"
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
                class="select-success"
                placeholder="Select Class"
                style="width: 100%;"
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
              </el-select>

              <br>
              <label>Column</label>
              <el-select
                v-model="iotNumberChartConfig.column"
                class="select-success"
                placeholder="Select Column Width"
                style="width: 100%;"
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
            <div v-if="widgetType == 'switch'"></div>

            <!--FORM BUTTON TYPE -->
            <div v-if="widgetType == 'button'"></div>

            <!--FORM INDICATOR TYPE -->
            <div v-if="widgetType == 'indicator'"></div>
          </div>

          <!--WIDGET PREVIEW -->
          <div class="col-6">
            <IotIndicator
              v-if="widgetType == 'indicator'"
              :config="iotIndicatorConfig"
            >
            </IotIndicator>
            <IotButton v-if="widgetType == 'button'" :config="iotButtonConfig">
            </IotButton>

            <IotNumberChart v-if="widgetType == 'numberchart'" :config="iotNumberChartConfig">

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
              type="primary"
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
  </div>
</template>

<script>
import { Table, TableColumn } from "element-ui";
import { Select, Option } from "element-ui";

export default {
  components: {
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
        demo: true
      },

      iotButtonConfig: {
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
        icon: "fa-sun",
        column: "col-6",
        widget: "button",
        class: "success",
        message: "PROBEMSG",
      },

      iotIndicatorConfig: {
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
          templateName: "PowerSensor",
          templateId: "1234jkhkjlj",
          saveRule: false,
        },
        variableFullName: "Pump",
        variable: "uniquestr",
        icon: "fa-sun",
        column: "col-6",
        widget: "indicator",
        class: "danger",
      },
    };
  },
};
</script>
