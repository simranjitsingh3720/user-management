import React, { useEffect } from 'react';
import {
  Autocomplete,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import useUpdatePaymentConfig from '../hooks/useUpdateHealthConfig';
import { BitlyLinkMandatory } from '../constants';
import useGetUserData from '../../BANCALogin/hooks/useGetUserData';
import useCreateHealthConfig from '../hooks/useCreateHealthConfig';
import useGetHealthConfigByID from '../hooks/useGetHealthConfigById';
import CustomFormHeader from '../../../components/CustomFormHeader';
import { FORM_HEADER_TEXT } from '../../../utils/constants';
import CustomButton from '../../../components/CustomButton';

function HealthConfigurationForm() {
  const { id } = useParams();

  const { handleSubmit, control, setValue, formState } = useForm({
    defaultValues: {
      producer: null,
      medicare: null,
    },
  });

  const { data: healthConfigData, fetchData: fetchHealthConfigByID } = useGetHealthConfigByID();
  const { userData } = useGetUserData();

  useEffect(() => {
    if (id) fetchHealthConfigByID(id);
  }, [id]);

  const { postData, loading: createPaymentLoading } = useCreateHealthConfig();
  const { UpdateDataFun, updateLoading } = useUpdatePaymentConfig();
  const { errors } = formState;

  useEffect(() => {
    if (healthConfigData && healthConfigData?.data) {
      setValue('producer', healthConfigData?.data?.producer || null);
      setValue('medicare', healthConfigData?.data?.isExistingCustomer ? 'yes' : 'no' || null);
    }
  }, [healthConfigData]);

  const onSubmit = (data) => {
    if (id) {
      const payload = {
        id: id,
        properties: {
          status: true,
          isExistingCustomer: data?.medicare === 'yes' ? true : false,
        },
      };
      UpdateDataFun(payload);
    } else {
      const payload = {
        producerId: data?.producer?.id,
        isExistingCustomer: data?.medicare === 'yes' ? true : false,
      };
      postData(payload);
    }
  };

  const handleReset = () => {
    if (!id) {
      setValue('producer', null);
    }
    setValue('medicare', null);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <CustomFormHeader
            id={id}
            headerText={FORM_HEADER_TEXT.HEALTH_CONFIG}
            navigateRoute="/health-config"
            handleReset={handleReset}
          />
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} md={12} lg={4}>
              <Typography variant="h6">Select Producer</Typography>
              <Controller
                name="producer"
                control={control}
                rules={{ required: 'Producer is required' }}
                render={({ field }) => (
                  <Autocomplete
                    options={userData || []}
                    getOptionLabel={(option) => `${option.firstName.toUpperCase()} ${option.lastName.toUpperCase()}`}
                    disabled={Boolean(id)}
                    size="small"
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => <TextField {...params} placeholder="Select" />}
                    value={field.value}
                    onChange={(event, newValue) => field.onChange(newValue)}
                    renderOption={(props, option) => (
                      <li {...props} key={option.id}>
                        {option.firstName.toUpperCase()} {option.lastName.toUpperCase()}
                      </li>
                    )}
                  />
                )}
              />
              {errors.producer && <Typography color="error">{errors.producer.message}</Typography>}
            </Grid>
            <Grid item xs={12} md={12} lg={8}>
              <Typography variant="h6">Medicare Existing TATA AIG General Insurance Customer</Typography>
              <Controller
                name="medicare"
                control={control}
                rules={{ required: 'This field is required' }}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onChange={(event) => field.onChange(event.target.value)}
                    size="small"
                    displayEmpty
                    className='w-1/2'
                    renderValue={(selected) => {
                      if (!selected) return <Typography color="textSecondary">Select</Typography>;
                      const selectedItem = BitlyLinkMandatory.find((item) => item.value === selected);
                      return selectedItem ? selectedItem.label : '';
                    }}
                  >
                    {BitlyLinkMandatory.map((item) => (
                      <MenuItem key={item.value} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.medicare && <Typography color="error">{errors.medicare.message}</Typography>}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <div className="mt-4">
        <CustomButton type="submit" variant="contained" disabled={updateLoading || createPaymentLoading}>
          {id ? 'Update' : 'Submit'}
        </CustomButton>
      </div>
    </Box>
  );
}

export default HealthConfigurationForm;
