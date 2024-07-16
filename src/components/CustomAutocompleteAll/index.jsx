import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import styles from './styles.module.scss';
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useEffect } from 'react';
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
  roleChanged
}) => {
  const [selectedValues, setSelectedValues] = useState([]);

  useEffect(() => {
    setSelectedValues([]);
  }, [resetClicked]);

  useEffect(()=> {
    if(name !== ROLE_SELECT){
      setSelectedValues([])
    }
  },[roleChanged]);

  const handleAutocompleteChangeAll = (event, newValue) => {
    if (newValue.some(option => option?.value === All)) {
      if (isCheckedAll()) {
        setSelectedValues([]);
      } else {
        setSelectedValues(apiDataMap[name] || []);
      }
    } else {
      setSelectedValues(newValue.filter(option => option?.value !== All));
    }
  };

  const isCheckedAll = () => {
    return selectedValues.length === (apiDataMap[name]?.length);
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
            options={options?.length > 0 ? [{ label: 'All', value: 'all' }, ...(options || [])] : []}
            disableCloseOnSelect
            getOptionLabel={(option) => option?.label}
            value={selectedValues || []}
            onChange={(event, newValue) => {
              handleAutocompleteChangeAll(event, newValue);
              field.onChange(newValue);
              if (newValue?.length !== 0 && newValue[0]?.value === All) {
                field.onChange(apiDataMap[name])
              }
            }}
            renderOption={(props, option, {selected}) => (
              <li {...props} key={option?.value}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  checked={option?.value === All ? isCheckedAll() : selected}
                />
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
                helperText={Boolean(errors[name]) ? REQUIRED_MSG : ''}
              />
            )}
          />
        )}
      />
    </div>
  );
}

export default AutocompleteFieldAll;
