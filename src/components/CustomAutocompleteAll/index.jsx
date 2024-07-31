import React, { useState, useEffect, useCallback } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { All, NA, PLACEHOLDER } from './constants';

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
  isEdit,
  showCheckbox = true,
}) => {
  const [selectedValues, setSelectedValues] = useState([]);

  const naOption = options.find((option) => option.label === NA);

  useEffect(() => {
    setSelectedValues([]);
  }, [resetClicked, roleChanged]);

  const watchedValues = useWatch({ control, name });

  useEffect(() => {
    if (isEdit) {
      setSelectedValues(watchedValues);
    }
  }, [watchedValues, isEdit]);

  useEffect(() => {
    if (naOption) {
      setSelectedValues([naOption]);
      setValue(name, [naOption]);
    }
  }, [options, control, name, setValue, naOption]);

  const isCheckedAll = useCallback(() => {
    return selectedValues?.length === apiDataMap[name]?.length;
  }, [selectedValues, apiDataMap, name]);

  const toggleOption = (option) => {
    setSelectedValues((prevSelectedValues) => {
      if (option?.value === All) {
        if (isCheckedAll()) {
          return [];
        } else {
          return apiDataMap[name] || [];
        }
      } else {
        const isSelected =
          prevSelectedValues &&
          prevSelectedValues.some((val) => val.value === option.value);
        if (isSelected) {
          return prevSelectedValues.filter((val) => val.value !== option.value);
        } else {
          const safePrevSelectedValues = Array.isArray(prevSelectedValues) ? prevSelectedValues : [];
          return [...safePrevSelectedValues, option];
        }
      }
    });
  };

  const handleAutocompleteChangeAll = useCallback((event, newValue) => {
    setSelectedValues(newValue);
  }, []);

  const isEmptyObject = (obj) => {
    if (obj) {
      return Object.keys(obj).length === 0 && obj.constructor === Object;
    }
  };

  useEffect(() => {
    if (!options || options.length === 0 || (options && options.every(isEmptyObject))) {
      setSelectedValues([]);
    }
  }, [options]);

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
            multiple
            id={name}
            options={options.length > 0 ? [{ label: 'All', value: All }, ...(options || [])] : []}
            disableCloseOnSelect
            disablePortal={true}
            getOptionLabel={(option) => option?.label}
            value={selectedValues || []}
            onChange={(event, newValue) => {
              handleAutocompleteChangeAll(event, newValue);
              field.onChange(newValue);
            }}
            renderOption={(props, option, { selected }) => (
              <li
                {...props}
                key={option?.value || option?.roleName}
                onClick={() => {
                  toggleOption(option);
                  field.onChange(
                    option?.value === All
                      ? isCheckedAll()
                        ? []
                        : apiDataMap[name] || []
                      : selectedValues &&
                        selectedValues.some((val) => val.value === option.value)
                      ? selectedValues.filter((val) => val.value !== option.value)
                      : [...(Array.isArray(selectedValues) ? selectedValues : []), option]
                  );
                }}
              >
                {showCheckbox && (
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={
                      option?.value === All
                        ? isCheckedAll()
                        : selectedValues &&
                          selectedValues.some((val) => val.value === option.value)
                    }
                  />
                )}
                {option.label}
              </li>
            )}
            size="small"
            className={`bg-white text-sm ${classes}`}
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
                onChange={(e) => {
                  field.onChange(e);
                  trigger(name);
                }}
                onBlur={(e) => {
                  field.onBlur();
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

export default AutocompleteFieldAll;
