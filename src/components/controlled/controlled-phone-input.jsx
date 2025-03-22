"use client"

import { Controller } from "react-hook-form";
import { CountrySelector, usePhoneInput } from "react-international-phone";
import clsx from "clsx";
import 'react-international-phone/style.css';
import { Input, inputStyles } from "../ui/input";
import { FieldErrorView } from "../ui/field-error-view";

export function ControlledPhoneInput({ control, name, label, hideDropdown = false, hideAsterisk }) {

    return (

        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => {
                return (
                    <ReactPhoneInput
                        field={field}
                        fieldState={fieldState}
                        label={label}
                        hideDropdown={hideDropdown}
                        hideAsterisk={hideAsterisk}
                    />
                )
            }

            }
        />
    )
}

function ReactPhoneInput({ field, fieldState, label, hideDropdown, hideAsterisk }) {

    const { value, onChange } = field;
    const { error } = fieldState;

    const phoneInput = usePhoneInput({
        defaultCountry: 'in',
        value,
        forceDialCode: true,
        onChange: (data) => {
            onChange(data.phone);
        },
    });

    return (
        <label className="relative flex flex-col gap-1 w-full">
            <div className="text-sm font-medium">
                <span>{label}</span>
                {!hideAsterisk && <span className="ml-1 text-red-500">*</span>}
            </div>
            <div
                style={{
                    "--react-international-phone-selected-dropdown-item-background-color": "rgba(var(--on-background), 0.15)",
                    "--react-international-phone-selected-dropdown-item-text-color": "rgba(var(--on-background), 1) !important"
                }}
                className="flex gap-2 items-center"
            >
                <CountrySelector
                    hideDropdown={hideDropdown}
                    selectedCountry={phoneInput.country}
                    onSelect={(country) => phoneInput.setCountry(country.iso2)}
                    className={clsx("max-w-max justify-center relative flex", error ? "!border-red-600/80" : "!border-text/20")}
                    buttonClassName="!bg-background rounded-lg !px-1 py-2 !h-10 !border-none"
                    dropdownStyleProps={{
                        className: "rounded-xl scrollbar-hide left-0 flex outline-none !border-none !bg-background transparent !text-on-background",
                        listItemClassName: "hover:!bg-primary/60 hover:!text-on-primary",
                        listItemFlagClassName: "w-4",
                        listItemCountryNameClassName: "text-sm",
                        listItemDialCodeClassName: "text-sub-text text-xs"
                    }}
                />


                <input
                    value={phoneInput.phone}
                    onChange={phoneInput.handlePhoneValueChange}
                    placeholder="Phone Number"
                    className={inputStyles}
                />

            </div>
            <FieldErrorView error={error} />
        </label>
    );
};