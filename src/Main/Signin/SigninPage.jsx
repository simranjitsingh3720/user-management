import { useState } from "react";
import styles from "./styles.module.css";
import { useForm } from "react-hook-form";
import React from "react";
import { Box } from "@mui/material";

const tabs = [
  {
    id: "jwt",
    title: "JWT",
    logo: "assets/images/logo/jwt.svg",
    logoClass: "h-40 p-4 bg-black rounded-12",
  },
  {
    id: "firebase",
    title: "Firebase",
    logo: "assets/images/logo/firebase.svg",
    logoClass: "h-40",
  },
];

/**
 * The sign in page.
 */
function SignInPage() {
  const [selectedTabId, setSelectedTabId] = useState(tabs[0].id);

  function handleSelectTab(id) {
    setSelectedTabId(id);
  }
  const onSubmit = (data) => {
    console.log(data);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    // <div className="flex min-w-0 flex-1 flex-col items-center sm:flex-row sm:justify-center md:items-start md:justify-start" />
    <Box class="flex">
      <div className={styles.imageStyle}></div>
      <div className={styles.signIN}>
        <div className="text-center mb-6">
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
              <input
                type="text"
                {...register("userName", { required: true })}
                placeholder="Enter Username"
                className={styles.inputStyle}
              />
              <div className={styles.styledError}>
                {errors.userName && <span>This field is required</span>}
              </div>
            </div>
            <div className={styles.styledText}>Password</div>
            <input
              type="text"
              {...register("password", { required: true })}
              placeholder="Enter Password"
              className={styles.inputStyle}
            />
            <div className={styles.styledError}>
              {errors.password && <span>This field is required</span>}
            </div>
            <br />
            <div class="flex justify-center">
              <button
                type="submit"
                variant="contained"
                className={styles.styledButton}
              >
                Submit
              </button>
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
