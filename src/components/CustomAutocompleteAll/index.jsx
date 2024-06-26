import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import styles from './styles.module.scss';
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useEffect } from 'react';

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
  roleChanged
}) => {
  const [selectedValues, setSelectedValues] = useState([]);

  useEffect(() => {
    setSelectedValues([]);
  }, [resetClicked]);

  useEffect(()=> {
    if(name !== "roleSelect"){
      setSelectedValues([])
    }
  },[roleChanged]);

  const handleAutocompleteChangeAll = (event, newValue) => {
    if (newValue.some(option => option?.value === 'all')) {
      if (isCheckedAll()) {
        setSelectedValues([]);
      } else {
        setSelectedValues(apiDataMap[name] || []);
      }
    } else {
      setSelectedValues(newValue.filter(option => option?.value !== 'all'));
    }
  };

  const isCheckedAll = () => {
    return selectedValues.length === (apiDataMap[name]?.length);
  };

  const isSelected = (option) => {
    return selectedValues.some(selectedOption => selectedOption?.value === option?.value);
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
            multiple
            id={name}
            options={[{ label: 'All', value: 'all' }, ...(options || [])]}
            disableCloseOnSelect
            getOptionLabel={(option) => option?.label}
            value={selectedValues || []}
            onChange={(event, newValue) => {
              handleAutocompleteChangeAll(event, newValue);
              field.onChange(newValue);
              if (newValue?.length !== 0 && newValue[0]?.value === "all") {
                field.onChange(apiDataMap[name])
              }
            }}
            renderOption={(props, option) => (
              <li {...props} key={option?.value}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={option?.value === 'all' ? isCheckedAll() : isSelected(option)}
                />
                {option.label}
              </li>
            )}
            size="small"
            className={`${styles.customizeSelect} ${classes}`}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select"
                error={Boolean(errors[name])}
                helperText={Boolean(errors[name]) ? 'This field is required' : ''}
              />
            )}
          />
        )}
      />
    </div>
  );
}

export default AutocompleteFieldAll;
