"use client"

import { useEffect, useRef, useState } from "react"
import * as Tabs from '@radix-ui/react-tabs';
import { RiAccountBoxLine as PersonalIcon } from "react-icons/ri";
import { MdOutlinePayment as PaymentIcon } from "react-icons/md";
import { BsTicket as TicketIcon } from "react-icons/bs";
import { FaCheckCircle, FaRegCheckCircle as FinishIcon } from "react-icons/fa";
import { Controller, useForm } from "react-hook-form";
import { ControlledDatePicker } from "@/components/controlled/controlled-date-picker";
import { ControlledInput } from "@/components/controlled/controlled-input";
import { ControlledPhoneInput } from "@/components/controlled/controlled-phone-input";
import { ControlledSelect } from "@/components/controlled/controlled-select";
import { ControlledTextArea } from "@/components/controlled/controlled-textarea";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { convertFileToBase64, formatIndianCurrency, isValidPhoneNumber } from "@/lib/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "@/lib/yup";
import { useYatraStore } from "../../_store/yatra.store";
import { Separator } from "@/components/ui/separator";
import { ControlledCheckbox } from "@/components/controlled/controlled-checkbox";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { BookingForm } from "./booking-form";
import { makeRequestClient } from "@/lib/fetch";
import { SyncForm } from "../../_store/sync-form";
import CopyToClipboard from "@/components/ui/copy-to-clipboard";
import { Image } from "@/components/image";
import { BsWhatsapp as WhatsappIcon, BsEnvelope as EmailIcon } from "react-icons/bs";
import { UploadIcon } from "lucide-react";


export function FormSection({ data }) {

    // booking | overview | form | settlted
    const [tabState, setTabState] = useState("1")
    // 1 2 3 4

    return (

        <Tabs.Root activationMode="manual" orientation="horizontal" value={tabState} onValueChange={setTabState}>


            <Tabs.List aria-label="tabs" className="flex font-bold text-center mb-4 w-[96%] mx-auto">


                <Tabs.Trigger value="1" disabled={parseInt(tabState) <= 1 || tabState === "4"} className="group flex-grow border-b-2 py-3 data-[state=active]:text-primary data-[state=active]:border-primary flex justify-center items-center gap-2 disabled:cursor-not-allowed disabled:pointer-events-none">
                    <TicketIcon className="text-xl" />
                    <span className="sr-only md:not-sr-only group-data-[state=active]:!not-sr-only">Booking</span>
                </Tabs.Trigger>


                <Tabs.Trigger value="2" disabled={parseInt(tabState) <= 2 || tabState === "4"} className="group flex-grow border-b-2 py-3 data-[state=active]:text-primary data-[state=active]:border-primary flex justify-center items-center gap-2 disabled:cursor-not-allowed disabled:pointer-events-none">
                    <PersonalIcon className="text-xl" />
                    <span className="sr-only md:not-sr-only group-data-[state=active]:!not-sr-only">Overview</span>
                </Tabs.Trigger>

                <Tabs.Trigger value="3" disabled={parseInt(tabState) <= 3 || tabState === "4"} className="group flex-grow border-b-2 py-3 data-[state=active]:text-primary data-[state=active]:border-primary flex justify-center items-center gap-2 disabled:cursor-not-allowed disabled:pointer-events-none">
                    <PaymentIcon className="text-xl" />
                    <span className="sr-only md:not-sr-only group-data-[state=active]:!not-sr-only">Basic Details</span>
                </Tabs.Trigger>

                <Tabs.Trigger disabled value="4" className="group flex-grow border-b-2 py-3 data-[state=active]:text-primary data-[state=active]:border-primary flex justify-center items-center gap-2 disabled:cursor-not-allowed disabled:pointer-events-none">

                    <FinishIcon className="text-xl" />
                    <span className="sr-only md:not-sr-only group-data-[state=active]:!not-sr-only">Success</span>

                </Tabs.Trigger>

            </Tabs.List>

            <div className="rounded-3xl bg-surface text-on-surface px-4 sm:px-6 py-6">

                <Tabs.Content value="1">
                    <BookingForm onSubmit={setTabState.bind(null, "2")} />
                </Tabs.Content>


                <Tabs.Content value="2">
                    <OverviewTab data={data} onNext={setTabState.bind(null, "3")} />
                </Tabs.Content>

                <Tabs.Content value="3">
                    <FormTab onSubmitSuccess={setTabState.bind(null, "4")} />
                </Tabs.Content>

                <Tabs.Content value="4" className="flex flex-col gap-6 items-center bg-landing-background">
                    <SettledTab />
                </Tabs.Content>

            </div>


        </Tabs.Root>
    )
}

