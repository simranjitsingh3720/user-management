import React from "react";
import styles from "./styles.module.css";

function SigninPage() {
  return (
    <div class="flex">
      <div class="w-1/2">pic</div>
      <div className={styles.signIN}>
        <div>
          <div className={styles.welcomeStyle}>Welcome to</div>
          <div className={styles.userManagementText}>
            User Management Portal
          </div>
        </div>
        <div>
          <div>Please login to your account.</div>
          <form></form>
        </div>
        <div>New User? Sign Up</div>
      </div>
    </div>
  );
}

export default SigninPage;
