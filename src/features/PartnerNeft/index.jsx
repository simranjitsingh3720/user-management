import { Box, TableCell, TableRow, TextField } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetPartnerNeft from "./hooks/useGetPartnerNeft";
import CustomTable from "../../components/CustomTable";
import { Header } from "./utils/header";
import CustomButton from "../../components/CustomButton";

const PartnerNeft = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { partnerNeftData, partnerNeftLoading, totalCount } = useGetPartnerNeft();
  
  const createNeftForm = () => {
    navigate("/partner-neft/form");
  };
  const udpateNeftForm = (row) => {
    navigate("/partner-neft/form/" + row.id);
  };

  const filteredData = useMemo(() => {
    return partnerNeftData.filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [partnerNeftData, searchQuery]);
  
  const header = Header(udpateNeftForm);

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
        rows={filteredData}
        columns={header}
        customExtraHeader={customExtraHeader}
        loading={partnerNeftLoading}
        totalCount={totalCount}
      />
    </Box>
  );
};

export default PartnerNeft;
