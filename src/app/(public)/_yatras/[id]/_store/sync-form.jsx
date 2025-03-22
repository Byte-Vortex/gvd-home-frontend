"use client"
import { useYatraStore } from "./yatra.store";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";

export function SyncForm({ setValue, control, getValues, formKey, excludeKeys }) {
    const { id } = useParams();

    const setFormValues = useYatraStore((state) => state.actions.setFormValues);
    const formValues = useYatraStore((state) => state.formValues?.[id]?.[formKey]);
    const yatraDetails = useYatraStore((state) => state.yatraDetails);
    const [detailsFilled, setDetailsFilled] = useState(false);

    const values = useWatch({ control });

    useEffect(() => {
        if (detailsFilled) return;
        setDetailsFilled(true);
        if (!formValues) return;
        //this prevents access to unknown dates and hence preventing crash.
        if (formKey === "booking" && !yatraDetails.dates?.[formValues.trip_date]) return;
        setTimeout(() => {
            Object.entries(formValues).forEach(([key, val]) => {
                if (excludeKeys?.includes(key)) return;
                setValue(key, val);
            })
        }, 0)

    }, [formValues, setValue, yatraDetails, formKey, detailsFilled, excludeKeys]);



    useEffect(() => {
        if (!detailsFilled) return;

        const newValues = getValues();
        setFormValues(id, formKey, newValues)

    }, [values, formKey, detailsFilled, getValues, id, setFormValues])


    return null;

}