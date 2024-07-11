import { Divider, Grid, IconButton, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LeftArrow from '../../assets/LeftArrow';
import CustomButton from '../CustomButton';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

function CustomFormHeader({ id, handleReset, navigateRoute, headerText, hideReset, subHeading }) {
  const navigate = useNavigate();

  return (
    <Grid item xs={12}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={8}>
          <div className="flex items-center">
            {navigateRoute && (
              <IconButton
                aria-label="back"
                onClick={() => {
                  navigate(navigateRoute);
                }}
              >
                <LeftArrow />
              </IconButton>
            )}
            <div>
              <Typography variant="h6" noWrap fontWeight={600} color="#465465">
                {id ? `Update ${headerText}` : `Create New ${headerText}`}
              </Typography>
              {subHeading && (
                <Typography variant="body2" color="textSecondary">
                  {subHeading || ''}
                </Typography>
              )}
            </div>
          </div>
        </Grid>
        {!hideReset && (
          <Grid
            item
            xs={4}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <CustomButton variant="outlined" startIcon={<RestartAltIcon />} onClick={handleReset}>
              Reset
            </CustomButton>
          </Grid>
        )}
      </Grid>
      <Divider style={{ margin: '1rem 0' }} />
    </Grid>
  );
}

export default CustomFormHeader;
