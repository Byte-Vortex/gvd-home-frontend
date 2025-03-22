"use client"

import { useForm, useWatch } from "react-hook-form";
import { ControlledInput } from "@/components/controlled/controlled-input";
import { ControlledPhoneInput } from "@/components/controlled/controlled-phone-input";
import { ControlledSelect } from "@/components/controlled/controlled-select";
import {
    BsWhatsapp as WhatsappIcon, BsEnvelope as EmailIcon, BsYoutube as YoutubeIcon,
    BsInstagram as InstagramIcon
} from "react-icons/bs";

import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { isValidPhoneNumber } from "@/lib/utils";
import yup from "@/lib/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSubmitMutation } from "../_hooks/use-submit-mutation";

const schema = yup.object({
    name: yup.string().trim().required(),
    phone: yup.string().trim().required().test('is-valid-phone-number', "Enter a valid Number!", isValidPhoneNumber),
    email: yup.string().trim().email().required(),
    coupon_type: yup.string().trim().required()
})


export function Form({ data, basicDetails }) {

    let searchParams = useSearchParams();


    const { control, handleSubmit } = useForm({
        defaultValues: {
            ...searchParams,
        },
        resolver: yupResolver(schema)
    });

    const mutation = useSubmitMutation();


    return (
        <div className="rounded-3xl bg-surface text-on-surface px-4 md:px-12 py-6 space-y-8">

            <form onSubmit={handleSubmit(mutation.mutate, () => toast.error("Fix form errors!"))} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <ControlledSelect
                    name="coupon_type"
                    control={control}
                    label={"Coupon Type"}
                    options={[
                        { label: "Single (Rs. 100)", value: "single" },
                        { label: "Family (Rs. 200)", value: "family" },
                    ]}
                />

                <ControlledInput
                    control={control}
                    name="name"
                    label="Name"
                    placeholder="Enter Name"
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

                <SubmitButton buttonText={data.button_text} control={control} loading={mutation.isPending} />

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
                                {data.email}
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

function SubmitButton({ buttonText, control, loading }) {


    const reg_type = useWatch({
        control,
        name: "coupon_type"
    });

    let amount = 0;
    if (reg_type === "family") {
        amount += 200;

    }
    else if (reg_type === "single") {
        amount += 100;
    }

    return (


        <Button type="submit" className="col-span-full rounded-lg" loading={loading}>
            {buttonText} &nbsp;{amount ? <span>&#8377;&nbsp;{amount}</span> : ""}
        </Button>
    )
}
