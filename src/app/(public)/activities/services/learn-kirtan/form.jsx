"use client"

import { useForm, useWatch } from "react-hook-form";
import { ControlledInput } from "@/components/controlled/controlled-input";
import { ControlledPhoneInput } from "@/components/controlled/controlled-phone-input";
import { ControlledSelect } from "@/components/controlled/controlled-select";
import {
    BsWhatsapp as WhatsappIcon, BsEnvelope as EmailIcon
} from "react-icons/bs";

import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getLastSlug, isValidPhoneNumber } from "@/lib/utils";
import yup from "@/lib/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSubmitMutation } from "../_hooks/use-submit-mutation";
import { BiLogoInstagram as InstagramIcon } from "react-icons/bi";
import { AiOutlineYoutube as YoutubeIcon } from "react-icons/ai";

const schema = yup.object({
    name: yup.string().trim().required(),
    phone: yup.string().trim().required().test('is-valid-phone-number', "Enter a valid Number!", isValidPhoneNumber),
    email: yup.string().trim().email().required(),
    gender: yup.string().trim().required(),
    instrument: yup.string().trim().required()
})


export function Form({ basicDetails, data }) {

    let searchParams = useSearchParams();

    const { control, handleSubmit } = useForm({
        defaultValues: {
            ...searchParams
        },
        resolver: yupResolver(schema)
    });

    const mutation = useSubmitMutation("/learnkirtan/");

    function onSubmit(data) {
        data.pagename = getLastSlug();
        mutation.mutate(data);
    }




    return (

        <div className="rounded-xl bg-surface text-on-surface px-4 md:px-12 py-6 space-y-8">

            <form onSubmit={handleSubmit(onSubmit, () => toast.error("Fix form errors!"))} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <ControlledSelect
                    name="instrument"
                    control={control}
                    label={"Select Instrument"}
                    options={[
                        { label: "Kartal (Rs. 1100)", value: "kartal" },
                        { label: "Mridanga (Rs. 3000)", value: "mridanga" },
                        { label: "Kartal and Mridanga (Rs. 4100)", value: "kartal and mridanga" },
                    ]}
                />

                <ControlledSelect
                    name="time-slot"
                    control={control}
                    label={"Convenient Time Slot"}
                    options={[
                        { label: "Sunday 10:00 - 11:00 AM", value: "Sunday 10:00 - 11:00 AM" },
                        { label: "Sunday 10:30 - 11:30 AM", value: "Sunday 10:30 - 11:30 AM" },
                        { label: "Sunday 4:00 - 5:00 PM", value: "Sunday 4:00 - 5:00 PM" },
                        { label: "Sunday 4:30 - 5:30 PM", value: "Sunday 4:30 - 5:30 PM" },
                        { label: "Sunday 6:00 - 7:00 PM", value: "Sunday 6:00 - 7:00 PM" },
                        { label: "Sunday 6:30 - 7:30 PM", value: "Sunday 6:30 - 7:30 PM" },
                    ]}
                />

                <ControlledInput
                    control={control}
                    name="name"
                    label="Name"
                    placeholder="Enter Name"
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

                <ControlledPhoneInput
                    control={control}
                    name="phone"
                    label="Whatsapp No."
                    placeholder="Enter Whatsapp No."
                />


                <ControlledInput
                    control={control}
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="Enter Email"
                />


                <SubmitButton control={control} loading={mutation.isPending} />

            </form>



            <div className="flex flex-wrap lg:flex-nowrap justify-between gap-4">

                <div className="space-y-4 max-w-max">

                    <h5 className="text-primary font-semibold text-xl">For any queries</h5>

                    <p className="max-w-xl font-semibold">
                        {data.additional_form_text}
                    </p>

                    <div className="flex flex-wrap gap-y-2">

                        <a href={"mailto:" + data.email} className="w-full flex gap-2 items-center hover:underline">
                            <EmailIcon />
                            <span>
                                hrsd@hkmjaipur.org
                            </span>
                        </a>

                        <a target="_blank" rel="noopener"  href={"https://wa.me/" + data.phone} className="w-full flex gap-2 items-center hover:underline">
                            <WhatsappIcon />
                            <span >
                                {data.phone}
                            </span>
                        </a>


                    </div>



                </div>


                <div className="sm:min-w-max">

                    <h5 className="text-primary font-semibold text-xl">Follow Us</h5>

                    <div className="space-y-2 mt-2">
                        <div className="">For more information:</div>

                        <a
                            href={basicDetails.socials.youtube}
                            target="_blank" rel="noopener" 
                            className="w-full flex gap-2 items-center hover:underline font-bold"
                        >
                            <YoutubeIcon className="text-xl text-primary" />
                            guptvrindavandham
                        </a>

                        <a
                            href={basicDetails.socials.instagram}
                            target="_blank" rel="noopener" 
                            className="w-full flex gap-2 items-center hover:underline font-bold"
                        >
                            <InstagramIcon className="text-xl text-primary" />
                            guptvrindavandham
                        </a>

                    </div>

                </div>

            </div>



        </div>
    )
}

function SubmitButton({ control, loading }) {


    const reg_type = useWatch({
        control,
        name: "instrument"
    });

    let amount = 0;
    if (reg_type === "kartal") {
        amount += 1100;

    }
    else if (reg_type === "mridanga") {
        amount += 3000;
    }

    else if (reg_type === "kartal and mridanga") {
        amount += 4100;
    }

    return (


        <Button type="submit" className="col-span-full rounded-lg" loading={loading}>
            Pay & Book &nbsp;{amount ? <span>&#8377;&nbsp;{amount}</span> : ""}
        </Button>
    )
}
