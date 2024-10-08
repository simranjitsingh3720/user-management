import React, { useEffect } from 'react';
import { Grid, Box, Card, CardContent } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BitlyLinkMandatory } from '../constants';
import useUpdatePaymentConfig from '../hooks/useUpdateHealthConfig';
import useCreateHealthConfig from '../hooks/useCreateHealthConfig';
import useGetHealthConfigByID from '../hooks/useGetHealthConfigById';
import CustomFormHeader from '../../../components/CustomFormHeader';
import { COMMON_WORDS, FORM_HEADER_TEXT } from '../../../utils/constants';
import CustomButton from '../../../components/CustomButton';
import CustomAutoCompleteWithoutCheckbox from '../../../components/CustomAutoCompleteWithoutCheckbox';
import { fetchUser } from '../../../stores/slices/userSlice';

function HealthConfigurationForm() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);

  const { handleSubmit, control, setValue, formState, trigger } = useForm({
    defaultValues: {
      producer: null,
      medicare: null,
    },
  });

  const { data: healthConfigData, fetchData: fetchHealthConfigByID } = useGetHealthConfigByID();

  useEffect(() => {
    dispatch(
      fetchUser({
        userType: COMMON_WORDS.EXTERNAL,
        searchKey: COMMON_WORDS.USER_TYPE,
        isAll: true,
        status: true,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (id) fetchHealthConfigByID(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const { postData, loading: createPaymentLoading } = useCreateHealthConfig();
  const { UpdateDataFun, updateLoading } = useUpdatePaymentConfig();
  const { errors } = formState;

  useEffect(() => {
    if (healthConfigData && healthConfigData?.data) {
      const { producer, isExistingCustomer } = healthConfigData?.data;
      setValue('producer', producer);
      setValue('medicare', isExistingCustomer ? BitlyLinkMandatory[0] : BitlyLinkMandatory[1]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [healthConfigData]);

  const onSubmit = (data) => {
    const {
      medicare: { value },
      producer,
    } = data;
    if (id) {
      const payload = {
        id: id,
        properties: {
          isExistingCustomer: value === 'yes' ? true : false,
        },
      };
      UpdateDataFun(payload);
    } else {
      const payload = {
        producerId: producer?.id,
        isExistingCustomer: value === 'yes' ? true : false,
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
              <CustomAutoCompleteWithoutCheckbox
                name="producer"
                label="Select Producer"
                control={control}
                rules={{ required: 'Producer is required' }}
                required={true}
                options={user.data || []}
                getOptionLabel={(option) => {
                  return `${option?.firstName} ${option?.lastName} - ${option?.producerCode}`;
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                error={Boolean(errors.producer)}
                helperText={errors.producer?.message}
                placeholder={COMMON_WORDS.SELECT}
                trigger={trigger}
                disabled={id ? true : false}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={8}>
              <CustomAutoCompleteWithoutCheckbox
                name="medicare"
                label="Medicare Existing TATA AIG General Insurance Customer"
                control={control}
                rules={{ required: 'Medicare Existing TATA AIG General Insurance Customer is required' }}
                required={true}
                options={BitlyLinkMandatory}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                error={Boolean(errors.medicare)}
                helperText={errors.medicare?.message}
                placeholder={COMMON_WORDS.SELECT}
                trigger={trigger}
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

export default HealthConfigurationForm;
