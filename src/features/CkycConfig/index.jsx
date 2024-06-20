import React, { useState } from "react";
import CustomTable from "../../components/CustomTable";
import generateTableHeaders from "./utils/generateTableHeaders";
import useGetHouseBank from "../HouseBankMaster/hooks/useGetHouseBank";
import { useNavigate } from "react-router-dom";
import SearchComponenet from "../../components/SearchComponent";
import useGetUserData from "../../hooks/useGetUserData";
import { Box, Grid } from "@mui/material";

function CkycConfig() {
  const [rowsPage, setRowsPage] = useState(10);
  const [producers, setProducers] = useState([]);

  const [pageChange, setPageChange] = useState(1);
  const { data, loading, sort, setSort, fetchData } = useGetHouseBank(
    pageChange,
    rowsPage
  );

  const navigate = useNavigate();

  const handleEditClick = (row) => {
    navigate(`/ckyc-config/form/${row.id}`);
  };

  const { userData } = useGetUserData();

  const HEADER_COLUMNS = generateTableHeaders(handleEditClick);

  const optionLabel = (option) => {
    return `${option?.firstName?.toUpperCase()} ${option?.lastName?.toUpperCase()}`;
  };

  const renderOptionFunction = (props, option) => (
    <li {...props} key={option?.id}>
      {option?.firstName?.toUpperCase()} {option?.lastName?.toUpperCase()}
    </li>
  );

  const handleGo = () => {
    const resultProducersId = fetchIdsAndConvert(producers);
    fetchData(resultProducersId);
  };

  const fetchIdsAndConvert = (inputData) => {
    const ids = (inputData || []).map((producer) => producer.id);
    return ids.join();
  };

  return (
    <Box>
      <Grid container rowSpacing={0.5} direction="column">
        <SearchComponenet
          optionsData={userData || []}
          option={producers}
          setOption={setProducers}
          fetchData={fetchData}
          optionLabel={optionLabel}
          placeholder={"Search by Producer Name"}
          renderOptionFunction={renderOptionFunction}
          buttonText={"Create CKYC Configuration"}
          navigateRoute={"/ckyc-config/form"}
          handleGo={handleGo}
        />
        <CustomTable
          columns={HEADER_COLUMNS}
          rows={data?.data || []}
          loading={loading}
        />
      </Grid>
    </Box>
  );
}

export default CkycConfig;
