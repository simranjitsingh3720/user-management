export const PrivilegeSearch = [
  {
    label: "Name",
    value: "permissionName",
  },
  {
    label: "Type",
    value: "type",
  },
  {
    label: "Module",
    value: "module",
  },
  {
    label: "Sub Module",
    value: "subModule",
  },
  {
    label: "API Endpoint",
    value: "apiEndpoint",
  },
];

export const PrivilegeTypeSelect = [
  {
    label: "API",
    value: "api",
  },
  {
    label: "UI",
    value: "ui",
  },
];

export const PrivilegeStatusSelect = [
  {
    label: "Active",
    value: "active",
  },
  {
    label: "Inactive",
    value: "inactive",
  },
];

export const CrudSelect = [
  {
    label: "Create",
    value: "create",
  },
  {
    label: "Update",
    value: "update",
  },
  {
    label: "Read",
    value: "read",
  },
];

export const item = [
  {
    permissionName: "user_management_form",
    privilegeType: "api",
    module: "",
    subModule: "",
    api: "userId",
    privilegeStatus: "active",
    crud: ["update", "read"],
  },
  {
    name: "permission_form",
    privilegeType: "api",
    privilegeStatus: "active",
    api: "dateCreation",
    crud: ["update", "all"],
  },
  {
    name: "data_entry",
    privilegeType: "ui",
    privilegeStatus: "active",
    crud: ["read"],
    module: "dateCreation",
    subModule: "ntLogin",
  },
];
