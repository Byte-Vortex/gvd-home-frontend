"use client"

import * as React from "react"

import { Controller } from "react-hook-form"
import { Checkbox } from "../ui/checkbox"


const ControlledCheckbox = React.forwardRef(
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
                        <Checkbox
                            onBlur={onBlur}
                            ref={ref}
                            name={name}
                            checked={value}
                            onCheckedChange={onChange}
                            disabled={disabled || fieldDisabled}
                            {...props}
                        />
                    )
                }}
            />
        )
    },
)

ControlledCheckbox.displayName = "ControlledCheckbox"

export { ControlledCheckbox }
