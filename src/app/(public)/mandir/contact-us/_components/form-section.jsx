"use client"

import { ControlledInput } from "@/components/controlled/controlled-input"
import { useForm } from "react-hook-form"
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup"
import { useSearchParams } from "next/navigation";
import yup from "@/lib/yup";
import { Button } from "@/components/ui/button";
import { isValidPhoneNumber } from "@/lib/utils";
import { ControlledTextArea } from "@/components/controlled/controlled-textarea";
import { makeRequestClient } from "@/lib/fetch";

const schema = yup.object({
    name: yup.string().trim().required(),
    phone: yup.string().trim().required().test('is-valid-phone-number', "Enter a valid Number!", isValidPhoneNumber),
    email: yup.string().trim().email().required(),
    subject: yup.string().trim().notRequired(),
    message: yup.string().trim().required(),

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
        const res = await makeRequestClient("/contact_page/", {
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


            <ControlledInput
                control={control}
                hideAsterisk
                name="subject"
                label="Subject"
                placeholder="Enter Subject"
            />


            <div className="col-span-full">
                <ControlledTextArea
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