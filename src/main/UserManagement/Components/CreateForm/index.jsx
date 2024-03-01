import React from "react";
import styles from "./styles.module.css";
import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { selectData } from "../../constants";
import LeftArrow from "../../../../assets/LeftArrow";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const formField1 = [
  {
    label: "User Id",
    value: "userId",
    placeholder: "Enter User ID",
  },
  {
    label: "First Name",
    value: "firstName",
    placeholder: "Enter First Name",
  },
  {
    label: "Last Name",
    value: "lastName",
    placeholder: "Enter Last Name",
  },
];

const formField2 = [
  {
    label: "LOB",
    value: "lob",
  },
  {
    label: "Product",
    value: "product",
  },
];

const formField = [
  {
    label: "NT Login",
    value: "ntLogin",
  },
  {
    label: "Email Id",
    value: "emailId",
  },
  {
    label: "Vertical",
    value: "vertical",
  },
  {
    label: "Sub Vertical",
    value: "subVertical",
  },
  {
    label: "SOL ID",
    value: "solId",
  },
];

function CreateUserMangementForm() {
  const onSubmit = (data) => {
    console.log(data);
  };
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  console.log();

  console.log("errors", errors);

  const roleSelect = watch("roleSelect");
  console.log("roleSelect", roleSelect);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.createNewUserContainer}>
        <div className={styles.formHeaderStyle}>
          <div className={styles.subHeader}>
            <LeftArrow />
            <span className={styles.headerTextStyle}>Create New User</span>
          </div>
        </div>
        <div>
          <div className={styles.formContainer}>
            <div className={styles.fieldContainerStyle}>
              <text className={styles.labelText}>
                Role <span className={styles.styledRequired}>*</span>
              </text>
              <Autocomplete
                disablePortal
                id="roleSelect"
                options={selectData}
                className={styles.customizeSelect}
                size="small"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Select"
                    {...register("roleSelect", { required: true })}
                  />
                )}
                ListboxProps={{
                  style: {
                    maxHeight: "200px",
                  },
                }}
              />
              <div className={styles.styledError}>
                {errors.roleSelect && <span>This field is required</span>}
              </div>
            </div>
            {formField1.map((item) => (
              <div className={styles.fieldContainerStyle}>
                <text className={styles.labelText}>
                  {item.label} <span className={styles.styledRequired}>*</span>
                </text>
                <TextField
                  id={item.value}
                  variant="outlined"
                  {...register(item.value, { required: true })}
                  placeholder={item.placeholder}
                  size="small"
                  className={styles.customizeSelect}
                />
                <div className={styles.styledError}>
                  {errors.userId && <span>This field is required</span>}
                </div>
              </div>
            ))}
            <div className={styles.fieldContainerStyle}>
              <text className={styles.labelText}>
                Location <span className={styles.styledRequired}>*</span>
              </text>
              <Autocomplete
                disablePortal
                id="location"
                options={selectData}
                className={styles.customizeSelect}
                size="small"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Select"
                    {...register("location", { required: true })}
                  />
                )}
                ListboxProps={{
                  style: {
                    maxHeight: "200px",
                  },
                }}
                {...register("location", { required: true })}
              />
              <div className={styles.styledError}>
                {errors.location && <span>This field is required</span>}
              </div>
            </div>
            <div className={styles.fieldContainerStyle}>
              <text className={styles.labelText}>
                Mobile Number <span className={styles.styledRequired}>*</span>
              </text>
              <TextField
                id="mobileNumber"
                variant="outlined"
                {...register("mobileNumber", { required: true })}
                placeholder="Enter Mobile Number"
                size="small"
                className={styles.customizeSelect}
              />
              <div className={styles.styledError}>
                {errors.lastName && <span>This field is required</span>}
              </div>
            </div>
            {formField2.map(({ label, value }) => (
              <div className={styles.fieldContainerStyle}>
                <text className={styles.labelText}>
                  {label} <span className={styles.styledRequired}>*</span>
                </text>
                <Autocomplete
                  multiple
                  id={value}
                  options={selectData}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.label}
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
                  className={styles.customizeSelect}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Select" />
                  )}
                  {...register(value, { required: true })}
                />
                <div className={styles.styledError}>
                  {errors.value && <span>This field is required</span>}
                </div>
              </div>
            ))}
            {formField.map((item) => (
              <div className={styles.fieldContainerStyle}>
                <text className={styles.labelText}>
                  {item.label} <span className={styles.styledRequired}>*</span>
                </text>
                <TextField
                  id={item.value}
                  variant="outlined"
                  {...register(item.value, { required: true })}
                  placeholder="Enter Last Name"
                  size="small"
                  className={styles.customizeSelect}
                />
                <div className={styles.styledError}>
                  {errors.lastName && <span>This field is required</span>}
                </div>
              </div>
            ))}
            <div className={styles.fieldContainerStyle}>
              <text className={styles.labelText}>
                Active Period <span className={styles.styledRequired}>*</span>
              </text>
              <div className={styles.dateContainer}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Select Start Date"
                    className={styles.dateStyle}
                    {...register("startDate", { required: true })}
                    slotProps={{ textField: { size: "small" } }}
                    value={watch("startDate")}
                    onChange={(date) => setValue("startDate", date)}
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Select Expiry Date"
                    className={styles.dateStyle}
                    {...register("expiryDate", { required: true })}
                    value={watch("expiryDate")}
                    onChange={(date) => setValue("expiryDate", date)}
                    slotProps={{ textField: { size: "small" } }}
                  />
                </LocalizationProvider>
              </div>
              <div className={styles.styledError}>
                {errors.lastName && <span>This field is required</span>}
              </div>
            </div>
            <div className={styles.fieldContainerStyle}>
              <text className={styles.labelText}>
                Insillion Status{" "}
                <span className={styles.styledRequired}>*</span>
              </text>
              <RadioGroup
                row
                aria-labelledby="insillion-status-row-radio-buttons-group-label"
                name="insillionStatus"
              >
                <FormControlLabel
                  value="active"
                  control={<Radio />}
                  label="Active"
                  className={styles.radioStyle}
                  {...register("insillionStatus", { required: true })}
                />
                <FormControlLabel
                  value="inactive"
                  control={<Radio />}
                  label="Inactive"
                  {...register("insillionStatus", { required: true })}
                />
              </RadioGroup>
              <div className={styles.styledError}>
                {errors.lastName && <span>This field is required</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button type="submit" variant="contained" className={styles.styledButton}>
        Submit
      </Button>
    </form>
  );
}

export default CreateUserMangementForm;
