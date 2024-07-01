import React from "react";
import styles from "./styles.module.scss";
import { IconButton } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import LeftArrow from "../../../assets/LeftArrow";
import CustomButton from "../../../components/CustomButton";
import UserTypeToggle from "../../../components/CustomRadioButtonGroup";
import InputField from "../../../components/CustomTextfield";
import SelectField from "../../../components/CustomSelect";
import NotificationTable from "../Table";

function CreateCommunicationRestrictionForm() {
  const navigate = useNavigate();

  const userArray = [
    {
      id: "customer",
      label: "Customer",
      value: "customer",
    },
    {
      id: "producer",
      label: "Producer",
      value: "producer",
    },
  ];

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      typeOfUser: userArray[0].value,
    },
  });

  const customerArr = [
    {
      id: "customerName",
      label: "Customer Name",
      required: true,
      validation: {
        required: "This field is required",
        minLength: {
          value: 3,
          message: "It should be at least 3 characters long",
        },
        maxLength: {
          value: 30,
          message: "It should not exceed 30 characters",
        },
        pattern: {
          value: "^[A-Za-z]+$",
          message: "It should contain only letters",
        },
      },
      disabled: false,
    },
    {
      id: "email",
      label: "Email",
      required: true,
      validation: {
        required: "This field is required",
        pattern: {
          value: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
          message: "It should contain digits and letters only",
        },
      },
      disabled: false,
    },
    {
      id: "mobileNumber",
      label: "Mobile Number",
      type: "input",
      required: true,
      validation: {
        required: "This field is required",
        minLength: {
          value: 10,
          message: "It should be at least 10 digits long",
        },
        maxLength: {
          value: 10,
          message: "It should not exceed 10 digits",
        },
        pattern: {
          value: "^[0-9]*$",
          message: "It should contain only digits",
        },
      },
    },
  ];

  const user = watch("typeOfUser");

  const onSubmit = (data) => {
    console.log(data);
  };

  const cancel = () => {
    navigate("/communication-restrictions")
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.formMainContainer}
    >
      <div className={styles.createNewUserContainer}>
        <div
          className={`flex items-center justify-between ${styles.borderBottom}`}
        >
          <div className={`${styles.formHeaderStyle} flex flex-col`}>
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
                Create New Communications Restrictions
              </span>
            </div>
            <div className={styles.headerPara}>
              Please fill the details for the type of user you select and click
              'Submit' to create new communications restrictions
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <CustomButton variant="outlined" onClick={cancel}>Cancel</CustomButton>
          </div>
        </div>
        <div className={styles.formContainer}>
          <UserTypeToggle
            menuItem={userArray}
            label="Type Of User"
            required
            control={control}
            name="typeOfUser"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 mb-6">
          {user === "customer" ? (
            customerArr.map((item) => (
              <InputField
                key={item?.id}
                id={item?.id}
                required={item?.required}
                label={item?.label}
                validation={item?.validation}
                control={control}
                errors={errors}
                disabled={item?.disabled}
                classes="w-full"
              />
            ))
          ) : (
            <SelectField
              key="producer"
              control={control}
              name="producer"
              label="Select Producer"
              required
              disabled={false}
              menuItem={userArray}
              errors={errors}
              setValue={setValue}
              classes="w-full"
            />
          )}
        </div>
        <NotificationTable control={control} setValue={setValue}/>
       <div className="mt-8 w-32">
       <CustomButton className="w-full" type="submit" variant="contained" onClick={onSubmit}>
          Submit
        </CustomButton>
       </div>
      </div>
    </form>
  );
}

export default CreateCommunicationRestrictionForm;
