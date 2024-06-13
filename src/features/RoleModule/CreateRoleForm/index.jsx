import { Autocomplete,  IconButton, TextField } from "@mui/material";
import React, { useEffect } from "react";
import LeftArrow from "../../../assets/LeftArrow";
import styles from "./styles.module.scss";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useGetGroup from "../hooks/useGetGroup";
import useCreateRole from "../hooks/useCreateRole";
import useGetRoleById from "../hooks/useGetRoleByID";
import useUpdateRole from "../hooks/useUpdateRole";
import CustomButton from "../../../components/CustomButton";

const convertToDesiredFormat = (data, roleName) => {
  const groupId = data.id;
  return { groupId, roleName };
};

const convertUpdateFormat = (data) => {
  return { roleName: data.roleName, groupId: data.groups.id };
};

function CreateRoleForm() {
  const { id } = useParams();

  const {
    loading: roleUpdateLoading,
    data: roleData,
    fetchData,
  } = useGetRoleById();

  const navigate = useNavigate();

  const { data: allGroupData } = useGetGroup();

  const { UpdateDataFun, updateLoading } = useUpdateRole(id);

  const { postData, loading } = useCreateRole();

  const onSubmit = (data) => {
    if (id) {
      const result = convertUpdateFormat(data);
      UpdateDataFun(result);
    } else {
      const result = convertToDesiredFormat(data.groups, data.roleName);
      postData(result);
    }
  };
  const { handleSubmit, control, setValue, formState, getValues } = useForm({
    defaultValues: { roleName: "", groups: {} },
  });

  const { errors } = formState;

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);
  useEffect(() => {
    if (roleData) {
      setValue("roleName", roleData?.data?.roleName);
      setValue("groups", roleData?.data?.group || {});
    }
  }, [roleData]);

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
                  navigate("/roles");
                }}
              >
                <LeftArrow />
              </IconButton>
              <span className={styles.headerTextStyle}>
                {" "}
                {id ? "Edit Role" : "Create New Role"}
              </span>
            </div>
          </div>{" "}
          <div className={styles.containerStyle}>
            <div className={styles.fieldContainerStyle}>
              <span className={styles.labelText}>
                Role Name <span className={styles.styledRequired}>*</span>
              </span>
              <Controller
                name="roleName"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    id="roleName"
                    variant="outlined"
                    placeholder="Enter Name"
                    size="small"
                    className={styles.customizeSelect}
                    {...field}
                    onChange={(e) => {
                      setValue("roleName", e.target.value);
                    }}
                  />
                )}
              />
              <div className={styles.styledError}>
                {errors.roleName && <span>This field is required</span>}{" "}
              </div>
            </div>
            <div className={styles.fieldContainerStyle}>
              <text className={styles.labelText}>
                Group Name <span className={styles.styledRequired}>*</span>
              </text>
              <Controller
                name="groups" // Name of the field in the form data
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Autocomplete
                    id="groups"
                    value={getValues("groups") || {}}
                    options={allGroupData?.data || []}
                    getOptionLabel={(option) =>
                      option?.groupName?.toUpperCase() || ""
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
                {errors.groups && <span>This field is required</span>}
              </div>
            </div>
          </div>
        </div>
        <CustomButton
          type="submit"
          variant="contained"
          
          disabled={loading || (id && roleUpdateLoading) || updateLoading}
        >
          {id ? "Update" : "Submit"}
        </CustomButton>
      </form>
    </div>
  );
}

export default CreateRoleForm;
