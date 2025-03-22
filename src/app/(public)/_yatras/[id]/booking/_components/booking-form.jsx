"use client"

import { ControlledInput } from "@/components/controlled/controlled-input";
import { ControlledSelect } from "@/components/controlled/controlled-select";
import { ProseInnerHtmlContainer } from "@/components/prose-container";
import { Button } from "@/components/ui/button";
import { convertMySqlDateToJSDate, formatIndianCurrency } from "@/lib/utils";
import yup from "@/lib/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useWatch, } from "react-hook-form";
import { toast } from "sonner";
import { useYatraStore } from "../../_store/yatra.store";
import { SyncForm } from "../../_store/sync-form";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

const SCHEMA = yup.object({
    trip_date: yup.string().required(),
    children_count: yup.number().integer().min(0).notRequired(),
    adult_count: yup.number().integer().min(1).required(),
})


export function BookingForm({ onSubmit }) {

    const yatraDetails = useYatraStore((state) => state.yatraDetails);


    const { handleSubmit, control, setValue, getValues } = useForm({
        resolver: yupResolver(SCHEMA),
        defaultValues: {
            trip_date: Object.keys(yatraDetails.dates)[0],
            children_count: null,
            adult_count: null,
        }
    });

    const selectedTripDate = useWatch({
        control,
        name: "trip_date",
        defaultValue: Object.keys(yatraDetails.dates)[0],

    })

    const selectedTripDateDetails = yatraDetails.dates[selectedTripDate]

    function innerOnSubmit(data) {
        let count = 0;
        if (data.children_count) count += data.children_count;
        count += data.adult_count;
        if (count > selectedTripDateDetails.left_seats) {
            return toast.error("Total seats cannot exceed left seats!");
        }
        onSubmit?.(data)
    }


    return (
        <form
            onSubmit={handleSubmit(innerOnSubmit, () => toast.error("Please fix form errors!"))}
            className="flex flex-col gap-8"
        >
            <Badge variant="secondary" className={"ml-auto max-w-max font-bold"}>
                <span>{selectedTripDateDetails.left_seats}</span>&nbsp;/&nbsp;{selectedTripDateDetails.total_seats} seats left

            </Badge>
            <SyncForm
                formKey={"booking"}
                setValue={setValue}
                control={control}
                getValues={getValues}
            />
            <ControlledSelect
                control={control}
                name="trip_date"
                label="Choose Date"
                options={Object.keys(yatraDetails.dates).map((item) => ({ label: format(convertMySqlDateToJSDate(item), "dd MMM, yyyy"), value: item }))}
            />

            <div className="grid grid-cols-10 gap-2">
                <div className="col-span-3">
                    <div className="font-bold">For Children</div>
                    <div className="text-sm text-on-surface/70">
                        {formatIndianCurrency(yatraDetails.dates[selectedTripDate]?.price_for_children, { maximumFractionDigits: 0 })}
                    </div>
                </div>
                <div className="col-span-7">
                    <ControlledInput
                        type="number"
                        control={control}
                        name="children_count"
                        placeholder="No. of Children"
                    />
                </div>
            </div>

            <div className="grid grid-cols-10 gap-2">
                <div className="col-span-3">
                    <div className="font-bold">For Adult&nbsp;<span className="text-red-500 text-sm">*</span></div>
                    <div className="text-sm text-on-surface/70">
                        {formatIndianCurrency(yatraDetails.dates[selectedTripDate]?.price_per_person, { maximumFractionDigits: 0 })}
                    </div>
                </div>
                <div className="col-span-7">
                    <ControlledInput
                        type="number"
                        control={control}
                        name="adult_count"
                        placeholder="No. of Adults"
                    />
                </div>
            </div>


            <FinalAmountField control={control} />

            {selectedTripDateDetails?.left_seats ? <Button type="submit" className="rounded-md">
                Next
            </Button>

                :
                <p className="text-yellow-500 text-center font-semibold text-sm">
                    No seats are available for this date, please select any other date!
                </p>
            }
        </form>

    )
}

function FinalAmountField({ control }) {
    const fields = useWatch({ control });
    const selectedTripDate = fields.trip_date;

    const yatraDetails = useYatraStore((state) => state.yatraDetails);

    function getPrice() {
        let price = 0;
        price = yatraDetails.dates[selectedTripDate].price_for_children * fields.children_count || 0;
        price += yatraDetails.dates[selectedTripDate].price_per_person * fields.adult_count || 0;
        if (price < 0) return 0;
        return price;
    }

    const price = getPrice();


    return (
        !!price && <div className="flex justify-between items-center gap-4">
            <div className="text-lg font-bold">
                Subtotal
            </div>
            <div className="font-bold text-lg">{formatIndianCurrency(price, { maximumFractionDigits: 0 })}</div>
        </div>
    )
}
