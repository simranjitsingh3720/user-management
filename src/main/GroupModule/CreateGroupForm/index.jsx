import { Autocomplete, Button, IconButton, TextField } from "@mui/material";
import React, { useEffect } from "react";
import LeftArrow from "../../../assets/LeftArrow";
import styles from "./styles.module.scss";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import useGetPermission from "../hooks/useGetPermission";
import useCreateGroup from "../hooks/useCreateGroup";
import useGetGroupById from "../hooks/useGetGroupByID";
import useUpdateGroup from "../hooks/useUpdateGroup";

const convertToDesiredFormat = (data, groupName) => {
  const permissions = data?.map((permission) => permission.id);
  return { permissions, groupName };
};

const convertUpdateFormat = (data, groupData) => {
  const newDataIds = new Set(data?.permissions?.map((obj) => obj.id));

  const dataIds = new Set(groupData?.data?.permissions?.map((obj) => obj.id));

  // Finding added permissions
  const addPermissions = [...newDataIds].filter((id) => !dataIds.has(id));

  // Finding removed permissions
  const removePermissions = [...dataIds].filter((id) => !newDataIds.has(id));

  return { addPermissions, removePermissions };
};

function CreateGroupForm() {
  const { id } = useParams();

  const {
    loading: GroupUpdateLoading,
    data: groupData,
    fetchData,
  } = useGetGroupById();

  const navigate = useNavigate();

  const { permissionData } = useGetPermission();

  const { UpdateDataFun, updateLoading } = useUpdateGroup();

  const { postData, loading } = useCreateGroup();

  const onSubmit = (data) => {
    if (id) {
      const result = convertUpdateFormat(data, groupData);

      const payload = {
        addPermissions: result.addPermissions,
        removePermissions: result.removePermissions,
        properties: {
          groupName: data.groupName,
        },
        id: id,
      };

      UpdateDataFun(payload);
    } else {
      const result = convertToDesiredFormat(data.permissions, data.groupName);
      postData(result);
    }
  };
  const { handleSubmit, control, setValue, formState, getValues } = useForm({
    defaultValues: { groupName: "", permissions: [] },
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
      setValue("permissions", groupData?.data?.permissions || []);
    }
  }, [groupData]);

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
              <span className={styles.headerTextStyle}>Create new group</span>
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
              <text className={styles.labelText}>
                Permission Name <span className={styles.styledRequired}>*</span>
              </text>
              <Controller
                name="permissions" // Name of the field in the form data
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Autocomplete
                    multiple
                    id="permissions"
                    value={getValues("permissions")}
                    options={permissionData?.data || []}
                    getOptionLabel={(option) =>
                      option.permissionName.toUpperCase()
                    }
                    limitTags={2}
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
                  />
                )}
              />
              <div className={styles.styledError}>
                {errors.permissions && <span>This field is required</span>}
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
