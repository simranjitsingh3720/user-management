import React from "react";
import styles from "./styles.module.scss";
import { IconButton } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import LeftArrow from "../../../assets/LeftArrow";
import CustomButton from "../../../components/CustomButton";
import DownloadLogo from "../../../assets/DownloadLogo";
import DocumentIconGray from "../../../assets/DocumentIconGray";

function UploadForm() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {},
  });

  const user = watch("typeOfUser");

  const onSubmit = (data) => {
    console.log(data);
  };

  const back = () => {
    navigate("/communication-restrictions");
  };

  const downloadTemplate = () => {
    console.log("Download template clicked");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.formMainContainer}
    >
      <div className={styles.createContainer}>
        <div className={styles.borderBottom}>
          <div className={`${styles.formHeaderStyle} flex flex-col`}>
            <div className={styles.subHeader}>
              <IconButton aria-label="back" onClick={back}>
                <LeftArrow />
              </IconButton>
              <span className={styles.headerTextStyle}>Bulk Upload</span>
            </div>
            <div className={styles.headerPara}>
              Please upload your master file to add it to the upload history
              table given below.
            </div>
          </div>
        </div>
        <div className="p-7">
          <div className="border border-blueHaze rounded-lg w-full">
            <div className="text-sm bg-linkWater p-4 flex rounded-lg">
              <span className="flex text-fiord font-medium">
                Please download and refer the template before uploading the
                file.{" "}
                <button className="flex text-denim underline" onClick={downloadTemplate}>
                  <span className="mx-2">
                    <DownloadLogo />
                  </span>
                  Download Template
                </button>
              </span>
            </div>
            <div className="flex justify-center mt-6">
              <DocumentIconGray></DocumentIconGray>
            </div>
            <div className="flex justify-center">
              <div className="text-center">
                <button className="text-sm text-denim underline mt-2">
                  Browse Files
                </button>
                <div className="text-xs text-fiord my-3">
                  Supported Formats: CSV, XLS | Maximum Size: 5 MB
                </div>
                <div className="my-5">
                  {" "}
                  <CustomButton>Upload</CustomButton>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.formContainer}></div>
      </div>
    </form>
  );
}

export default UploadForm;
