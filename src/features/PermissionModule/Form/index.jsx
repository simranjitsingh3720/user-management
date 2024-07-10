import React, { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import CreateNewUserContainer from '../CreateNewPrivilegeForm';
import { IconButton, Typography } from '@mui/material';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import LeftArrow from '../../../assets/LeftArrow';
import AddIcon from '@mui/icons-material/Add';
import useCreatePrivilege from '../hooks/useCreatePrivilege';
import CustomButton from '../../../components/CustomButton';

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
    name: 'items',
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

    for (const moduleId in selectedSubmodules) {
      const subModules = selectedSubmodules[moduleId];
      const lastSubModule = subModules[subModules.length - 1];
      const subModuleId = lastSubModule.id;
      const permissionTypes = permissionType[moduleId].map((permission) => permission.value);
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
                  navigate('/permission');
                }}
              >
                <LeftArrow />
              </IconButton>
              <Typography variant="h5" className="ml-3 font-semibold">
                Create New Permission
              </Typography>
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

          <CustomButton
            type="button"
            variant="text"
            sx={{ 'margin-left': '2rem', 'margin-bottom': '16px' }}
            startIcon={<AddIcon />}
            onClick={() => append({})}
          >
            <span className="underline">Add New Permission</span>
          </CustomButton>
        </div>
        <CustomButton type="submit" variant="contained" disabled={loading}>
          Submit
        </CustomButton>
      </form>
    </div>
  );
}

export default Form;
