import React, { useMemo, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import CustomButton from '../../../components/CustomButton';
import DownloadLogo from '../../../assets/DownloadLogo';
import DocumentIconGray from '../../../assets/DocumentIconGray';
import DocumentIconGreen from '../../../assets/DocumentIconGreen';
import { toast } from 'react-toastify';
import { COMMON_WORDS } from '../../../utils/constants';
import SearchComponent from '../../../components/SearchComponent';
import { getPlaceHolder } from '../../../utils/globalizationFunction';
import { CONTENT, SEARCH_BY, SEARCH_OPTIONS } from './utils/constants';
import CustomTable from '../../../components/CustomTable';
import { Header } from './utils/header';
import CustomFormHeader from '../../../components/CustomFormHeader';

function UploadForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {},
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const downloadTemplate = () => {
    console.log('Download template clicked');
  };

  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      const fileType = file.name.split('.').pop().toLowerCase();
      console.log(fileType);
      if (fileType === 'xls' || fileType === 'xlsx') {
        const fileSize = file.size;
        const maxSize = 5 * 1024 * 1024; // 5 MB in bytes
        if (fileSize > maxSize) {
          toast.error('File size exceeds 5 MB limit.');
          event.target.value = null;
        } else {
          console.log(`File size: ${fileSize} bytes`);
          setFileUploaded(true);
          console.log(file);
          setFileName(file.name);
        }
      } else {
        toast.error('Please select a valid CSV or XLS file.');
      }
    }
  };

  const [searched, setSearched] = useState(SEARCH_OPTIONS[0].value);
  const getOptionsData = () => {
    switch (searched) {
      default:
        return [];
    }
  };

  const getOption = () => {
    switch (searched) {
      default:
        return [];
    }
  };

  const setOption = (option) => {
    switch (searched) {
      default:
        break;
    }
  };

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [order, setOrder] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileName, setFileName] = useState('');

  const optionLabel = (option, type) => {
    if (type === COMMON_WORDS.PRODUCER) return option['firstName'] + ' ' + option['lastName'];
    return option[type]?.toUpperCase() || '';
  };

  const renderOptionFunction = (props, option, type) => (
    <li {...props} key={option?.id}>
      {optionLabel(option, type)}
    </li>
  );

  const handleGo = () => {};

  const header = useMemo(() => Header(), []);

  const deleteBtn = () => {
    setFileName('');
    setFileUploaded(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={`${styles.formMainContainer}`}>
        <div className={styles.createContainer}>
          <div className="p-5">
            <CustomFormHeader
              navigateRoute="/communication-restrictions"
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
                    <CustomButton>{CONTENT.UPLOAD_BUTTON_TEXT}</CustomButton>
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
          optionsData={getOptionsData()}
          option={getOption()}
          setOption={setOption}
          optionLabel={(option) => optionLabel(option, COMMON_WORDS[searched.toUpperCase()])}
          placeholder={getPlaceHolder(SEARCH_BY)}
          renderOptionFunction={(props, option) =>
            renderOptionFunction(props, option, COMMON_WORDS[searched.toUpperCase()])
          }
          searched={searched}
          setSearched={setSearched}
          selectOptions={SEARCH_OPTIONS}
          handleGo={handleGo}
          showButton={false}
          showExportButton={false}
        />
        <div className="mt-4">
          <CustomTable
            rows={[]}
            columns={header}
            loading={false}
            totalCount={0}
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
