import {
  Autocomplete,
  Button,
  Checkbox,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import styles from "./styles.module.css";
import { RoleStatusSelect } from "../constants";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { selectData } from "../../UserManagement/constants";
import { useNavigate } from "react-router-dom";
import LeftArrow from "../../../assets/LeftArrow";
import useCreateRole from "../hooks/useCreateRole";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function CreateRoleForm() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const { postData, loading } = useCreateRole();

  const onSubmit = (data) => {
    console.log("data", data);

    const newPermissions = data?.permissions.map((item) => item.value);
    const newData = {
      // Creating a new object to store modified data
      roleName: data.roleName,
      permissions: newPermissions, // Assigning the extracted permissions
    };

    console.log("newData", newData);

    postData(newData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.createNewUserContainer}>
          <div className={styles.formHeaderStyle}>
            <div className={styles.subHeader}>
              <IconButton
                aria-label="back"
                onClick={() => {
                  navigate("/roles");
                }}
              >
                <LeftArrow />
              </IconButton>
              <span className={styles.headerTextStyle}>Create New Role</span>
            </div>
          </div>

          <div className={styles.formFieldContainer}>
            <div className={styles.fieldContainerStyle}>
              <span className={styles.labelText}>
                Role Name <span className={styles.styledRequired}>*</span>
              </span>
              <Controller
                name="roleName"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    id="roleName"
                    variant="outlined"
                    placeholder="Enter Name"
                    size="small"
                    className={styles.customizeSelect}
                    {...field}
                    onChange={(e) => {
                      setValue("roleName", e.target.value);
                    }}
                  />
                )}
              />
              <div className={styles.styledError}>
                {errors.roleName && <span>This field is required</span>}{" "}
              </div>
            </div>
            <div className={styles.fieldContainerStyle}>
              <span className={styles.labelText}>
                Status <span className={styles.styledRequired}>*</span>
              </span>
              <Controller
                name="status"
                control={control}
                defaultValue="active"
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    labelId="privilege-status"
                    id="privilege-status"
                    size="small"
                    className={styles.customizeSelect}
                    defaultValue={"active"}
                    onChange={(e) => {
                      setValue("status", e.target.value);
                    }}
                    {...field}
                  >
                    {RoleStatusSelect.map(({ label, value }) => (
                      <MenuItem
                        value={value}
                        className={styles.styledOptionText}
                      >
                        {label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              <div className={styles.styledError}>
                {errors.status && <span>This field is required</span>}{" "}
              </div>
            </div>
          </div>

          <div className={styles.fieldStyle}>
            <text className={styles.labelText}>
              Privilege Name <span className={styles.styledRequired}>*</span>
            </text>
            <Controller
              name="permissions" // Name of the field in the form data
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  multiple
                  id="permissions"
                  options={selectData}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.label}
                  onChange={(event, newValue) => {
                    console.log("newValue", newValue);
                    field.onChange(newValue);
                  }}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.label}
                    </li>
                  )}
                  size="small"
                  className={styles.customizePrivilegeSelect}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Select" />
                  )}
                />
              )}
            />
            <div className={styles.styledError}>
              {errors.permissions && <span>This field is required</span>}
            </div>
          </div>
        </div>
        <Button
          type="submit"
          variant="contained"
          className={styles.styledButton}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default CreateRoleForm;
