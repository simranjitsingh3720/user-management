import { useCallback } from 'react';
import { toast } from 'react-toastify';
import errorHandler from '../../../../utils/errorHandler';
import axiosInstance from '../../../../utils/axiosInstance';
import apiUrls from '../../../../utils/apiUrls';
import { buildQueryString } from '../../../../utils/globalizationFunction';

const useSubmit = () => {
  const postBulkUpload = useCallback(async (data) => {
    console.log(data);
    try {
      const { data: responseData } = await axiosInstance.post(apiUrls.postBulkUpload, data);
      toast.success(responseData?.message || 'File Uploaded successfully');
      return responseData;
    } catch (error) {
      errorHandler.handleError(error);
    }
  }, []);

  const getBulkTemplate = useCallback(async (data) => {
    const { label, fileName } = data
    const queryParams = buildQueryString({
      filename: fileName,
      label,
    });

    try {
      const { data: responseData } = await axiosInstance.get(`${apiUrls.downloadBulkTemplate}?${queryParams}`);
      const link = document.createElement('a');
      link.href = responseData?.data?.downloadUrl;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Download Successfully');
    } catch (e) {
      errorHandler.handleError(e);
      return;
    }
  }, []);

  return { postBulkUpload, getBulkTemplate };
};

export default useSubmit;
