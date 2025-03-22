"use client"

import { Image } from "@/components/image";
import { ControlledInput } from "@/components/controlled/controlled-input";
import { Controller, useForm } from "react-hook-form"
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { FaCheck } from "react-icons/fa6";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import header_image from "./images/header.jpg"
import { TimePicker } from "./_components/timepicker";
import "./_components/time-picker.css"
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { ControlledDatePicker } from "@/components/controlled/controlled-date-picker";
import { yupResolver } from "@hookform/resolvers/yup"
import yup from "@/lib/yup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { makeRequestClient } from "@/lib/fetch";


// {
//     "preacher_name": "kunal",
//     "preacher_email": "kunal@gmail.com",
//     "program_date": "2024-2-29",
//     "program_venue": "venue",
//     "departure_time": "12:12",
//     "return_time": "01:02",
//     "program_theme": "Birthday Party",
//     "program_type": [
//       "kirtan",
//       "yagna",
//       "trip"
//     ],
//     "sound_arrangement": "host",
//     "sound_equipments": {
//       "mic": 1,
//       "powered_speaker": 2,
//       "neckband": 3
//     },
//     "devotee_count": "12",
//     "message": "yo yo"
//   }


const schema = yup.object().shape({
    preacher_name: yup.string().required(),
    preacher_email: yup.string().email().required(),
    program_date: yup.string().required(),
    departure_time: yup.string().required(),
    return_time: yup.string().required(),
    program_theme: yup.string().required(),
    program_type: yup.array().min(1).required(),
    sound_arrangement: yup.string().required(),

})




