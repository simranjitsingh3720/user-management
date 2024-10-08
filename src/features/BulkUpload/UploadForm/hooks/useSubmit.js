import { useCallback, useState } from 'react';
import errorHandler from '../../../../utils/errorHandler';
import axiosInstance from '../../../../utils/axiosInstance';
import apiUrls from '../../../../utils/apiUrls';
import { buildQueryString } from '../../../../utils/globalizationFunction';
import toastifyUtils from '../../../../utils/toastify';

const useSubmit = () => {
  const [loading, setLoading] = useState(false);
  const postBulkUpload = useCallback(async (data) => {
    try {
      setLoading(true);
      const { data: responseData } = await axiosInstance.post(apiUrls.postBulkUpload, data);
      toastifyUtils.notifySuccess(responseData?.message || 'File Uploaded successfully');
      return responseData;
    } catch (error) {
      errorHandler.handleError(error);
    }
    finally{
      setLoading(false);
    }
  }, []);

  const getBulkTemplate = useCallback(async (data) => {
    const { label, fileName, role } = data
    const queryParams = buildQueryString({
      filename: fileName,
      label,
      role
    });

    try {
      const { data: responseData } = await axiosInstance.get(`${apiUrls.downloadBulkTemplate}?${queryParams}`);
      const link = document.createElement('a');
      link.href = responseData?.data?.downloadUrl;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toastifyUtils.notifySuccess('Download Successfully');
    } catch (e) {
      errorHandler.handleError(e);
      return;
    }
  }, []);

  return { postBulkUpload, getBulkTemplate, postBulkUploadLoading: loading };
};

export default useSubmit;
