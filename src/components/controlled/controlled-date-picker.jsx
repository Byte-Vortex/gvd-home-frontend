"use client"

import DatePicker from 'react-date-picker';
import { Controller } from 'react-hook-form';
import { useState } from 'react';
import { cn, convertJsDateToMySqlDate, convertMySqlDateToJSDate } from '@/lib/utils';

import "./misc/DatePicker.css"
import "./misc/Calendar.css"
import { FieldErrorView } from '../ui/field-error-view';


export function ControlledDatePicker({ control, name, label, minDate, maxDate, hideAsterisk, className }) {

    const [focus, setFocus] = useState(false);
    const defaultMinDate = new Date();
    defaultMinDate.setFullYear(1800);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange, onBlur, ref }, fieldState: { error, } }) => {

                if (value) {
                    value = convertMySqlDateToJSDate(value);
                }
                return (
                    <label className='relative flex flex-col gap-1 w-full'>
                        {label && (
                            <div className="text-sm font-medium">
                                <span>{label}</span>
                                {!hideAsterisk && <span className="ml-1 text-red-500">*</span>}
                            </div>
                        )}
                        <DatePicker
                            minDate={minDate ?? defaultMinDate}
                            {...(maxDate ? { maxDate } : {})}
                            format='dd/MM/yyyy'
                            inputRef={ref}
                            dayPlaceholder="dd"
                            monthPlaceholder='mm'
                            openCalendarOnFocus={false}
                            yearPlaceholder='yyyy'
                            onBlur={setFocus.bind(null, false)}
                            onCalendarOpen={setFocus.bind(null, true)}
                            clearIcon={null}
                            onFocus={setFocus.bind(null, true)}
                            className={cn("w-full bg-background rounded-md !h-10 duration-150", error ? "border-red-600/80" : (focus ? "border-landing-primary" : "border-transparent"))}
                            // calendarClassName={"shadow-md text-foreground border-primary"}
                            calendarProps={{
                                className: "shadow-md !text-foreground !rounded-xl !border-outline/40 !bg-background"
                            }}
                            onChange={(val) => {
                                onChange(val && convertJsDateToMySqlDate(val));
                            }}
                            value={value} />

                        <FieldErrorView error={error} />
                    </label>
                )
            }
            }

        />
    );
}

