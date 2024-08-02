import React, { useMemo, useRef, useState, useCallback, useEffect } from 'react';
import styles from './styles.module.scss';
import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import SearchComponent from '../../../components/SearchComponent';
import { getPlaceHolder } from '../../../utils/globalizationFunction';
import { COMMON_VAR, CONTENT, ROLE_MENUITEM, SEARCH_BY, SEARCH_OPTIONS } from './utils/constants';
import CustomTable from '../../../components/CustomTable';
import { Header } from './utils/header';
import CustomFormHeader from '../../../components/CustomFormHeader';
import useGetBulkUpload from './hooks/useGetBulkUpload';
import useSubmit from './hooks/useSubmit';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { COMMON } from '../../UserManagement/Components/utils/constants';
import SelectField from '../../../components/CustomSelect';
import Loader from '../../../components/Loader';
import { COMMON_WORDS } from '../../../utils/constants';
import UploadTemplate from './UploadSection';

function UploadForm() {
  const [searched, setSearched] = useState(SEARCH_OPTIONS[0].value);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [order, setOrder] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileName, setFileName] = useState('');
  const { postBulkUpload, getBulkTemplate, postBulkUploadLoading } = useSubmit();
  const { getBulkUpload, bulkUploadData, totalCount, setData } = useGetBulkUpload();
  const { tableName } = useSelector((state) => state.export);
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [file, setFile] = useState();
  const header = useMemo(() => Header(), []);

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
          toast.error(COMMON_VAR.FILE_SIZE_LIMIT_ERR);
          event.target.value = null;
        } else {
          setFileUploaded(true);
          setFileName(file.name);
          setFile(file);
        }
      } else {
        toast.error(COMMON_VAR.INVALID_FILE_ERR);
      }
    }
  };

  const loadData = useCallback(() => {
    getBulkUpload({
      pageNo: page,
      pageSize,
      searchKey: COMMON_VAR.FILE_TYPE,
      searchString: tableName,
    });
  }, [page, pageSize, getBulkUpload, tableName]);

  const fetchTemplate = useCallback(() => {
    getBulkTemplate({
      fileName: COMMON_VAR.FILE_NAME,
      label: tableName,
      role: watchRole,
    });
  }, [tableName, watchRole]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleGo = () => {
    if (query) {
      setData([]);
      getBulkUpload({
        pageNo: page,
        pageSize,
        searchKey: COMMON_VAR.FILE_TYPE,
        searchString: tableName,
        searched,
        query,
      });
    } else {
      getBulkUpload({ searchKey: COMMON_VAR.FILE_TYPE, searchString: tableName, pageNo: page, pageSize });
    }
  };

  const deleteBtn = () => {
    setFileName('');
    setFileUploaded(false);
    setFile('');
  };

  const onSubmit = async () => {
    if (file && tableName) {
      const formData = new FormData();
      formData.append(COMMON_VAR.FILE, file);
      formData.append(COMMON_VAR.FILE_TYPE, tableName);
      if (watchRole) {
        formData.append('role', watchRole);
      }
      const res = await postBulkUpload(formData);
      if (res && res.success && res.statusCode === 200) {
        setFileUploaded(false);
        setFile('');
        setFileName('');
      }
    }
  };

  if (!tableName) {
    navigate(-1);
  }

  return (
    <>
      {postBulkUploadLoading && <Loader />}
      <form onSubmit={handleSubmit(onSubmit)} className={`${styles.formMainContainer}`}>
        <div className={styles.createContainer}>
          <div className="p-5 pb-0">
            <CustomFormHeader navigateRoute={-1} headerText={CONTENT.TITLE} subHeading={CONTENT.HEADER} />
          </div>
          {location?.pathname.includes(COMMON_VAR.USER_MANAGEMENT_ROUTE) && (
            <div className="w-full px-7 pb-5">
              <SelectField
                key="role"
                control={control}
                name="role"
                label="Role Name"
                required={true}
                disabled={false}
                menuItem={ROLE_MENUITEM}
                placeholder="Select"
                errors={errors}
                setValue={setValue}
                classes="w-1/2"
                trigger={trigger}
              />
            </div>
          )}
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
          <div className={styles.formContainer}></div>
        </div>
      </form>
      <div className="h-5"></div>
      <Box className={`${styles.createContainer} px-7 pb-7`}>
        <SearchComponent
          selectOptions={SEARCH_OPTIONS}
          placeholder={getPlaceHolder(SEARCH_BY)}
          searched={searched}
          setSearched={setSearched}
          setQuery={setQuery}
          textField
          textFieldPlaceholder={COMMON.SEARCH_PLACEHOLDER}
          handleGo={handleGo}
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
