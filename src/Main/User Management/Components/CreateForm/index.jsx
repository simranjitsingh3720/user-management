import React from "react";
import styles from "./styles.module.css";
import LeftArrow from "../../../../Assets/LeftArrow";
import { Autocomplete, MenuItem, Select, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { selectData } from "../../constants";

function CreateUserMangementForm() {
  const onSubmit = (data) => {
    console.log(data);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className={styles.createNewUserContainer}>
      <div className={styles.formHeaderStyle}>
        <div className={styles.subHeader}>
          <LeftArrow />
          <span className={styles.headerTextStyle}>Create New User</span>
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formContainer}>
            <div className={styles.fieldContainerStyle}>
              <text className={styles.labelText}>
                Role <span className={styles.styledRequired}>*</span>
              </text>
              <Autocomplete
                disablePortal
                id="role-select"
                options={selectData}
                className={styles.customizeSelect}
                size="small"
                renderInput={(params) => (
                  <TextField {...params} placeholder="Select" />
                )}
                ListboxProps={{
                  style: {
                    maxHeight: "200px",
                  },
                }}
                {...register("roleSelect", { required: true })}
              />
              <div className={styles.styledError}>
                {errors.roleSelect && <span>This field is required</span>}
              </div>
            </div>
            <div className={styles.fieldContainerStyle}>
              <text className={styles.labelText}>
                User Id <span className={styles.styledRequired}>*</span>
              </text>
              <TextField
                id="userId"
                variant="outlined"
                {...register("userId", { required: true })}
                placeholder="Enter User Id"
                size="small"
                className={styles.customizeSelect}
              />
              <div className={styles.styledError}>
                {errors.userId && <span>This field is required</span>}
              </div>
            </div>
            <div className={styles.fieldContainerStyle}>
              <text className={styles.labelText}>
                First Name <span className={styles.styledRequired}>*</span>
              </text>
              <TextField
                id="firstName"
                variant="outlined"
                {...register("firstName", { required: true })}
                placeholder="Enter First Name"
                size="small"
                className={styles.customizeSelect}
              />
              <div className={styles.styledError}>
                {errors.firstName && <span>This field is required</span>}
              </div>
            </div>
            <div className={styles.fieldContainerStyle}>
              <text className={styles.labelText}>
                Last Name <span className={styles.styledRequired}>*</span>
              </text>
              <TextField
                id="lastName"
                variant="outlined"
                {...register("lastName", { required: true })}
                placeholder="Enter Last Name"
                size="small"
                className={styles.customizeSelect}
              />
              <div className={styles.styledError}>
                {errors.lastName && <span>This field is required</span>}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateUserMangementForm;
