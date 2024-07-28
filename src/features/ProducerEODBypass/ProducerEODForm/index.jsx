import { Box, Card, CardContent, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import useCreateEODBypass from '../hooks/useCreateEODBypass';
import useGetDataById from '../hooks/useGetDataById';
import 'dayjs/locale/en-gb';
import CustomButton from '../../../components/CustomButton';
import CustomFormHeader from '../../../components/CustomFormHeader';
import { COMMON_WORDS, FORM_HEADER_TEXT } from '../../../utils/constants';
import DateField from '../../../components/CustomDateInput';
import CustomAutoCompleteWithoutCheckbox from '../../../components/CustomAutoCompleteWithoutCheckbox';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../../stores/slices/userSlice';
import InputField from '../../../components/CustomTextfield';
import { textFieldValidation } from '../utils/constants';
import { DATE_FORMAT } from '../../../utils/globalConstants';

function ProducerEODFrom() {
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchUser({
        userType: COMMON_WORDS.PRODUCER,
        searchKey: COMMON_WORDS.ROLE_NAME,
        status: true,
      })
    );
  }, [dispatch]);

  const { data, fetchData } = useGetDataById();

  const { handleSubmit, control, setValue, formState, watch, reset, trigger } = useForm({
    defaultValues: {
      producerCode: null,
      startDate: null,
      endDate: null,
      reason: null,
    },
  });

  const { errors } = formState;

  const { postData, loading, UpdateDataFun } = useCreateEODBypass();

  const onSubmit = (data) => {
    if (id) {
      const payload = {
        id: id,
        properties: {
          startDate: data.startDate,
          endDate: data.endDate,
          reason: data.reason,
          status: true,
        },
      };
      UpdateDataFun(payload);
    } else {
      const payload = {
        producerId: data.producerCode.id,
        startDate: data?.startDate,
        endDate: data?.endDate,
        reason: data.reason,
      };
      postData(payload);
    }
  };

  useEffect(() => {
    if (id) fetchData(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (data && data?.data) {
      const { producer, reason, startDate, endDate } = data?.data;
      setValue('producerCode', producer || {});
      setValue('reason', reason);
      setValue('startDate', dayjs(startDate, DATE_FORMAT).format(DATE_FORMAT));
      setValue('endDate', dayjs(endDate, DATE_FORMAT).format(DATE_FORMAT));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleReset = () => {
    if (id) {
      setValue('reason', '');
      setValue('startDate', '');
      setValue('endDate', '');
    } else {
      reset({
        producerCode: null,
        reason: '',
        startDate: '',
        endDate: '',
      });
    }
  };

  return (
    <div>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardContent>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={12}>
                <CustomFormHeader
                  id={id}
                  headerText={FORM_HEADER_TEXT.PRODUCER_EOD}
                  navigateRoute={`/producer-eod-bypass-list`}
                  handleReset={handleReset}
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <CustomAutoCompleteWithoutCheckbox
                  name="producerCode"
                  label="Producer Code"
                  required={true}
                  options={user?.data || []}
                  getOptionLabel={(option) => `${option?.firstName?.toUpperCase()} ${option?.lastName?.toUpperCase()}`}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  control={control}
                  rules={{ required: 'Producer Code is required' }}
                  error={Boolean(errors.producerCode)}
                  helperText={errors.producerCode?.message}
                  disableClearable={true}
                  disabled={id ? true : false}
                  placeholder={COMMON_WORDS.SELECT}
                  renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                      {`${option?.firstName?.toUpperCase()} ${option?.lastName?.toUpperCase()}`}
                    </li>
                  )}
                  onChangeCallback={() => {
                    trigger('producerCode');
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <DateField
                  key="startDate"
                  control={control}
                  name="startDate"
                  labelVisible={true}
                  label="Start Date"
                  required
                  errors={errors}
                  classes="w-full text-red-600"
                  setValue={setValue}
                  watch={watch}
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <DateField
                  key="endDate"
                  control={control}
                  name="endDate"
                  labelVisible={true}
                  label="End Date"
                  required
                  errors={errors}
                  classes="w-full text-red-600"
                  setValue={setValue}
                  watch={watch}
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={8}>
                <InputField
                  key="reason"
                  id="reason"
                  required
                  label="Reason"
                  validation={textFieldValidation}
                  control={control}
                  errors={errors}
                  disabled={false}
                  classes="w-full text-left"
                  trigger={trigger}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} className="mt-4">
          <Grid item xs={12} sm={6} lg={2}>
            <CustomButton type="submit" variant="contained" sx={{ width: '100%' }} disabled={loading}>
              {id ? 'Update' : 'Submit'}
            </CustomButton>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default ProducerEODFrom;
