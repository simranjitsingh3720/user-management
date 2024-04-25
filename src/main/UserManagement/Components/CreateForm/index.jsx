import React, { useEffect } from "react";
import styles from "./styles.module.css";
import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { selectData } from "../../constants";
import LeftArrow from "../../../../assets/LeftArrow";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate, useParams } from "react-router-dom";
import useGetGroup from "../hooks/useGetGroup";
import useGetRole from "../hooks/useGetRole";
import usePostUser from "../hooks/usePostUser";
import useGetUserById from "../hooks/useGetUserById";
import useUpdateUser from "../hooks/useUpdateUser";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const formField1 = [
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
  const navigate = useNavigate();
  const { groupData } = useGetGroup();
  const { roleData } = useGetRole();

  const { postData, loading } = usePostUser();

  const {
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userId: "",
      firstName: "",
      insillionStatus: "active",
    },
  });

  const { id } = useParams();

  const { data, fetchData } = useGetUserById();

  const { updateData, updateUserLoading } = useUpdateUser();

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  useEffect(() => {
    if (data && data?.data) {
      setValue("userId", data?.data?.userId);
      setValue("roleSelect", data?.data.roleName);
      setValue("firstName", data?.data.firstName);
      setValue("lastName", data?.data.lastName);
      setValue("mobileNumber", data?.data.mobileNo);
      setValue("emailId", data?.data.email);
      setValue("ntLogin", data?.data.ntId);
      setValue("producerCode", data?.data.producerCode);
      setValue("insillionStatus", data?.data?.status ? "active" : "inactive");
    }
  }, [data]);

  const onSubmit = (data) => {
    if (id) {
      updateData(id, data, false);
    } else {
      const payload = {
        roleId: data.roleSelect.id,
        groupId: data.groupSelect.id,
        fields: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.emailId,
          mobileNo: data.mobileNumber,
          userId: data.userId,
          ntId: data.ntLogin,
          producerCode: data.producerCode,
          roleName: data.roleSelect.roleName,
          password: "asd",
        },
      };
      postData(payload);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.formMainContainer}
    >
      <div className={styles.createNewUserContainer}>
        <div className={styles.formHeaderStyle}>
          <div className={styles.subHeader}>
            <IconButton
              aria-label="back"
              onClick={() => {
                navigate("/user-management");
              }}
            >
              <LeftArrow />
            </IconButton>
            <span className={styles.headerTextStyle}>
              {id ? "Edit User" : "Create New User"}
            </span>
          </div>
        </div>
        <div className={styles.formContainer}>
          <div className={styles.fieldContainerStyle}>
            <text className={styles.labelText}>
              Role <span className={styles.styledRequired}>*</span>
            </text>
            <Controller
              name="roleSelect" // Name of the field in the form data
              control={control}
              rules={{ required: "Role is required" }}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  // multiple
                  id="roleSelect"
                  // value={getValues("roleSelect")}
                  // options={
                  //   (roleData?.data || []).map((item) => item.roleName) || []
                  // }
                  options={roleData?.data || []}
                  // disableCloseOnSelect
                  getOptionLabel={(option) => option.roleName}
                  onChange={(event, newValue) => {
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
                      {option.roleName}
                    </li>
                  )}
                  size="small"
                  className={styles.customizeSelect}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select"
                      error={Boolean(errors.roleSelect)}
                      helperText={
                        errors.roleSelect && errors.roleSelect.message
                      }
                    />
                  )}
                />
              )}
            />
          </div>
          <div className={styles.fieldContainerStyle}>
            <text className={styles.labelText}>
              Group <span className={styles.styledRequired}>*</span>
            </text>
            <Controller
              name="groupSelect" // Name of the field in the form data
              control={control}
              rules={{ required: "Group is required" }}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  // multiple
                  id="groupSelect"
                  options={groupData?.data || []}
                  // disableCloseOnSelect
                  getOptionLabel={(option) => option.groupName}
                  onChange={(event, newValue) => {
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
                      {option.groupName}
                    </li>
                  )}
                  size="small"
                  className={styles.customizeSelect}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select"
                      error={Boolean(errors.groupSelect)}
                      helperText={
                        errors.groupSelect && errors.groupSelect.message
                      }
                    />
                  )}
                />
              )}
            />
          </div>
          <div className={styles.fieldContainerStyle}>
            <text className={styles.labelText}>
              User Id <span className={styles.styledRequired}>*</span>
            </text>
            <Controller
              name="userId" // Name of the field in the form data
              control={control}
              rules={{ required: " User Id is required" }}
              render={({ field }) => (
                <TextField
                  id="userId"
                  variant="outlined"
                  placeholder="Enter User ID"
                  size="small"
                  className={styles.customizeSelect}
                  error={Boolean(errors.userId)}
                  helperText={errors.userId && errors.userId.message}
                  {...field}
                />
              )}
            />
          </div>
          {formField1.map((item) => (
            <div className={styles.fieldContainerStyle}>
              <text className={styles.labelText}>
                {item.label} <span className={styles.styledRequired}>*</span>
              </text>
              <Controller
                name={item.value} // Name of the field in the form data
                control={control}
                rules={{
                  required: `${item.label} is required`,
                  minLength: {
                    value: 2,
                    message: `${item.label} should be at least 2 characters long`,
                  },
                  maxLength: {
                    value: 50,
                    message: `${item.label} should not exceed 50 characters`,
                  },
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: `${item.label} should contain only letters`,
                  },
                }}
                render={({ field }) => (
                  <TextField
                    id={item.value}
                    variant="outlined"
                    placeholder={item.placeholder}
                    helperText={
                      errors[item.value] && errors[item.value].message
                    }
                    size="small"
                    className={styles.customizeSelect}
                    error={Boolean(errors[item.value])}
                    {...field}
                  />
                )}
              />
            </div>
          ))}
          {/* <div className={styles.fieldContainerStyle}>
            <text className={styles.labelText}>
              Location <span className={styles.styledRequired}>*</span>
            </text>
            <Controller
              name="location" // Name of the field in the form data
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Autocomplete
                  disablePortal
                  id="location"
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
                  {...field}
                />
              )}
            />
            <div className={styles.styledError}>
              {errors.location && <span>This field is required</span>}
            </div>
          </div> */}
          <div className={styles.fieldContainerStyle}>
            <text className={styles.labelText}>
              Mobile Number <span className={styles.styledRequired}>*</span>
            </text>
            <Controller
              name="mobileNumber" // Name of the field in the form data
              control={control}
              rules={{
                required: "Mobile number is required",
                minLength: {
                  value: 10,
                  message: "Mobile number should be at least 10 digits long",
                },
                maxLength: {
                  value: 10,
                  message: "Mobile number should not exceed 10 digits",
                },
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Mobile number should contain only digits",
                },
              }}
              render={({ field }) => (
                <TextField
                  id="mobileNumber"
                  variant="outlined"
                  placeholder="Enter Mobile Number"
                  size="small"
                  error={Boolean(errors.mobileNumber)}
                  helperText={
                    errors.mobileNumber && errors.mobileNumber.message
                  }
                  className={styles.customizeSelect}
                  {...field}
                />
              )}
            />
          </div>
          <div className={styles.fieldContainerStyle}>
            <text className={styles.labelText}>
              Email Id <span className={styles.styledRequired}>*</span>
            </text>
            <Controller
              name="emailId" // Name of the field in the form data
              control={control}
              rules={{
                required: "Email address is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address",
                },
              }}
              render={({ field }) => (
                <TextField
                  id="emailId"
                  variant="outlined"
                  placeholder="Enter Last Name"
                  error={Boolean(errors.emailId)}
                  helperText={errors.emailId && errors.emailId.message}
                  size="small"
                  className={styles.customizeSelect}
                  {...field}
                />
              )}
            />
            {/* <div className={styles.styledError}>
              {errors.emailId && <span>This field is required</span>}
            </div> */}
          </div>
          <div className={styles.fieldContainerStyle}>
            <text className={styles.labelText}>
              NT Login <span className={styles.styledRequired}>*</span>
            </text>
            <Controller
              name="ntLogin" // Name of the field in the form data
              control={control}
              rules={{ required: "NT Login is required" }}
              render={({ field }) => (
                <TextField
                  id="ntLogin"
                  variant="outlined"
                  placeholder="Enter Last Name"
                  size="small"
                  error={Boolean(errors.ntLogin)}
                  helperText={errors.ntLogin && errors.ntLogin.message}
                  className={styles.customizeSelect}
                  {...field}
                />
              )}
            />
          </div>
          <div className={styles.fieldContainerStyle}>
            <text className={styles.labelText}>
              Producer Code <span className={styles.styledRequired}>*</span>
            </text>
            <Controller
              name="producerCode" // Name of the field in the form data
              control={control}
              rules={{ required: "Producer Code is required" }}
              render={({ field }) => (
                <TextField
                  id="producerCode"
                  variant="outlined"
                  placeholder="Enter Producer Code"
                  size="small"
                  className={styles.customizeSelect}
                  error={Boolean(errors.producerCode)}
                  helperText={
                    errors.producerCode && errors.producerCode.message
                  }
                  {...field}
                />
              )}
            />
          </div>
          {/* {formField2.map(({ label, value }) => (
            <div className={styles.fieldContainerStyle}>
              <text className={styles.labelText}>
                {label} <span className={styles.styledRequired}>*</span>
              </text>
              <Controller
                name={value} // Name of the field in the form data
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    multiple
                    id={value}
                    options={selectData}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.label}
                    onChange={(event, newValue) => {
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
                    className={styles.customizeSelect}
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Select" />
                    )}
                  />
                )}
              />

              <div className={styles.styledError}>
                {errors[value] && <span>This field is required</span>}
              </div>
            </div>
          ))} */}
          {/* {formField.map((item) => (
            <div className={styles.fieldContainerStyle}>
              <text className={styles.labelText}>
                {item.label} <span className={styles.styledRequired}>*</span>
              </text>
              <Controller
                name={item.value} // Name of the field in the form data
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    id={item.value}
                    variant="outlined"
                    placeholder="Enter Last Name"
                    size="small"
                    className={styles.customizeSelect}
                    {...field}
                  />
                )}
              />
              <div className={styles.styledError}>
                {errors[item.value] && <span>This field is required</span>}
              </div>
            </div>
          ))} */}
          {/* <div className={styles.fieldContainerStyle}>
            <text className={styles.labelText}>
              Active Period <span className={styles.styledRequired}>*</span>
            </text>
            <div className={styles.dateContainer}>
              <Controller
                name="startDate" // Name of the field in the form data
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
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
                )}
              />
              <Controller
                name="expiryDate" // Name of the field in the form data
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
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
                )}
              />
            </div>
            <div className={styles.styledError}>
              {errors.lastName && <span>This field is required</span>}
            </div>
          </div> */}
          <div className={styles.fieldContainerStyle}>
            <text className={styles.labelText}>
              Insillion Status <span className={styles.styledRequired}>*</span>
            </text>
            <Controller
              name="insillionStatus" // Name of the field in the form data
              control={control}
              rules={{ required: "Insillion Status is required" }}
              render={({ field }) => (
                <RadioGroup
                  row
                  aria-labelledby="insillion-status-row-radio-buttons-group-label"
                  name="insillionStatus"
                  {...field}
                >
                  <FormControlLabel
                    value="active"
                    control={<Radio />}
                    label="Active"
                    className={styles.radioStyle}
                  />
                  <FormControlLabel
                    value="inactive"
                    control={<Radio />}
                    label="Inactive"
                  />
                </RadioGroup>
              )}
            />
            <div className={styles.styledError}>
              {errors.insillionStatus && (
                <span>{errors.insillionStatus.message}</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <Button
        type="submit"
        variant="contained"
        className={styles.styledButton}
        disabled={loading || updateUserLoading}
      >
        {id ? "Update" : "Submit"}
      </Button>
    </form>
  );
}

export default CreateUserMangementForm;
