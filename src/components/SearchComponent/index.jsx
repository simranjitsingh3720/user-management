import React from 'react';
import { Box, Grid, IconButton, InputAdornment, MenuItem, Select, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../CustomButton';
import { Controller, useForm } from 'react-hook-form';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ExportDropdown from '../../features/ExportDropdown';
import DateField from '../CustomDateInput';
import CloseIcon from '@mui/icons-material/Close';
import BulkUpload from '../../assets/BulkUpload';
import CustomAutoCompleteWithoutCheckbox from '../CustomAutoCompleteWithoutCheckbox';

function SearchComponent({
  optionsData,
  optionLabel,
  placeholder,
  renderOptionFunction,
  navigateRoute,
  searched,
  setSearched,
  selectOptions,
  textField,
  textFieldPlaceholder,
  dateField,
  showButton,
  showExportButton,
  hideSearch,
  canCreate,
  onSubmit,
  fetchData,
  showBulkUploadButton = false,
  tableHeader,
}) {
  const navigate = useNavigate();

  const handleCreateNewForm = () => {
    navigate(navigateRoute);
  };

  const { handleSubmit, control, setValue, formState, reset, watch, trigger } = useForm({
    defaultValues: {
      startDate: null,
      endDate: null,
      autocomplete: null,
      search: null,
    },
  });

  const handleBulkUpload = () => {
    navigate('bulk-upload');
  };

  const { errors } = formState;

  const handleResetButton = () => {
    reset({
      startDate: null,
      endDate: null,
      autocomplete: null,
      search: null,
    });
    fetchData();
  };

  const resetField = () => {
    setValue('autocomplete', null);
    setValue('search', '');
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        {dateField && (
          <Grid container spacing={2} alignItems="center" className="mb-4">
            <Grid item>
              <DateField
                key="startDate"
                control={control}
                name="startDate"
                labelVisible={true}
                label="Start Date"
                errors={errors}
                classes="w-full text-red-600"
                setValue={setValue}
                watch={watch}
                isEdit={true}
                trigger={trigger}
              />
            </Grid>
            <Grid item>
              <DateField
                key="endDate"
                control={control}
                name="endDate"
                labelVisible={true}
                label="End Date"
                errors={errors}
                classes="w-full text-red-600"
                setValue={setValue}
                watch={watch}
                isEdit={true}
                trigger={trigger}
              />
            </Grid>
          </Grid>
        )}
        <Grid container spacing={2} justifyContent="space-between" alignItems="center">
          {!hideSearch && (
            <Grid item md={8} xs={12}>
              <Grid container spacing={2} alignItems="center">
                {selectOptions && (
                  <Grid item xs={12} sm={4} md={3}>
                    <Select
                      labelId="search-select"
                      id="search-select"
                      value={searched}
                      onChange={(event) => {
                        resetField();
                        setSearched(event.target.value);
                      }}
                      fullWidth
                      displayEmpty
                      className="customize-select"
                      size="small"
                      renderValue={searched !== '' ? undefined : () => <span>Select</span>}
                    >
                      {selectOptions.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                )}
                <Grid item xs={12} sm={6} md={4}>
                  {textField ? (
                    <Controller
                      name="search"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          id="search"
                          variant="outlined"
                          placeholder={textFieldPlaceholder}
                          size="small"
                          className="customize-select"
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                          value={field?.value || ''}
                          fullWidth
                          InputProps={{
                            endAdornment: field.value ? (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => {
                                    field.onChange('');
                                    fetchData();
                                  }}
                                >
                                  <CloseIcon />
                                </IconButton>
                              </InputAdornment>
                            ) : null,
                          }}
                        />
                      )}
                    />
                  ) : (
                    <CustomAutoCompleteWithoutCheckbox
                      name="autocomplete"
                      control={control}
                      options={optionsData || []}
                      getOptionLabel={optionLabel}
                      placeholder={placeholder}
                      disableClearable={false}
                      onChangeCallback={(newValue) => {
                        if (newValue?.length === 0) {
                          fetchData();
                        }
                        setValue('autocomplete', newValue);
                      }}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      renderOption={renderOptionFunction}
                      multiple={true}
                      fullWidth
                    />
                  )}
                </Grid>
                <Grid item>
                  <CustomButton variant="outlined" type="submit">
                    Go
                  </CustomButton>
                  {dateField && (
                    <CustomButton
                      variant="outlined"
                      startIcon={<RestartAltIcon />}
                      sx={{ textTransform: 'none' }}
                      onClick={handleResetButton}
                    >
                      Reset
                    </CustomButton>
                  )}
                </Grid>
              </Grid>
            </Grid>
          )}
          <Grid item md={hideSearch ? 12 : 4} xs={12} className="flex justify-end">
            {showBulkUploadButton && (
              <CustomButton variant="outlined" onClick={handleBulkUpload} startIcon={<BulkUpload />} />
            )}
            {showExportButton && <ExportDropdown tableHeader={tableHeader} />}
            {showButton && canCreate && (
              <CustomButton variant="contained" onClick={handleCreateNewForm}>
                Create
              </CustomButton>
            )}
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default SearchComponent;
