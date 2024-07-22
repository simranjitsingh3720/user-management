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

const formConfig = [
  {
    name: 'houseBankCode',
    label: 'House Bank Code',
    placeholder: 'Enter House Bank Code',
    rules: {
      required: 'House Bank Code is required',
      pattern: {
        value: REGEX.numericRegex,
        message: 'Only numeric values are allowed',
      },
    },
  },
  {
    name: 'bankCode',
    label: 'Bank Code',
    placeholder: 'Enter Bank Code',
    rules: {
      required: 'Bank Code is required',
      pattern: {
        value: REGEX.bankCodeRegex,
        message: 'Invalid Bank Code format',
      },
    },
  },
  {
    name: 'branchName',
    label: 'Branch Name',
    placeholder: 'Enter Branch Name',
    rules: {
      required: 'Branch Name is required',
    },
  },
  {
    name: 'accountNumber',
    label: 'Account Number',
    placeholder: 'Enter Account Number',
    rules: {
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
    },
    disabled: true,
  },
];

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
      const { houseBankCode, bankCode, branchName, accountNumber } = houseBankByID?.data;
      setValue('houseBankCode', houseBankCode || '');
      setValue('bankCode', bankCode || '');
      setValue('branchName', branchName || '');
      setValue('accountNumber', accountNumber || '');
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
            {formConfig.map((fieldConfig, index) => (
              <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                <span className="text-gray-600 text-sm required-field">{fieldConfig.label}</span>
                <Controller
                  name={fieldConfig.name}
                  control={control}
                  defaultValue=""
                  rules={fieldConfig.rules}
                  render={({ field }) => (
                    <TextField
                      id={fieldConfig.name}
                      variant="outlined"
                      placeholder={fieldConfig.placeholder}
                      size="small"
                      className="bg-white w-full text-sm h-10"
                      error={!!errors[fieldConfig.name]}
                      helperText={errors[fieldConfig.name] ? errors[fieldConfig.name].message : ''}
                      FormHelperTextProps={{ className: 'ml-0' }}
                      {...field}
                      value={field.value || ''}
                      onChange={(e) => {
                        field.onChange(e);
                        trigger(fieldConfig.name);
                      }}
                      disabled={fieldConfig.disabled && !!id}
                    />
                  )}
                />
              </Grid>
            ))}
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
