import React, { useEffect, useState } from "react";
import useGetHouseBank from "./hooks/useGetHealthConfig";
import SearchComponenet from "../../components/SearchComponent";
import CustomTable from "../../components/CustomTable";
import { useNavigate } from "react-router-dom";
import generateTableHeaders from "./utils/generateTableHeaders";
import { COMMON_WORDS } from "../../utils/constants";
import { BUTTON_TEXT, PAGECOUNT } from "../../utils/globalConstants";
import { getPlaceHolder } from "../../utils/globalizationFunction";
import { fetchUser } from "../../stores/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { setTableName } from "../../stores/slices/exportSlice";
import usePermissions from "../../hooks/usePermission";

function HealthConfiguration() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [producers, setProducers] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(PAGECOUNT);
  const [order, setOrder] = useState(COMMON_WORDS.ASC);
  const [orderBy, setOrderBy] = useState(COMMON_WORDS.CREATED_AT);

  const { data, loading, fetchData, totalCount } = useGetHouseBank(
    page,
    pageSize,
    order,
    orderBy
  );

  const {canUpdate, canCreate} = usePermissions();

  useEffect(() => {
    dispatch(
      fetchUser({
        userType: COMMON_WORDS.PRODUCER,
        searchKey: COMMON_WORDS.ROLE_NAME,
      })
    );
  }, [dispatch]);

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

  const navigate = useNavigate();

  const handleEditClick = (row) => {
    navigate(`/health-config/form/${row.id}`);
  };

  const HEADER_COLUMNS = generateTableHeaders(handleEditClick);

  useEffect(() => {
    if(data) {
      dispatch(setTableName(data[0]?.label));
    }
    
  }, [dispatch, data]);

  return (
    <div>
      <SearchComponenet
        optionsData={user?.data || []}
        option={producers}
        setOption={setProducers}
        fetchData={fetchData}
        optionLabel={optionLabel}
        placeholder={getPlaceHolder(COMMON_WORDS.PRODUCER)}
        renderOptionFunction={renderOptionFunction}
        buttonText={BUTTON_TEXT.HEALTH_CONFIG}
        navigateRoute={"/health-config/form"}
        handleGo={handleGo}
        showButton
        showExportButton={true}
        canCreate={canCreate}
      />
      <div className="mt-4">
        <CustomTable
          columns={HEADER_COLUMNS}
          rows={data || []}
          loading={loading}
          totalCount={totalCount || 0}
          page={page}
          setPage={setPage}
          rowsPerPage={pageSize}
          setRowsPerPage={setPageSize}
          order={order}
          setOrder={setOrder}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          canUpdate={canUpdate}
        />
      </div>
    </div>
  );
}

export default HealthConfiguration;
