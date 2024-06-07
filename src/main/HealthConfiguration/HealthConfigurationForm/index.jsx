import {
  Autocomplete,
  Button,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import LeftArrow from "../../../assets/LeftArrow";
import styles from "./styles.module.scss";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import useUpdatePaymentConfig from "../hooks/useUpdateHealthConfig";
import { BitlyLinkMandatory } from "../constants";
import useGetUserData from "../../BANCALogin/hooks/useGetUserData";
import useCreateHealthConfig from "../hooks/useCreateHealthConfig";
import useGetHealthConfigByID from "../hooks/useGetHealthConfigById";

function HealthConfigurationForm() {
  const { id } = useParams();

  const { handleSubmit, control, setValue, formState } = useForm({
    defaultValues: {
      producerCode: null,
      medicare: null,
    },
  });

  const { data: healthConfigData, fetchData: fetchHealthConfigByID } =
    useGetHealthConfigByID();

  const { userData } = useGetUserData();

  useEffect(() => {
    if (id) fetchHealthConfigByID(id);
  }, [id]);

  const navigate = useNavigate();

  const { postData, loading: createPaymentLoading } = useCreateHealthConfig();

  const { UpdateDataFun, updateLoading } = useUpdatePaymentConfig();

  const { errors } = formState;

  useEffect(() => {
    if (healthConfigData && healthConfigData?.data) {
      setValue("producerCode", healthConfigData?.data?.producer || null);
      setValue(
        "medicare",
        healthConfigData?.data?.isExistingCustomer ? "yes" : "no" || null
      );
    }
  }, [healthConfigData]);

  const onSubmit = (data) => {
    if (id) {
      const payload = {
        id: id,
        properties: {
          status: true,
          isExistingCustomer: data?.medicare === "yes" ? true : false,
        },
      };
      UpdateDataFun(payload);
    } else {
      const payload = {
        producerId: data?.producerCode?.id,
        isExistingCustomer: data?.medicare === "yes" ? true : false,
      };
      postData(payload);
    }
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
                  navigate("/health-config");
                }}
              >
                <LeftArrow />
              </IconButton>
              <span className={styles.headerTextStyle}>
                <div className={styles.setOTPHeaderOTP}>
                  {id
                    ? "Update Health Configuration"
                    : "Create Health Configuration"}
                </div>
              </span>
            </div>
          </div>{" "}
          <div className={styles.containerStyle}>
            <div className={styles.fieldContainerStyle}>
              <text className={styles.labelText}>
                Select Producer
                <span className={styles.styledRequired}>*</span>
              </text>
              <Controller
                name="producerCode" // Name of the field in the form data
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Autocomplete
                    id="producerCode"
                    value={field.value}
                    disabled={id}
                    options={userData || []}
                    getOptionLabel={(option) => {
                      return `${option?.firstName?.toUpperCase() || ""} ${
                        option?.lastName?.toUpperCase() || ""
                      }`;
                    }}
                    className={styles.customizeSelect}
                    size="small"
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
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
                {errors.producerCode && <span>This field is required</span>}{" "}
              </div>
            </div>
            <div className={styles.fieldContainerStyle}>
              <text className={styles.labelText}>
                Medicare Existing TATA AIG General Insurance Customer
                <span className={styles.styledRequired}>*</span>
              </text>
              <Controller
                name="medicare" // Name of the field in the form data
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <Select
                    labelId="search-select"
                    id="medicare"
                    value={field.value}
                    onChange={(event, newValue) => {
                      field.onChange(event.target.value);
                    }}
                    size="small"
                    displayEmpty
                    className={styles.customizeSelect}
                    renderValue={(selected) => {
                      if (selected === undefined) {
                        return (
                          <div className={styles.placeholderStyle}>Select</div>
                        );
                      }
                      const selectedItem = BitlyLinkMandatory.find(
                        (item) => item.value === selected
                      );
                      return selectedItem ? selectedItem.label : "";
                    }}
                  >
                    {BitlyLinkMandatory.map((item) => (
                      <MenuItem
                        value={item.value}
                        className={styles.styledOptionText}
                      >
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              <div className={styles.styledError}>
                {errors.medicare && <span>{errors.medicare.message}</span>}
              </div>
            </div>
          </div>
        </div>
        <Button
          type="submit"
          variant="contained"
          className={styles.styledButton}
          disabled={updateLoading || createPaymentLoading}
        >
          {id ? "Update" : "Submit"}
        </Button>
      </form>
    </div>
  );
}

export default HealthConfigurationForm;
