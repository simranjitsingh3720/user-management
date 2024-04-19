import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import {
  Autocomplete,
  Button,
  Checkbox,
  IconButton,
  TextField,
} from "@mui/material";
import LeftArrow from "../../../assets/LeftArrow";
import { Controller, useForm } from "react-hook-form";
import useCreatePrivilege from "../hooks/useCreatePrivilege";
import { CrudSelect } from "../constants";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import useGetAllModule from "../hooks/useGetAllModule";
import capitalizeFirstLetter from "../../../globalization/globalizationFunction";
import useGetSubModule from "../hooks/useGetSubModule";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function CreateNewUserContainer() {
  const { AllModuleData } = useGetAllModule();

  const [array, setArray] = useState([]);
  const [module, setModule] = useState();
  const [selectedSubmodules, setSelectedSubmodules] = useState([]);

  const [permissionType, setPermissionType] = useState([]);

  const navigate = useNavigate();

  const { postData, loading } = useCreatePrivilege();

  const { SubModuleData, SubModuleFetchData } = useGetSubModule();

  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    let lastObject;

    let lastObjectId;

    if (selectedSubmodules.length) {
      lastObject = selectedSubmodules[selectedSubmodules.length - 1]; // Get the last object in the array
      lastObjectId = lastObject?.id;
    } else {
      lastObjectId = module?.id;
    }

    const permissionTypes = data?.permissionType?.map((item) => item.value);

    const result = [
      { subModuleId: lastObjectId, permissionTypes: permissionTypes },
    ];

    postData(result);
  };

  useEffect(() => {
    if (SubModuleData && SubModuleData.data) {
      const newArray = [...array, { SubModuleData: SubModuleData.data }];
      setArray(newArray);
    }
  }, [SubModuleData]);

  const clearModulesFromIndex = (index) => {
    const newArray = array.slice(0, index);
    setArray(newArray);
  };

  const handleSubmoduleChange = (newValue, index) => {
    SubModuleFetchData(newValue?.id);

    if (!newValue) {
      setSelectedSubmodules((prev) => [...prev.slice(0, index)]);
    } else {
      setSelectedSubmodules((prev) => [...prev.slice(0, index), newValue]);
    }

    if (index < array.length - 1) {
      clearModulesFromIndex(index + 1);
    }
  };

  useEffect(() => {
    setPermissionType([]);
    setValue("permissionType", []);
  }, [module]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.createNewUserContainer}>
          <div className={styles.formHeaderStyle}>
            <div className={styles.subHeader}>
              <IconButton
                aria-label="back"
                onClick={() => {
                  navigate("/permission");
                }}
              >
                <LeftArrow />
              </IconButton>
              <span className={styles.headerTextStyle}>
                Create new permission
              </span>
            </div>
          </div>
          <div>
            <div className={styles.formContainer}>
              <div className={styles.fieldContainerStyle}>
                <span className={styles.labelText}>
                  Module <span className={styles.styledRequired}>*</span>
                </span>
                <Controller
                  name="module"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Autocomplete
                      disablePortal
                      id={"module"}
                      options={(AllModuleData?.data || []).map((obj) => ({
                        label: capitalizeFirstLetter(obj?.moduleName || ""),
                        id: obj.id,
                      }))}
                      className={styles.customizeSelect}
                      size="small"
                      onChange={(event, newValue) => {
                        if (array) {
                          setArray([]);
                        }
                        if (selectedSubmodules) {
                          setSelectedSubmodules([]);
                        }
                        setModule(newValue);
                        SubModuleFetchData(newValue?.id);
                        field.onChange(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} placeholder="Select" />
                      )}
                      ListboxProps={{
                        style: {
                          maxHeight: "200px",
                        },
                      }}
                    />
                  )}
                />

                <div className={styles.styledError}>
                  {errors.module && <span>This field is required</span>}{" "}
                </div>
              </div>

              {array.map((item, index) => (
                <div className={styles.fieldContainerStyle}>
                  <span className={styles.labelText}>Sub Module</span>
                  <Controller
                    name={`subModule-${index}`}
                    control={control}
                    render={({ field }) => (
                      <Autocomplete
                        disablePortal
                        id={`subModule-${index}`}
                        options={(item?.SubModuleData || []).map((obj) => ({
                          label: capitalizeFirstLetter(obj?.moduleName || ""),
                          id: obj.id,
                        }))}
                        className={styles.customizeSelect}
                        size="small"
                        disabled={!watch("module")}
                        renderInput={(params) => (
                          <TextField {...params} placeholder="Select" />
                        )}
                        onChange={(event, newValue) => {
                          // SubModuleFetchData(newValue?.id);

                          // if (index < array.length - 1) {
                          //   clearModulesFromIndex(index + 1);
                          // }

                          handleSubmoduleChange(newValue, index);
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
                </div>
              ))}

              <div className={styles.fieldContainerStyle}>
                <span className={styles.labelText}>
                  Permission types{" "}
                  <span className={styles.styledRequired}>*</span>
                </span>
                <Controller
                  name="permissionType"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      multiple
                      id="permissionType"
                      options={CrudSelect}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option.label}
                      value={permissionType}
                      onChange={(event, newValue) => {
                        setPermissionType(newValue);
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
                      className={styles.customizeCrudSelect}
                      renderInput={(params) => (
                        <TextField {...params} placeholder="Select" />
                      )}
                    />
                  )}
                />
                {/* <Controller
                  name="permissionType"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <Select
                      labelId={"tags-label"}
                      id="tags"
                      multiple
                      input={<OutlinedInput />}
                      size="small"
                      className={styles.customizeSelect}
                      displayEmpty
                      onChange={(event, newValue) => {
                        field.onChange(newValue);
                      }}
                      renderValue={(selected) =>
                        selected.length > 0 ? (
                          selected.join(", ")
                        ) : (
                          <div className={styles.placeholderStyle}>Select</div>
                        )
                      }
                    >
                      {CrudSelect.map((tag) => (
                        <MenuItem key={tag.value} value={tag.value}>
                          <Checkbox checked />
                          <ListItemText primary={tag.label} />
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                /> */}
                <div className={styles.styledError}>
                  {errors.permissionType && <span>This field is required</span>}{" "}
                </div>
              </div>

              {/* <div className={styles.fieldContainerStyle}>
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
                      {PrivilegeStatusSelect.map(({ label, value }) => (
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
              </div> */}
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

export default CreateNewUserContainer;
