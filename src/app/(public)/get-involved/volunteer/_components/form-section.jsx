"use client"

import { ControlledDatePicker } from "@/components/controlled/controlled-date-picker"
import { ControlledInput } from "@/components/controlled/controlled-input"
import { useForm } from "react-hook-form"
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup"
import { useSearchParams } from "next/navigation";
import yup from "@/lib/yup";
import { Button } from "@/components/ui/button";
import { ControlledSelect } from "@/components/controlled/controlled-select";
import { isValidPhoneNumber } from "@/lib/utils";
import { ControlledTextArea } from "@/components/controlled/controlled-textarea";
import { makeRequestClient } from "@/lib/fetch";

const schema = yup.object({
    name: yup.string().trim().required(),
    phone: yup.string().trim().required().test('is-valid-phone-number', "Enter a valid Number!", isValidPhoneNumber),
    email: yup.string().trim().email().required(),
    gender: yup.string().required(),
    address: yup.string().trim().required(),
    interest: yup.string().trim().required(),
    duration: yup.string().trim().required(),
    start_date: yup.string().trim().required(),
    message: yup.string().trim().notRequired(),
})

export function FormSection() {

    let searchParams = useSearchParams();

    let paramsObj = {};
    searchParams.forEach((value, key) => {
        paramsObj[key] = value;
    })

    const { control, handleSubmit, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            ...paramsObj
        }
    })


    async function submitData(data) {
        const res = await makeRequestClient("/volunteers/", {
            data,
            method: "POST"
        });
        return res;
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
        <form id="form" onSubmit={handleSubmit(mutation.mutate, () => toast.error("Please fix form errors!"))} className="bg-surface rounded-xl p-4 md:p-6 grid sm:grid-cols-2 gap-6">
            <ControlledInput
                control={control}
                name="name"
                label="Name"
                placeholder="Enter Name"
            />

            <ControlledInput
                control={control}
                name="phone"
                label="Phone"
                placeholder="Enter Phone No."
            />


            <ControlledInput
                control={control}
                name="email"
                type="email"
                label="Email"
                placeholder="Enter Email"
            />

            <ControlledSelect
                name="gender"
                control={control}
                label={"Gender"}
                options={[
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                    { label: "Other", value: "other" },
                ]}
            />

            <ControlledInput
                control={control}
                name="address"
                label="Full Address"
                placeholder="Enter Address"
            />


            <ControlledInput
                control={control}
                name="interest"
                label="Area of Interest"
                placeholder="Enter Interest Area"
            />

            <ControlledInput
                control={control}
                name="duration"
                label="Duration of Volunteer Work"
                placeholder="Enter Duration"
            />

            <ControlledDatePicker
                control={control}
                minDate={new Date()}
                name="start_date"
                label={"When can youstart?"}
            />

            <div className="col-span-full">
                <ControlledTextArea
                    hideAsterisk
                    placeholder="Message"
                    name="message"
                    label="Message"
                    control={control}
                />
            </div>

            <Button type="submit" className="col-span-full" loading={mutation.isPending}>
                Submit
            </Button>

        </form>
    )
}