import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { CrudSelect } from '../constants';
import capitalizeFirstLetter from '../../../utils/globalizationFunction';
import useGetSubModule from '../hooks/useGetSubModule';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomButton from '../../../components/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllModules } from '../../../stores/slices/modulesSlice';
import CustomAutoCompleteWithoutCheckbox from '../../../components/CustomAutoCompleteWithoutCheckbox';

function CreateNewUserContainer({
  uniqueIdentifier,
  index,
  remove,
  selectedSubmodules,
  setSelectedSubmodules,
  control,
  setValue,
  errors,
  permissionType,
  setPermissionType,
  trigger,
}) {
  const itemLength = Object.keys(selectedSubmodules).map((key) => ({
    key,
    value: selectedSubmodules[key],
  })).length;

  const dispatch = useDispatch();
  const { data: AllModuleData } = useSelector((state) => state.modules);

  useEffect(() => {
    dispatch(fetchAllModules());
  }, [dispatch]);

  const [array, setArray] = useState([]);

  const { SubModuleData, SubModuleLoading, SubModuleFetchData } = useGetSubModule();

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
      setSelectedSubmodules((prev) => {
        const updatedSubmodules = { ...prev };
        const previousData = updatedSubmodules[uniqueIdentifier] || [];
        updatedSubmodules[uniqueIdentifier] = [...previousData.slice(0, index + 1)];
        return updatedSubmodules;
      });
    } else {
      setSelectedSubmodules((prev) => {
        const updatedSubmodules = { ...prev };
        const previousData = updatedSubmodules[uniqueIdentifier] || [];
        const newData = newValue ? [{ id: newValue.id, label: newValue.label }] : [];
        updatedSubmodules[uniqueIdentifier] = [...previousData.slice(0, index + 1), ...newData];
        return updatedSubmodules;
      });
    }

    if (index < array.length - 1) {
      clearModulesFromIndex(index + 1);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} lg={4}>
        <CustomAutoCompleteWithoutCheckbox
          label="Module"
          name={`module-${index}`}
          control={control}
          required={true}
          options={(AllModuleData?.data || []).map((obj) => ({
            label: obj?.moduleName || '',
            id: obj.id,
          }))}
          getOptionLabel={(option) => option.label}
          placeholder="Select"
          trigger={trigger}
          onChangeCallback={(event, newValue) => {
            if (array) {
              setArray([]);
            }

            setSelectedSubmodules((prev) => ({
              ...prev,
              [uniqueIdentifier]: newValue ? [newValue] : [],
            }));
            setPermissionType((prev) => ({
              ...prev,
              [uniqueIdentifier]: [],
            }));
            setValue(`permissionType-${index}`, []);

            SubModuleFetchData(newValue?.id);
          }}
          rules={{ required: 'Module is required' }}
          error={Boolean(errors[`module-${index}`])}
          helperText={errors?.[`module-${index}`]?.message}
        />
      </Grid>

      {array.map((item, idx) => (
        <Grid item xs={12} sm={6} lg={4} key={idx}>
          <CustomAutoCompleteWithoutCheckbox
            label="Sub Module"
            name={`subModule-${idx}`}
            control={control}
            required={true}
            options={(item?.SubModuleData || []).map((obj) => ({
              label: capitalizeFirstLetter(obj?.moduleName || ''),
              id: obj.id,
            }))}
            getOptionLabel={(option) => option.label}
            placeholder="Select"
            trigger={trigger}
            onChangeCallback={(event, newValue) => {
              handleSubmoduleChange(newValue, idx);
            }}
            rules={{ required: 'Sub Module is required' }}
            error={Boolean(errors[`subModule-${idx}`])}
            helperText={errors?.[`subModule-${idx}`]?.message}
          />
        </Grid>
      ))}

      <Grid item xs={12} sm={6} lg={4}>
        <CustomAutoCompleteWithoutCheckbox
          label="Permission Types"
          name={`permissionType-${index}`}
          control={control}
          required={true}
          options={CrudSelect}
          getOptionLabel={(option) => option.label}
          placeholder="Select"
          trigger={trigger}
          multiple
          limitTags={2}
          rules={{ required: 'Permission Types are required' }}
          error={Boolean(errors[`permissionType-${index}`])}
          helperText={errors?.[`permissionType-${index}`]?.message}
          onChangeCallback={(newValue) => {
            setPermissionType((prev) => ({
              ...prev,
              [uniqueIdentifier]: newValue,
            }));
          }}
        />
      </Grid>

      <Grid item xs={12} lg={4}>
        <div className="mt-6">
          {(index > 0 || itemLength > 1) && (
            <CustomButton
              type="button"
              variant="text"
              startIcon={<DeleteIcon />}
              onClick={() => remove()}
              color="secondary"
            >
              Remove
            </CustomButton>
          )}
        </div>
      </Grid>
    </Grid>
  );
}

export default CreateNewUserContainer;
