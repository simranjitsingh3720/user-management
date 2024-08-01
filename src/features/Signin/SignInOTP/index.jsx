import { Controller, useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import CustomButton from '../../../components/CustomButton';
import InputField from '../../../components/CustomTextfield';
import { emailValidation } from '../utils/constants';
import EditIcon from '@mui/icons-material/Edit';
import OtpInput from 'react-otp-input';
import { REGEX } from '../../../utils/globalConstants';

function SignInOTP({ otpScreen, setOtpScreen, postData, loginLoading, verifyOTP, verifyLoading }) {
  const [timer, setTimer] = useState(60);

  const onSubmit = (data) => {
    const { emailId = '', otp = '' } = data;
    if (otpScreen) {
      const payload = { email: emailId, otp: otp };
      verifyOTP(payload);
    } else {
      const payload = { email: data?.emailId };
      postData(payload);
    }
  };

  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValue: {
      emailId: '',
      otp: '',
    },
  });

  useEffect(() => {
    setValue('otp', null);
    setTimer(60);
  }, [otpScreen]);

  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (countdown) {
      clearInterval(countdown);
    }
    return () => clearInterval(countdown);
  }, [timer]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {otpScreen ? (
          <>
            <div className="mt-2 text-lg font-medium font-weight-600">OTP Verification</div>
            <div className="mt-1 text-fiord">Enter the one-time password sent to you on mail</div>
            <div className="mt-1 font-weight-600">
              {watch('emailId')}
              <span>
                <Tooltip title="Edit Email">
                  <IconButton
                    aria-label="back"
                    type="button"
                    onClick={() => {
                      setOtpScreen(!otpScreen);
                    }}
                  >
                    <EditIcon color="primary" style={{ fontSize: 16 }} />
                  </IconButton>
                </Tooltip>
              </span>
            </div>
            <div className="mt-4 mb-4">
              <Controller
                name="otp"
                control={control}
                defaultValue=""
                rules={{
                  required: 'OTP is required',
                  pattern: {
                    value: REGEX.numericRegex,
                    message: 'Only numeric values are allowed',
                  },
                  minLength: {
                    value: 6,
                    message: 'OTP must be exactly 6 digits long',
                  },
                }}
                render={({ field }) => (
                  <OtpInput
                    inputStyle={{
                      width: '3rem',
                      height: '3rem',
                      margin: '20px 1rem',
                      fontSize: '1rem',
                      borderRadius: 4,
                      border: '1px solid black',
                    }}
                    value={field.value}
                    onChange={field.onChange}
                    numInputs={6}
                    separator={<span>-</span>}
                    renderInput={(props) => <input autoFocus {...props} />}
                    inputType="password"
                    shouldAutoFocus
                  />
                )}
              />
              <div className="error-msg">{errors?.otp && <span>{errors?.otp?.message}</span>}</div>
            </div>
            <div className="mt-1 items-center">
              <span className="text-custom-gray text-sm">Didn't receive the code? </span>{' '}
              <span>
                <CustomButton
                  type="button"
                  variant="text"
                  onClick={() => {
                    const payload = { email: watch('emailId') };
                    postData(payload);
                    setTimer(60);
                  }}
                  disabled={loginLoading || timer > 0}
                >
                  <span className="underline">
                    {timer > 0 ? `Resend OTP in ${timer}s` : loginLoading ? 'Resending...' : 'Resend OTP'}
                  </span>
                </CustomButton>
              </span>
            </div>
            <div className="mt-5">
              <CustomButton type="submit" variant="contained" className="w-full" disabled={verifyLoading}>
                {verifyLoading ? 'Verifying...' : 'Verify OTP'}
              </CustomButton>
            </div>
          </>
        ) : (
          <>
            <div className="mt-1 text-fiord">
              Please enter your email address. We will send you a one-time password on this mail.
            </div>

            <div className="mt-8 px-2 grid grid-cols-1 text-left">
              <div className="mb-4">
                <InputField
                  key="emailId"
                  id="emailId"
                  required
                  label="Email Id"
                  validation={emailValidation}
                  control={control}
                  errors={errors}
                  disabled={false}
                  classes="w-full text-left"
                  trigger={trigger}
                />
              </div>
            </div>
            <div className="px-2 mt-5">
              <CustomButton type="submit" variant="contained" className="w-full" disabled={loginLoading}>
                {loginLoading ? 'Request Sending...' : 'Request OTP'}
              </CustomButton>
            </div>
          </>
        )}
      </form>
    </>
  );
}

export default SignInOTP;
