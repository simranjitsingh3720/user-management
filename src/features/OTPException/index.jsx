import React, { useState } from "react";
import SetOTPException from "./SetOTPException";
import OTPList from "./OTPList";
import useGetOTPException from "./hooks/useGetOTPException";
import { PAGECOUNT } from "../../utils/globalConstants";

function OTPException() {
  const [rowsPage, setRowsPage] = useState(PAGECOUNT);
  const [pageChange, setPageChange] = useState(1);
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState("type");
  const { data, loading, fetchData, setLoading, setSort, sort } =
    useGetOTPException(pageChange, rowsPage, query, searched);
  return (
    <div>
      <SetOTPException fetchData={fetchData} />
      <OTPList
        rowsPage={rowsPage}
        setRowsPage={setRowsPage}
        pageChange={pageChange}
        setPageChange={setPageChange}
        data={data}
        loading={loading}
        fetchData={fetchData}
        setLoading={setLoading}
        setSort={setSort}
        sort={sort}
        setQuery={setQuery}
        searched={searched}
        setSearched={setSearched}
      />
    </div>
  );
}

export default OTPException;
