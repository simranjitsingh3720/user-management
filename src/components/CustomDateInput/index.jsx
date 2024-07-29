import React, { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { END_DATE, ERR_MSG, START_DATE } from './utils/constants';
import { DATE_FORMAT } from './../../utils/globalConstants';

const DateField = ({
  control,
  watch,
  setValue,
  name,
  label,
  required,
  rules = {},
  errors = {},
  classes,
  labelVisible,
  isEdit = false,
  trigger,
  disable
}) => {
  // const minDate = dayjs(MIN_ALLOWED_DATE);
  // const seventyYearsFromNow = dayjs().add(70, 'year');

  const validateDate = (value) => {
    if (!value) {
      return required ? `${label} is required` : true;
    }

    const date = dayjs(value, DATE_FORMAT);

    if (!date.isValid()) {
      return ERR_MSG.INVALID_DATE_ERR;
    }

    // if (date.isBefore(minDate)) {
    //   return ERR_MSG.MIN_DATE_ERR;
    // }

    // if (date.isAfter(seventyYearsFromNow)) {
    //   return ERR_MSG.MAX_DATE_ERR;
    // }

    if (name === END_DATE) {
      const startDate = watch(START_DATE);
      if (!startDate) {
        return ERR_MSG.EMPTY_START_DATE_ERR;
      }
      const start = dayjs(startDate, DATE_FORMAT);
      const end = dayjs(value, DATE_FORMAT);
      if (end.isBefore(start)) {
        return ERR_MSG.END_DATE_LESS_ERR;
      }
    }
    return true;
  };

  useEffect(() => {
    if (!labelVisible) {
      const today = dayjs().format(DATE_FORMAT);
      setValue(name, today);
    }
  }, [labelVisible, setValue, name]);

  return (
    <div className={`${labelVisible ? 'm-0 flex flex-col' : "flex flex-col"}`}>
      <div>
        {labelVisible && (
          <div className="text-shuttleGray text-sm">
            {label} {required && <span className="text-persianRed">*</span>}
          </div>
        )}
        <Controller
          name={name}
          control={control}
          defaultValue={name === START_DATE ? dayjs().format(DATE_FORMAT) : ''}
          rules={{
            validate: validateDate,
            required: required ? `${label} is required` : false,
          }}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
              <DatePicker
                value={field.value ? dayjs(field.value, DATE_FORMAT) : null}
                className={`bg-white ${classes}`}
                slotProps={{
                  textField: {
                    size: 'small',
                    variant: labelVisible ? 'outlined' : 'standard',
                    InputProps: {
                      // disableunderline: !labelVisible,
                      style: !labelVisible ? {
                        display: 'flex',
                        flexDirection: 'row-reverse',
                        gap: 10,
                        fontSize: 13,
                        marginLeft: '-22px',
                        color: '#607083',
                      } : {},
                    },
                  },
                }}
                minDate={!isEdit ? dayjs() : undefined}
                onChange={(date) => {
                  const formattedDate = date ? dayjs(date).format(DATE_FORMAT) : '';
                  setValue(name, formattedDate);
                  field.onChange(formattedDate);
                  if(typeof trigger === 'function'){
                    trigger(name);
                  }
                }}
                onBlur={(e) => {
                  field.onBlur(e);
                  if(typeof trigger === 'function'){
                    trigger(name);
                  }
                }}
                onClose={() => {
                  if(typeof trigger === 'function'){
                    trigger(name);
                  }
                }}
                disabled={disable}
              />
            </LocalizationProvider>
          )}
        />
        <div className="text-xs text-persianRed">{errors[name] && <span>{errors[name]?.message}</span>}</div>
      </div>
    </div>
  );
};

export default DateField;
