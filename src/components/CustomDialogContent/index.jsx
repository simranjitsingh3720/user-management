import React from 'react';
import { Grid } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { getDialogContent } from '../../utils/globalizationFunction';

const Content = ({ label }) => {
  return (
    <Grid container spacing={2} className="pt-4">
      <Grid item xs={12}>
        <div class="flex justify-center mb-3">
          <InfoIcon sx={{ fontSize: '40px', color: '#fd6262' }} />
        </div>
      </Grid>
      <Grid item xs={12}>
        <div class="text-base text-[#465465] text-center">{getDialogContent(label)}</div>
      </Grid>
    </Grid>
  );
};

export default Content;
