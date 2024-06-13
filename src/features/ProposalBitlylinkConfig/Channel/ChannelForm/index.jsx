import {
  Autocomplete,
  
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import LeftArrow from "../../../../assets/LeftArrow";
import { BitlyLinkMandatory } from "../../constants";
import CustomButton from "../../../../components/CustomButton";

function ChannelForm() {
  const navigate = useNavigate();

  const { handleSubmit, control, formState } = useForm();
  const { errors } = formState;

  const onSubmit = (data) => {};

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
                  navigate("/proposal-bitly-config");
                }}
              >
                <LeftArrow />
              </IconButton>
              <span className={styles.headerTextStyle}> Create Config</span>
            </div>
          </div>{" "}
          <div className={styles.containerStyle}>
            <div className={styles.fieldContainerStyle}>
              <text className={styles.labelText}>
                Select Channel <span className={styles.styledRequired}>*</span>
              </text>
              <Controller
                name="channel" // Name of the field in the form data
                control={control}
                rules={{ required: "Channel is required" }}
                render={({ field }) => (
                  <Autocomplete
                    id="channel"
                    options={[]}
                    getOptionLabel={(option) =>
                      option?.groupName?.toUpperCase() || ""
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
                {errors.channel && <span>{errors.channel.message}</span>}
              </div>
            </div>
            <div className={styles.fieldContainerStyle}>
              <text className={styles.labelText}>
                Bitly Link Mandatory{" "}
                <span className={styles.styledRequired}>*</span>
              </text>
              <Controller
                name="bitlyLinkMandatory" // Name of the field in the form data
                control={control}
                rules={{ required: "Bitly Link is required" }}
                render={({ field }) => (
                  <Select
                    labelId="search-select"
                    id="bitlyLinkMandatory"
                    onChange={(event, newValue) => {
                      field.onChange(newValue);
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
                {errors.bitlyLinkMandatory && (
                  <span>{errors.bitlyLinkMandatory.message}</span>
                )}
              </div>
            </div>
          </div>
        </div>
        <CustomButton
          type="submit"
          variant="contained"
          
        >
          Submit
        </CustomButton>
      </form>
    </div>
  );
}

export default ChannelForm;
