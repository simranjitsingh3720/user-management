import React, { useEffect, useState } from "react";
import useRevalidationList from "../hooks/useRevalidationList";
import CustomTable from "../../../components/CustomTable";
import { Checkbox, FormControlLabel, TableCell, TableRow } from "@mui/material";
import generateTableHeaders from "../utils/generateTableHeaders";

const ProducerTable = ({ revalidationList, revalidationListLoading }) => {
  const { revalidationListUpdateData } = useRevalidationList();
  const [selectAllActive, setSelectAllActive] = useState(false);
  const [selectAllInactive, setSelectAllInactive] = useState(false);

  const handleDataUpdate = (updatedData) => {
    revalidationListUpdateData(updatedData);
  };

  const HEADER_COLUMNS = generateTableHeaders(
    handleDataUpdate,
    revalidationList,
    setSelectAllActive,
    setSelectAllInactive
  );

  useEffect(() => {
    const allActive = revalidationList.every((row) => row.checked);
    const allInactive = revalidationList.every((row) => !row.checked);

    setSelectAllActive(allActive);
    setSelectAllInactive(allInactive);
  }, [revalidationList]);

  const handleSelectAllActiveChange = (event) => {
    const updatedList = revalidationList.map((item) => {
      if (!item.checked) {
        item.checked = event.target.checked;
      }
      return item;
    });

    handleDataUpdate(updatedList);
    setSelectAllActive(event.target.checked);
    setSelectAllInactive(false);
  };

  const handleSelectAllInactiveChange = (event) => {
    const updatedList = revalidationList.map((item) => {
      if (item.checked) {
        item.checked = !event.target.checked;
      }
      return item;
    });

    handleDataUpdate(updatedList);
    setSelectAllInactive(event.target.checked);
    setSelectAllActive(false);
  };

  const customExtraHeader = (
    <TableRow>
      <TableCell colSpan={HEADER_COLUMNS.length}>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectAllActive}
                onChange={handleSelectAllActiveChange}
                color="primary"
              />
            }
            label="All Active"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectAllInactive}
                onChange={handleSelectAllInactiveChange}
                color="primary"
              />
            }
            label="All Inactive"
          />
        </div>
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
