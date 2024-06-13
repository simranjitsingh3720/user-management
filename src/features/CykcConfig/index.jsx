import React, { useState } from "react";
import CustomTable from "../../components/CustomTable";
import generateTableHeaders from "./utils/generateTableHeaders";
import useGetHouseBank from "../HouseBankMaster/hooks/useGetHouseBank";
import { useNavigate } from "react-router-dom";

function CykcConfig() {
  const [rowsPage, setRowsPage] = useState(10);

  const [pageChange, setPageChange] = useState(1);
  const { data, loading, sort, setSort, fetchData } = useGetHouseBank(
    pageChange,
    rowsPage
  );

  const navigate = useNavigate();

  const handleEditClick = (row) => {
    navigate(`/ckyc-config/form/${row.id}`);
  };

  const HEADER_COLUMNS = generateTableHeaders(handleEditClick);

  return (
    <div>
      <CustomTable
        columns={HEADER_COLUMNS}
        rows={data?.data || []}
        loading={loading}
      />
    </div>
  );
}

export default CykcConfig;
