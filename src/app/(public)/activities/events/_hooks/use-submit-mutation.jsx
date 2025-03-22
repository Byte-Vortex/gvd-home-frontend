"use client"

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner"
import { useEventStore } from "../_store/event.store";
import { makeRequestClient } from "@/lib/fetch";
import { getLastSlug } from "@/lib/utils";
import { useRouter } from "next/navigation";


function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
}

async function displayRazorpay(data, onSuccess, onDismiss) {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
    if (!res) {
        alert('Razorpay SDK failed to load. Are you online?')
        return
    }

    const options = {
        key: "rzp_live_b46knvSSq6Ihhm",
        currency: data.currency,
        amount: data.amount.toString(),
        order_id: data.id,
        name: 'Donation',
        description: 'Thank you for your kind donation',
        handler: function (response) {
            onSuccess();
        },
        "modal": {
            "ondismiss": onDismiss
        }
    }
    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
}

export function useSubmitMutation() {

    const setTab = useEventStore((state) => state.actions.setTab);


    async function submitData(data) {
        data.pagename = getLastSlug();
        const res =  await makeRequestClient("/eventform/", {
            data,
            method: "POST"
        });

        return res.data;
    }
    const mutation = useMutation({
        mutationFn: submitData,
        onSuccess: (data) => {
            toast.success("Please checkout!");
            setTab({
                current: "payment",
                meta: data
            })

            // displayRazorpay(data, () => {
            //     router.push("/activities/events/jhulan-seva/thank-you")
            // }, () => {
            //     router.push("/transaction-failed")
            // });
        },
        onError: (err) => {
            toast.error("Something went wrong!")
        }
    })

    return mutation;
}
