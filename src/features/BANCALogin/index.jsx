import React, { useEffect, useState } from 'react';
import useGetBancaLoginData from './hooks/useGetBancaLoginData';
import { Box, Card, CardContent, Grid, Switch, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import useGetUserData from './hooks/useGetUserData';
import useGetProducerData from './hooks/useGetProducerData';
import { FieldDataList, labels } from './constants';
import useCreateBancaField from './hooks/useCreateBancaField';
import useUpdateBancaField from './hooks/useUpdateBancaField';
import 'dayjs/locale/en-gb';
import CustomButton from '../../components/CustomButton';
import CustomFormHeader from '../../components/CustomFormHeader';
import { COMMON_WORDS, FORM_HEADER_TEXT } from '../../utils/constants';
import usePermissions from '../../hooks/usePermission';
import CustomAutoCompleteWithoutCheckbox from '../../components/CustomAutoCompleteWithoutCheckbox';
import DateField from '../../components/CustomDateInput';

function BANCALogin() {
  const { data: bancaData, loading: bancaLoading, fetchData: bancaFetchData } = useGetBancaLoginData();
  const [fieldData, setFieldData] = useState(Object.values(FieldDataList).flat());
  const { canUpdate, canCreate } = usePermissions();

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

  const { handleSubmit, control, setValue, watch, formState: { errors }, clearErrors,  getValues, trigger } = useForm({
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

  const resetFields = () => {
    setValue('product', null);
    setValue('startDate', null);
    setValue('endDate', null);
    clearErrors();
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
            customHeader='true'
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <CustomAutoCompleteWithoutCheckbox
                name="producerCode"
                label="Producer Code"
                control={control}
                rules={{ required: 'Producer Code is required' }}
                options={userData || []}
                getOptionLabel={(option) =>
                  `${option?.firstName} ${option?.lastName}`
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                error={Boolean(errors.producerCode)}
                helperText={errors.producerCode?.message}
                required={true}
                placeholder={COMMON_WORDS.SELECT}
                disableClearable={true}
                onChangeCallback={() => {
                  fetchData(getValues('producerCode')?.id);
                  resetFields();
                }}
                trigger={trigger}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomAutoCompleteWithoutCheckbox
                name="product"
                label="Products"
                control={control}
                rules={{ required: 'Product is required' }}
                options={producerList?.data || []}
                getOptionLabel={(option) => option.product}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                error={Boolean(errors.product)}
                helperText={errors.product?.message}
                required={true}
                placeholder={COMMON_WORDS.SELECT}
                trigger={trigger}
                disableClearable={true}
                onChangeCallback={() => {
                  if (watch('producerCode') && watch('product')) {
                    bancaFetchData(watch('producerCode').id, watch('product').id);
                  }
                  clearErrors();
                }}
              />
             
            </Grid>
            <Grid item xs={12} sm={6}>
              <DateField
                key="startDate"
                control={control}
                name="startDate"
                labelVisible={true}
                label="Start Date"
                errors={errors}
                classes="w-full text-red-600"
                setValue={setValue}
                watch={watch}
                isEdit={true}
                required={true}
                trigger={trigger}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <DateField
                key="endDate"
                control={control}
                name="endDate"
                labelVisible={true}
                label="End Date"
                errors={errors}
                classes="w-full text-red-600"
                setValue={setValue}
                watch={watch}
                isEdit={true}
                required={true}
                trigger={trigger}
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
