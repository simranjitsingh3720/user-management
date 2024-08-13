import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Autocomplete, Checkbox, TextField, Tooltip, Skeleton } from '@mui/material';
import { Controller } from 'react-hook-form';
import { CrudSelect } from '../constants';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import capitalizeFirstLetter from '../../../utils/globalizationFunction';
import useGetSubModule from '../hooks/useGetSubModule';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomButton from '../../../components/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllModules } from '../../../stores/slices/modulesSlice';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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
    <div className={styles.formContainer}>
      <div className={styles.moduleWrapper}>
        <div className={styles.fieldContainerStyle}>
          <span className={styles.labelText}>
            Module <span className={styles.styledRequired}>*</span>
          </span>
          <Controller
            name={`module-${index}`}
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Autocomplete
                disablePortal
                id={`module-${index}`}
                options={(AllModuleData?.data || []).map((obj) => ({
                  label: capitalizeFirstLetter(obj?.moduleName || ''),
                  id: obj.id,
                }))}
                className={styles.customizeSelect}
                size="small"
                onChange={(event, newValue) => {
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
                  field.onChange(newValue);
                }}
                renderInput={(params) => <TextField {...params} placeholder="Select" />}
                ListboxProps={{
                  style: {
                    maxHeight: '200px',
                  },
                }}
              />
            )}
          />

          <div className={styles.styledError}>{errors[`module-${index}`] && <span>Module is required</span>} </div>
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
                  disableClearable={true}
                  id={`subModule-${index}`}
                  options={(item?.SubModuleData || []).map((obj) => ({
                    label: capitalizeFirstLetter(obj?.moduleName || ''),
                    id: obj.id,
                  }))}
                  className={styles.customizeSelect}
                  size="small"
                  renderInput={(params) => <TextField {...params} placeholder="Select" />}
                  onChange={(event, newValue) => {
                    handleSubmoduleChange(newValue, index);
                    field.onChange(newValue);
                  }}
                  ListboxProps={{
                    style: {
                      maxHeight: '200px',
                    },
                  }}
                />
              )}
            />
          </div>
        ))}

        <div className={styles.fieldContainerStyle}>
          <span className={styles.labelText}>
            Permission Types <span className={styles.styledRequired}>*</span>
          </span>
          <Controller
            name={`permissionType-${index}`}
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Autocomplete
                {...field}
                multiple
                loading={SubModuleLoading}
                limitTags={2}
                id={`permissionType-${index}`}
                options={CrudSelect}
                disableCloseOnSelect
                getOptionLabel={(option) => option.label}
                value={permissionType[uniqueIdentifier] || []}
                onChange={(event, newValue) => {
                  setPermissionType((prev) => ({
                    ...prev,
                    [uniqueIdentifier]: newValue,
                  }));
                  field.onChange(newValue);
                }}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                    {option.label}
                  </li>
                )}
                size="small"
                className={styles.customizeCrudSelect}
                renderInput={(params) => <TextField {...params} placeholder="Select" />}
              />
            )}
          />

          <div className={styles.styledError}>
            {errors[`permissionType-${index}`] && <span>Permission Types is required</span>}{' '}
          </div>
        </div>
      </div>

      <div className={styles.buttonWrapper}>
        {(index > 0 || itemLength > 1) && (
          <Tooltip title="Remove permission">
            <CustomButton type="button" variant="text" startIcon={<DeleteIcon />} onClick={() => remove()}>
              Remove
            </CustomButton>
          </Tooltip>
        )}
      </div>
    </div>
  );
}

export default CreateNewUserContainer;
