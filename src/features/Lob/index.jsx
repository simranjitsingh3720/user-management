import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "../../components/CustomTable";
import { Header } from "./utils/header";
import { fetchLobData, updateLobData } from "../../stores/slices/lobSlice";
import CustomButton from "../../components/CustomButton";
import { useNavigate } from "react-router-dom";

const Lob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { lob, lobLoading } = useSelector((state) => state.lob);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [order, setOrder] = useState(null);
  const [orderBy, setOrderBy] = useState(null);
  const [lobData, setLobData] = useState([]);

  const createNewLob = () => {
    navigate("/lob/lob-form");
  };

  useEffect(() => {
    dispatch(
      fetchLobData({
        page,
        pageSize,
        order,
        orderBy,
      })
    );
  }, [dispatch, page, pageSize, order, orderBy]);

  const handleUpdate = useCallback(
    async (data) => {
      dispatch(updateLobData({ data: data }));
    },
    [dispatch]
  );

  useEffect(() => {
    if (lob.length === 0) return;

    const transformedData =
      lob?.data?.map((item) => ({
        ...item,
        checked: item.status,
      })) || [];
    setLobData(transformedData);
  }, [lob]);

  const header = useMemo(() => Header(handleUpdate), [handleUpdate]);

  return (
    <Box>
      <div className="flex justify-end">
        <CustomButton
          variant="contained"
          onClick={createNewLob}
          sx={{ textTransform: "none" }}
        >
          Create New LOB
        </CustomButton>
      </div>
      <div className="mt-4">
        <CustomTable
          rows={lobData || []}
          columns={header}
          loading={lobLoading}
          totalCount={lob?.totalCount || 0}
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
