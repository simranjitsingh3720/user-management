import React, { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import CreateNewUserContainer from '../CreateNewPrivilegeForm';
import AddIcon from '@mui/icons-material/Add';
import useCreatePrivilege from '../hooks/useCreatePrivilege';
import CustomButton from '../../../components/CustomButton';
import CustomFormHeader from '../../../components/CustomFormHeader';
import { FORM_HEADER_TEXT } from '../../../utils/constants';
import { Box, Card, CardContent, Grid } from '@mui/material';

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
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomFormHeader headerText={FORM_HEADER_TEXT.PERMISSION} navigateRoute="/permission" />
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
              <CustomButton type="button" variant="text" startIcon={<AddIcon />} onClick={() => append({})}>
                <span className="underline">Add New Permission</span>
              </CustomButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <div className="mt-4">
        <CustomButton type="submit" variant="contained" disabled={loading}>
          Submit
        </CustomButton>
      </div>
    </Box>
  );
}

export default Form;
