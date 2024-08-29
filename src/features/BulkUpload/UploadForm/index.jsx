import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import SearchComponent from '../../../components/SearchComponent';
import { getPlaceHolder } from '../../../utils/globalizationFunction';
import {
  COMMON_VAR,
  CONTENT,
  ROLE_MENUITEM,
  SEARCH_BY,
  SEARCH_OPTIONS,
  UPLOAD_TYPE,
  getBulkUploadLabel,
  infoLabel,
} from './utils/constants';
import CustomTable from '../../../components/CustomTable';
import { Header } from './utils/header';
import CustomFormHeader from '../../../components/CustomFormHeader';
import useGetBulkUpload from './hooks/useGetBulkUpload';
import useSubmit from './hooks/useSubmit';
import { useLocation } from 'react-router-dom';
import { COMMON } from '../../UserManagement/Components/utils/constants';
import SelectField from '../../../components/CustomSelect';
import Loader from '../../../components/Loader';
import { COMMON_WORDS } from '../../../utils/constants';
import UploadTemplate from './UploadSection';
import UserTypeToggle from '../../../components/CustomRadioButtonGroup';
import { PAGECOUNT } from '../../../utils/globalConstants';
import toastifyUtils from '../../../utils/toastify';

function UploadForm() {
  const [searched, setSearched] = useState(SEARCH_OPTIONS[0].value);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(PAGECOUNT);
  const [order, setOrder] = useState(COMMON_WORDS.DESC);
  const [orderBy, setOrderBy] = useState(COMMON_WORDS.FILE_UPLOAD_TIME);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileName, setFileName] = useState('');
  const [uploadType, setUploadType] = useState(COMMON_WORDS.ADD);
  const { postBulkUpload, getBulkTemplate, postBulkUploadLoading } = useSubmit();
  const { getBulkUpload, bulkUploadData, totalCount } = useGetBulkUpload();
  const [query, setQuery] = useState('');
  const [file, setFile] = useState();

  const {
    handleSubmit,
    setValue,
    control,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const downloadTemplate = () => {
    fetchTemplate();
  };

  console.log('hello', watch('role'));

  const watchRole = watch(COMMON_WORDS.ROLE);
  const location = useLocation();

  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.name.split('.').pop().toLowerCase();
      if (fileType === COMMON_VAR.XLS_TYPE || fileType === COMMON_VAR.XLSX_TYPE) {
        const fileSize = file.size;
        const maxSize = 5 * 1024 * 1024; // 5 MB in bytes
        if (fileSize > maxSize) {
          toastifyUtils.notifyError(COMMON_VAR.FILE_SIZE_LIMIT_ERR);
          event.target.value = null;
        } else {
          setFileUploaded(true);
          setFileName(file.name);
          setFile(file);
        }
      } else {
        toastifyUtils.notifyError(COMMON_VAR.INVALID_FILE_ERR);
      }
    }
  };

  const fetchTemplate = useCallback(() => {
    getBulkTemplate({
      fileName: COMMON_VAR.FILE_NAME,
      label: location.pathname.includes(COMMON_VAR.USER_MANAGEMENT_ROUTE)
        ? watchRole
        : getBulkUploadLabel(location.pathname),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchRole]);

  const fetchBulkUpload = useCallback(() => {
    getBulkUpload({
      pageNo: page,
      pageSize,
      sortOrder: order,
      sortKey: orderBy,
      query,
      searchKey: COMMON_VAR.FILE_TYPE,
      searchString: getBulkUploadLabel(location.pathname),
      searched,
    });
  }, [getBulkUpload, page, pageSize, order, orderBy, query, location.pathname, searched]);

  useEffect(() => {
    fetchBulkUpload();
  }, [fetchBulkUpload]);

  const handleGo = (data) => {
    setPage(0);
    setQuery(data?.search || '');
  };

  const deleteBtn = () => {
    setFileName('');
    setFileUploaded(false);
    setFile('');
  };

  const onSubmit = async () => {
    if (file) {
      const formData = new FormData();
      formData.append(COMMON_VAR.FILE, file);
      formData.append(COMMON_VAR.FILE_TYPE, getBulkUploadLabel(location.pathname));
      formData.append(COMMON_VAR.OPERATION, uploadType);
      if (watchRole) {
        formData.append(COMMON_WORDS.ROLE, watchRole);
      }
      const res = await postBulkUpload(formData);
      if (res && res.success && res.statusCode === 200) {
        setFileUploaded(false);
        setFile('');
        setFileName('');
        fetchBulkUpload();
      }
    }
  };

  const handleDownloadFile = (row) => {
    if (row?.errorFileUrl) {
      const link = document.createElement('a');
      link.href = row?.errorFileUrl;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toastifyUtils.notifySuccess('Download Successfully');
    }
  };

  const header = Header(handleDownloadFile);

  return (
    <>
      {postBulkUploadLoading && <Loader />}
      <form onSubmit={handleSubmit(onSubmit)} className="mb-3">
        <div className="bg-white mb-5 rounded-xl shadow-lg shadow-shadowColor">
          <div className="p-5 pb-0">
            <CustomFormHeader navigateRoute={-1} headerText={CONTENT.TITLE} subHeading={CONTENT.HEADER} />
          </div>
          <div className="w-full lg:w-1/2 px-7 pb-5">
            <UserTypeToggle
              menuItem={UPLOAD_TYPE}
              label="Upload Type"
              required={true}
              control={control}
              name="uploadType"
              defaultValue={uploadType}
              classes="w-full"
              onChangeCallback={(val) => {
                setUploadType(val);
              }}
            />
          </div>

          {location?.pathname.includes(COMMON_VAR.USER_MANAGEMENT_ROUTE) && (
            <div className="w-full lg:w-1/2 px-7 pb-5">
              <SelectField
                key="role"
                control={control}
                name="role"
                label="Role Name"
                required={true}
                disabled={false}
                menuItem={
                  uploadType === COMMON_WORDS.ADD
                    ? ROLE_MENUITEM.filter((item) => item.id !== COMMON_WORDS.PRODUCER)
                    : ROLE_MENUITEM
                }
                placeholder="Select"
                errors={errors}
                setValue={setValue}
                classes="w-full"
                trigger={trigger}
              />
            </div>
          )}
          <Typography variant="body2" color="textSecondary" className="w-full lg:w-1/2 px-7 ">
            {infoLabel[watch('role')]}
          </Typography>

          {location?.pathname.includes(COMMON_VAR.USER_MANAGEMENT_ROUTE) ? (
            watchRole ? (
              <UploadTemplate
                fileUploaded={fileUploaded}
                fileInputRef={fileInputRef}
                handleFileChange={handleFileChange}
                handleButtonClick={handleButtonClick}
                fileName={fileName}
                deleteBtn={deleteBtn}
                onSubmit={onSubmit}
                CONTENT={CONTENT}
                downloadTemplate={downloadTemplate}
              />
            ) : null
          ) : (
            <UploadTemplate
              fileUploaded={fileUploaded}
              fileInputRef={fileInputRef}
              handleFileChange={handleFileChange}
              handleButtonClick={handleButtonClick}
              fileName={fileName}
              deleteBtn={deleteBtn}
              onSubmit={onSubmit}
              CONTENT={CONTENT}
              downloadTemplate={downloadTemplate}
            />
          )}
          <div className="m-5"></div>
        </div>
      </form>
      <div className="h-5"></div>
      <Box className="bg-white mb-5 rounded-xl shadow-lg shadow-shadowColor px-7 pb-7">
        <SearchComponent
          selectOptions={SEARCH_OPTIONS}
          placeholder={getPlaceHolder(SEARCH_BY)}
          searched={searched}
          setSearched={setSearched}
          setQuery={setQuery}
          textField
          textFieldPlaceholder={COMMON.SEARCH_PLACEHOLDER}
          onSubmit={handleGo}
          fetchData={handleGo}
          showButton={false}
          showExportButton={false}
        />
        <div className="mt-4">
          <CustomTable
            rows={bulkUploadData}
            columns={header}
            loading={false}
            totalCount={totalCount}
            page={page}
            setPage={setPage}
            rowsPerPage={pageSize}
            setRowsPerPage={setPageSize}
            order={order}
            setOrder={setOrder}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
          />
        </div>
      </Box>
    </>
  );
}

export default UploadForm;
