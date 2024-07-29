import React, { useEffect, useRef, useState } from 'react';
import useGetBancaLoginData from './hooks/useGetBancaLoginData';
import { Autocomplete, Box, Card, CardContent, Grid, Switch, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import useGetUserData from './hooks/useGetUserData';
import useGetProducerData from './hooks/useGetProducerData';
import { FieldDataList, labels } from './constants';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import useCreateBancaField from './hooks/useCreateBancaField';
import useUpdateBancaField from './hooks/useUpdateBancaField';
import 'dayjs/locale/en-gb';
import CustomButton from '../../components/CustomButton';
import CustomFormHeader from '../../components/CustomFormHeader';
import { FORM_HEADER_TEXT } from '../../utils/constants';
import usePermissions from '../../hooks/usePermission';

function BANCALogin() {
  const [fileName, setFileName] = useState('');

  const { data: bancaData, loading: bancaLoading, fetchData: bancaFetchData } = useGetBancaLoginData();
  const [fieldData, setFieldData] = useState(Object.values(FieldDataList).flat());
  const { canUpdate, canCreate } = usePermissions();

  const inputFileRef = useRef(null);

  const handleButtonClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleEnableChange = (value) => {
    setFieldData(() => {
      const newFieldData = [...fieldData];
      newFieldData.forEach((item) => {
        if (item.value === value) {
          item.Enable = !item.Enable;
          item.Mandatory = false;
        }
      });
      return newFieldData;
    });
  };

  const handleMandatoryChange = (value) => {
    setFieldData(() => {
      const newFieldData = [...fieldData];
      newFieldData.forEach((item) => {
        if (item.value === value) {
          item.Mandatory = !item.Mandatory;
        }
      });
      return newFieldData;
    });
  };

  const { handleSubmit, control, setValue, watch, formState, getValues } = useForm({
    defaultValues: {
      producerCode: null,
      product: null,
      startDate: null,
      endDate: null,
    },
  });

  const { userData } = useGetUserData();

  const { producerList, fetchData } = useGetProducerData();

  useEffect(() => {
    if (bancaData && bancaData?.data && bancaData?.data?.fields) {
      const result = Object.keys(bancaData?.data?.fields).map((key) => ({
        label: labels[key],
        value: key,
        Enable: bancaData?.data?.fields[key].require,
        Mandatory: bancaData?.data?.fields[key].mandatory,
      }));
      setFieldData(result);
      setValue('startDate', dayjs(bancaData?.data?.startDate, 'DD/MM/YYYY').format('DD/MM/YYYY'));
      setValue('endDate', dayjs(bancaData?.data?.endDate, 'DD/MM/YYYY').format('DD/MM/YYYY'));
    }
  }, [bancaData]);

  const { errors } = formState;

  const resetFields = () => {
    setValue('product', null);
    setValue('startDate', null);
    setValue('endDate', null);
    setFieldData((prevFieldData) =>
      prevFieldData.map((field) => ({
        ...field,
        Enable: false,
        Mandatory: false,
      }))
    );
  };

  const { postData, loading: createBancaLoding } = useCreateBancaField();
  const { updateData, loading: updateBancaLoding } = useUpdateBancaField();

  const onSubmit = (data) => {
    if (bancaData && bancaData?.data) {
      const result = {};
      fieldData.forEach(({ value, Enable, Mandatory }) => {
        result[value] = {
          require: Enable,
          mandatory: Mandatory,
        };
      });
      const payload = {
        id: bancaData.data.id,
        properties: {
          fields: result,
          startDate: data.startDate,
          endDate: data.endDate,
          status: true,
        },
      };

      updateData(payload);
    } else {
      const result = {};
      fieldData.forEach(({ value, Enable, Mandatory }) => {
        result[value] = {
          require: Enable,
          mandatory: Mandatory,
        };
      });

      const payload = {
        producerId: data.producerCode.id,
        productId: data.product.id,
        startDate: data.startDate,
        endDate: data.endDate,
        fields: result,
      };

      postData(payload);
    }
  };

  const handleResetButton = () => {
    setValue('producerCode', null);
    setValue('product', null);
    setValue('startDate', null);
    setValue('endDate', null);
    setFieldData((prevFieldData) =>
      prevFieldData.map((field) => ({
        ...field,
        Enable: false,
        Mandatory: false,
      }))
    );
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <CustomFormHeader
            handleReset={handleResetButton}
            headerText={FORM_HEADER_TEXT.BANCA_FIELDS}
            subHeading="Fill in the mandatory information to modify the Banca fields."
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="producerCode"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Autocomplete
                    id="producerCode"
                    options={userData || []}
                    getOptionLabel={(option) =>
                      `${option?.firstName?.toUpperCase()} ${option?.lastName?.toUpperCase()}`
                    }
                    size="small"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Producer Code"
                        variant="outlined"
                        error={!!errors.producerCode}
                        helperText={errors.producerCode ? 'This field is required' : ''}
                      />
                    )}
                    value={field.value}
                    onChange={(event, newValue) => {
                      field.onChange(newValue);
                      if (newValue) {
                        fetchData(newValue?.id);
                        resetFields();
                      }
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="product"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Autocomplete
                    id="product"
                    options={producerList?.data || []}
                    getOptionLabel={(option) => option.product}
                    size="small"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Product"
                        variant="outlined"
                        error={!!errors.product}
                        helperText={errors.product ? 'This field is required' : ''}
                      />
                    )}
                    value={field.value}
                    onChange={(event, newValue) => {
                      field.onChange(newValue);
                      if (watch('producerCode') && watch('product')) {
                        bancaFetchData(watch('producerCode').id, watch('product').id);
                      }
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="startDate"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                    <DatePicker
                      label="Start Date"
                      value={field.value ? dayjs(field.value, 'DD/MM/YYYY') : null}
                      minDate={dayjs()}
                      onChange={(date) => {
                        const formattedDate = dayjs(date).format('DD/MM/YYYY');
                        setValue('startDate', formattedDate);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          error={!!errors.startDate}
                          helperText={errors.startDate ? 'This field is required' : ''}
                        />
                      )}
                    />
                  </LocalizationProvider>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="endDate"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                    <DatePicker
                      label="End Date"
                      value={field.value ? dayjs(field.value, 'DD/MM/YYYY') : null}
                      minDate={dayjs()}
                      onChange={(date) => {
                        const formattedDate = dayjs(date).format('DD/MM/YYYY');
                        setValue('endDate', formattedDate);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          error={!!errors.endDate}
                          helperText={errors.endDate ? 'This field is required' : ''}
                        />
                      )}
                    />
                  </LocalizationProvider>
                )}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Grid container spacing={2} className='mt-4'>
        {fieldData.map((obj) => (
          <Grid item xs={12} md={6} key={obj.value}>
            <Card className='rounded-2xl'>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">{obj.label}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6} display={'flex'} alignItems={'center'}>
                    <Switch
                      checked={obj.Enable}
                      onChange={() => handleEnableChange(obj.value)}
                      inputProps={{ 'aria-label': 'toggle button' }}
                    />
                    <Typography variant="body2">{obj.Enable ? 'Enabled' : 'Non Enabled'}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6} display={'flex'} alignItems={'center'}>
                    <Switch
                      checked={obj.Mandatory}
                      onChange={() => handleMandatoryChange(obj.value)}
                      inputProps={{ 'aria-label': 'toggle button' }}
                      disabled={!obj.Enable}
                    />
                    <Typography variant="body2">{obj.Mandatory ? 'Mandatory' : 'Non Mandatory'}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div style={{ marginTop: '16px' }}>
        <Typography variant="subtitle1">Partner Employee Code Master</Typography>
        <input
          type="file"
          ref={inputFileRef}
          style={{ display: 'none' }}
          onChange={(event) => {
            const file = event.target.files[0];
            if (file) {
              setFileName(file.name);
            }
          }}
        />
        <CustomButton
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          disabled={!fieldData.find((item) => item.value === 'partnerEmployeeCode')?.Enable}
          onClick={handleButtonClick}
        >
          Upload file
        </CustomButton>
        {fileName && <Typography variant="body2">{fileName}</Typography>}
      </div>
      {(canCreate || canUpdate) && (
        <div style={{ marginTop: '16px' }}>
          <CustomButton type="submit" variant="contained" disabled={updateBancaLoding || createBancaLoding}>
            Submit
          </CustomButton>
        </div>
      )}
    </Box>
  );
}

export default BANCALogin;
