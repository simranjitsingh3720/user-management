import React, { useState, useEffect } from 'react';
import { Box, TableCell, TableRow, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useGetPartnerNeft from './hooks/useGetPartnerNeft';
import CustomTable from '../../components/CustomTable';
import { Header } from './utils/header';
import CustomButton from '../../components/CustomButton';

const PartnerNeft = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const { getPartnerNeft, partnerNeftData, partnerNeftLoading, totalCount } = useGetPartnerNeft();

  useEffect(() => {
    getPartnerNeft({ searchString: searchQuery, sortKey: orderBy, sortOrder: order, pageNo: page, pageSize });
  }, [searchQuery, orderBy, order, page, pageSize, getPartnerNeft]);

  const createNeftForm = () => {
    navigate("/partner-neft/form");
  };

  const updateNeftForm = (row) => {
    navigate("/partner-neft/form/" + row.id);
  };

  const header = Header(updateNeftForm);

  const customExtraHeader = (
    <TableRow>
      <TableCell colSpan={header.length + 1}>
        <div className="flex justify-between w-100">
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <CustomButton type="submit" onClick={createNeftForm}>
            Create New NEFT Flag
          </CustomButton>
        </div>
      </TableCell>
    </TableRow>
  );

  return (
    <Box>
      <CustomTable
        rows={partnerNeftData}
        columns={header}
        customExtraHeader={customExtraHeader}
        loading={partnerNeftLoading}
        totalCount={totalCount}
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
};

export default PartnerNeft;
