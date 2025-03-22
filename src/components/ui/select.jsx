"use client"

import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'
import clsx from 'clsx'
import { forwardRef, useMemo, useState } from 'react'
import { inputStyles } from './input'
import { FieldErrorView } from './field-error-view'

/*

options = [

{
label, value
}
]
*/

export const Select = forwardRef(({ value, onChange, options, label, hideAsterisk, error, disabled, onBlur }, ref) => {

    const internalValue = useMemo(() => {
        if (!Array.isArray(options)) return value;
        return options.find((option) => option.value === value);
    }, [options, value]);

    const [query, setQuery] = useState('');
    const [open, setOpen] = useState(false);

    const filteredOptions = useMemo(() => {
        const res = query === ''
            ? options
            : options?.filter((option) => {
                return option.label.toLowerCase().includes(query.toLowerCase().trim())
            })

        return res || [];
    }, [query, options])

    return (

        <label className="relative flex flex-col gap-1 w-full">

            {label && (
                <div className="text-sm font-medium">
                    <span>{label}</span>
                    {!hideAsterisk && <span className="ml-1 text-red-500">*</span>}
                </div>
            )}

            <Combobox
                value={internalValue}
                onChange={(option) => onChange(option?.value ?? null)}
                disabled={disabled}
                onClose={() => { setQuery(''); setOpen(false) }}
            >
                <div className="relative" onClick={setOpen.bind(null, true)} onBlur={setOpen.bind(null, false)}>
                    <ComboboxInput
                        readOnly={options?.length <= 10}
                        ref={ref}
                        onBlur={onBlur}
                        placeholder='Select'
                        className={inputStyles}
                        displayValue={(value) => value?.label || ""}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                    <ComboboxButton onClick={(e) => e.stopPropagation()} className="group absolute inset-y-0 right-0 px-2.5">
                        <ChevronDownIcon className="size-4 fill-on-background" />
                    </ComboboxButton>
                </div>

                <ComboboxOptions
                    anchor="bottom"
                    static={open}
                    transition
                    className={clsx(
                        'w-[var(--input-width)] rounded-xl border border-outline/20 bg-background text-on-background p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
                        'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                    )}
                >
                    {

                        filteredOptions.length ?

                            filteredOptions.map((option) => (
                                <ComboboxOption
                                    key={option.value}
                                    value={option}
                                    className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-on-background/10"
                                >
                                    <div className="text-sm">{option.label}</div>
                                    <CheckIcon className="invisible size-4 text-on-background group-data-[selected]:visible" />
                                </ComboboxOption>
                            ))

                            :

                            <ComboboxOption
                                disabled
                                value={"no-option"}
                                className="text-center text-sub-text group cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none"
                            >
                                No Options
                            </ComboboxOption>


                    }
                </ComboboxOptions>
            </Combobox>

            <FieldErrorView error={error} />
        </label>
    )
})

Select.displayName = "Select";