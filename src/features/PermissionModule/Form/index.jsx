import React, { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import CreateNewUserContainer from '../CreateNewPrivilegeForm';
import styles from './styles.module.scss';
import AddIcon from '@mui/icons-material/Add';
import useCreatePrivilege from '../hooks/useCreatePrivilege';
import CustomButton from '../../../components/CustomButton';
import CustomFormHeader from '../../../components/CustomFormHeader';
import { FORM_HEADER_TEXT } from '../../../utils/constants';

function Form() {
  const [selectedSubmodules, setSelectedSubmodules] = useState({});
  const [permissionType, setPermissionType] = useState({});

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
          <div className="p-4">
            <CustomFormHeader headerText={FORM_HEADER_TEXT.PERMISSION} navigateRoute="/permission" />
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
