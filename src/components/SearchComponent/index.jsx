import React, { useEffect } from 'react';
import { Autocomplete, Box, Grid, MenuItem, Select, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../CustomButton';
import { Controller, useForm } from 'react-hook-form';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ExportDropdown from '../../features/ExportDropdown';

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
}) {
  const navigate = useNavigate();

  const handleCreateNewForm = () => {
    navigate(navigateRoute);
  };

  const { handleSubmit, control, setValue, formState, reset } = useForm({
    defaultValues: {
      startDate: null,
      endDate: null,
      producer: null,
      search: null,
    },
  });

  const { errors } = formState;

  console.log('errors', errors);

  // const onSubmit = (data) => {
  //   console.log('data', data);
  //   setDate({
  //     startDate: data.startDate,
  //     endDate: data.endDate,
  //   });
  // };

  const handleResetButton = () => {
    setValue('startDate', null);
    setValue('endDate', null);
    setValue('producer', null);
    setValue('search', null);
  };

  console.log('textField', textField);

  useEffect(() => {
    setValue('producer', null);
    setValue('search', null);
  }, [searched]);

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        {dateField && (
          <Grid container spacing={2} alignItems="center" className="mb-4">
            <Grid item>
              <div>
                <div className="label-text required-field">Start Date</div>
                <Controller
                  name="startDate"
                  control={control}
                  rules={{ required: 'Start date is required' }}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                      <DatePicker
                        className="customize-select"
                        slotProps={{
                          textField: { size: 'small' },
                        }}
                        value={field.value ? dayjs(field.value, 'DD/MM/YYYY') : null}
                        onChange={(date) => {
                          const formattedDate = dayjs(date).format('DD/MM/YYYY');
                          setValue('startDate', formattedDate);
                        }}
                        fullWidth
                      />
                    </LocalizationProvider>
                  )}
                />
                <div className="error-msg">{errors.startDate && <span>This field is required</span>}</div>
              </div>
            </Grid>
            <Grid item>
              <div>
                <div className="label-text required-field">End Date</div>
                <Controller
                  name="endDate"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                      <DatePicker
                        className="customize-select"
                        slotProps={{ textField: { size: 'small' } }}
                        value={field.value ? dayjs(field.value, 'DD/MM/YYYY') : null}
                        onChange={(date) => {
                          const formattedDate = dayjs(date).format('DD/MM/YYYY');
                          setValue('endDate', formattedDate);
                        }}
                        fullWidth
                      />
                    </LocalizationProvider>
                  )}
                />
                <div className="error-msg">{errors.endDate && <span>This field is required</span>}</div>
              </div>
            </Grid>
          </Grid>
        )}

        <Grid container spacing={2} justifyContent="space-between" alignItems="center">
          <Grid item lg={8} xs={12}>
            {!hideSearch && (
              <Grid container spacing={2} alignItems="center">
                {selectOptions && (
                  <Grid item xs={12} sm={4} md={3}>
                    <Select
                      labelId="search-select"
                      id="search-select"
                      value={searched}
                      onChange={(event) => {
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
                      rules={{ required: 'Search field is required' }}
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
                          value={field.value || ''}
                          error={Boolean(errors.search)}
                          helperText={errors.search?.message}
                          fullWidth
                        />
                      )}
                    />
                  ) : (
                    <Controller
                      name="producer"
                      control={control}
                      rules={{ required: 'Producer is required' }}
                      render={({ field }) => (
                        <Autocomplete
                          id="producer"
                          options={optionsData || []}
                          getOptionLabel={optionLabel}
                          multiple
                          size="small"
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder={placeholder}
                              error={Boolean(errors.producer)}
                              helperText={errors.producer?.message}
                            />
                          )}
                          value={field.value || []}
                          className="customize-select"
                          onChange={(event, newValue) => {
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
                  <CustomButton
                    variant="outlined"
                    startIcon={<RestartAltIcon />}
                    sx={{ textTransform: 'none' }}
                    onClick={handleResetButton}
                  >
                    Reset
                  </CustomButton>
                </Grid>
              </Grid>
            )}
          </Grid>

          <Grid item lg={4} xs={12} className="flex justify-end">
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
