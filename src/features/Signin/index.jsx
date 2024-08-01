import { Box, styled, Tab } from '@mui/material';
import React, { useState } from 'react';
import backgroundImage from '../../assets/loginPageBackground.png';
import SignInImg from '../../assets/SignInImg';
import TataNormalLogo from '../../assets/TataNormalLogo';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import SignInPassword from './SigninPassword/SigninPassword';
import SignInOTP from './SignInOTP/index';
import usePostLogin from './hooks/usePostLogin';

const CustomTabList = styled(TabList)({
  '& .MuiTabs-flexContainer': {
    justifyContent: 'space-between',
  },
});

function SignIn() {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [otpScreen, setOtpScreen] = useState(false);

  const { postData, loginLoading, verifyLoading, verifyOTP } = usePostLogin(setOtpScreen);

  return (
    <Box className="flex w-full h-screen">
      <div
        className="invisible w-0 md:visible md:w-1/2 h-full bg-cornFlower flex justify-center items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <SignInImg></SignInImg>
      </div>
      <div className="bg-white w-full md:w-1/2 h-full flex flex-col items-center p-8 sm:p-28 md:p-12 xl:p-28">
        <div className="text-center w-full">
          <div className="flex justify-center">
            <TataNormalLogo />
          </div>
          <div className="text-cornFlower text-2xl font-semibold mt-3">User Management Portal</div>
          <div className="text-fiord mt-2 mb-4 text-lg font-medium">Welcome back!</div>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', justifyContent: 'space-between !important' }}>
                <CustomTabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label="Email with Password" value="1" sx={{ flexGrow: 1 }} />
                  <Tab label="Email with OTP" value="2" sx={{ flexGrow: 1 }} />
                </CustomTabList>
              </Box>
              <TabPanel value="1">
                <SignInPassword postData={postData} loginLoading={loginLoading} />
              </TabPanel>
              <TabPanel value="2">
                <SignInOTP
                  otpScreen={otpScreen}
                  setOtpScreen={setOtpScreen}
                  postData={postData}
                  loginLoading={loginLoading}
                  verifyLoading={verifyLoading}
                  verifyOTP={verifyOTP}
                />
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </div>
    </Box>
  );
}

export default SignIn;
