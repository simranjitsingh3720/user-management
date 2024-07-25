import React, { useMemo, useRef, useState, useCallback, useEffect } from 'react';
import styles from './styles.module.scss';
import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import CustomButton from '../../../components/CustomButton';
import DownloadLogo from '../../../assets/DownloadLogo';
import DocumentIconGray from '../../../assets/DocumentIconGray';
import DocumentIconGreen from '../../../assets/DocumentIconGreen';
import { toast } from 'react-toastify';
import SearchComponent from '../../../components/SearchComponent';
import { getPlaceHolder } from '../../../utils/globalizationFunction';
import { COMMON_VAR, CONTENT, SEARCH_BY, SEARCH_OPTIONS } from './utils/constants';
import CustomTable from '../../../components/CustomTable';
import { Header } from './utils/header';
import CustomFormHeader from '../../../components/CustomFormHeader';
import useGetBulkUpload from './hooks/useGetBulkUpload';
import useSubmit from './hooks/useSubmit';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { COMMON } from '../../UserManagement/Components/utils/constants';

function UploadForm() {
  const [searched, setSearched] = useState(SEARCH_OPTIONS[0].value);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [order, setOrder] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileName, setFileName] = useState('');
  const { postBulkUpload, getBulkTemplate } = useSubmit();
  const { getBulkUpload, bulkUploadData, totalCount, setData } = useGetBulkUpload();
  const { tableName } = useSelector((state) => state.export);
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [file, setFile] = useState();
  const header = useMemo(() => Header(), []);

  const {
    handleSubmit,
  } = useForm({
    defaultValues: {},
  });

  const downloadTemplate = () => {
    fetchTemplate();
  };

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
          setFile(event.target.files[0]);
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
      fileName: COMMON_VAR.REVALIDATION_FILE_NAME,
      label: COMMON_VAR.REVALIDATION_LABEL,
    });
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleGo = () => {
    if (query) {
      setData([]);
      console.log(query);
      getBulkUpload({pageNo:page, pageSize, searchKey: COMMON_VAR.FILE_TYPE,
      searchString: tableName, searched, query});
    } else {
      getBulkUpload({searchKey: COMMON_VAR.FILE_TYPE,
      searchString: tableName, pageNo: page,
      pageSize,});
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
      const res = await postBulkUpload(formData);
      console.log(res);
      if (res && res.success && res.statusCode === 200) {
        setFileUploaded(false);
        setFile('');
        setFileName('');
      }
    }
  };

  if (!tableName) {
    navigate(-1)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={`${styles.formMainContainer}`}>
        <div className={styles.createContainer}>
          <div className="p-5">
            <CustomFormHeader
              navigateRoute={-1}
              headerText={CONTENT.TITLE}
              subHeading={CONTENT.HEADER}
            />
          </div>
          <div className="p-7">
            <div className="border border-blueHaze rounded-lg w-full">
              <div className="text-sm bg-linkWater p-4 flex rounded-lg justify-center">
                <span className="flex flex-col xl:flex-row text-fiord font-medium">
                  {CONTENT.SUB_HEADER}
                  <button
                    className="flex text-denim underline flex-nowrap sm:justify-center"
                    onClick={downloadTemplate}
                  >
                    <span className="mr-2 xl:mx-2">
                      <DownloadLogo />
                    </span>
                    {CONTENT.BUTTON_TEXT}
                  </button>
                </span>
              </div>
              <div className="flex justify-center mt-6">
                {!fileUploaded ? <DocumentIconGray></DocumentIconGray> : <DocumentIconGreen></DocumentIconGreen>}
              </div>
              <div className="flex justify-center">
                <div className="text-center">
                  {!fileUploaded ? (
                    <div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept=".xls, .xlsx"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                      />
                      <button className="text-sm text-denim underline mt-2" onClick={handleButtonClick}>
                        {CONTENT.FILE_BUTTON_TEXT}
                      </button>
                    </div>
                  ) : (
                    <div className="text-sm mt-2 text-fiord font-medium">
                      {fileName} <span className="text-blueHaze mx-1">|</span>{' '}
                      <button className="text-sm text-denim underline" onClick={deleteBtn}>
                        Delete
                      </button>{' '}
                    </div>
                  )}
                  <div className="text-xs text-fiord my-3">{CONTENT.FILE_UPLOAD_TEXT}</div>
                  <div className="my-5">
                    {' '}
                    <CustomButton type="submit" disabled={!fileUploaded}>
                      {CONTENT.UPLOAD_BUTTON_TEXT}
                    </CustomButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
