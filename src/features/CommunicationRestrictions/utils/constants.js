import { emailRegex, mobileRegex, nameRegex } from "../../../utils/globalConstants";

export const userArray = [
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

export const customerArr = [
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
          value: nameRegex,
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
          value: emailRegex,
          message: "Please enter a valid email address",
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
          value: mobileRegex,
          message: "It should contain only digits",
        },
      },
    },
  ];