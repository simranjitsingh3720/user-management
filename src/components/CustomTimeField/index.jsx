import React from "react";
import { Controller } from "react-hook-form";

const CustomTimePicker = ({ control, name }) => {
  const hours = Array.from({ length: 24 }, (_, i) =>
    String(i).padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));
  const formatTime = (hour, minute) => {
    return `${hour}:${minute}`;
  };

  return (
    <div className="flex items-center">
      <Controller
        name={name}
        control={control}
        defaultValue={formatTime("00", "00")}
        render={({ field }) => (
          <>
            <select
              className="bg-gray-200 rounded-full w-12 p-1 text-gray-700 border-none outline-none"
              value={field.value.split(":")[0]}
              onChange={(e) => {
                const newValue = formatTime(e.target.value, field.value.split(":")[1]);
                field.onChange(newValue);
              }}
            >
              {hours.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
            <span className="px-2">:</span>
            <select
              className="bg-gray-200 rounded-full w-12 p-1 text-gray-700 border-none outline-none"
              value={field.value.split(":")[1]}
              onChange={(e) => {
                const newValue = formatTime(field.value.split(":")[0], e.target.value);
                field.onChange(newValue);
              }}
            >
              {minutes.map((minute) => (
                <option key={minute} value={minute}>
                  {minute}
                </option>
              ))}
            </select>
          </>
        )}
      />
    </div>
  );
};

export default CustomTimePicker;
