"use client"

import { ControlledDatePicker } from "@/components/controlled/controlled-date-picker"
import { ControlledInput } from "@/components/controlled/controlled-input"
import { Controller, useForm, useWatch } from "react-hook-form"
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup"
import { convertMySqlDateToJSDate } from "@/lib/utils";
import Spinner from "@/components/ui/spinner";
import { FaRegClock as ClockIcon } from "react-icons/fa";
import { MdOutlineLocationOn as LocationIcon } from "react-icons/md";
import DinnerImage from "../images/dinner.webp"
import LunchImage from "../images/lunch.webp"
import BreakfastImage from "../images/breakfast.webp"
import { Image } from "@/components/image";
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
// import { useUI } from "@/providers/ui.provider";
import yup from "@/lib/yup";
import { Button } from "@/components/ui/button";

const schema = yup.object({
    receiver_name: yup.string().trim().required(),
    receiver_mobile: yup.string().trim().required().matches(/^[0-9]*$/, "Must be digits only!").length(10),
    use_date: yup.string().trim().required(),
    number: yup.number().positive().integer().required(),
    coupon_data: yup.string().trim().required("Select any one Coupon!")

})

export function FormSection() {

    let searchParams = useSearchParams();

    // const { confirm } = useUI();

    const { control, handleSubmit, reset, setValue } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            coupon_price: 0
        }
    })


    async function submitData(data) {

        let paramsObj = {};
        searchParams.forEach((value, key) => {
            paramsObj[key] = value;
        })

        if (!paramsObj.custodian) throw "Error";

        const response = await fetch("https://hkmjerp.in/api/method/prasadam_flow.api.v1.book.request", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: {
                    ...data,
                    ...paramsObj,
                }
            })
        });
        if (response.status >= 400) throw "error";
        const json = await response.json();
        window.location.replace(json.message);
        return "success";
    }

    const mutation = useMutation({
        mutationFn: submitData,
        onSuccess: () => {
            toast.success("Form Submitted!")
            reset()
        },
        onError: () => toast.error("Something went wrong, please try again!")
    });

    async function onSubmit(data) {

        const options = {
            title: (
                <div className="font-bold space-x-1">
                    <span className=""> Please Confirm Is This Your Whatsapp No.: </span>
                    <span className="text-primary">{data.receiver_mobile}</span>
                </div>
            ),
            description: (
                <div className="text-sm">
                    On the given Whatsapp no. you will receive the
                    <span className="font-bold text-primary"> Entry Coupon </span>
                    of the Prasadam venue.
                </div>
            ),
            closeOnOutsideClick: false,

        }
        // if (await confirm(options)) {
        //     mutation.mutate(data);
        // };
    }




    return (
        <form id="form" onSubmit={handleSubmit(onSubmit, () => toast.error("Please fix form errors!"))} className="bg-surface rounded-xl p-4 md:p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ControlledInput
                control={control}
                name="receiver_name"
                label="Name"
                placeholder="Enter Name"
            />
            <div>
                <ControlledInput
                    control={control}
                    name="receiver_mobile"
                    label="Whatsapp No."
                    placeholder="Enter Whatsapp No."
                />
                <p className="text-sm font-bold">*You will receive entry coupon on this no.</p>
            </div>
            <ControlledDatePicker
                control={control}
                minDate={new Date()}
                name="use_date"
                label={"Date"}
            />
            <div className="col-span-full">
                <CardsSection control={control} setValue={setValue} />
            </div>

            <CouponCountField control={control} />

            <AmountField control={control} setValue={setValue} />

            <Button type="submit" className="col-span-full" loading={mutation.isPending}>
                Pay & Book
            </Button>

        </form>
    )
}

