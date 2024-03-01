import React from "react";
import styles from "./styles.module.css";
import LeftArrow from "../../../../Assets/LeftArrow";
import { MenuItem, Select } from "@mui/material";
import { useForm } from "react-hook-form";
import { selectData } from "../../constants";

function CreateUserMangementForm() {
  const onSubmit = (data) => {
    console.log(data);
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const searched = watch("roleSelect");

  console.log("searched", searched);

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
          <div className={styles.fieldContainerStyle}>
            <text className={styles.labelText}>
              Role <span className={styles.styledRequired}>*</span>
            </text>
            <Select
              labelId="role-select"
              id="role-select"
              size="small"
              displayEmpty
              className={styles.customizeSelect}
              renderValue={
                searched !== ""
                  ? undefined
                  : () => <div className={styles.placeholderStyle}>Select</div>
              }
              {...register("roleSelect", { required: true })}
              placeholder="Enter Username"
            >
              {selectData.map((item) => (
                <MenuItem
                  value={item.value}
                  className={styles.styledOptionText}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateUserMangementForm;
