import {
  Autocomplete,
  
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import { ProposalEODBypass } from "../constants";
import useGetUserData from "../../BANCALogin/hooks/useGetUserData";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import "dayjs/locale/en-gb";
import CustomButton from "../../../components/CustomButton";
import ExportDropdown from "../../ExportDropdown";

const fetchIdsAndConvert = (inputData) => {
  const ids = (inputData || []).map((producer) => producer.id);
  return ids.join();
};

function SearchComponenet({
  fetchData,
  setPageChange,
  setQuery,
  searched,
  setSearched,
  producers,
  setProducers,
  date,
  setDate,
  canCreate
}) {
  const navigate = useNavigate();

  const handleCreateNewForm = () => {
    navigate("/producer-eod-bypass-list/form");
  };

  const { userData } = useGetUserData();

  const { handleSubmit, control, setValue, formState } = useForm({
    defaultValues: {
      startDate: null,
      endDate: null,
    },
  });

  const { errors } = formState;

  const onSubmit = (data) => {
    setDate({
      startDate: data.startDate,
      endDate: data.endDate,
    });
  };

  const handleChange = (event) => {
    setSearched(event.target.value);
  };

  const handleGo = () => {
    const resultProducersId = fetchIdsAndConvert(producers);
    fetchData(null, resultProducersId);
  };

  const handleResetButton = () => {
    setDate({});
    setValue("startDate", null);
    setValue("endDate", null);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.dateSearchConatainer}>
          <div className={styles.upperContainerStyle}>
            <div className={styles.dateContainer}>
              <div className={styles.startDateStyle}>
                <div className={styles.labelText}>
                  Start Date <span className={styles.styledRequired}>*</span>
                </div>
                <Controller
                  name="startDate" 
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      adapterLocale="en-gb"
                    >
                      <DatePicker
                        className={styles.dateStyle}
                        value={
                          field.value ? dayjs(field.value, "DD/MM/YYYY") : null
                        }
                        slotProps={{ textField: { size: "small" } }}
                        onChange={(date) => {
                          const formattedDate =
                            dayjs(date).format("DD/MM/YYYY");
                          setValue("startDate", formattedDate);
                        }}
                      />
                    </LocalizationProvider>
                  )}
                />
                <div className={styles.styledError}>
                  {errors.startDate && <span>This field is required</span>}
                </div>
              </div>
              <div>
                <div className={styles.labelText}>
                  End Date <span className={styles.styledRequired}>*</span>
                </div>
                <Controller
                  name="endDate" 
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      adapterLocale="en-gb"
                    >
                      <DatePicker
                        className={styles.dateStyle}
                        value={
                          field.value ? dayjs(field.value, "DD/MM/YYYY") : null
                        }
                        onChange={(date) => {
                          const formattedDate =
                            dayjs(date).format("DD/MM/YYYY");
                          setValue("endDate", formattedDate);
                        }}
                        slotProps={{ textField: { size: "small" } }}
                      />
                    </LocalizationProvider>
                  )}
                />
                <div className={styles.styledError}>
                  {errors.endDate && <span>This field is required</span>}
                </div>
              </div>

              <CustomButton
                variant="outlined"
                type="submit"
                className={styles.stylesButton}
              >
                Go
              </CustomButton>
              <div>
                <CustomButton
                  variant="outlined"
                  startIcon={<RestartAltIcon />}
                  sx={{ textTransform: "none" }}
                  onClick={() => handleResetButton()}
                >
                  Reset
                </CustomButton>
              </div>
            </div>
            <div>
              <ExportDropdown />
              { canCreate && 
              (<CustomButton
                variant="contained"
                onClick={handleCreateNewForm}
                sx={{ textTransform: "none" }}
              >
                <Typography nowrap="true" className={styles.buttonTextStyle}>
                  Create New Producer EOD Bypass
                </Typography>
              </CustomButton>)
              }

            </div>
          </div>
          <div>
            <div className={styles.flexSearchContainer}>
              <Select
                labelId="search-select"
                id="search-select"
                value={searched}
                onChange={handleChange}
                size="small"
                displayEmpty
                className={styles.customizeSelect}
                renderValue={
                  searched !== ""
                    ? undefined
                    : () => (
                        <div className={styles.placeholderStyle}>Select</div>
                      )
                }
              >
                {ProposalEODBypass.map((item) => (
                  <MenuItem
                    value={item.value}
                    className={styles.styledOptionText}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </Select>

              {searched === "producers" ? (
                <Autocomplete
                  multiple
                  id="groupMultiSelect"
                  options={userData || []}
                  getOptionLabel={(option) => {
                    return `${option?.firstName?.toUpperCase()} ${option?.lastName?.toUpperCase()}`;
                  }}
                  className={styles.customizeGroupSelect}
                  limitTags={2}
                  disableCloseOnSelect
                  size="small"
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Select" />
                  )}
                  onChange={(event, newValue) => {
                    setProducers(newValue);
                  }}
                  ListboxProps={{
                    style: {
                      maxHeight: "200px",
                    },
                  }}
                />
              ) : (
                <TextField
                  id="search"
                  variant="outlined"
                  placeholder="Search"
                  size="small"
                  className={styles.textFieldSearch}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPageChange(1);
                  }}
                />
              )}
              <CustomButton variant="outlined" onClick={handleGo}>
                Go
              </CustomButton>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SearchComponenet;
