import { Box, Card, CardContent, Grid, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import useUpdatePaymentConfig from '../hooks/useUpdateHouseBank';
import useCreateHouseBank from '../hooks/useCreateHouseBank';
import useGetHouseBankByID from '../hooks/useGetHouseBankById';
import CustomButton from '../../../components/CustomButton';
import { REGEX } from '../../../utils/globalConstants';
import CustomFormHeader from '../../../components/CustomFormHeader';
import { FORM_HEADER_TEXT } from '../../../utils/constants';

function HouseBankMasterForm() {
  const { id } = useParams();

  const { handleSubmit, control, setValue, formState, trigger, reset } = useForm({
    defaultValues: {
      houseBankCode: '',
      bankCode: '',
      branchName: '',
      accountNumber: '',
    },
  });

  const { data: houseBankByID, fetchData: fetchHouseBankByID } = useGetHouseBankByID();

  useEffect(() => {
    if (id) fetchHouseBankByID(id);
  }, [id]);

  const { postData, loading: createPaymentLoading } = useCreateHouseBank();

  const { UpdateDataFun, updateLoading } = useUpdatePaymentConfig();

  const { errors } = formState;

  useEffect(() => {
    if (houseBankByID && houseBankByID?.data) {
      setValue('houseBankCode', houseBankByID?.data?.houseBankCode || '');
      setValue('bankCode', houseBankByID?.data?.bankCode || '');
      setValue('branchName', houseBankByID?.data?.branchName || '');
      setValue('accountNumber', houseBankByID?.data?.accountNumber || '');
    }
  }, [houseBankByID]);

  const onSubmit = (data) => {
    if (id) {
      const payload = {
        id: id,
        properties: {
          houseBankCode: Number(data?.houseBankCode),
          bankCode: data?.bankCode,
          branchName: data?.branchName,
        },
      };
      UpdateDataFun(payload);
    } else {
      const payload = {
        houseBankCode: Number(data?.houseBankCode),
        bankCode: data?.bankCode,
        branchName: data?.branchName,
        accountNumber: data?.accountNumber,
      };
      postData(payload);
    }
  };

  const handleReset = () => {
    reset({
      houseBankCode: '',
      bankCode: '',
      branchName: '',
      accountNumber: '',
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <CustomFormHeader
            id={id}
            headerText={FORM_HEADER_TEXT.HOUSE_BANK}
            navigateRoute="/house-bank-master"
            handleReset={handleReset}
          />
          <Grid container spacing={3} className="pb-5">
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <span className="text-gray-600 text-sm required-field">House Bank Code</span>
              <Controller
                name="houseBankCode"
                control={control}
                defaultValue=""
                rules={{
                  required: 'House Bank Code is required',
                  pattern: {
                    value: REGEX.numericRegex,
                    message: 'Only numeric values are allowed',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    id="houseBankCode"
                    variant="outlined"
                    placeholder="Enter House Bank Code"
                    size="small"
                    className="bg-white w-full text-sm h-10"
                    error={!!errors.houseBankCode}
                    helperText={errors.houseBankCode ? errors.houseBankCode.message : ''}
                    FormHelperTextProps={{ className: 'ml-0' }}
                    {...field}
                    value={field.value || ''}
                    onChange={(e) => {
                      field.onChange(e);
                      trigger('houseBankCode');
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <span className="text-gray-600 text-sm required-field">Bank Code</span>
              <Controller
                name="bankCode"
                control={control}
                defaultValue=""
                rules={{
                  required: 'Bank Code is required',
                  pattern: {
                    value: REGEX.bankCodeRegex,
                    message: 'Invalid Bank Code format',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    id="bankCode"
                    variant="outlined"
                    placeholder="Enter Bank Code"
                    size="small"
                    className="bg-white w-full text-sm h-10"
                    error={!!errors.bankCode}
                    helperText={errors.bankCode ? errors.bankCode.message : ''}
                    FormHelperTextProps={{ className: 'ml-0' }}
                    {...field}
                    value={field.value || ''}
                    onChange={(e) => {
                      field.onChange(e);
                      trigger('bankCode');
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <span className="text-gray-600 text-sm required-field">Branch Name</span>
              <Controller
                name="branchName"
                control={control}
                defaultValue=""
                rules={{ required: 'Branch Name is required' }}
                render={({ field }) => (
                  <TextField
                    id="branchName"
                    variant="outlined"
                    placeholder="Enter Branch Name"
                    size="small"
                    className="bg-white w-full text-sm h-10"
                    error={!!errors.branchName}
                    helperText={errors.branchName ? errors.branchName.message : ''}
                    FormHelperTextProps={{ className: 'ml-0' }}
                    {...field}
                    value={field.value || ''}
                    onChange={(e) => {
                      field.onChange(e);
                      trigger('branchName');
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <span className="text-gray-600 text-sm required-field">Account Number</span>
              <Controller
                name="accountNumber"
                control={control}
                defaultValue=""
                rules={{
                  required: 'Account Number is required',
                  pattern: {
                    value: REGEX.numericRegex,
                    message: 'Only numeric values are allowed',
                  },
                  minLength: {
                    value: 9,
                    message: 'Account Number must be at least 9 digits long',
                  },
                  maxLength: {
                    value: 18,
                    message: 'Account Number must be at most 18 digits long',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    id="accountNumber"
                    variant="outlined"
                    disabled={!!id}
                    placeholder="Enter Account Number"
                    size="small"
                    className="bg-white w-full text-sm h-10"
                    error={!!errors.accountNumber}
                    helperText={errors.accountNumber ? errors.accountNumber.message : ''}
                    FormHelperTextProps={{ className: 'ml-0' }}
                    {...field}
                    value={field.value || ''}
                    onChange={(e) => {
                      field.onChange(e);
                      trigger('accountNumber');
                    }}
                  />
                )}
              />
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

export default HouseBankMasterForm;
