import React, { useState, useEffect, useCallback } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import styles from './styles.module.scss';
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { All, PLACEHOLDER, REQUIRED_MSG, ROLE_SELECT } from './constants';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const AutocompleteFieldAll = ({
  control,
  name,
  label,
  required = false,
  disabled = false,
  options = [],
  validation = {},
  errors = {},
  apiDataMap,
  classes,
  resetClicked,
  roleChanged,
  setValue,
  trigger,
  isEdit
}) => {
  const [selectedValues, setSelectedValues] = useState([]);
  const naOption = options.find(option => option.label === 'NA');

  useEffect(() => {
    setSelectedValues([]);
  }, [resetClicked]);

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
    const naOption = options.find(option => option.label === 'NA');
    if (naOption) {
      setSelectedValues([naOption]);
      setValue(name, [naOption]);
    } else {
      setSelectedValues([]);
    }
  }, [options, control, name, setValue]);

  const isCheckedAll = useCallback(() => {
    return selectedValues.length === (apiDataMap[name]?.length);
  }, [selectedValues, apiDataMap, name]);

  const handleAutocompleteChangeAll = useCallback((event, newValue) => {
    if (newValue.some(option => option?.value === All)) {
      if (isCheckedAll()) {
        setSelectedValues([]);
        setValue(name, []);
      } else {
        setSelectedValues(apiDataMap[name] || []);
        setValue(name, apiDataMap[name] || []);
      }
    } else {
      const filteredValues = newValue.filter(option => option?.value !== All);
      setSelectedValues(filteredValues);
      setValue(name, filteredValues);
    }
  }, [apiDataMap, isCheckedAll, name, setValue]);

  const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  useEffect(() => {
    if (!options || options.length === 0 || (options && isEmptyObject(options[0]))) {
      setSelectedValues([]);
    }
  }, [options, name]);

  return (
    <div className={styles.fieldContainerStyle}>
      <div className={styles.labelText}>
        {label} {required && <span className={styles.styledRequired}>*</span>}
      </div>
      <Controller
        name={name}
        control={control}
        rules={{ required: required ? `${label} is required` : false }}
        render={({ field }) => (
          <Autocomplete
            {...field}
            multiple
            id={name}
            options={options?.length > 0 ? [{ label: 'All', value: 'all' }, ...(options || [])] : []}
            disableCloseOnSelect
            getOptionLabel={(option) => option?.label}
            value={selectedValues || []}
            onChange={(event, newValue) => {
              handleAutocompleteChangeAll(event, newValue);
              field.onChange(newValue.some(option => option?.value === All) ? apiDataMap[name] || [] : newValue.filter(option => option?.value !== All));
            }}
            renderOption={(props, option, { selected }) => (
              <li {...props} key={option?.value}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  checked={option?.value === All ? isCheckedAll() : selectedValues.some(val => val.value === option.value)}
                />
                {option.label}
              </li>
            )}
            size="small"
            className={`${styles.customizeSelect} ${classes}`}
            limitTags={1}
            disabled={naOption}
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
                onChange={(e) => {
                  field.onChange(e);
                  trigger(name);
                }}
                onBlur={(e) => {
                  field.onBlur();
                  trigger(name);
                }}
                helperText={errors[name] ? `${label} is required` : ''}
              />
            )}
          />
        )}
      />
    </div>
  );
};

export default AutocompleteFieldAll;
