"use client"

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner"
import { useEventStore } from "../_store/event.store";
import { makeRequestClient } from "@/lib/fetch";

export function useSubmitMutation(endpoint) {

    const setTab = useEventStore((state) => state.actions.setTab);


    async function submitData(data) {
        const res = await makeRequestClient(endpoint, { data, method: "POST" })
        return res?.data;
    }
    const mutation = useMutation({
        mutationFn: submitData,
        onSuccess: (data) => {
            toast.success("Please checkout!");
            setTab({
                current: "payment",
                meta: data
            })
        },
        onError: (err) => {
            toast.error("Something went wrong!")
        }
    })

    return mutation;
}
