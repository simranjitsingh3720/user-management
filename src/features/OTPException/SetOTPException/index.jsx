import React, { useEffect, useState } from 'react';
import { Grid, Box, CardContent, Card } from '@mui/material';
import { useForm } from 'react-hook-form';
import useCreateOTPException from '../hooks/useCreateOTPException';
import CustomButton from '../../../components/CustomButton';
import CustomFormHeader from '../../../components/CustomFormHeader';
import { COMMON_WORDS, FORM_HEADER_TEXT } from '../../../utils/constants';
import CustomAutoCompleteWithoutCheckbox from '../../../components/CustomAutoCompleteWithoutCheckbox';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../../stores/slices/userSlice';
import { getChannels } from '../../../Redux/getChannel';
import UserTypeToggle from '../../../components/CustomRadioButtonGroup';
import { otpExceptionConstants } from '../utils/constants';

function SetOTPException({ fetchData }) {
  const dispatch = useDispatch();
  const [OTPValue, setOTPValue] = useState('byChannel');

  const handleChange = (value) => {
    setOTPValue(value);
  };

  const { user, userLoading } = useSelector((state) => state.user);
  const channelType = useSelector((state) => state.channelType.channelType);

  useEffect(() => {
    dispatch(
      fetchUser({
        userType: COMMON_WORDS.PRODUCER,
        searchKey: COMMON_WORDS.ROLE_NAME,
        isAll: true,
      })
    );
    dispatch(getChannels());
  }, [dispatch]);

  const { handleSubmit, control, formState, setValue, trigger } = useForm({
    defaultValues: {
      producerCode: null,
      channel: null,
    },
  });

  const { errors } = formState;
  const { postData, loading } = useCreateOTPException({ fetchData });

  const onSubmit = (data) => {
    const payload = OTPValue === 'byChannel' ? { channelId: data?.channel?.id } : { producerId: data.producerCode.id };
    postData(payload);
  };

  const handleReset = () => {
    setValue('channel', null);
    setValue('producerCode', null);
  };

  useEffect(() => {
    setValue('channel', null);
    setValue('producerCode', null);
  }, [OTPValue]);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomFormHeader
                headerText={FORM_HEADER_TEXT.OTP_EXCEPTION}
                handleReset={handleReset}
                navigateRoute="/otpexception"
              />
            </Grid>
            <Grid item xs={12}>
              <UserTypeToggle
                menuItem={otpExceptionConstants}
                label="Select By"
                required={true}
                control={control}
                name="groupStatus"
                defaultValue="byChannel"
                onChangeCallback={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {OTPValue === 'byChannel' ? (
                <CustomAutoCompleteWithoutCheckbox
                  name="channel"
                  label="Channel"
                  required
                  options={channelType || []}
                  getOptionLabel={(option) => `${option?.label || ''} - ${option?.numChannelCode || ''}`}
                  control={control}
                  rules={{ required: 'Channel is required' }}
                  error={Boolean(errors.channel)}
                  helperText={errors.channel?.message}
                  disableClearable
                  placeholder={COMMON_WORDS.SELECT}
                  trigger={trigger}
                />
              ) : (
                <CustomAutoCompleteWithoutCheckbox
                  name="producerCode"
                  label="Producer Code"
                  required
                  loading={userLoading}
                  options={user.data || []}
                  getOptionLabel={(option) =>
                    `${option?.firstName || ''} ${option?.lastName || ''} - ${
                      option.producerCode || ''
                    }`
                  }
                  control={control}
                  rules={{ required: 'Producer is required' }}
                  error={Boolean(errors.producerCode)}
                  helperText={errors.producerCode?.message}
                  disableClearable
                  placeholder={COMMON_WORDS.SELECT}
                  trigger={trigger}
                />
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <div className="mt-4">
        <CustomButton type="submit" variant="contained" disabled={loading}>
          Submit
        </CustomButton>
      </div>
    </Box>
  );
}

export default SetOTPException;
