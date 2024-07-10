import React from "react";
import { Grid } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

const ConfirmContent = () => {
  return (
    <Grid container spacing={2} className="pt-4">
      <Grid item xs={12}>
        <div class="flex justify-center mb-3">
          <InfoIcon sx={{ fontSize: "64px", color: "#fd6262" }} />
        </div>
      </Grid>
      <Grid item xs={12}>
        <div class="text-base text-[#465465] text-center">
          Are you sure you want to change the group status?
        </div>
      </Grid>
    </Grid>
  );
};

export default ConfirmContent;
