import React, { useState } from "react";
import useGetPrivilege from "./hooks/useGetPrivilege";
import { BUTTON_TEXT } from "../../utils/globalConstants";
import CustomTable from "../../components/CustomTable";
import generateTableHeaders from "./utils/generateTableHeaders";
import { COMMON_WORDS } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { showDialog } from "../../stores/slices/dialogSlice";
import SearchComponent from "../../components/SearchComponent";
import { PrivilegeSearch } from "./constants";
import Content from "./Dialog/Content";
import Actions from "./Dialog/Action";
import CustomDialog from "../../components/CustomDialog";

function PermissionModule() {
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState("permissionName");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [order, setOrder] = useState(COMMON_WORDS.ASC);
  const [orderBy, setOrderBy] = useState(COMMON_WORDS.CREATED_AT);

  const { fetchData, data, loading } = useGetPrivilege(
    page,
    pageSize,
    query,
    order,
    orderBy
  );

  const handleClicked = (data, row) => {
    dispatch(
      showDialog({
        title: COMMON_WORDS.CHANGE_STATUS,
        content: <Content />,
        actions: <Actions row={row} fetchData={fetchData} />,
      })
    );
  };

  const HEADER_COLUMNS = generateTableHeaders(handleClicked);

  const handleGo = () => {
    fetchData(searched, query);
  };

  return (
    <div>
      <SearchComponent
        selectOptions={PrivilegeSearch}
        searched={searched}
        setSearched={setSearched}
        textField
        textFieldPlaceholder="Search"
        setQuery={setQuery}
        buttonText={BUTTON_TEXT.Permission}
        navigateRoute={"/permission/permission-form"}
        handleGo={handleGo}
      />
      <div className="mt-4">
        <CustomTable
          columns={HEADER_COLUMNS}
          rows={data || []}
          loading={loading}
          totalCount={data?.totalCount || 0}
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
      <CustomDialog />
    </div>
  );
}

export default PermissionModule;