const SCHEMA = yup.object({
    trip_date: yup.string().required(),
    children_count: yup.number().integer().min(0).notRequired(),
    adult_count: yup.number().integer().min(1).required(),


    name: yup.string().trim().required(),
    phone: yup.string().trim().required().test('is-valid-phone-number', "Enter a valid Number!", isValidPhoneNumber),
    gender: yup.string().required(),
    dob: yup.string().required(),
    address: yup.string().trim().required(),
    id_proof: yup.mixed().required(),
    payment_screenshot: yup.mixed().required(),
    emergency_phone: yup.string().trim().required().test('is-valid-phone-number', "Enter a valid Number!", isValidPhoneNumber),


})

function FormTab({ onSubmitSuccess }) {


    const { id } = useParams();
    const yatraDetails = useYatraStore((state) => state.formValues[id]?.booking);

    const { control, handleSubmit, setValue, getValues } = useForm({
        resolver: yupResolver(SCHEMA),
        mode: "onBlur",
        values: {
            yatraId: id,
            trip_date: yatraDetails?.trip_date,
            children_count: yatraDetails?.children_count,
            adult_count: yatraDetails?.adult_count
        }
    });

    const ref = useRef();
    useEffect(() => {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'start' });
    }, []);

    const mutation = useMutation({
        mutationFn: async (data) => {
            const newData = { ...data };
            newData.id_proof = await convertFileToBase64(data.id_proof[0]);
            newData.payment_screenshot = await convertFileToBase64(data.payment_screenshot[0]);
            await makeRequestClient(`/yatra/yatra-booking/${id}`, {
                data: newData,
                method: "POST",
            })
        },
        onSuccess: () => {
            toast.success("Form submitted successfully!")
            onSubmitSuccess?.()
        },
        onError: (err) => {
            toast.error("Something went wrong, please try again!")
        }
    })

    return (
        <form ref={ref} onSubmit={handleSubmit(mutation.mutate, (err) => {
            toast.error("Please Fix form errors!"); console.log(err)
        })} className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <SyncForm
                //these are required to be excluded otherwise form gets buggy due to old values
                excludeKeys={["id_proof", "payment_screenshot", "yatraId", "trip_date", "children_count", "adult_count"]}
                setValue={setValue}
                getValues={getValues}
                control={control}
                formKey={"final"}
            />


            <ControlledInput
                control={control}
                name="name"
                label="Name"
                placeholder="Enter Name"
            />

            <ControlledPhoneInput
                hideDropdown
                control={control}
                name="phone"
                label="Whatsapp No."
                placeholder="Enter Whatsapp No."
            />


            <ControlledDatePicker
                maxDate={function getOldDate(countFromCurrentYear) {
                    const date = new Date();
                    date.setFullYear(date.getFullYear() - countFromCurrentYear)
                    return date;
                }(10)}
                control={control}
                name="dob"
                label={"Date of Birth"}
            />

            <ControlledSelect
                name="gender"
                control={control}
                label={"Gender"}
                options={[
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                    // { label: "Other", value: "other" },
                ]}
            />


            <ControlledInput
                control={control}
                name="address"
                label="Full Address"
                placeholder="Enter Address"
            />



            <FileInput
                name="id_proof"
                label="PAN / Aadhar Card"
                control={control}
            />

            <FileInput
                name="payment_screenshot"
                label="Screenshot of Payment"
                control={control}
            />



            <ControlledPhoneInput
                hideDropdown
                control={control}
                name="emergency_phone"
                label="Emergency Contact No."
                placeholder="Enter Phone No."
            />

            <div className="col-span-full">
                <ControlledTextArea
                    hideAsterisk
                    control={control}
                    label="Message"
                    placeholder="Please write the name and age of the person you are registering with you."
                    name="message"
                />
            </div>


            <Button type="submit" className="col-span-full rounded-lg" loading={mutation.isPending}>
                Next
            </Button>
        </form>
    )

}

