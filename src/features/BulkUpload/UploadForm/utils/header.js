
import DownloadLogo from "../../../../assets/DownloadLogo";

export const Header = () => {
  return [
    { value: "File Name", id: "fileName" },
    { value: "Upload Date And Time", id: "fileUploadDateTime", sortable: true },
    { value: "Sync Date And Time", id: "fileSyncDateTime", sortable: true },
    { value: "Total Uploads", id: "totalUploadedFields", sortable: true },
    { value: "Failed Uploads", id: "totalFailedUploads", sortable: true},
  ];
};
