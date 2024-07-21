import { useForm } from "react-hook-form";
import React from "react";
import { Box } from "@mui/material";
import CustomButton from "../../components/CustomButton";
import TataNormalLogo from "../../assets/TataNormalLogo";
import InputField from "../../components/CustomTextfield";
import { emailValidation, passwordValidation } from "./utils/constants";
import SignInImg from "../../assets/SignInImg";
import usePostLogin from "./hooks/usePostLogin";
import backgroundImage from "../../assets/loginPageBackground.png";
import FullPageLoader from "../../components/FullPageLoader";
import { encodeString } from "../../utils/globalizationFunction";

function SignInPage() {
  const { postData, loading } = usePostLogin();
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
      {loading && <FullPageLoader />}
      {
        !loading && <Box className="flex w-full h-screen overflow-hidden">
        <div
          className="invisible w-0 md:visible md:w-1/2 h-full bg-cornFlower flex justify-center items-center bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <SignInImg></SignInImg>
        </div>
        <div className="bg-white w-full md:w-1/2 h-full flex flex-col justify-center items-center p-8 sm:p-28 md:p-12 xl:p-28">
          <div className="text-center w-full">
            <div className="flex justify-center">
              <TataNormalLogo />
            </div>
            <div className="text-cornFlower text-2xl font-semibold mt-3">
              User Management Portal
            </div>
            <div className="text-fiord mt-8 text-lg font-medium">
              Welcome back!
            </div>
            <div className="mt-1 text-fiord">
              Please sign in to your account with your username.
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-8 px-2 grid grid-cols-1 text-left">
                <div className="mb-4">
                  <InputField
                    key="emailId"
                    id="emailId"
                    required
                    label="Username"
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
                <CustomButton
                  type="submit"
                  variant="contained"
                  className="w-full"
                >
                  Sign In
                </CustomButton>
              </div>
            </form>
          </div>
        </div>
      </Box>
      }
    </>
  );
}

export default SignInPage;