function CardsSection({ control, setValue }) {

    const dateWatch = useWatch({
        control,
        name: "use_date"
    });

    function getCardImage(slot) {
        let lowerName = String(slot).toLowerCase();
        if (lowerName === 'dinner') return DinnerImage;
        if (lowerName === 'lunch') return LunchImage;
        if (lowerName === 'breakfast') return BreakfastImage;
        return LunchImage;
    }

    async function getCards() {
        const response = await fetch("https://hkmjerp.in/api/method/prasadam_flow.api.v1.general.get_public_coupons?use_date=" + dateWatch, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        if (response.status >= 400) throw "error";
        const json = await response.json();
        // return json.message;
        if (!Array.isArray(json.message)) return [];

        const arr = [];
        for (let card of json.message) {
            let date = convertMySqlDateToJSDate(dateWatch);
            let timeArr = String(card.serving_time).split(":");
            const hours = timeArr.length >= 1 ? timeArr[0] : 0;
            const minutes = timeArr.lenght >= 2 ? timeArr[1] : 0;
            const seconds = timeArr.length >= 3 ? timeArr[2] : 0;

            date.setHours(hours);
            date.setMinutes(minutes);
            date.setSeconds(seconds);

            const timeDiffInHours = (date.getTime() - (new Date()).getTime()) / (1000 * 60 * 60);

            if (timeDiffInHours >= 6) {
                card.date = date;
                arr.push(card);
            }
        }

        arr.sort((a, b) => a.date.getTime() - b.date.getTime());

        return arr;
    }

    const query = useQuery({
        queryKey: ["prasadam", dateWatch],
        queryFn: getCards,
        enabled: !!dateWatch,
        staleTime: 0,
    })

    if (query.isLoading) {
        return (
            <div className="flex gap-2 items-center font-bold justify-center py-12">
                <Spinner /> Hold on loading coupons
            </div>
        )
    }

    if (query.isError) {
        return (
            <div className="text-red-500 font-bold text-center py-12">
                Error while fetching coupons!
            </div>
        )
    }

    if (!query.isSuccess) return null;

    if (!query.data?.length) {
        return (
            <div className="text-red-500 font-bold text-center py-12">
                Sorry, Currently there are no active coupons for the selected date!
            </div>
        )
    }
    return (
        <div>
            <div className="font-semibold text-lg mb-2">Select any one Coupon</div>

            <Controller
                name="coupon_data"
                defaultValue={null}
                control={control}
                render={({
                    field: { value, onChange, ref },
                    fieldState: { error },
                }) => {

                    function onInternalChange(val) {
                        const selected = query.data.find((item) => item.name === val);
                        setValue("coupon_price", selected?.price ?? 0);
                        onChange(val);
                    }
                    return (
                        <div>
                            <ToggleGroup.Root type="single" value={value} onValueChange={onInternalChange} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {
                                    query.data.map((card, index) => (
                                        <ToggleGroup.Item asChild value={card.name} key={index}>

                                            <div className="max-w-sm w-full min-[360px]:max-w-full mx-auto group rounded-xl grid grid-cols-5 overflow-hidden shadow-sm text-left">
                                                <div className="col-span-full min-[360px]:col-span-2 h-full">
                                                    <Image className="w-full h-full object-cover"
                                                        src={getCardImage(card.slot)}
                                                    />
                                                </div>
                                                <div className="col-span-full min-[360px]:col-span-3 p-4 bg-white">
                                                    <div className="font-bold text-lg">{card.name}</div>
                                                    <div className="text-gray-500">({card.slot})</div>
                                                    <div className="text-sm flex items-center gap-1 mt-1">
                                                        <ClockIcon />
                                                        <span className="uppercase font-semibold"> {card.date.toLocaleTimeString()}</span>
                                                    </div>

                                                    <div className="text-sm flex items-center gap-1 my-2">
                                                        <LocationIcon />
                                                        <span> {card.venue}</span>
                                                    </div>
                                                    <div className="font-bold">₹ {card.price}/-</div>
                                                    <button type="button" className="bg-transparent border-2 border-primary text-primary font-bold px-4 py-2 duration-150 hover:brightness-110 active:brightness-75 active:scale-95 rounded-xl mt-4 w-full group-data-[state=on]:bg-primary group-data-[state=on]:text-white">
                                                        {value === card.name ? "Selected" : "Select"}
                                                    </button>
                                                </div>
                                            </div>
                                        </ToggleGroup.Item>
                                    ))
                                }
                            </ToggleGroup.Root>
                            {error && <p className="mt-4 text-sm font-bold text-red-600">{error.message}</p>}
                        </div>
                    )
                }}
            />



        </div>
    )


}

function CouponCountField({ control }) {
    const couponWatch = useWatch({
        control,
        name: "coupon_data"
    });
    return (
        couponWatch && <ControlledInput
            control={control}
            name="number"
            label="No. of Coupons"
            placeholder="Enter No. Coupons"
        />
    )
}


function AmountField({ control, setValue }) {
    const couponPriceWatch = useWatch({
        control,
        name: "coupon_price"
    });

    const couponCountWatch = useWatch({
        control,
        name: "number"
    });


    const amount = (() => {
        if (!couponPriceWatch || !couponCountWatch) return null;
        return (couponPriceWatch * couponCountWatch);
    })();


    useEffect(() => {
        setValue("amount", amount)
    }, [amount, setValue]);

    return (
        amount && <ControlledInput
            control={control}
            disabled
            className="font-bold border-2 border-primary disabled:opacity-100"
            name="amount"
            label="Amount"
            placeholder="Amount"
        />
    )
}