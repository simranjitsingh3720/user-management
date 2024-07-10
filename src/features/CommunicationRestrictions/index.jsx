import { Box, TableCell, TableRow } from "@mui/material";
import CustomTable from "../../components/CustomTable";
import CustomButton from "../../components/CustomButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Header } from "./utils/header";
import DownloadIcon from "../../assets/DownloadLogo";
import CustomSearchField from "../../components/CustomSearchField";

function CommunicationRestrictions() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');

  const createRestrictionsForm = () => {
    navigate("/communication-restrictions/communication-restrictions-form");
  };

  const header = Header();

  const customExtraHeader = (
    <TableRow>
      <TableCell colSpan={header.length + 1}>
        <div className="flex justify-between">
          <CustomSearchField
            searchValue={searchQuery}
            setSearchValue={setSearchQuery}
            placeholder="Search Type Of User, Name, Email ID, Mobile No. Etc"
            classes="lg:w-1/3 xl:w-1/2"
          />
          <div className="flex">
            <CustomButton
              variant="outlined"
              startIcon={<DownloadIcon />}
              className="capitalize"
            >
              Download Data
            </CustomButton>
            <CustomButton type="submit" onClick={createRestrictionsForm}>
              Create New Restrictions
            </CustomButton>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );

  return (
    <Box>
      <CustomTable
        rows={[]}
        columns={header}
        customExtraHeader={customExtraHeader}
        loading={false}
        totalCount={0}
        page={page}
        setPage={setPage}
        rowsPerPage={pageSize}
        setRowsPerPage={setPageSize}
        order={order}
        setOrder={setOrder}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
      />
    </Box>
  );
}

export default CommunicationRestrictions;
