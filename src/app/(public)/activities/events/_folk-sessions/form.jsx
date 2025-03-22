"use client"

import { ControlledInput } from "@/components/controlled/controlled-input";
import { ControlledPhoneInput } from "@/components/controlled/controlled-phone-input";
import { ControlledSelect } from "@/components/controlled/controlled-select";
import { Controller, useForm, useWatch } from "react-hook-form";
import {
    BsEnvelope as EmailIcon,
    BsInstagram as InstagramIcon,
    BsWhatsapp as WhatsappIcon,
    BsYoutube as YoutubeIcon
} from "react-icons/bs";

import { ControlledLabeledCheckbox } from "@/components/controlled/controlled-labeled-checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { convertFileToBase64, formatIndianCurrency, isValidPhoneNumber } from "@/lib/utils";
import yup from "@/lib/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useSubmitMutation } from "../_hooks/use-submit-mutation";

const schema = yup.object({
    session_type: yup.string().trim().required(),
    previous_session: yup.mixed().when("session_type", {
        is: (session_type) => session_type > 1,
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired()
    }),
    name: yup.string().trim().required(),
    gender: yup.string().trim().required(),
    profession: yup.string().trim().required(),
    profession_name: yup.string().trim().required(),
    folk_guide_name: yup.string().trim().required(),
    phone: yup.string().trim().required().test('is-valid-phone-number', "Enter a valid Number!", isValidPhoneNumber),
})

export function Form({ data, basicDetails }) {

    let searchParams = useSearchParams();

    const { control, handleSubmit } = useForm({
        defaultValues: {
            ...searchParams
        },
        resolver: yupResolver(schema)
    });

    const mutation = useSubmitMutation();
    async function onSubmit(data) {
        const newData = { ...data };

        if (newData.session_type > 1) {
            newData.previous_session = await convertFileToBase64(data.previous_session[0]);
        }
        mutation.mutate(newData);
    }

    return (
        <div className="rounded-3xl bg-surface text-on-surface px-4 md:px-12 py-6 space-y-8">

            <form onSubmit={handleSubmit(onSubmit, () => toast.error("Please Fix form errors!"))} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <ControlledSelect
                    name="session_type"
                    control={control}
                    label={"Select Session"}
                    options={[
                        { label: "Bhagawat Gita for youth (Rs. 500)", value: 1 },
                        { label: "Parivartan (Rs. 500)", value: 2 },
                        { label: "Positive Transformation (Rs. 500)", value: 3 },
                        { label: "Good to Great (Rs. 500)", value: 4 },
                        { label: "Progress beyond Progress (Rs. 500)", value: 5 },
                    ]}
                />

                <PreviousSessionProof control={control} />
                <ControlledInput
                    control={control}
                    name="name"
                    label="Name"
                    placeholder="Enter Name"
                />

                <ControlledPhoneInput
                    control={control}
                    name="phone"
                    label="Phone No."
                    placeholder="Enter Whatsapp No."
                />

                <ControlledSelect
                    name="gender"
                    control={control}
                    label={"Gender"}
                    options={[
                        { label: "Male", value: "male" },
                    ]}
                />

                <ControlledSelect
                    name="profession"
                    control={control}
                    label={"Profession"}
                    options={[
                        { label: "Working", value: "working" },
                        { label: "Student", value: "student" },
                    ]}
                />

                <ControlledInput
                    control={control}
                    name="profession_name"
                    label="Name of College/Company"
                    placeholder="Enter Name"
                />
                <ControlledSelect
                    name="folk_guide_name"
                    control={control}
                    label={"Name of FOLK Guide"}
                    options={[
                        { label: "GDGD", value: "GDGD" },
                        { label: "SVLD", value: "SVLD" },
                        { label: "GRSD", value: "GRSD" },
                        { label: "RCND", value: "RCND" },
                        { label: "VMMD", value: "VMMD" },
                        { label: "ADGD", value: "ADGD" },
                        { label: "FOLK", value: "FOLK" },
                    ]}
                />

                <SubmitButton buttonText={data.button_text} control={control} loading={mutation.isPending} />

            </form>

            <div className="flex flex-wrap lg:flex-nowrap justify-between gap-4">

                <div className="space-y-4 max-w-max">

                    <h5 className="text-primary font-semibold text-xl">For any queries</h5>

                    <p className="max-w-xl font-semibold">
                        {data?.additional_form_text}
                    </p>

                    <div className="flex flex-wrap gap-y-2">

                        <a href={"mailto:" + data?.email} className="w-full flex gap-2 items-center hover:underline">
                            <EmailIcon />
                            <span>
                                {data?.email}
                            </span>
                        </a>

                        <a target="_blank" rel="noopener"  href={"https://wa.me/" + data?.phone} className="w-full flex gap-2 items-center hover:underline">
                            <WhatsappIcon />
                            <span >
                                {data?.phone}
                            </span>
                        </a>
                    </div>
                </div>

                <div className="sm:min-w-max">

                    <h5 className="text-primary font-semibold text-xl">Follow Us</h5>

                    <div className="space-y-2 mt-2">
                        <div className="">For more information:</div>

                        <a
                            href={"https://www.youtube.com/@FolkSpirituals"}
                            target="_blank" rel="noopener"
                            className="w-full flex gap-2 items-center hover:underline font-bold"
                        >
                            <YoutubeIcon className="text-xl text-primary" />
                            FOLKSpirituals
                        </a>

                        <a
                            href={"https://www.instagram.com/folkspirituals/"}
                            target="_blank" rel="noopener"
                            className="w-full flex gap-2 items-center hover:underline font-bold"
                        >
                            <InstagramIcon className="text-xl text-primary" />
                            FOLKSpirituals
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

function SubmitButton({ buttonText, control, loading }) {

    const sessionType = useWatch({ control, name: "session_type" });

    let amount = 0;
    if (sessionType >= 1) {
        amount += 500;
    }

    return (
        <Button type="submit" className="col-span-full rounded-lg" loading={loading}>
            {buttonText} &nbsp;{amount ? formatIndianCurrency(amount, { maximumFractionDigits: 0 }) : ""}
        </Button>
    )
}

function PreviousSessionProof({ control }) {

    const sessionType = useWatch({ control, name: "session_type" });

    const map = {
        1: "BG for youth",
        2: "Parivartan",
        3: "Positive Transformation",
        4: "Good to Great",
        5: "Progress beyond Progress",
    }

    return (
        sessionType > 1 &&

        <FileInput
            shouldUnregister
            control={control}
            name="previous_session"
            label={"Certificate of '" + map[sessionType - 1] + "' Session"}
        />
    )
}

function FileInput({ control, name, label, shouldUnregister }) {

    return (

        <Controller
            name={name}
            shouldUnregister={shouldUnregister}
            control={control}
            render={({ field: { name, onChange, value, ref, onBlur }, fieldState: { error } }) => {

                return (

                    <Input
                        label={label}
                        placeholder="Upload"
                        onBlur={onBlur}
                        error={error}
                        accept="image/jpg, image/jpeg, image/png"
                        type="file"
                        ref={ref}
                        name={name}
                        onChange={(event) => {
                            return onChange(event.target.files);
                        }}
                    />
                )
            }}
        />

    )
}
