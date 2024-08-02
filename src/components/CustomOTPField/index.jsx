import React from 'react';
import { Controller } from 'react-hook-form';
import OtpInput from 'react-otp-input';
import { REGEX } from '../../utils/globalConstants';

const OtpField = ({ name, control, errors, numInputs, inputType, shouldAutoFocus = true, trigger }) => {
  return (
    <>
      <Controller
        name={name}
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
            onChange={(otp) => {
              field.onChange(otp);
              trigger(name);
            }}
            numInputs={numInputs}
            separator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
            inputType={inputType}
            shouldAutoFocus={shouldAutoFocus}
          />
        )}
      />
      <div className="error-msg">{errors?.[name] && <span>{errors?.[name]?.message}</span>}</div>
    </>
  );
};

export default OtpField;