export default function Page() {

    const { control, handleSubmit, reset } = useForm({
        resolver: yupResolver(schema),
    });

    async function submitData(data) {
        return await makeRequestClient("/kirtanbookings/", {
            method: "POST",
            data

        })
    }

    const mutation = useMutation({
        mutationFn: submitData,
        onSuccess: () => {
            toast.success("Form Submitted!")
            reset()
        },
        onError: () => toast.error("Something went wrong, please try again!")
    });


    return (
        <div className="max-w-4xl mx-auto py-20 px-4">
            <div className="space-y-6">

                <div className="aspect-4 aspect-h-1 overflow-hidden rounded-lg shadow-md">
                    <Image
                        className="w-full h-full object-cover" src={header_image}
                    />
                </div>

                <div className="space-y-4 bg-surface border-primary border-t-[1rem] rounded-lg shadow-md  p-4">
                    <h1 className="text-3xl font-semibold">Hare Krishna Kirtans</h1>
                    <p>Please fill the below form for Kirtan Booking.</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit(mutation.mutate, () => toast.error("Please fix form errors!"))}>


                    {/* Preacher Name */}
                    <FormSection>

                        <div className="max-w-sm">
                            <ControlledInput
                                control={control}
                                name="preacher_name"
                                label="Preacher Name"
                                placeholder="Enter Preacher Name"
                            />

                        </div>

                    </FormSection>

                    {/* Preacher Email */}
                    <FormSection>

                        <div className="max-w-sm">
                            <ControlledInput
                                control={control}
                                type="email"
                                name="preacher_email"
                                label="Preacher Email"
                                placeholder="Enter Preacher Email"
                            />

                        </div>

                    </FormSection>

                    {/* Program Date */}
                    <FormSection>

                        <div className="max-w-sm">

                            <ControlledDatePicker
                                control={control}
                                minDate={new Date()}
                                name={"program_date"}
                                label={"Program Date"}
                            />

                        </div>
                    </FormSection>



                    {/* Program Venue */}
                    <FormSection>

                        <div className="max-w-sm">

                            <ControlledInput
                                hideAsterisk
                                control={control}
                                name="program_venue"
                                label="Program Venue"
                                placeholder="Enter Program Venue"
                            />

                        </div>

                    </FormSection>


                    {/* Departure Time */}
                    <FormSection>

                        <div className="max-w-sm">

                            <Controller
                                name="departure_time"

                                control={control}
                                render={({
                                    field: { value, onChange, ref },
                                    fieldState: { error },
                                }) => {
                                    return (
                                        <div className="relative">
                                            <div className="text-sm font-medium mb-2">
                                                <span>Temple Departure Time</span>
                                                <span className="ml-1 text-red-500">*</span>
                                            </div>
                                            <TimePicker
                                                disableClock
                                                onChange={onChange}
                                                value={value}
                                                clearIcon={null}
                                            />

                                            {error && <p className="absolute -bottom-6 text-xs text-red-600">{error.message}</p>}
                                        </div>
                                    )
                                }}
                            />


                        </div>

                    </FormSection>

                    {/* Return Time */}
                    <FormSection>

                        <div className="max-w-sm">

                            <Controller
                                name="return_time"

                                control={control}
                                render={({
                                    field: { value, onChange, ref },
                                    fieldState: { error },
                                }) => {
                                    return (
                                        <div className="relative">
                                            <div className="text-sm font-medium mb-2">
                                                <span>Temple Return Time</span>
                                                <span className="ml-1 text-red-500">*</span>
                                            </div>
                                            <TimePicker
                                                disableClock
                                                onChange={onChange}
                                                value={value}
                                                clearIcon={null}
                                            />

                                            {error && <p className="absolute -bottom-6 text-xs text-red-600">{error.message}</p>}
                                        </div>
                                    )
                                }}
                            />


                        </div>

                    </FormSection>

                    {/* Program Theme */}
                    <FormSection>

                        <div className="max-w-sm">


                            <RadioGroupWithInput
                                control={control}
                                label={"Program Theme"}
                                name={"program_theme"}
                                options={[
                                    {
                                        label: "Birthday Party",
                                        value: "Birthday Party"
                                    },
                                    {
                                        label: "Marriage Anniversary",
                                        value: "Marriage Anniversary"
                                    },
                                    {
                                        label: "Tiye ki Baithak",
                                        value: "Tiye ki Baithak"
                                    }
                                ]}
                            />

                        </div>

                    </FormSection>


                    {/* Program Type */}
                    <FormSection>

                        <div className="max-w-sm">

                            <Controller
                                name="program_type"
                                defaultValue={[]}
                                control={control}
                                render={({
                                    field: { value, onChange, ref },
                                    fieldState: { error },
                                }) => {
                                    return (
                                        <div className="relative">
                                            <label className="w-full">

                                                <div className="text-sm font-medium mb-2">
                                                    <span>Temple Return Time</span>
                                                    <span className="ml-1 text-red-500">*</span>
                                                </div>
                                                <ToggleGroup.Root className="space-y-2" type="multiple" value={value} onValueChange={onChange}>

                                                    <ToggleGroup.Item value="kirtan" className="group flex gap-2 items-center">

                                                        <div className="flex items-center justify-center group-data-[state=on]:bg-primary bg-transparent duration-150 h-4 w-4 rounded-sm border-2 border-primary">
                                                            <FaCheck className="group-data-[state=off]:opacity-0 duration-150 text-white" />
                                                        </div>
                                                        <div>Kirtan</div>

                                                    </ToggleGroup.Item>

                                                    <ToggleGroup.Item value="yagna" className="group flex gap-2 items-center">

                                                        <div className="flex items-center justify-center group-data-[state=on]:bg-primary bg-transparent duration-150 h-4 w-4 rounded-sm border-2 border-primary">
                                                            <FaCheck className="group-data-[state=off]:opacity-0 duration-150 text-white" />
                                                        </div>
                                                        <div>Yagna</div>

                                                    </ToggleGroup.Item>

                                                    <ToggleGroup.Item value="trip" className="group flex gap-2 items-center">

                                                        <div className="flex items-center justify-center group-data-[state=on]:bg-primary bg-transparent duration-150 h-4 w-4 rounded-sm border-2 border-primary">
                                                            <FaCheck className="group-data-[state=off]:opacity-0 duration-150 text-white" />
                                                        </div>
                                                        <div>Trip</div>

                                                    </ToggleGroup.Item>

                                                </ToggleGroup.Root>

                                            </label>
                                            {error && <p className="absolute -bottom-4 text-xs text-red-600">{error.message}</p>}
                                        </div>
                                    )
                                }}
                            />

                        </div>

                    </FormSection>

                    {/* Sound Arrangement */}
                    <FormSection>

                        <div className="max-w-sm">

                            <RadioGroupWithInput
                                control={control}
                                label={"Sound Arrangement*"}
                                name={"sound_arrangement"}
                                options={[
                                    {
                                        label: "Host",
                                        value: "host"
                                    },
                                    {
                                        label: "Temple",
                                        value: "temple"
                                    }
                                ]}
                            />


                        </div>

                    </FormSection>


                    {/* Sound Equipments Count */}

                    <FormSection>

                        <div className="max-w-sm">

                            <SoundEquipments
                                control={control}
                            />

                        </div>

                    </FormSection>


                    {/* Devotee Count */}
                    <FormSection>

                        <div className="max-w-sm">

                            <ControlledInput
                                hideAsterisk
                                control={control}
                                name="devotee_count"
                                label="Total Number of Devotees"
                                placeholder="Enter Devotee Count"
                            />

                        </div>

                    </FormSection>

                    {/* Other Information */}
                    <FormSection>

                        <div className="max-w-sm">

                            <ControlledInput
                                hideAsterisk
                                control={control}
                                name="message"
                                label="Any other information"
                                placeholder="message..."
                            />

                        </div>

                    </FormSection>


                    <Button type="submit" loading={mutation.isPending}>
                        Submit
                    </Button>

                </form>
            </div>
        </div>
    )
}


