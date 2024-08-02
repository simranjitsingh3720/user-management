import DocumentIconGray from '../../../../assets/DocumentIconGray';
import DocumentIconGreen from '../../../../assets/DocumentIconGreen';
import DownloadLogo from '../../../../assets/DownloadLogo';
import CustomButton from '../../../../components/CustomButton';

const UploadTemplate = ({
  fileUploaded,
  fileInputRef,
  handleFileChange,
  handleButtonClick,
  fileName,
  deleteBtn,
  onSubmit,
  downloadTemplate,
  CONTENT,
}) => {
  return (
    <div className="p-5">
      <div className="border border-blueHaze rounded-lg w-full">
        <div className="text-sm bg-linkWater p-4 flex rounded-lg justify-center">
          <span className="flex flex-col xl:flex-row text-fiord font-medium">
            {CONTENT.SUB_HEADER}
            <button className="flex text-denim underline flex-nowrap sm:justify-center" onClick={downloadTemplate}>
              <span className="mr-2 xl:mx-2">
                <DownloadLogo />
              </span>
              {CONTENT.BUTTON_TEXT}
            </button>
          </span>
        </div>
        <div className="flex justify-center mt-6">{!fileUploaded ? <DocumentIconGray /> : <DocumentIconGreen />}</div>
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
                {fileName} <span className="text-blueHaze mx-1">|</span>
                <button className="text-sm text-denim underline" onClick={deleteBtn}>
                  Delete
                </button>
              </div>
            )}
            <div className="text-xs text-fiord my-3">{CONTENT.FILE_UPLOAD_TEXT}</div>
            <div className="my-5">
              <CustomButton onClick={onSubmit} disabled={!fileUploaded}>
                {CONTENT.UPLOAD_BUTTON_TEXT}
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadTemplate;
