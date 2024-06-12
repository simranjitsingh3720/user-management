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
            data.map((item) => {
              if (item.id === row.id) {
                return row.checked = !row.checked;
              }

              return row.checked;
            });
            handleDataUpdate(data);
            const allActive = revalidationList.every((row) => row.checked);
            setSelectAll(allActive);
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
  }, [revalidationList, selectAll]);

  const handleSelectAllChange = (event) => {
    const updatedList = revalidationList.map((item) => {
      item.checked = event.target.checked;
      return item;
    });

    handleDataUpdate(updatedList);
    const allActive = updatedList.every((row) => row.checked);
    setSelectAll(allActive);
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
          label={!selectAll ? "Select All (Active)" : "Select All (Inactive)"}
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