function RadioGroupWithInput({ label, options, name, control }) {

    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { value, onChange, ref },
                fieldState: { error },
            }) => {

                let inputWillSupplyValue = true;
                if (value === null || value === undefined) {
                    inputWillSupplyValue = false;
                }

                else {
                    for (let option of options) {
                        if (option.value === value) {
                            inputWillSupplyValue = false;
                            break;
                        }
                    }
                }

                return (
                    <div className="relative">
                        {label && (
                            <div className="text-sm font-medium mb-2">
                                <span>{label}</span>
                                <span className="ml-1 text-red-500">*</span>
                            </div>
                        )}
                        <RadioGroup value={inputWillSupplyValue ? "" : value} onValueChange={onChange}>


                            {
                                options.map(option => (
                                    <label key={option.value} className="flex items-center space-x-2">
                                        <RadioGroupItem value={option.value} />
                                        <div>{option.label}</div>
                                    </label>
                                ))
                            }


                            <label className="flex items-center space-x-2">

                                <RadioGroupItem value="" />

                                <div>Other:</div>
                                <Controller
                                    name={name}
                                    control={control}
                                    render={({ field: { name, onChange, value }, fieldState: { error } }) => {

                                        value = inputWillSupplyValue ? value : ""
                                        return (
                                            <Input
                                                name={name}
                                                value={value ?? ""}
                                                onChange={onChange}
                                            />
                                        )
                                    }}
                                />

                            </label>


                        </RadioGroup>
                        {error && <p className="absolute -bottom-4 text-xs text-red-600">{error.message}</p>}
                    </div>
                )
            }}
        />
    )
}

function SoundEquipments({ control }) {

    return (
        <Table>
            <TableHeader className="text-base">
                <TableRow className="border-none">
                    <TableHead className="w-[100px]">Equipments</TableHead>
                    <TableHead>1</TableHead>
                    <TableHead className="text-right">2</TableHead>
                    <TableHead className="text-right">3</TableHead>
                    <TableHead className="text-right">4</TableHead>
                    <TableHead className="text-right">5</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>

                <TableRow className="border-on-background/20 p-0">
                    <TableCell className="font-medium">Mic:</TableCell>


                    {
                        Array(5).fill(0).map((ele, index) => {
                            return (
                                <TableCell key={index} className="font-medium">

                                    <Controller
                                        name={"sound_equipments.mic"}
                                        control={control}
                                        render={({ field: { value, onChange, ref } }) => {


                                            return (
                                                <Checkbox
                                                    checked={value === index + 1}
                                                    ref={ref}
                                                    onCheckedChange={(checked => {
                                                        if (checked) onChange(index + 1);
                                                        else onChange(0);
                                                    })}
                                                />
                                            )
                                        }}
                                    />

                                </TableCell>
                            )
                        })
                    }

                </TableRow>

                <TableRow className="border-on-background/20 p-0">
                    <TableCell className="font-medium">Mic Stand:</TableCell>


                    {
                        Array(5).fill(0).map((ele, index) => {
                            return (
                                <TableCell key={index} className="font-medium">

                                    <Controller
                                        name={"sound_equipments.mic_stand"}
                                        control={control}
                                        render={({ field: { value, onChange, ref } }) => {


                                            return (
                                                <Checkbox
                                                    checked={value === index + 1}
                                                    ref={ref}
                                                    onCheckedChange={(checked => {
                                                        if (checked) onChange(index + 1);
                                                        else onChange(0);
                                                    })}
                                                />
                                            )
                                        }}
                                    />

                                </TableCell>
                            )
                        })
                    }

                </TableRow>

                <TableRow className="border-on-background/20 p-0">
                    <TableCell className="font-medium">Powered Speaker:</TableCell>


                    {
                        Array(5).fill(0).map((ele, index) => {
                            return (
                                <TableCell key={index} className="font-medium">

                                    <Controller
                                        name={"sound_equipments.powered_speaker"}
                                        control={control}
                                        render={({ field: { value, onChange, ref } }) => {


                                            return (
                                                <Checkbox
                                                    checked={value === index + 1}
                                                    ref={ref}
                                                    onCheckedChange={(checked => {
                                                        if (checked) onChange(index + 1);
                                                        else onChange(0);
                                                    })}
                                                />
                                            )
                                        }}
                                    />

                                </TableCell>
                            )
                        })
                    }

                </TableRow>

                <TableRow className="border-on-background/20 p-0">
                    <TableCell className="font-medium">Neckband:</TableCell>


                    {
                        Array(5).fill(0).map((ele, index) => {
                            return (
                                <TableCell key={index} className="font-medium">

                                    <Controller
                                        name={"sound_equipments.neckband"}
                                        control={control}
                                        render={({ field: { value, onChange, ref } }) => {


                                            return (
                                                <Checkbox
                                                    checked={value === index + 1}
                                                    ref={ref}
                                                    onCheckedChange={(checked => {
                                                        if (checked) onChange(index + 1);
                                                        else onChange(0);
                                                    })}
                                                />
                                            )
                                        }}
                                    />

                                </TableCell>
                            )
                        })
                    }

                </TableRow>



            </TableBody>
        </Table>

    )
}

function FormSection({ className = "", ...props }) {

    return (
        <div
            className={clsx("rounded-lg shadow-md bg-surface px-4 py-8", className)}
            {...props}
        />
    )
}