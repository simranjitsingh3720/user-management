import { Box } from '@mui/material';
import React, { useState } from 'react';
import backgroundImage from '../../assets/loginPageBackground.png';
import SignInImg from '../../assets/SignInImg';
import TataNormalLogo from '../../assets/TataNormalLogo';
import SignInPassword from './SigninPassword/SigninPassword';
import SignInOTP from './SignInOTP/index';
import usePostLogin from './hooks/usePostLogin';
import CustomTabs from '../../components/CustomTabs';

function SignIn() {
  const [otpScreen, setOtpScreen] = useState(false);

  const { postData, loginLoading, verifyLoading, verifyOTP } = usePostLogin(setOtpScreen);

  const tabs = [
    {
      label: 'Email & Password',
      component: <SignInPassword postData={postData} loginLoading={loginLoading} />,
    },
    {
      label: 'Email & OTP',
      component: (
        <SignInOTP
          otpScreen={otpScreen}
          setOtpScreen={setOtpScreen}
          postData={postData}
          loginLoading={loginLoading}
          verifyLoading={verifyLoading}
          verifyOTP={verifyOTP}
        />
      ),
    },
  ];

  return (
    <Box className="flex w-full h-screen">
      <div
        className="invisible w-0 md:visible md:w-1/2 h-full bg-cornFlower flex justify-center items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <SignInImg></SignInImg>
      </div>
      <div className="bg-white w-full md:w-1/2 h-full flex flex-col items-center justify-center p-8 sm:p-28 md:p-12 xl:p-28">
        <div className="text-center w-full">
          <div className="flex justify-center">
            <TataNormalLogo />
          </div>
          <div className="text-cornFlower text-2xl font-semibold mt-3">UCON</div>
          <div className="text-fiord mt-2 mb-4 text-lg font-medium">Welcome back!</div>

          <Box sx={{ width: '100%', typography: 'body1' }}>
            <CustomTabs tabs={tabs} />
          </Box>
        </div>
      </div>
    </Box>
  );
}

export default SignIn;
