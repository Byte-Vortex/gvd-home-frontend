"use client";

import * as React from "react";

import { Select } from "../ui/select";
import { Controller } from "react-hook-form";

const ControlledSelect = React.forwardRef(
  ({ control, name, disabled, classes, ...props }, ref) => {
    return (
      <div className={classes}>
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
              <Select
                onBlur={onBlur}
                error={error}
                ref={ref}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled || fieldDisabled}
                {...props}
              />
            );
          }}
        />
      </div>
    );
  }
);

ControlledSelect.displayName = "ControlledSelect";

export { ControlledSelect };
