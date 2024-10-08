import { Box, Card, CardContent, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import useUpdatePaymentConfig from '../hooks/useUpdateHouseBank';
import useCreateHouseBank from '../hooks/useCreateHouseBank';
import useGetHouseBankByID from '../hooks/useGetHouseBankById';
import CustomButton from '../../../components/CustomButton';
import CustomFormHeader from '../../../components/CustomFormHeader';
import { FORM_HEADER_TEXT } from '../../../utils/constants';
import { REGEX } from '../../../utils/globalConstants';
import InputField from '../../../components/CustomTextfield';

const formConfig = [
  {
    name: 'houseBankCode',
    label: 'House Bank Code',
    validation: {
      required: true,
      pattern: {
        value: REGEX.numericRegex,
        message: 'Only numeric values are allowed',
      },
    },
  },
  {
    name: 'bankCode',
    label: 'Bank Code',
    validation: {
      required: true,
      pattern: {
        value: REGEX.bankCodeRegex,
        message: 'Invalid Bank Code format',
      },
    },
  },
  {
    name: 'branchName',
    label: 'Branch Name',
    validation: {
      required: true,
    },
  },
  {
    name: 'accountNumber',
    label: 'Account Number',
    validation: {
      required: true,
      validate: (value) => {
        if (!REGEX.numericRegex.test(value)) {
          return 'Only numeric values are allowed';
        } else if (value.length < 9) {
          return 'Account Number must be at least 9 digits long';
        } else if (value.length > 18) {
          return 'Account Number must be at most 18 digits long';
        }
        return true;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (id) {
      setValue('houseBankCode', '');
      setValue('bankCode', '');
      setValue('branchName', '');
    } else {
      reset({
        houseBankCode: '',
        bankCode: '',
        branchName: '',
        accountNumber: '',
      });
    }
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
                <InputField
                  id={fieldConfig.name}
                  label={fieldConfig.label}
                  required={!!fieldConfig.validation?.required}
                  validation={fieldConfig.validation}
                  control={control}
                  errors={errors}
                  disabled={fieldConfig.disabled && !!id}
                  trigger={trigger}
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
