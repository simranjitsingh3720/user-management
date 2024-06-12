import React, { useEffect, useState } from "react";
import useRevalidationList from "../hooks/useRevalidationList";
import CustomTable from "../../../components/CustomTable";
import { Checkbox, FormControlLabel, TableCell, TableRow } from "@mui/material";

const ProducerTable = ({ revalidationList, revalidationListLoading }) => {
  const { revalidationListUpdateData } = useRevalidationList();
  const [selectAll, setSelectAll] = useState(false);

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
          onClick: (data, row) => {
            const updatedData = data.map((item) => 
              item.id === row.id ? { ...item, checked: !item.checked } : item
            );

            const allActive = updatedData.every((item) => item.checked);
            setSelectAll(allActive);
            handleDataUpdate(updatedData);
          },
        },
      ],
    },
  ];

  const handleDataUpdate = (updatedData) => {
    revalidationListUpdateData(updatedData);
  };

  useEffect(() => {
    const allActive = revalidationList.every((row) => row.checked);
    setSelectAll(allActive);
  }, [revalidationList]);

  const handleSelectAllChange = (event) => {
    const updatedList = revalidationList.map((item) => ({
      ...item,
      checked: event.target.checked,
    }));
    
    setSelectAll(event.target.checked);
    handleDataUpdate(updatedList);
  };

  const customExtraHeader = (
    <TableRow>
      <TableCell colSpan={HEADER_COLUMNS.length}>
        <FormControlLabel
          sx={{ display: "flex", justifyContent: "end" }}
          control={
            <Checkbox
              checked={selectAll}
              onChange={handleSelectAllChange}
              color="primary"
            />
          }
          label={selectAll ? "Select All (Inactive)" : "Select All (Active)"}
        />
      </TableCell>
    </TableRow>
  );

  return (
    <div className="mt-8">
      <CustomTable
        columns={HEADER_COLUMNS}
        rows={revalidationList}
        loading={revalidationListLoading}
        customExtraHeader={customExtraHeader}
      />
    </div>
  );
};

export default ProducerTable;
