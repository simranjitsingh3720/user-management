import { Box } from "@mui/material";
import React from "react";
import DynamicTable from "./DynamicTable";
import { useNavigate } from "react-router-dom";
import { TABLE_COLUMNS } from "./utils/constant";
import useGetPartnerNeft from "./hooks/useGetPartnerNeft";

const PartnerNeft = () => {
  const navigate = useNavigate();
  const { partnerNeftData, partnerNeftLoading } = useGetPartnerNeft();

  const createNeftForm = () => {
    navigate("/partner-neft/form");
  };
  const udpateNeftForm = (id) => {
    navigate("/partner-neft/form/" + id);
  };

  return (
    <Box>
      <DynamicTable
        columns={TABLE_COLUMNS}
        data={partnerNeftData}
        createNeftForm={createNeftForm}
        udpateNeftForm={udpateNeftForm}
        loading={partnerNeftLoading}
      />
    </Box>
  );
};

export default PartnerNeft;
