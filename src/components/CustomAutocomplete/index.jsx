import React, { useState } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import styles from './styles.module.scss';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useEffect } from 'react';
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
}) => {
  const [selectedValues, setSelectedValues] = useState(name === ROLE_SELECT ? null : []);

  const watchedValues = useWatch({
    control,
    name,
  });

  useEffect(() => {
    if (isEdit) {
      setSelectedValues(watchedValues);
    }
  }, [watchedValues]);

  useEffect(() => {
    if (multiple) {
      setSelectedValues([]);
    } else if (name === ROLE_SELECT) {
      setSelectedValues(null);
    } else {
      setSelectedValues([]);
    }
  }, [resetClicked]);

  useEffect(() => {
    if (name !== ROLE_SELECT && !isEdit) {
      setSelectedValues([]);
    }
  }, [roleChanged]);

  const handleAutocompleteChangeMultiple = (event, newValue) => {
    setSelectedValues(newValue);
  };

  const handleAutocompleteChangeSingle = (event, newValue) => {
    setSelectedValues(newValue);
  };

  const isSelected = (option) => {
    if (multiple) {
      if (selectedValues?.length > 0) {
        return selectedValues?.some((selectedOption) => selectedOption?.value === option?.value);
      }
    } else {
      if (name === ROLE_SELECT) {
        return selectedValues?.roleName === option?.roleName;
      } else {
        return selectedValues?.value === option?.value;
      }
    }
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
            value={name === ROLE_SELECT && !selectedValues ? null : selectedValues || []}
            getOptionLabel={(option) => option?.label}
            // {...(multiple || name === ROLE_SELECT
            //   ? { value: selectedValues }
            //   : {})}
            onChange={(event, newValue) => {
              if (multiple) {
                handleAutocompleteChangeMultiple(event, newValue);
              } else {
                handleAutocompleteChangeSingle(event, newValue);
              }
              field.onChange(newValue);
            }}
            renderOption={(props, option, { selected }) => (
              <li {...props} key={option?.value || option?.roleName}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={isSelected(option)}
                  onChange={() => {
                    let newValue;
                    if (multiple) {
                      if (isSelected(option)) {
                        newValue = selectedValues.filter((selectedOption) => selectedOption?.value !== option?.value);
                      } else {
                        newValue = [...selectedValues, option];
                      }
                    } else {
                      newValue = isSelected(option) ? null : option;
                    }
                    setSelectedValues(newValue);
                    field.onChange(newValue);
                  }}
                />
                {option.label}
              </li>
            )}
            size="small"
            className={`${styles.customizeSelect} ${classes}`}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={PLACEHOLDER}
                error={Boolean(errors[name])}
                helperText={errors[name] ? REQUIRED_MSG : ''}
              />
            )}
          />
        )}
      />
    </div>
  );
};

export default AutocompleteField;
