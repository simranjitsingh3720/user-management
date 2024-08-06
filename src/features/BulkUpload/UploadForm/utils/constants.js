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
  if (location.includes('product-payment-config')) {
    return 'productWisePaymentMethod';
  } else if (location.includes('proposalotpexception')) {
    return 'proposalOtpException';
  } else if (location.includes('revalidation-list')) {
    return 'revalidationList';
  } else if (location.includes('uwlevelmappingemployee')) {
    return 'productLocationLevelMappings';
  } else if (location.includes('product-payment-config')) {
    return 'productWisePaymentMethod';
  } else if (location.includes('partner-neft')) {
    return 'partnerNeft';
  } else if (location.includes('user-management')) {
    return 'user';
  } else {
    return;
  }
};
