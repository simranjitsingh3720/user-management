import React, { useState, useEffect } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import styles from './styles.module.scss';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { PLACEHOLDER, REQUIRED_MSG, ROLE_SELECT } from './constants';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const AutocompleteField = ({
  control,
  name,
  label,
  required = false,
  disabled = false,
  options = [],
  validation = {},
  errors = {},
  classes,
  multiple = false,
  resetClicked,
  roleChanged,
  isEdit,
  trigger,
  showCheckbox = true,
}) => {
  const [selectedValues, setSelectedValues] = useState(multiple ? [] : null);

  const watchedValues = useWatch({
    control,
    name,
  });

  useEffect(() => {
    if (isEdit) {
      setSelectedValues(watchedValues);
    }
  }, [watchedValues, isEdit]);

  useEffect(() => {
    if (resetClicked) {
      setSelectedValues(multiple ? [] : null);
    }
  }, [resetClicked, multiple]);

  useEffect(() => {
    if (roleChanged && name !== ROLE_SELECT && !isEdit) {
      setSelectedValues([]);
    }
  }, [roleChanged, name, isEdit]);

  const toggleOption = (option) => {
    if (multiple) {
      setSelectedValues((prevSelectedValues) => {
        const isSelected = prevSelectedValues?.some((val) => val.value === option.value);
        return isSelected
          ? prevSelectedValues?.filter((val) => val.value !== option.value)
          : [...(prevSelectedValues || []), option];
      });
    } else {
      setSelectedValues((prevSelectedValues) => (prevSelectedValues && prevSelectedValues.value === option.value ? null : option));
    }
  };

  useEffect(() => {
    if (!options || options.length === 0 || (options && options.every(isEmptyObject))) {
      setSelectedValues(multiple ? [] : null);
    }
  }, [options, multiple]);

  const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  return (
    <div className={styles.fieldContainerStyle}>
      <div className={styles.labelText}>
        {label} {required && <span className={styles.styledRequired}>*</span>}
      </div>
      <Controller
        name={name}
        control={control}
        rules={{ ...validation }}
        render={({ field }) => (
          <Autocomplete
            {...field}
            multiple={multiple}
            id={name}
            disabled={disabled}
            disableCloseOnSelect={multiple}
            options={options.length > 0 ? options : []}
            value={selectedValues || (multiple ? [] : null)}
            getOptionLabel={(option) => option?.label || ''}
            onChange={(event, newValue) => {
              setSelectedValues(newValue);
              field.onChange(newValue);
            }}
            renderOption={(props, option, { selected }) => (
              <li
                {...props}
                key={option?.value || option?.roleName}
                onClick={() => {
                  toggleOption(option);
                  if (multiple) {
                    const updatedValues = selectedValues?.some((val) => val.value === option.value)
                      ? selectedValues?.filter((val) => val.value !== option.value)
                      : [...(selectedValues || []), option];
                    setSelectedValues(updatedValues);
                    field.onChange(updatedValues); 
                  } else {
                    setSelectedValues(option);
                    field.onChange(option); 
                  }
                }}
              >
                {showCheckbox && multiple && (
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selectedValues?.some((val) => val.value === option.value)}
                  />
                )}
                {option.label}
              </li>
            )}
            size="small"
            className={`${styles.customizeSelect} ${classes}`}
            limitTags={1}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={PLACEHOLDER}
                sx={{
                  '& .MuiFormHelperText-root': {
                    margin: 0,
                  },
                }}
                error={Boolean(errors[name])}
                helperText={errors[name] ? `${label} is required` : ''}
                onChange={() => {
                  trigger(name);
                }}
                onBlur={() => {
                  trigger(name);
                }}
              />
            )}
          />
        )}
      />
    </div>
  );
};

export default AutocompleteField;
