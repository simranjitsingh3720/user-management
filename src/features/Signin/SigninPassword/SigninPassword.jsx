import { useForm } from 'react-hook-form';
import React from 'react';
import InputField from '../../../components/CustomTextfield';
import { emailValidation, passwordValidation } from '../utils/constants';
import { encodeString } from '../../../utils/globalizationFunction';
import CustomButton from '../../../components/CustomButton';

function SignInPassword({ postData, loginLoading }) {
  const onSubmit = (data) => {
    const encryptedPassword = encodeString(data?.password);
    const payload = { email: data?.emailId, password: encryptedPassword };
    postData(payload);
  };

  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm({});

  return (
    <>
      <div className="mt-1 text-fiord">Please sign in to your account with your username.</div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <div className="mb-4">
            <InputField
              key="password"
              id="password"
              type="password"
              required
              label="Password"
              validation={passwordValidation}
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
            {loginLoading ? 'Signing In...' : 'Sign In'}
          </CustomButton>
        </div>
      </form>
    </>
  );
}

export default SignInPassword;
