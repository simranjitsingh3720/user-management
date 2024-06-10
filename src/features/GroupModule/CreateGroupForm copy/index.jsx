import {
  Button,
  IconButton,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Tooltip,
  Autocomplete,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LeftArrow from "../../../assets/LeftArrow";
import styles from "./styles.module.scss";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import useGetPermission from "../hooks/useGetPermission";
import useCreateGroup from "../hooks/useCreateGroup";
import useGetGroupById from "../hooks/useGetGroupByID";
import useUpdateGroup from "../hooks/useUpdateGroup";
import CloseIcon from "@mui/icons-material/Close";
import ListLoader from "../../../components/ListLoader";
import NoDataFound from "../../../components/NoDataCard";
import useGetUser from "../hooks/useGetUser";
import useUpdateUser from "../hooks/useUpdateUser";

const convertToDesiredFormat = (data, groupName, groupStatus) => {
  const permissions = data?.map((permission) => permission.id);
  const status = groupStatus === "active" ? true : false;
  return { permissions, groupName, status };
};

const convertUpdateFormat = (newData, oldData) => {
  const newDataIds = new Set(newData?.map((obj) => obj.id));

  const dataIds = new Set(oldData?.map((obj) => obj.id));

  // Finding added permissions
  const add = [...newDataIds].filter((id) => !dataIds.has(id));

  // Finding removed permissions
  const remove = [...dataIds].filter((id) => !newDataIds.has(id));

  return { add, remove };
};

function CreateGroupForm() {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [filteredPermission, setFilteredPermission] = useState([]);

  const { permissionData, permissionLoading } = useGetPermission();
  // const userVariable = useContext(GetUserContext);

  const { userData } = useGetUser(input);

  const [checkedPermission, setCheckedPermission] = useState([]);

  useEffect(() => {
    if (permissionData && permissionData?.data) {
      setCheckedPermission(permissionData?.data || []);
      setFilteredPermission(permissionData?.data || []);
    }
  }, [permissionData]);

  const { id } = useParams();

  const {
    loading: GroupUpdateLoading,
    data: groupData,
    fetchData,
  } = useGetGroupById();

  const navigate = useNavigate();

  const { UpdateDataFun, updateLoading } = useUpdateGroup();

  const { userPostData } = useUpdateUser();

  const { postData, loading } = useCreateGroup();

  const onSubmit = (data) => {
    if (id) {
      const selectPermissions = checkedPermission.filter(
        (item) => item.checked === true
      );
      const result = convertUpdateFormat(
        selectPermissions,
        groupData?.data?.permissions
      );

      const resultUser = convertUpdateFormat(
        data?.groupUser,
        groupData?.data?.users
      );

      const userUpdatePayload = {
        addUsers: resultUser.add,
        removeUsers: resultUser.remove,
        id: id,
      };

      const payload = {
        addPermissions: result.add,
        removePermissions: result.remove,
        properties: {
          groupName: data.groupName,
          status: data.groupStatus === "active" ? true : false,
        },
        id: id,
      };
      userPostData(userUpdatePayload);
      UpdateDataFun(payload);
    } else {
      const selectPermissions = checkedPermission.filter(
        (item) => item.checked === true
      );

      const result = convertToDesiredFormat(
        selectPermissions,
        data.groupName,
        data.groupStatus
      );
      postData(result, data.groupUser);
    }
  };
  const { handleSubmit, control, setValue, formState, getValues } = useForm({
    defaultValues: { groupName: "", groupStatus: "active", groupUser: [] },
  });

  const { errors } = formState;

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  useEffect(() => {
    if (groupData) {
      setValue("groupName", groupData?.data?.groupName);
      setValue("groupUser", groupData?.data?.users || []);
      setValue("groupStatus", groupData?.data?.status ? "active" : "inactive");
      if (permissionData && permissionData?.data) {
        setCheckedPermission((prev) => {
          const newCheckedPermission = [...prev];
          newCheckedPermission.forEach((permissionElement) =>
            (groupData?.data?.permissions || []).forEach((groupEle) => {
              if (groupEle.id === permissionElement.id) {
                permissionElement.checked = true;
                return;
              }
            })
          );
          return newCheckedPermission;
        });
        setFilteredPermission((prev) => {
          const newFilteredPermission = [...prev];
          newFilteredPermission.forEach((permissionElement) =>
            (groupData?.data?.permissions || []).forEach((groupEle) => {
              if (groupEle.id === permissionElement.id) {
                permissionElement.checked = true;
                return;
              }
            })
          );
          return newFilteredPermission;
        });
      }
    }
  }, [groupData, permissionData]);

  const handleChange = (item) => {
    const newPermissions = checkedPermission.map((permission) => {
      if (permission.id === item.id) {
        const updatedItem = { ...permission, checked: !permission.checked };
        return updatedItem;
        // return { ...permission, checked: !permission.checked };
      }
      return permission;
    });

    setCheckedPermission(newPermissions);
    setFilteredPermission(newPermissions);
  };

  useEffect(() => {
    if (query === "") {
      setFilteredPermission(checkedPermission);
    } else {
      const filteredData = checkedPermission.filter((item) =>
        item.permissionName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPermission(filteredData);
    }
  }, [query, checkedPermission]);

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
                  navigate("/group");
                }}
              >
                <LeftArrow />
              </IconButton>
              <span className={styles.headerTextStyle}>
                {id ? "Edit Group" : "Create New Group"}
              </span>
            </div>
          </div>{" "}
          <div className={styles.containerStyle}>
            <div className={styles.fieldContainerStyle}>
              <span className={styles.labelText}>
                Group Name <span className={styles.styledRequired}>*</span>
              </span>
              <Controller
                name="groupName"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    id="groupName"
                    variant="outlined"
                    placeholder="Enter Name"
                    size="small"
                    className={styles.customizeSelect}
                    {...field}
                    onChange={(e) => {
                      setValue("groupName", e.target.value);
                    }}
                  />
                )}
              />
              <div className={styles.styledError}>
                {errors.groupName && <span>This field is required</span>}{" "}
              </div>
            </div>
            <div className={styles.fieldContainerStyle}>
              <span className={styles.labelText}>
                Group Status <span className={styles.styledRequired}>*</span>
              </span>
              <Controller
                name="groupStatus"
                control={control}
                defaultValue={
                  id
                    ? groupData?.data?.status
                      ? "active"
                      : "inactive"
                    : "active"
                }
                rules={{ required: true }}
                render={({ field }) => (
                  <RadioGroup
                    row
                    aria-labelledby="insillion-status-row-radio-buttons-group-label"
                    name="groupStatus"
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
                {errors.groupName && <span>This field is required</span>}{" "}
              </div>
            </div>
          </div>
          <div className={styles.fieldContainerStyle}>
            <text className={styles.labelText}>Group User</text>
            <Controller
              name="groupUser" // Name of the field in the form data
              control={control}
              render={({ field }) => (
                <Autocomplete
                  multiple
                  id="groupUser"
                  value={getValues("groupUser")}
                  options={userData || []}
                  // open={open}
                  // onOpen={() => {
                  //   setOpen(true);
                  // }}
                  // onClose={(event) => {
                  //   if (event?.target?.innerHTML !== "") {
                  //     setOpen(false);
                  //   }
                  // }}
                  disableCloseOnSelect
                  getOptionLabel={(option) => {
                    return `${option?.firstName?.toUpperCase()} ${option?.lastName?.toUpperCase()}`;
                  }}
                  // getOptionLabel={(option) => option.permissionName}
                  limitTags={5}
                  className={styles.customizePrivilegeSelect}
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
                  onInputChange={(event, val) => {
                    setInput(val);
                  }}
                  // PaperComponent={(options) => {
                  //   const { containerProps, children } = options;
                  //   return (
                  //     <Paper {...containerProps}>
                  //       {children}

                  //       <div
                  //         style={{
                  //           width: "100%",
                  //           display: "flex",
                  //           justifyContent: "center",
                  //         }}
                  //       >
                  //         <Button
                  //           color="primary"
                  //           fullWidth
                  //           size="small"
                  //           disabled={userLoading}
                  //           onClick={() => handlePageChange()}
                  //         >
                  //           <span>Load more</span>
                  //         </Button>
                  //       </div>
                  //     </Paper>
                  //   );
                  // }}
                />
              )}
            />
          </div>
          <div className={styles.fieldContainerStyle}>
            <text className={styles.labelText}>
              Permissions <span className={styles.styledRequired}>*</span>
            </text>
            <div className={styles.permissionContainer}>
              <div className={styles.permissionSelect}>
                <div className={styles.permissionInnerSelect}>
                  {" "}
                  {(checkedPermission || []).map((item) => {
                    return (
                      item.checked && (
                        <div className={styles.permissionSelectButton}>
                          {item.permissionName.length > 25 ? (
                            <Tooltip title={item.permissionName}>
                              <span
                                className={styles.permissionNameStyle}
                              >{`${item.permissionName.substring(
                                0,
                                25
                              )}...`}</span>
                            </Tooltip>
                          ) : (
                            <span className={styles.permissionNameStyle}>
                              {item.permissionName || ""}
                            </span>
                          )}
                          <div className={styles.crossIconStyle}>
                            <IconButton
                              aria-label="back"
                              onClick={() => {
                                handleChange(item);
                              }}
                              size="small"
                            >
                              <CloseIcon color="primary" fontSize="inherit" />
                            </IconButton>
                          </div>
                        </div>
                      )
                    );
                  })}
                </div>
              </div>
              <div className={styles.permissionCheckbox}>
                <TextField
                  id="search"
                  variant="outlined"
                  placeholder="Search by permission name"
                  size="small"
                  className={styles.textFieldStyle}
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                />
                <div className={styles.permissionCheckbox}>
                  {permissionLoading ? (
                    <ListLoader rows={5} column={3} />
                  ) : filteredPermission.length ? (
                    (filteredPermission || []).map((item) => (
                      <div className={styles.checkboxStyle} key={item.id}>
                        {" "}
                        <Checkbox
                          checked={!!item.checked}
                          onChange={() => handleChange(item)}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                        {item.permissionName.length > 25 ? (
                          <Tooltip title={item.permissionName}>
                            <span
                              className={styles.checkBoxlabel}
                            >{`${item.permissionName.substring(
                              0,
                              25
                            )}...`}</span>
                          </Tooltip>
                        ) : (
                          <span className={styles.checkBoxlabel}>
                            {item.permissionName || ""}
                          </span>
                        )}
                      </div>
                    ))
                  ) : (
                    <NoDataFound />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button
          type="submit"
          variant="contained"
          className={styles.styledButton}
          disabled={loading || (id && GroupUpdateLoading) || updateLoading}
        >
          {id ? "Update" : "Submit"}
        </Button>
      </form>
    </div>
  );
}

export default CreateGroupForm;