function OverviewTab({ onNext, data }) {

    // const contactDetails = data.contact_details;
    const bankDetails = data.contact_details.bank_details;
    const { id } = useParams();
    const formValues = useYatraStore((state) => state.formValues?.[id]?.["booking"]);
    const yatraDetails = useYatraStore((state) => state.yatraDetails);


    const { control, handleSubmit, watch, getValues, setValue } = useForm({
        defaultValues: {
            terms: true,
            policies: true,
            rules: true,
            tour: true,
            refund: true
        }
    });

    const values = watch();

    const canSubmit = values.terms && values.policies && values.rules && values.tour && values.refund


    const totalAmount = yatraDetails.dates[formValues?.trip_date].price_per_person * formValues?.adult_count + yatraDetails.dates[formValues?.trip_date].price_for_children * formValues?.children_count;

    return (
        <form onSubmit={handleSubmit(() => onNext?.())}>

            <SyncForm
                setValue={setValue}
                getValues={getValues}
                control={control}
                formKey={"overview"}
            />

            <div className="text-xl font-medium">Price Breakdown</div>
            <Separator className="h-[1px] mt-1 mb-4" />



            <div className="flex justify-between gap-2 font">
                <span>Adult Pilgrim</span>
                <span>{formatIndianCurrency(yatraDetails.dates[formValues?.trip_date].price_per_person, { maximumFractionDigits: 0 })} x {formValues?.adult_count}</span>
            </div>

            {formValues?.children_count &&
                <div className="flex justify-between gap-2 font">
                    <span>Child Pilgrim</span>
                    <span >{formatIndianCurrency(yatraDetails.dates[formValues?.trip_date].price_for_children, { maximumFractionDigits: 0 })} x {formValues?.children_count}</span>
                </div>
            }

            <Separator className="h-[1px] my-2" />


            <div className="flex justify-between gap-2 font-bold text-primary">
                <span>Total Amount</span>
                <span className="font-bold">{formatIndianCurrency(totalAmount, { maximumFractionDigits: 0 })}</span>
            </div>



            <div className="rounded-2xl space-y-6 flex flex-wrap lg:flex-nowrap justify-between gap-4 mt-12">

                <div className="space-y-2 max-w-max">

                    <h4>Bank Account Details</h4>

                    <h5 className="text-primary flex items-center  justify-center gap-2 max-w-max">
                        <span> For Bank Transfer </span>
                        <CopyToClipboard
                            text={
                                "Account Name: " + bankDetails.account_name + "\n" +
                                "Account Number: " + bankDetails.account_number + "\n" +
                                "Bank Name: " + bankDetails.bank_name + "\n" +
                                "IFSC Code: " + bankDetails.ifsc_code + "\n"
                            }
                        />
                    </h5>

                    <div className="flex flex-wrap gap-x-6 gap-y-4">


                        <div>
                            <span className="text-sub-text">Account Name:</span>&nbsp;
                            <span className="font-bold inline-flex items-center gap-2">
                                <span> {bankDetails.account_name}</span>
                                <CopyToClipboard text={bankDetails.account_name} />
                            </span>
                        </div>

                        <div>
                            <span className="text-sub-text">Account Number:</span>&nbsp;
                            <span className="font-bold inline-flex items-center gap-2">
                                <span>{bankDetails.account_number}</span>
                                <CopyToClipboard text={bankDetails.account_number} />
                            </span>
                        </div>

                        <div>
                            <span className="text-sub-text">Bank Name:</span>&nbsp;
                            <span className="font-bold inline-flex items-center gap-2">
                                <span>{bankDetails.bank_name}</span>
                                <CopyToClipboard text={bankDetails.bank_name} />
                            </span>
                        </div>

                        <div>
                            <span className="text-sub-text">IFSC Code:</span>&nbsp;
                            <span className="font-bold inline-flex items-center gap-2">
                                <span>{bankDetails.ifsc_code}</span>
                                <CopyToClipboard text={bankDetails.ifsc_code} />
                            </span>
                        </div>

                    </div>



                </div>


                <div className="flex-grow lg:w-full">
                    <div className="max-w-56 mx-auto flex items-center justify-center overflow-hidden bg-primary rounded-xl p-1 aspect-1">
                        <div className="rounded-lg overflow-hidden bg-white p-1 relative w-full h-full">
                            <Image fill src={bankDetails.qr_image} />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 justify-center mt-1">
                        <p className="font-bold text-sm text-center">
                            UPI ID: {bankDetails.upi_id}

                        </p>
                        <CopyToClipboard
                            text={bankDetails.upi_id}
                        />
                    </div>

                </div>


                {/* <div className="sm:min-w-max">

                    <h5 className="text-primary">Support</h5>

                    <div className="space-y-2 mt-2">
                        <div className="">For more information please contact:</div>

                        <a target="_blank" rel="noopener"  href={contactDetails.social_links.whatsapp} className="flex items-center gap-1 hover:underline font-medium">
                            <div className="p-1.5 rounded-xl bg-primary inline-flex items-center justify-center text-white">
                                <WhatsappIcon />
                            </div>
                            {contactDetails.phone}
                        </a>
                        <a target="_blank" rel="noopener"  href={"mailto:" + contactDetails.email} className="flex items-center gap-1 hover:underline font-medium">
                            <div className="p-1.5 rounded-xl bg-primary inline-flex items-center justify-center text-white">
                                <EmailIcon />
                            </div>
                            {contactDetails.email}
                        </a>
                    </div>

                </div> */}

            </div>



            <Separator className="h-[1px] my-6" />





            <p className="font-bold my-4">
                We request the pilgrims to Please read Terms & Conditions carefully to avoid any unpalatable experiences.
            </p>

            <p className="font-bold">* I/We agree on the following terms</p>


            <div className="flex flex-wrap gap-4 mt-1 mb-4">
                <div className="flex items-center gap-2">
                    <ControlledCheckbox
                        control={control}
                        name="terms"
                    />

                    <Button asChild variant="link" className="h-max px-0 py-0 text-base text-on-surface">
                        <Link href="/terms-and-conditions" target="_blank" rel="noopener" >
                            Terms & Conditions
                        </Link>
                    </Button>

                </div>


                <div className="flex items-center gap-2">
                    <ControlledCheckbox
                        control={control}
                        name="policies"
                    />

                    <Button asChild variant="link" className="h-max px-0 py-0 text-base text-on-surface">
                        <Link href="/policies" target="_blank" rel="noopener" >
                            Policies
                        </Link>
                    </Button>

                </div>

                <div className="flex items-center gap-2">
                    <ControlledCheckbox
                        control={control}
                        name="rules"
                    />

                    <Button asChild variant="link" className="h-max px-0 py-0 text-base text-on-surface">
                        <Link href="/rules" target="_blank" rel="noopener" >
                            Rules & Regulation
                        </Link>
                    </Button>

                </div>

                <div className="flex items-center gap-2">
                    <ControlledCheckbox
                        control={control}
                        name="tour"
                    />

                    <Button asChild variant="link" className="h-max px-0 py-0 text-base text-on-surface">
                        <Link href="/tour" target="_blank" rel="noopener" >
                            Tour Extension Policy
                        </Link>
                    </Button>

                </div>

                <div className="flex items-center gap-2">
                    <ControlledCheckbox
                        control={control}
                        name="refund"
                    />

                    <Button asChild variant="link" className="h-max px-0 py-0 text-base text-on-surface">
                        <Link href="/refund" target="_blank" rel="noopener" >
                            Cancellation and Refund Policy
                        </Link>
                    </Button>

                </div>
            </div>



            <Button type="submit" disabled={!canSubmit} className="col-span-full rounded-lg w-full">
                Next
            </Button>

        </form>
    )
}

function SettledTab() {
    return (
        <div className="space-y-8">

            <FaCheckCircle className="w-32 h-32 mx-auto text-green-500" />
            <h3 className="text-4xl font-bold text-center max-w-4xl mx-auto">
                Booking Under Process!
            </h3>

            <p className="bg-background p-4 rounded-xl max-w-2xl mx-auto">
                We have received your request and will soon get back to you!
            </p>

        </div>
    )
}


function FileInput({ control, name, label }) {

    return (

        <Controller
            name={name}
            control={control}
            render={({ field: { name, onChange, value, ref, onBlur }, fieldState: { error } }) => {

                return (
                  
                        
                        <Input
                        prefixIcon={<UploadIcon className="size-4" />}
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
