<template>
  <div>
    <h1>Devices</h1>
    <!-- FORM ADD DEVICE -->
    <div class="row">
      <card>
        <div slot="header">
          <h4 class="card-title">Add new device</h4>
        </div>
        <div class="row">
          <div class="col-4">
            <base-input
              label="Device Name"
              type="text"
              placeholder="Home,Office,Job..."
            ></base-input>
          </div>
          <div class="col-4">
            <base-input
              label="Device ID"
              type="text"
              placeholder="123456789"
            ></base-input>
          </div>

          <div class="col-4">
            <slot name="label">
              <label>Template</label>
            </slot>
            <el-select
              placeholder="Select Template"
              class="select-primary"
              style="width: 100%"
              prop="value"
            >
              <el-option
                class="text-dark"
                label="Template 1"
                value="Template 1"
              ></el-option>
              <el-option
                class="text-dark"
                label="Template 2"
                value="Template 2"
              ></el-option>
              <el-option
                class="text-dark"
                label="Template 3"
                value="Template 3"
              ></el-option>
            </el-select>
          </div>
        </div>

        <div class="row pull-right">
          <div class="col-12">
            <base-button type="primary" class="mb-3" size="lg">ADD</base-button>
          </div>
        </div>
      </card>
    </div>

    <!-- DEVICES TABLE -->
    <div class="row">
      <card>
        <div slot="header">
          <h4 class="card-title">Devices</h4>
        </div>

        <el-table
          :data="devices"
          :header-cell-style="{ background: '#27293d' }"
        >
          <el-table-column
            min-width="50"
            type="index"
            label="#"
          ></el-table-column>
          <el-table-column prop="name" label="Name"></el-table-column>
          <el-table-column prop="dId" label="Device ID"></el-table-column>
          <el-table-column
            prop="templateName"
            label="Template"
          ></el-table-column>
          <el-table-column label="Actions">
            <div slot-scope="{ row, $index }">
              <!--Switch Indicator-->
              <el-tooltip
                content="Saver Status Indicator"
                style="margin-right: 10px"
              >
                <i
                  class="fas fa-database"
                  :class="{
                    'text-success': row.saveRule,
                    'text-dark': !row.saveRule,
                  }"
                ></i>
              </el-tooltip>
              <!--Switch button-->
              <el-tooltip>
                <base-switch
                  @click="updateServerRuleStatus($index)"
                  :value="row.saveRule"
                  type="primary"
                  on-text="On"
                  off-text="Off"
                >
                </base-switch>
              </el-tooltip>
              <!--Edit button-->
              <el-tooltip
                content="Edit"
                effect="light"
                :open-delay="300"
                placement="top"
              >
                <base-button type="info" icon size="sm" class="btn-link">
                  <i class="tim-icons icon-pencil"></i>
                </base-button>
              </el-tooltip>
              <!--Delete button-->
              <el-tooltip
                content="Delete"
                effect="light"
                :open-delay="300"
                placement="top"
              >
                <base-button
                  type="danger"
                  icon
                  size="sm"
                  class="btn-link"
                  @click="deleteDevice(row)"
                >
                  <i class="tim-icons icon-simple-remove"></i>
                </base-button>
              </el-tooltip>
            </div>
          </el-table-column>
        </el-table>
      </card>
    </div>

    <Json :value="devices"></Json>
  </div>
</template>

<script>
import Json from "~/components/Json.vue";
import { Table, TableColumn } from "element-ui";
import { Select, Option } from "element-ui";
import BaseButton from "~/components/BaseButton.vue";

export default {
  components: {
    Json,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Option.name]: Option,
    [Select.name]: Select,
  },
  data() {
    return {
      devices: [
        {
          name: "Home",
          dId: "12345",
          templateName: "PowerSensor",
          templateId: "1234jkhkjlj",
          saveRule: false,
        },
        {
          name: "Oficce",
          dId: "12345",
          templateName: "PowerSensor",
          templateId: "1234jkhkjlj",
          saveRule: true,
        },
        {
          name: "Job",
          dId: "12345",
          templateName: "PowerSensor",
          templateId: "1234jkhkjlj",
          saveRule: false,
        },
      ],
    };
  },
  methods: {
    deleteDevice(device) {
      alert("Deleting " + device.name);
    },
    updateServerRuleStatus(index) {
      this.devices[index].saveRule = !this.devices[index].saveRule;
    },
  },
};
</script>
