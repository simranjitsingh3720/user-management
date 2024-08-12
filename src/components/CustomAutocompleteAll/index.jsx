import React, { useState, useEffect, useCallback } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { All, PLACEHOLDER } from './constants';

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
  const [searchInputValue, setSearchInputValue] = useState('');
  const watchedValues = useWatch({ control, name });

  useEffect(() => {
    if (!isEdit) {
      setSelectedValues([]);
    }
  }, [roleChanged, name, isEdit]);

  useEffect(() => {
    if (isEdit && watchedValues) {
      setSelectedValues(Array.isArray(watchedValues) ? watchedValues : []);
    }
  }, [watchedValues, isEdit]);

  const isCheckedAll = useCallback(() => {
    return selectedValues.length === (apiDataMap[name]?.length || 0);
  }, [selectedValues, apiDataMap, name]);

  const toggleOption = (option) => {
    setSelectedValues((prevSelectedValues) => {
      const isSelected = prevSelectedValues.some((val) => val.value === option.value);
      let newSelectedValues;
      if (option?.value === All) {
        newSelectedValues = isCheckedAll() ? [] : apiDataMap[name] || [];
      } else {
        newSelectedValues = isSelected
          ? prevSelectedValues.filter((val) => val.value !== option.value)
          : [...prevSelectedValues, option];
      }
      setValue(name, newSelectedValues);
      return newSelectedValues;
    });
  };

  const handleAutocompleteChangeAll = useCallback(
    (event, newValue) => {
      if (newValue.some((val) => val.value === All)) {
        const allSelected = isCheckedAll() ? [] : apiDataMap[name] || [];
        setSelectedValues(allSelected);
        setValue(name, allSelected);
      } else {
        const uniqueNewValue = Array.from(new Set(newValue.map((item) => item.value))).map((value) =>
          newValue.find((item) => item.value === value)
        );
        setSelectedValues(uniqueNewValue);
        setValue(name, uniqueNewValue);
      }
      setSearchInputValue('');
    },
    [setValue, name, apiDataMap, isCheckedAll]
  );

  const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };
  useEffect(() => {
    if (!options || options.length === 0 || (options && options.every(isEmptyObject))) {
      if (!watchedValues) {
        setSelectedValues([]);
      } else {
        setSelectedValues(Array.isArray(watchedValues) ? watchedValues : []);
      }
    }
  }, [options, name, watchedValues]);

  const filteredOptions = searchInputValue
    ? options.filter((option) => option.label.toLowerCase().includes(searchInputValue.toLowerCase()))
    : options;

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
            options={filteredOptions.length > 0 ? [{ label: 'All', value: All }, ...filteredOptions] : []}
            disableCloseOnSelect
            disablePortal={true}
            getOptionLabel={(option) => option?.label}
            value={selectedValues}
            onChange={(event, newValue) => {
              handleAutocompleteChangeAll(event, newValue);
              field.onChange(newValue);
            }}
            inputValue={searchInputValue}
            onInputChange={(event, newInputValue) => {
              setSearchInputValue(newInputValue);
            }}
            renderOption={(props, option) => (
              <li
                {...props}
                key={option?.value || option?.roleName}
                onClick={(event) => {
                  event.stopPropagation();
                  toggleOption(option);
                }}
              >
                {showCheckbox && (
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={
                      option?.value === All ? isCheckedAll() : selectedValues.some((val) => val.value === option.value)
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
                  setSearchInputValue(e.target.value);
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
