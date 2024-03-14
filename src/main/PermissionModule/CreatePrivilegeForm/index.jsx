import {
  Autocomplete,
  Button,
  Checkbox,
  IconButton,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import LeftArrow from "../../../assets/LeftArrow";
import styles from "./styles.module.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { selectData } from "../../UserManagement/constants";
import {
  CrudSelect,
  PrivilegeStatusSelect,
  PrivilegeTypeSelect,
} from "../constants";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import useCreatePrivilege from "../hooks/useCreatePrivilege";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const PrivilegeForm = () => {
  const { name } = useParams();

  const location = useLocation();
  //   const { state: { item } = {} } = location;

  //   console.log("item", item);

  const [selectedTags, setSelectedTags] = useState([]);

  const { postData, loading } = useCreatePrivilege();

  console.log("loading", loading);

  const onSubmit = (data) => {
    postData(data);
  };
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      items: [
        {
          permissionName: "",
          type: "api",
          module: "",
          subModule: "",
          api: "",
          status: "active",
          permissionType: [],
        },
      ],
    },
  });

  //   useEffect(() => {
  //     if (item) {
  //       // If item data is provided, set default form values
  //       setValue("items", item);
  //     }
  //   }, [item, setValue]);

  //   useEffect(() => {
  //     if (name) {
  //       // If an ID is provided (i.e., editing mode), fetch privilege data by ID
  //       const fetchPrivilegeData = async () => {
  //         try {
  //           const privilegeData = await getPrivilegeById(id); // Call your API function to get privilege data by ID
  //           if (privilegeData) {
  //             // If privilege data is retrieved successfully, set the default form values
  //             setValue("items", privilegeData.items);
  //           }
  //         } catch (error) {
  //           console.error("Error fetching privilege data:", error);
  //         }
  //       };
  //       fetchPrivilegeData();
  //     }
  //   }, [id, setValue]);

  const handleRemoveRow = (index) => {
    // Remove the row from the fields array
    remove(index);

    // Remove the corresponding entry from the selectedTags state array
    const updatedSelectedTags = [...selectedTags];
    updatedSelectedTags.splice(index, 1);
    setSelectedTags(updatedSelectedTags);
  };

  // Function to handle changes in selected values of multiple select field
  const handleTagsChange = (event, index) => {
    const options = event?.target?.value;
    const selectedValues = options.map((option) => option);
    const updatedSelectedTags = [...selectedTags];
    updatedSelectedTags[index] = selectedValues;
    setSelectedTags(updatedSelectedTags);
    setValue(`items[${index}].permissionType`, selectedValues);
  };

  console.log("selectedTags", selectedTags[0]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });
  const navigate = useNavigate();

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
                Create New Privilege
              </span>
            </div>
          </div>
          <div>
            <ul>
              {fields.map((field, index) => (
                <li key={field.id} className={styles.listStyle}>
                  <div className={styles.formContainer}>
                    <div className={styles.fieldContainerStyle}>
                      <span className={styles.labelText}>
                        Name <span className={styles.styledRequired}>*</span>
                      </span>
                      <Controller
                        name={`items[${index}].permissionName`}
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field }) => (
                          <TextField
                            id="permissionName"
                            variant="outlined"
                            placeholder="Enter Name"
                            size="small"
                            className={styles.customizeSelect}
                            {...field}
                            onChange={(e) => {
                              setValue(
                                `items[${index}].permissionName`,
                                e.target.value
                              );
                            }}
                          />
                        )}
                      />
                      <div className={styles.styledError}>
                        {errors.items &&
                          errors.items[index] &&
                          errors.items[index].permissionName && (
                            <span>This field is required</span>
                          )}{" "}
                      </div>
                    </div>
                    <div className={styles.fieldContainerStyle}>
                      <span className={styles.labelText}>
                        Privilege Type{" "}
                        <span className={styles.styledRequired}>*</span>
                      </span>
                      <Controller
                        name={`items[${index}].type`}
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            labelId="privilege-type"
                            id="privilege-type"
                            size="small"
                            className={styles.customizeSelect}
                            defaultValue={PrivilegeTypeSelect[0].value}
                            {...field}
                            onChange={(e) => {
                              setValue(`items[${index}].type`, e.target.value);
                            }}
                          >
                            {PrivilegeTypeSelect.map(({ label, value }) => (
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
                    </div>
                    <div className={styles.styledError}>
                      {errors.items &&
                        errors.items[index] &&
                        errors.items[index].type && (
                          <span>This field is required</span>
                        )}{" "}
                    </div>
                    {watch(`items[${index}].type`) === "ui" && (
                      <>
                        <div className={styles.fieldContainerStyle}>
                          <span className={styles.labelText}>
                            Module{" "}
                            <span className={styles.styledRequired}>*</span>
                          </span>
                          <Controller
                            name={`items[${index}].module`}
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <Autocomplete
                                disablePortal
                                id="module"
                                options={selectData}
                                className={styles.customizeSelect}
                                size="small"
                                onChange={(event, newValue) => {
                                  field.onChange(newValue?.value);
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
                            {errors.items &&
                              errors.items[index] &&
                              errors.items[index].module && (
                                <span>This field is required</span>
                              )}{" "}
                          </div>
                        </div>

                        <div className={styles.fieldContainerStyle}>
                          <span className={styles.labelText}>Sub Module</span>
                          <Controller
                            name={`items[${index}].subModule`}
                            control={control}
                            render={({ field }) => (
                              <Autocomplete
                                disablePortal
                                id="subModule"
                                options={selectData}
                                className={styles.customizeSelect}
                                size="small"
                                disabled={!watch(`items[${index}].module`)}
                                renderInput={(params) => (
                                  <TextField {...params} placeholder="Select" />
                                )}
                                onChange={(event, newValue) => {
                                  field.onChange(newValue?.value);
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
                      </>
                    )}

                    {watch(`items[${index}].type`) === "api" && (
                      <div className={styles.fieldContainerStyle}>
                        <span className={styles.labelText}>
                          API <span className={styles.styledRequired}>*</span>
                        </span>
                        <Controller
                          name={`items[${index}].api`}
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Autocomplete
                              disablePortal
                              id="api"
                              options={selectData}
                              className={styles.customizeSelect}
                              size="small"
                              renderInput={(params) => (
                                <TextField {...params} placeholder="Select" />
                              )}
                              onChange={(event, newValue) => {
                                field.onChange(newValue?.value);
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
                          {errors.items &&
                            errors.items[index] &&
                            errors.items[index].api && (
                              <span>This field is required</span>
                            )}{" "}
                        </div>
                      </div>
                    )}
                    <div className={styles.fieldContainerStyle}>
                      <span className={styles.labelText}>
                        Crud <span className={styles.styledRequired}>*</span>
                      </span>
                      {/* <Controller
                        name={`items[${index}].crud`}
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Autocomplete
                            {...field}
                            multiple
                            id="crud"
                            options={CrudSelect}
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
                      /> */}
                      <Controller
                        name={`items[${index}].permissionType`}
                        control={control}
                        defaultValue={[]}
                        render={({ field }) => (
                          <Select
                            labelId={`tags-label-${index}`}
                            id={`tags-${index}`}
                            multiple
                            value={selectedTags[index] || []}
                            onChange={(event) => handleTagsChange(event, index)}
                            input={<OutlinedInput />}
                            size="small"
                            className={styles.customizeSelect}
                            displayEmpty
                            renderValue={(selected) =>
                              selected.length > 0 ? (
                                selected.join(", ")
                              ) : (
                                <div className={styles.placeholderStyle}>
                                  Select
                                </div>
                              )
                            }
                          >
                            {CrudSelect.map((tag) => (
                              <MenuItem key={tag.value} value={tag.value}>
                                <Checkbox
                                  checked={(selectedTags[index] || []).includes(
                                    tag.value
                                  )}
                                />
                                <ListItemText primary={tag.label} />
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      />
                      <div className={styles.styledError}>
                        {errors.items &&
                          errors.items[index] &&
                          errors.items[index].permissionType && (
                            <span>This field is required</span>
                          )}{" "}
                      </div>
                    </div>

                    <div className={styles.fieldContainerStyle}>
                      <span className={styles.labelText}>
                        Status <span className={styles.styledRequired}>*</span>
                      </span>
                      <Controller
                        name={`items[${index}].status`}
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
                              setValue(
                                `items[${index}].status`,
                                e.target.value
                              );
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
                        {errors.items &&
                          errors.items[index] &&
                          errors.items[index].status && (
                            <span>This field is required</span>
                          )}{" "}
                      </div>
                    </div>
                  </div>
                  {index > 0 && (
                    <div className={styles.deleteIconStyle}>
                      <IconButton
                        aria-label="back"
                        type="button"
                        onClick={() => handleRemoveRow(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <div className={styles.buttonContainer}>
              {/* <Button
                type="button"
                variant="contained"
                onClick={() =>
                  append({
                    name: "",
                    privilegeType: "api",
                    privilegeStatus: "active",
                  })
                }
              >
                Add More
              </Button> */}
              <IconButton
                aria-label="back"
                type="button"
                onClick={() =>
                  append({
                    permissionName: "",
                    type: "api",
                    status: "active",
                  })
                }
              >
                <AddCircleIcon fontSize="large" color="primary" />
              </IconButton>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          variant="contained"
          className={styles.styledButton}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default PrivilegeForm;
