import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import CreateNewUserContainer from "../CreateNewPrivilegeForm copy";
import { IconButton, Button } from "@mui/material";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import LeftArrow from "../../../assets/LeftArrow";
import AddIcon from "@mui/icons-material/Add";
import useCreatePrivilege from "../hooks/useCreatePrivilege";

function Form() {
  const [selectedSubmodules, setSelectedSubmodules] = useState({});
  const [permissionType, setPermissionType] = useState({});

  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      items: [{}],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const handleRemoveRow = (indexToRemove, id) => {
    setSelectedSubmodules((prev) => {
      const newSelectedSubModules = { ...prev };
      delete newSelectedSubModules[id];
      return newSelectedSubModules;
    });

    setPermissionType((prev) => {
      const newPermissionType = { ...prev };
      delete newPermissionType[id];
      return newPermissionType;
    });

    remove(indexToRemove);
  };
  const { postData, loading } = useCreatePrivilege();

  const onSubmit = () => {
    const formattedData = [];

    // Iterate over selected modules
    for (const moduleId in selectedSubmodules) {
      const subModules = selectedSubmodules[moduleId];
      const lastSubModule = subModules[subModules.length - 1]; // Get the last sub-module
      const subModuleId = lastSubModule.id;
      const permissionTypes = permissionType[moduleId].map(
        (permission) => permission.value
      );
      formattedData.push({ subModuleId, permissionTypes });
    }
    postData(formattedData);
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
                  navigate("/permission");
                }}
              >
                <LeftArrow />
              </IconButton>
              <span className={styles.headerTextStyle}>
                Create New Permission
              </span>
            </div>
          </div>

          {fields.map((item, index) => (
            <CreateNewUserContainer
              key={item.id}
              uniqueIdentifier={item.id}
              index={index}
              remove={() => handleRemoveRow(index, item.id)}
              selectedSubmodules={selectedSubmodules}
              setSelectedSubmodules={setSelectedSubmodules}
              control={control}
              setValue={setValue}
              errors={errors}
              permissionType={permissionType}
              setPermissionType={setPermissionType}
            />
          ))}

          <Button
            type="button"
            variant="text"
            className={styles.styledAppendButton}
            size="small"
            startIcon={<AddIcon />}
            onClick={() => append({})}
          >
            Add New Permission
          </Button>
        </div>
        <Button
          type="submit"
          variant="contained"
          className={styles.styledButton}
          disabled={loading}
          size="small"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Form;
