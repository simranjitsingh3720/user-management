import {
  Autocomplete,
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
import styles from "./styles.module.scss";
import LeftArrow from "../../../assets/LeftArrow";
import useGetLobListData from "../hooks/useGetLobListData";
import useCreateProduct from "../hooks/useCreateProduct";

function ProductForm() {
  const navigate = useNavigate();

  const { handleSubmit, control, setValue, formState } = useForm();
  const { errors } = formState;

  const { data } = useGetLobListData();

  const { postData, loading } = useCreateProduct();

  const onSubmit = (data) => {
    const payload = {
      product: data.product,
      product_code: data.product_code,
      product_value: data.product_value,
      lob_id: data.lob.id,
      status: data.status === "active" ? true : false,
    };
    postData(payload);
  };

  const formField1 = [
    {
      label: "Product",
      value: "product",
    },
    {
      label: "Product Code",
      value: "product_code",
    },
    {
      label: "Product Value",
      value: "product_value",
    },
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
                  navigate("/product");
                }}
              >
                <LeftArrow />
              </IconButton>
              <span className={styles.headerTextStyle}>Create new product</span>
            </div>
          </div>{" "}
          <div className={styles.containerStyle}>
            {formField1.map((item) => (
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
                Lob Name <span className={styles.styledRequired}>*</span>
              </text>
              <Controller
                name="lob" // Name of the field in the form data
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Autocomplete
                    id="groups"
                    options={data?.data || []}
                    getOptionLabel={(option) =>
                      option?.lob?.toUpperCase() || ""
                    }
                    className={styles.customizeSelect}
                    size="small"
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Select" />
                    )}
                    onChange={(event, newValue) => {
                      field.onChange(newValue);
                    }}
                    ListboxProps={{
                      style: {
                        maxHeight: "200px",
                      },
                    }}
                  />
                )}
              />
              <div className={styles.styledError}>
                {errors.lob && <span>This field is required</span>}
              </div>
            </div>
            <div className={styles.fieldContainerStyle}>
              <text className={styles.labelText}>
                Status <span className={styles.styledRequired}>*</span>
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
          Submit
        </Button>
      </form>
    </div>
  );
}

export default ProductForm;
