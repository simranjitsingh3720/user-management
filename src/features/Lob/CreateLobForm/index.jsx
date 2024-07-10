import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid, IconButton, CardContent, Card, Box, Typography } from '@mui/material';
import { createLobData } from '../../../stores/slices/lobSlice';
import LeftArrow from '../../../assets/LeftArrow';
import CustomButton from '../../../components/CustomButton';
import InputField from '../../../components/CustomTextfield';
import UserTypeToggle from '../../../components/CustomRadioButtonGroup';
import { STATUS } from '../../../utils/globalConstants';

function CreateLobForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const createLoading = useSelector((state) => state.lob.createLoading);

  const { handleSubmit, control, formState } = useForm();
  const { errors } = formState;

  const onSubmit = (data) => {
    data.status === 'active' ? (data.status = true) : (data.status = false);
    dispatch(createLobData({ data, navigate }));
  };

  const formField = [
    {
      id: 'lob',
      label: 'LOB Name',
      value: 'lob',
      required: true,
      validation: {
        required: 'LOB Name is required',
      },
    },
    {
      id: 'lob_value',
      label: 'LOB Value',
      value: 'lob_value',
      required: true,
      validation: {
        required: 'LOB Value is required',
      },
    },
  ];

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} className="flex items-center">
              <IconButton aria-label="back" onClick={() => navigate('/lob')}>
                <LeftArrow />
              </IconButton>
              <Typography variant="h5" className="ml-3 font-semibold">
                Create New Lob
              </Typography>
            </Grid>

            {formField.map((item) => (
              <Grid item xs={12} md={6} lg={4} key={item.value}>
                <InputField
                  key={item?.id}
                  id={item?.id}
                  required={item?.required}
                  label={item?.label}
                  validation={item?.validation}
                  control={control}
                  errors={errors}
                  disabled={item?.disabled}
                  classes="w-full"
                />
              </Grid>
            ))}

            <Grid item xs={12} md={6} lg={4}>
              <UserTypeToggle
                menuItem={STATUS}
                label="LOB Status"
                required={true}
                control={control}
                name="status"
                defaultValue="active"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <div className="flex items-center mt-4">
        <CustomButton type="submit" variant="contained" disabled={createLoading}>
          Submit
        </CustomButton>
      </div>
    </Box>
  );
}

export default CreateLobForm;
