"use client"

import * as React from "react"

import { Input } from "@/components/ui/input"
import { Controller } from "react-hook-form"


const ControlledInput = React.forwardRef(
  ({ control, name, disabled, shouldUnregister, classes, ...props }, ref) => {

    return (
      <div className={classes}>
      <Controller
        name={name}
        shouldUnregister={shouldUnregister}
        control={control}
        render={({
          field: { name, onChange, value, ref, onBlur, disabled: fieldDisabled },
          fieldState: { error },
        }) => {
          return (
            <Input
              onBlur={onBlur}
              error={error}
              ref={ref}
              name={name}
              value={value ?? ""}
              onChange={onChange}
              disabled={disabled || fieldDisabled}
              {...props}
            />
          )
        }}
      />
      </div>
    )
  },
)

ControlledInput.displayName = "Input"

export { ControlledInput }
