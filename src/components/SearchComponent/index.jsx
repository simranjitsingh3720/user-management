import React from 'react';
import { Autocomplete, Box, Grid, IconButton, InputAdornment, MenuItem, Select, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../CustomButton';
import { Controller, useForm } from 'react-hook-form';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ExportDropdown from '../../features/ExportDropdown';
import DateField from '../CustomDateInput';
import CloseIcon from '@mui/icons-material/Close';
import BulkUpload from '../../assets/BulkUpload';

function SearchComponent({
  optionsData,
  optionLabel,
  placeholder,
  renderOptionFunction,
  buttonText,
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
}) {
  const navigate = useNavigate();

  const handleCreateNewForm = () => {
    navigate(navigateRoute);
  };

  const { handleSubmit, control, setValue, formState, reset, watch } = useForm({
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
                required
                errors={errors}
                classes="w-full text-red-600"
                setValue={setValue}
                watch={watch}
              />
            </Grid>
            <Grid item>
              <DateField
                key="endDate"
                control={control}
                name="endDate"
                labelVisible={true}
                label="End Date"
                required
                errors={errors}
                classes="w-full text-red-600"
                setValue={setValue}
                watch={watch}
              />
            </Grid>
          </Grid>
        )}
        <Grid container spacing={2} justifyContent="space-between" alignItems="center">
          {!hideSearch && (
            <Grid item lg={8} xs={12}>
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
                    <Controller
                      name="autocomplete"
                      control={control}
                      render={({ field }) => (
                        <Autocomplete
                          id="autocomplete"
                          options={optionsData || []}
                          getOptionLabel={optionLabel}
                          isOptionEqualToValue={(option, value) => option.id === value.id}
                          multiple
                          size="small"
                          renderInput={(params) => <TextField {...params} placeholder={placeholder} />}
                          value={field?.value || []}
                          className="customize-select"
                          onChange={(event, newValue) => {
                            if (newValue?.length === 0) {
                              fetchData();
                            }
                            field.onChange(newValue);
                          }}
                          renderOption={renderOptionFunction}
                          fullWidth
                        />
                      )}
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
          <Grid item lg={hideSearch ? 12 : 6} xs={12} className="flex justify-end">
            {showBulkUploadButton && (
              <CustomButton variant="outlined" onClick={handleBulkUpload} startIcon={<BulkUpload />} />
            )}
            {showExportButton && <ExportDropdown />}
            {showButton && canCreate && (
              <CustomButton variant="contained" onClick={handleCreateNewForm}>
                {buttonText}
              </CustomButton>
            )}
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default SearchComponent;
