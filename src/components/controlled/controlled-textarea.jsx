import * as React from "react"

import { Textarea } from "@/components/ui/textarea"
import { Controller } from "react-hook-form"


const ControlledTextArea = React.forwardRef(
  ({ control, name, disabled, ...props }, ref) => {
    return (
      <Controller
        name={name}
        control={control}
        render={({
          field: { name, onChange, value, ref, onBlur, disabled: fieldDisabled },
          fieldState: { error },
        }) => {
          return (
            <Textarea
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
    )
  },
)

ControlledTextArea.displayName = "Textarea"

export { ControlledTextArea }
