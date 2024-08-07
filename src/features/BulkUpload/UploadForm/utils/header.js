
import DownloadLogo from "../../../../assets/DownloadLogo";

export const Header = (handleDownloadFile) => {
  return [
    { value: "File Name", id: "fileName" },
    { value: "Uploaded By", id: "updatedBy" },
    { value: "Upload Date And Time", id: "fileUploadDateTime", sortable: true },
    { value: "Sync Date And Time", id: "fileSyncDateTime", sortable: true },
    { value: "Total Uploads", id: "totalUploadedFields", sortable: true },
    { value: "Failed Uploads", id: "totalFailedUploads", sortable: true},
    {
      id: "actionBulk",
      value: "Action",
      showIButton: true,
      action: [
        {
          showIcon: true,
          iconName: <DownloadLogo />,
          onClick: (row) => {
            handleDownloadFile(row);
          },
        },
      ],
    },
  ];
};
