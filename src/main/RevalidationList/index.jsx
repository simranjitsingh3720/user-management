import React from "react";
import ProducerForm from "./ProducerForm/index";
import ProducerTable from "./ProducerTable/index";
// import { Button } from "@mui/material";
// import DownloadIcon from "./../../assets/DownloadLogo";


const RevalidationList = () => {
  return (
    <div className="conatiner">
      <ProducerForm />
      <ProducerTable />

      {/* <Button
        variant="outlined"
        startIcon={<DownloadIcon />}
      >
        Export Data
      </Button> */}
    </div>
  );
};

export default RevalidationList;
