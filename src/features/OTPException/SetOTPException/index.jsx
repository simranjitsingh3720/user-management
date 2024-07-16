import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useForm } from 'react-hook-form';
import useCreateOTPException from '../hooks/useCreateOTPException';
import CustomButton from '../../../components/CustomButton';
import CustomFormHeader from '../../../components/CustomFormHeader';
import { COMMON_WORDS, FORM_HEADER_TEXT } from '../../../utils/constants';
import CustomAutoCompleteWithoutCheckbox from '../../../components/CustomAutoCompleteWithoutCheckbox';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../../stores/slices/userSlice';
import { getChannels } from '../../../Redux/getChannel';

function SetOTPException({ fetchData }) {
  const dispatch = useDispatch();

  const [OTPValue, setOTPValue] = useState('byChannnel');

  const handleChange = (event) => {
    setOTPValue(event.target.value);
  };

  const { user, userLoading } = useSelector((state) => state.user);
  const channelType = useSelector((state) => state.channelType.channelType);

  useEffect(() => {
    dispatch(
      fetchUser({
        userType: COMMON_WORDS.PRODUCER,
        searchKey: COMMON_WORDS.ROLE_NAME,
      })
    );
    dispatch(getChannels());
  }, [dispatch]);

  const { handleSubmit, control, formState, setValue } = useForm({
    defaultValues: {
      producerCode: null,
      channel: null,
    },
  });

  const { errors } = formState;

  const { postData, loading } = useCreateOTPException({ fetchData });

  const onSubmit = (data) => {
    if (OTPValue === 'byChannnel') {
      const payload = {
        channelId: data?.channel?.id,
      };
      postData(payload);
    } else {
      const payload = {
        producerId: data.producerCode.id,
      };
      postData(payload);
    }
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
    <div className={styles.otpException}>
      <div className="p-5">
        <CustomFormHeader
          headerText={FORM_HEADER_TEXT.OTP_EXCEPTION}
          subHeading="Please select a channel or producer code from below and add it to the given list for OTP Exception."
          handleReset={handleReset}
        />
      </div>
      <div className={styles.OTPSelectStyle}>
        <span className={styles.labelText}>
          Select <span className={styles.styledRequired}>*</span>
        </span>
        <div className={styles.radioContainer}>
          <RadioGroup
            row
            aria-labelledby="insillion-status-row-radio-buttons-group-label"
            name="groupStatus"
            defaultValue="byChannnel"
            value={OTPValue}
            onChange={handleChange}
          >
            <FormControlLabel
              value="byChannnel"
              control={<Radio />}
              label="By Channel"
              className={OTPValue === 'byChannnel' ? styles.radioSelectStyle : styles.radioNotSelectStyle}
            />
            <FormControlLabel
              value="byProducerCode"
              control={<Radio />}
              label="By Producer Code"
              className={OTPValue === 'byProducerCode' ? styles.radioSelectStyle : styles.radioNotSelectStyle}
            />
          </RadioGroup>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {OTPValue === 'byChannnel' ? (
            <div className="w-full max-w-[380px] mt-4">
              <CustomAutoCompleteWithoutCheckbox
                name="channel"
                label="Channel"
                required={true}
                options={channelType || []}
                getOptionLabel={(option) => {
                  return option?.label?.toUpperCase();
                }}
                control={control}
                rules={{ required: 'Channel is required' }}
                error={Boolean(errors.channel)}
                helperText={errors.channel?.message}
                disableClearable={true}
                placeholder={COMMON_WORDS.SELECT}
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option?.label?.toUpperCase()}
                  </li>
                )}
              />
            </div>
          ) : (
            <div className="w-full max-w-[380px] mt-4">
              <CustomAutoCompleteWithoutCheckbox
                name="producerCode"
                label="Producer Code"
                required={true}
                loading={userLoading}
                options={user.data || []}
                getOptionLabel={(option) => {
                  return `${option?.firstName?.toUpperCase()} ${option?.lastName?.toUpperCase()}`;
                }}
                control={control}
                rules={{ required: 'Producer is required' }}
                error={Boolean(errors.producerCode)}
                helperText={errors.producerCode?.message}
                disableClearable={true}
                placeholder={COMMON_WORDS.SELECT}
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option?.firstName?.toUpperCase()} {option?.lastName?.toUpperCase()}
                  </li>
                )}
              />
            </div>
          )}
          <CustomButton type="submit" variant="contained" loading={loading} className="mt-4">
            Add
          </CustomButton>
        </form>
      </div>
    </div>
  );
}

export default SetOTPException;
