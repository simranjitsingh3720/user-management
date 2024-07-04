import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/CustomButton";
import TataNormalLogo from "../../assets/TataNormalLogo";
import InputField from "../../components/CustomTextfield";
import { emailValidation, passwordValidation } from "./utils/constants";
import { TOKEN, TOKEN_EXPIRATION } from "../../utils/globalConstants";
import SignInImg from "../../assets/SignInImg";
import { expirationTime } from "../../utils/auth";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoginDetails, setLoginError } from "../../Redux/loginSlice";
import Loader from "../../components/Loader";

function SignInPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.login.userDetails);
  const loginError = useSelector((state) => state.login.error);
  const loginLoading = useSelector((state) => state.login.loading);
  const onSubmit = (data) => {
    console.log(data);
    const payload = { email: data.emailId, password: data.password };
    dispatch(fetchLoginDetails(payload));
    // localStorage.setItem(TOKEN, "test token");
    // localStorage.setItem(TOKEN_EXPIRATION, expirationTime());
    // navigate("/dashboard");
  };

  useEffect(() => {
    console.log(loginData && Object.keys(loginData).length > 0 && loginData?.success === true && !localStorage.getItem(TOKEN));
    if (loginData && Object.keys(loginData).length > 0 && loginData?.status === 200 && !localStorage.getItem(TOKEN)) {
      localStorage.setItem(TOKEN, "test token");
      localStorage.setItem(TOKEN_EXPIRATION, expirationTime());
      navigate("/dashboard");
    }
  }, [loginData]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const email = watch("emailId");
  const password = watch("password");

  useEffect(() => {
    if (loginError) {
      dispatch(setLoginError(""));
    }
  }, [email, password]);

  return (
    <Box className="flex w-full h-screen">
      {loginLoading && <Loader></Loader>}
      <div className="invisible w-0 lg:visible lg:w-1/2 h-full bg-cornFlower flex justify-center items-center overflow-hidden">
        <SignInImg></SignInImg>
      </div>
      <div className="bg-white w-full lg:w-1/2 h-full flex flex-col justify-center items-center p-8 sm:p-28 lg:p-12 xl:p-28">
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
            <div className="mt-8 px-2 grid grid-cols-1">
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
              />
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
              />
              {/* <div className="text-left px-5">
                <FormControlLabel
                  onChange={() => {
                    setRememberMeChecked(!rememberMeChecked);
                  }}
                  checked={rememberMeChecked}
                  control={<Checkbox size="small" />}
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: "0.875rem",
                      color: "#465465",
                    },
                  }}
                  label="Remember me"
                />
              </div> */}
              <div className="text-left px-8 text-persianRed text-xs">
                {loginError}
              </div>
            </div>
            <div className="mx-7 mt-5">
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
  );
}

export default SignInPage;
