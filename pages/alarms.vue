<template>
    <div>
        <h1>Alarms</h1>
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
      alarmRules: [],
      newRule: {
        dId: null,
        status: true,
        variable: null,
        variableFullName: null,
        value: null,
        condition: null,
        triggerTime: null,
      }
    };
  },
}
</script>