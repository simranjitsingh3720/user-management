import React, { useState, useEffect, useMemo } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "../../components/CustomTable";
import { Header } from "./utils/header";
import { fetchLobData } from "../../stores/slices/lobSlice";

const Lob = () => {
  const dispatch = useDispatch();
  const { allLob, lobLoading } = useSelector((state) => state.lob);
  
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [order, setOrder] = useState("");
  const [orderBy, setOrderBy] = useState("");

  useEffect(() => {
    dispatch(fetchLobData(true, false));
  }, [dispatch]);

  const header = useMemo(() => Header(), []);

  return (
    <Box>
      <div className="mt-4">
        <CustomTable
          rows={allLob?.data || []}
          columns={header}
          loading={lobLoading}
          totalCount={allLob?.totalCount || 0}
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
    </Box>
  );
};

export default Lob;