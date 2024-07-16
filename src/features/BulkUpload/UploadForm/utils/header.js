
import DownloadLogo from "../../../../assets/DownloadLogo";

export const Header = () => {
  return [
    { value: "S.No", id: "sNo" },
    { value: "File Name", id: "fileName" },
    { value: "Upload Date And Time", id: "uploadDateAndTime" },
    { value: "Sync Date And Time", id: "syncDateAndTime" },
    { value: "Total Uploads", id: "totalUploads" },
    { value: "Failed Uploads", id: "failedUploads", sortable: true},
    {
        id: "action",
        value: "Action",
        sortable: false,
        action: [
          {
            showIcon: true,
            iconName: <DownloadLogo />,
            onClick: (row) => {
            },
          }
        ],
      },
  ];
};
