import React, { useEffect, useState } from "react";
import SearchComponent from "../../components/SearchComponent";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../stores/slices/userSlice";
import { COMMON_WORDS } from "../../utils/constants";
import CustomTable from "../../components/CustomTable";
import generateTableHeaders from "./utils/generateTableHeaders";
import { getPlaceHolder } from "../../utils/globalizationFunction";
import { PAGECOUNT } from "../../utils/globalConstants";

function TermCondition() {
  const [date, setDate] = useState({ startDate: "", endDate: "" });
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [userData, setUserData] = useState();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(PAGECOUNT);
  const [order, setOrder] = useState(COMMON_WORDS.ASC);
  const [orderBy, setOrderBy] = useState(COMMON_WORDS.CREATED_AT);

  useEffect(() => {
    dispatch(
      fetchUser({
        userType: COMMON_WORDS.PRODUCER,
        searchKey: COMMON_WORDS.ROLE_NAME,
      })
    );
  }, [dispatch]);

  const HEADER_COLUMNS = generateTableHeaders();

  const optionLabelUser = (option) => {
    return option?.firstName
      ? `${option?.firstName?.toUpperCase()} ${option?.lastName?.toUpperCase()}`
      : "";
  };

  const renderOptionUserFunction = (props, option) => (
    <li {...props} key={option?.id}>
      {option?.firstName?.toUpperCase()} {""}
      {option?.lastName?.toUpperCase()}
    </li>
  );

  const handleGo = () => {
  };

  return (
    <div>
      <SearchComponent
        setDate={setDate}
        dateField
        optionsData={user?.data || []}
        option={userData}
        setOption={setUserData}
        optionLabel={optionLabelUser}
        placeholder={getPlaceHolder(COMMON_WORDS.USER)}
        renderOptionFunction={renderOptionUserFunction}
        handleGo={handleGo}
        showButton={false}
      />
      <div className="mt-4">
        <CustomTable
          columns={HEADER_COLUMNS}
          rows={[]}
          // loading={loading}
          // totalCount={data?.totalCount || 0}
          page={page}
          setPage={setPage}
          rowsPerPage={pageSize}
          setRowsPerPage={setPageSize}
          order={order}
          setOrder={setOrder}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
        />
      </div>
    </div>
  );
}

export default TermCondition;
