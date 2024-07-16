import React from 'react';
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
  option,
  setOption,
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
  setQuery,
  setDate,
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

  const { handleSubmit, control, setValue, formState } = useForm({
    defaultValues: {
      startDate: null,
      endDate: null,
      selectOption: null,
      producer: null,
      searchField: null,
    },
  });

  const { errors } = formState;

  console.log('errors', errors);

  const handleResetButton = () => {
    setDate({});
    setValue('startDate', null);
    setValue('endDate', null);
  };

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
          <Grid item lg={7} xs={12}>
            {!hideSearch && (
              <Grid container spacing={2} alignItems="center">
                {selectOptions && (
                  <Grid item xs={12} sm={4} md={3}>
                    <Controller
                      name="selectOption"
                      control={control}
                      rules={{ required: 'Start date is required' }}
                      render={({ field }) => (
                        <Select
                          id="selectOption"
                          value={searched}
                          onChange={(event) => setSearched(event.target.value)}
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
                      )}
                    />
                  </Grid>
                )}
                <Grid item xs={12} sm={6} md={6}>
                  {textField ? (
                    <Controller
                      name="searchField"
                      control={control}
                      rules={{ required: 'Start date is required' }}
                      render={({ field }) => (
                        <TextField
                          id="searchField"
                          variant="outlined"
                          placeholder={textFieldPlaceholder}
                          size="small"
                          className="customize-select"
                          onChange={(e) => {
                            setQuery(e.target.value);
                          }}
                          fullWidth
                        />
                      )}
                    />
                  ) : (
                    <Controller
                      name="producer"
                      control={control}
                      rules={{ required: 'Start date is required' }}
                      render={({ field }) => (
                        <Autocomplete
                          id="producer"
                          options={optionsData || []}
                          getOptionLabel={optionLabel}
                          multiple
                          size="small"
                          renderInput={(params) => <TextField {...params} placeholder={placeholder} />}
                          className="customize-select"
                          value={option}
                          onChange={(event, newValue) => setOption(newValue)}
                          renderOption={renderOptionFunction}
                          ListboxProps={{
                            style: { maxHeight: '200px' },
                          }}
                          fullWidth
                        />
                      )}
                    />
                  )}
                </Grid>
                <Grid item xs={12} sm={6} md={3} className="flex">
                  <CustomButton type="submit" variant="outlined">
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

          <Grid item lg={5} xs={12} className="flex justify-end">
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
