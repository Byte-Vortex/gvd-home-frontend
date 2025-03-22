"use client";

import * as React from "react";

import { Select } from "../ui/select";
import { Controller } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const ControlledRadios = React.forwardRef(
  ({ control, name, disabled, options, ...props }, ref) => {
    return (
      <Controller
        name={name}
        control={control}
        render={({
          field: {
            name,
            onChange,
            value,
            ref,
            onBlur,
            disabled: fieldDisabled,
          },
          fieldState: { error },
        }) => {
          return (
            <RadioGroup
              onBlur={onBlur}
              error={error}
              ref={ref}
              name={name}
              value={value}
              onValueChange={onChange}
              disabled={disabled || fieldDisabled}
              {...props}
            >
              {options.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center space-x-2"
                >
                  <RadioGroupItem value={option.value} />
                  <div>{option.label}</div>
                </label>
              ))}
            </RadioGroup>
          );
        }}
      />
    );
  }
);

ControlledRadios.displayName = "ControlledRadios";

export { ControlledRadios };
