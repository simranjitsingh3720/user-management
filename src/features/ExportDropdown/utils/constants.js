import { setLast30Days } from "../../../stores/slices/exportSlice";

export const EXPORT_DROPDOWN_VALUES = ["Last 30 Days", "Custom"];

export const EXPORT_ACTIONS = {
  "Last 30 Days": {
    selectedValue: "Last 30 Days",
    actions: [setLast30Days],
  },
  Custom: {
    selectedValue: "custom",
    actions: [],
  },
};

export const EXPORT_CONSTANTS = {
    dialogTitle: "Export Data",
    custom: 'custom'
}

export const API_END_POINTS = {
  getColumns: "/api/file/columns?tableName=",
  downloadFile: "/api/file/download"
}