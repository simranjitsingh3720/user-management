import React, { useState, useEffect } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { PLACEHOLDER, ROLE_SELECT } from './constants';

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
  const isMultiple = multiple ? [] : null;
  const [selectedValues, setSelectedValues] = useState(isMultiple);
  const [open, setOpen] = useState(false);

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
      setSelectedValues(isMultiple);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetClicked, multiple]);

  useEffect(() => {
    if (name !== ROLE_SELECT && !isEdit) {
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
      setSelectedValues((prevSelectedValues) =>
        prevSelectedValues && prevSelectedValues.value === option.value ? null : option
      );
    }
  };

  useEffect(() => {
    if (!options || options.length === 0 || (options && options.every(isEmptyObject))) {
      setSelectedValues(isMultiple);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, multiple]);

  const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  return (
    <div className="m-0 flex flex-col">
      <div className="text-shuttleGray text-sm">
        {label} {required && <span className="text-persianRed">*</span>}
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
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            options={options.length > 0 ? options : []}
            value={selectedValues || isMultiple}
            getOptionLabel={(option) => option?.label || ''}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            disablePortal={true}
            onChange={(event, newValue) => {
              setSelectedValues(newValue);
              field.onChange(newValue);
              if (!multiple && newValue) {
                setOpen(false);
              }
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

                  // Close the dropdown if single value is selected
                  if (!multiple) {
                    setOpen(false);
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
            className={`bg-white text-sm ${classes}`}
            slotProps={{
              popper: {
                sx: {
                  zIndex: 1000,
                },
              },
            }}
            sx={
              multiple
                ? {
                    '& .MuiOutlinedInput-root': {
                      maxHeight: '40px',
                      overflow: 'auto',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                      backgroundColor: '#fff',
                      '&.Mui-focused': {
                        outline: 'none',
                        boxShadow: 'none',
                        borderColor: '#ccc',
                      },
                    },
                  }
                : null
            }
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={PLACEHOLDER}
                inputProps={{
                  ...params.inputProps,
                  style: {
                    textTransform: 'capitalize',
                  },
                }}
                sx={
                  multiple
                    ? {
                        '& .MuiFormHelperText-root': {
                          margin: 0,
                        },
                        '& fieldset': {
                          border: 'none',
                        },
                      }
                    : null
                }
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
