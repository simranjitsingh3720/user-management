import React, { useState } from "react";
import SearchComponent from "./SearchComponent";
import Table from "./Table";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";
import styles from "./styles.module.scss";
import useGetPrivilege from "./hooks/useGetPrivilege";
import ListLoader from "../../components/ListLoader";
import TableHeader from "./Table/TableHeader";
import NoDataFound from "../../components/NoDataCard";
import { selectRowsData } from "../../utils/globalConstants";
import CustomTable from "../../components/CustomTable";
import generateTableHeaders from "./utils/generateTableHeaders";
import { COMMON_WORDS } from "../../utils/constants";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import CustomButton from "../../components/CustomButton";
import { useDispatch } from "react-redux";
import { showDialog } from "../../stores/slices/dialogSlice";

function getSelectedRowData(count) {
  // Initialize the selected row data array
  let selectedRowData = [];

  // Iterate over selectRowsData and add elements <= count
  for (let i = 0; i < selectRowsData.length; i++) {
    if (selectRowsData[i] <= count) {
      selectedRowData.push(selectRowsData[i]);
    }
  }

  return selectedRowData;
}

function PermissionModule() {
  const dispatch = useDispatch();

  const [rowsPage, setRowsPage] = useState(10);
  const [query, setQuery] = useState("");
  const [pageChange, setPageChange] = useState(1);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [order, setOrder] = useState(COMMON_WORDS.ASC);
  const [orderBy, setOrderBy] = useState(COMMON_WORDS.CREATED_AT);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickYes = () => {
    setOpen(false);
  };

  const { fetchData, data, loading, setLoading } = useGetPrivilege(
    page,
    pageSize,
    query,
    order,
    orderBy
  );

  // const handlePaginationChange = (event, page) => {
  //   setLoading(true);
  //   setPageChange(page);
  // };

  // const handleRowsChange = (event) => {
  //   setPageChange(1);
  //   setRowsPage(event.target.value);
  // };

  console.log("data", data);

  const handleClicked = (data, row) => {
    // setOpen(true);

    dispatch(
      showDialog({
        title: "Export Data",
        // content: <Content />,
        // actions: <Actions />,
      })
    );
  };

  const HEADER_COLUMNS = generateTableHeaders(handleClicked);

  return (
    <div>
      <SearchComponent
        setQuery={setQuery}
        setLoading={setLoading}
        setPageChange={setPageChange}
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

      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Change status
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <div className={styles.infoIconStyle}>
            <InfoIcon fontSize="x-large" className={styles.iconStyle} />
          </div>
          <span className={styles.styledText}>
            Are you sure you want to change the permission status?
          </span>

          <div className={styles.SubmitContainer}>
            <CustomButton variant="outlined" onClick={() => setOpen(false)}>
              No
            </CustomButton>
            <CustomButton variant="contained" onClick={() => handleClickYes()}>
              yes
            </CustomButton>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PermissionModule;
