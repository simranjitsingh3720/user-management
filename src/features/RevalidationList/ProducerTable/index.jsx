import React from "react";
import useRevalidationList from "../hooks/useRevalidationList";
import CustomTable from "../../../components/CustomTable";

const ProducerTable = ({ revalidationList, revalidationListLoading }) => {
  const { revalidationListUpdateData } = useRevalidationList();

  const HEADER_COLUMNS = [
    {
      id: "name",
      value: "User Name",
      sortable: true,
    },
    {
      id: "emailId",
      value: "Email ID",
      sortable: true,
    },
    {
      id: "mobileNo",
      value: "Mobile Number",
      sortable: true,
    },
    {
      id: "action",
      value: "Action",
      action: [
        {
          component: "switch",
          selectAll: true,
          onClick: (data, row) => {
            data.map((item) => {
              if (item.id === row.id) {
                row.checked = !row.checked;
              }
            });
            handleDataUpdate(data);
          },
        },
      ],
    },
  ];

  const handleDataUpdate = (updatedData) => {
    revalidationListUpdateData(updatedData);
  };

  return (
    <div className="mt-8">
      <CustomTable columns={HEADER_COLUMNS} rows={revalidationList} loading={revalidationListLoading} />
    </div>
  );
};

export default ProducerTable;
