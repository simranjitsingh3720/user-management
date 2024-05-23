import {
  Button,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import LeftArrow from "../../../assets/LeftArrow";
import useCreateLob from "../hooks/useCreateLob";

function LobForm() {
  const navigate = useNavigate();

  const { handleSubmit, control, setValue, formState } = useForm();
  const { errors } = formState;

  const { postData, loading } = useCreateLob();

  const onSubmit = (data) => {
    data.status === "active" ? (data.status = true) : (data.status = false);
    postData(data);
  };

  const formField = [
    {
      label: "LOB Name",
      value: "lob",
    },
    {
      label: "LOB Value",
      value: "lob_value",
    },
    // {
    //   label: "LOB Level",
    //   value: "lob_level",
    // },
    // {
    //   label: "LOB Code",
    //   value: "lob_code",
    // },
  ];

  return (
    <div>
      {" "}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.createNewUserContainer}>
          <div className={styles.formHeaderStyle}>
            <div className={styles.subHeader}>
              <IconButton
                aria-label="back"
                onClick={() => {
                  navigate("/lob");
                }}
              >
                <LeftArrow />
              </IconButton>
              <span className={styles.headerTextStyle}>Create New Lob</span>
            </div>
          </div>{" "}
          <div className={styles.containerStyle}>
            {formField.map((item) => (
              <div className={styles.fieldContainerStyle}>
                <span className={styles.labelText}>
                  {item.label} <span className={styles.styledRequired}>*</span>
                </span>
                <Controller
                  name={item.value}
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      id={item.value}
                      variant="outlined"
                      placeholder="Enter Name"
                      size="small"
                      className={styles.customizeSelect}
                      {...field}
                      onChange={(e) => {
                        setValue(item.value, e.target.value);
                      }}
                    />
                  )}
                />
                <div className={styles.styledError}>
                  {errors[item?.value] && <span>This field is required</span>}{" "}
                </div>
              </div>
            ))}
            <div className={styles.fieldContainerStyle}>
              <text className={styles.labelText}>
                LOB Status <span className={styles.styledRequired}>*</span>
              </text>
              <Controller
                name="status" // Name of the field in the form data
                control={control}
                rules={{ required: "Status is required" }}
                defaultValue="active"
                render={({ field }) => (
                  <RadioGroup
                    row
                    aria-labelledby="status-row-radio-buttons-group-label"
                    name="status"
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
                {errors.status && <span>{errors.status.message}</span>}
              </div>
            </div>
          </div>
        </div>
        <Button
          type="submit"
          variant="contained"
          className={styles.styledButton}
          disabled={loading}
        >
          {loading ? "Submiting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}

export default LobForm;
