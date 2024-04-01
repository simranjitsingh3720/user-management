import styles from "./styles.module.css";
import { useForm } from "react-hook-form";
import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

/**
 * The sign in page.
 */
function SignInPage() {
  // Initialize useHistory
  const navigate = useNavigate();

  const onSubmit = (data) => {
    navigate("/user-management");
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    // <div className="flex min-w-0 flex-1 flex-col items-center sm:flex-row sm:justify-center md:items-start md:justify-start" />
    <Box className={styles.boxStyle}>
      <div className={styles.imageStyle}></div>
      <div className={styles.signIN}>
        <div className={styles.loginTextContainer}>
          <div className={styles.welcomeStyle}>Welcome to</div>
          <div className={styles.userManagementText}>
            User Management Portal
          </div>
        </div>
        <div>
          <div className={styles.styledLoginText}>
            Please login to your account.
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.fieldStyle}>
              <div className={styles.styledText}>Username</div>
              <TextField
                id="userName"
                variant="outlined"
                {...register("userName", { required: true })}
                placeholder="Enter Username"
                size="small"
                className={styles.textFieldStyle}
              />
              <div className={styles.styledError}>
                {errors.userName && <span>This field is required</span>}
              </div>
            </div>
            <div className={styles.styledText}>Password</div>
            <TextField
              id="password"
              variant="outlined"
              {...register("password", { required: true })}
              placeholder="Enter Password"
              size="small"
              className={styles.textFieldStyle}
            />
            <div className={styles.styledError}>
              {errors.password && <span>This field is required</span>}
            </div>
            <br />
            <div>
              <Button
                type="submit"
                variant="contained"
                className={styles.styledButton}
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
        <div className={styles.signupText}>
          New User? <span className={styles.signupLink}>Sign Up</span>
        </div>
      </div>
    </Box>
  );
}

export default SignInPage;
