"use client"

import { useForm } from "react-hook-form";
import { ControlledInput } from "@/components/controlled/controlled-input";
import { ControlledTextArea } from "@/components/controlled/controlled-textarea";


import { useParams, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import yup from "@/lib/yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { ControlledPhoneInput } from "@/components/controlled/controlled-phone-input";
import { ControlledSelect } from "@/components/controlled/controlled-select";
import { makeRequestClient } from "@/lib/fetch";
import { isValidPhoneNumber } from "@/lib/utils";

const schema = yup.object({
    name: yup.string().trim().required(),
    phone: yup.string().trim().required().test('is-valid-phone-number', "Enter a valid Number!", isValidPhoneNumber),
    email: yup.string().trim().email().required(),
    age: yup.number().integer().positive().required(),
    gender: yup.string().required(),
    permanent_address: yup.string().trim().required(),
    present_address: yup.string().trim().required(),
    relocate: yup.string().required(),
    current_ctc: yup.string().trim().required(),
    expected_ctc: yup.string().trim().required(),
    resume_link: yup.string().trim().url().required(),
    portfolio_link: yup.string().trim().notRequired(),
    message: yup.string().trim().notRequired(),
});

export default function Form({ jobId }) {


    let searchParams = useSearchParams();

    let paramsObj = {};
    searchParams.forEach((value, key) => {
        paramsObj[key] = value;
    })

    async function submitData(data) {
        const res = await makeRequestClient("/careers/", {
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

    const { reset, control, handleSubmit } = useForm({
        defaultValues: {
            job_id: jobId,
            ...paramsObj
        },
        resolver: yupResolver(schema)
    });


    return (

        <>
            <form
                className="px-4 py-6 sm:px-6 bg-surface text-on-surface rounded-xl space-y-6"
                onSubmit={handleSubmit(mutation.mutate, () => toast.error("Please fix form errors!"))}
            >

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    <ControlledInput
                        control={control}
                        name="name"
                        placeholder="Full Name"
                        label="Full Name"
                    />

                    <ControlledPhoneInput
                        control={control}
                        label={"Phone Number"}
                        name={"phone"}
                    />

                    <ControlledInput
                        control={control}
                        name="email"
                        placeholder="Email"
                        label="Email"
                        type="email"
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
                        name="age"
                        placeholder="Age"
                        label="Age"
                    />

                    <ControlledInput
                        control={control}
                        name="permanent_address"
                        placeholder="Permanent Address"
                        label="Permanent Address"
                    />

                    <ControlledInput
                        control={control}
                        name="present_address"
                        placeholder="Present Address"
                        label="Present Address"
                    />


                    <ControlledSelect
                        control={control}
                        label={"Ready to Relocate ( If Outsider )"}
                        options={[
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" },
                        ]}
                        name="relocate"
                    />

                    <ControlledInput
                        control={control}
                        name="current_ctc"
                        placeholder="Current CTC"
                        label="Current CTC"
                    />

                    <ControlledInput
                        control={control}
                        name="expected_ctc"
                        placeholder="Expected CTC"
                        label="Expected CTC"
                    />

                    <ControlledInput
                        control={control}
                        name="resume_link"
                        placeholder="Upload Resume Link"
                        label="Resume Link"
                    />

                    <ControlledInput
                        control={control}
                        hideAsterisk
                        placeholder="Portfolio Link"
                        name="portfolio_link"
                        label="Portfolio Link"
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



                </div>

                <div className="w-full flex">

                    <Button type="submit" loading={mutation.isPending} className="ml-auto flex w-full md:max-w-xs">
                        Submit
                    </Button>
                </div>

            </form>

        </>
    )
}