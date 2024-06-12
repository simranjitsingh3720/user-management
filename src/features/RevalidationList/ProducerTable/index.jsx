import React, { useEffect, useState } from "react";
import useRevalidationList from "../hooks/useRevalidationList";
import CustomTable from "../../../components/CustomTable";
import { Checkbox, FormControlLabel, TableCell, TableRow } from "@mui/material";
import generateTableHeaders from "../utils/generateTableHeaders";

const ProducerTable = ({ revalidationList, revalidationListLoading }) => {
  const { revalidationListUpdateData } = useRevalidationList();
  const [selectAll, setSelectAll] = useState(false);

  const handleDataUpdate = (updatedData) => {
    revalidationListUpdateData(updatedData);
  };

  const HEADER_COLUMNS = generateTableHeaders(
    handleDataUpdate,
    revalidationList,
    setSelectAll
  );

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
