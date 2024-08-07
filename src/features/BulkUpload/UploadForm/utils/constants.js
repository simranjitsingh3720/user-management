import { CURRENT_LOCATION, TABLE_LABEL } from "../../../../utils/constants";

export const SEARCH_OPTIONS = [
  {
    label: 'File Name',
    value: 'fileName',
  },
];

export const SEARCH_BY = 'File';
export const CONTENT = {
  TITLE: 'Bulk Upload',
  HEADER: 'Please upload your master file to add it to the upload history table given below.',
  SUB_HEADER: 'Please download and refer the template before uploading the file.',
  BUTTON_TEXT: 'Download Template',
  FILE_BUTTON_TEXT: 'Browse Files',
  FILE_UPLOAD_TEXT: 'Supported Format: XLS | Maximum Size: 5 MB',
  UPLOAD_BUTTON_TEXT: 'Upload',
};

export const COMMON_VAR = {
  FILE_TYPE: 'fileType',
  FILE: 'file',
  FILE_NAME: 'sampleFile.xlsx',
  INVALID_FILE_ERR: 'Please select a valid XLS file.',
  FILE_SIZE_LIMIT_ERR: 'File size exceeds 5 MB limit.',
  XLS_TYPE: 'xls',
  XLSX_TYPE: 'xlsx',
  USER_MANAGEMENT_ROUTE: 'user-management',
  OPERATION: 'operation',
};

export const ROLE_MENUITEM = [
  {
    id: 'csm',
    label: 'Csm',
    value: 'csm',
  },
  {
    id: 'admin',
    label: 'Admin',
    value: 'admin',
  },
  {
    id: 'partner',
    label: 'Partner',
    value: 'partner',
  },
  {
    id: 'other',
    label: 'Other',
    value: 'other',
  },
];

export const UPLOAD_TYPE = [
  {
    id: 'create',
    label: 'Create ',
    value: 'add',
  },
  {
    id: 'update',
    label: 'Update',
    value: 'edit',
  },
];

export const getBulkUploadLabel = (location) => {
  if (location.includes(CURRENT_LOCATION.PRODUCT_PAYMENT_CONFIG)) {
    return TABLE_LABEL.PRODUCT_PAYMENT_CONFIG;
  } else if (location.includes(CURRENT_LOCATION.PROPOSAL_OTP_EXCEPTION)) {
    return TABLE_LABEL.PROPOSAL_OTP_EXCEPTION;
  } else if (location.includes(CURRENT_LOCATION.REVALIDATION_LIST)) {
    return TABLE_LABEL.REVALIDATION_LIST;
  } else if (location.includes(CURRENT_LOCATION.UW_LEVEL_LOCATION_MAPPING)) {
    return TABLE_LABEL.UW_LEVEL_LOCATION_MAPPING;
  } else if (location.includes(CURRENT_LOCATION.PARTNER_NEFT)) {
    return TABLE_LABEL.PARTNER_NEFT;
  } else if (location.includes(CURRENT_LOCATION.USER_MANAGEMENT)) {
    return TABLE_LABEL.USER_MANAGEMENT;
  } else {
    return;
  }
};
