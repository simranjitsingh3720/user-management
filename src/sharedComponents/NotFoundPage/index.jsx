import React from "react";
import styles from "./styles.module.css";

const NotFoundPage = () => {
  return (
    <div className={styles.pageStyle}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFoundPage;
