"use client"

import { useEffect, useRef } from "react"
import * as Tabs from '@radix-ui/react-tabs';
import { RiAccountBoxLine as PersonalIcon } from "react-icons/ri";
import { MdOutlinePayment as PaymentIcon } from "react-icons/md";
import { FaRegCheckCircle as FinishIcon } from "react-icons/fa";
import { useEventStore } from "../../_store/event.store";
export
    function FormSectionClient({ children }) {

    const tabState = useEventStore((state) => state.tabState);

    console.log(tabState);

    return (
        <div className="w-full space-y-4">


            <Tabs.Root defaultValue="form" orientation="horizontal" value={tabState.current}>


                <Tabs.List aria-label="tabs" className="flex font-bold text-center mb-12 w-[96%] mx-auto">


                    <Tabs.Trigger disabled value="form" className="group flex-grow border-b-2 py-3 data-[state=active]:text-primary data-[state=active]:border-primary flex justify-center items-center gap-2">
                        <PersonalIcon className="text-xl" />
                        <span className="sr-only md:not-sr-only group-data-[state=active]:!not-sr-only">Personal Info</span>
                    </Tabs.Trigger>

                    <Tabs.Trigger disabled value="payment" className="group flex-grow border-b-2 py-3 data-[state=active]:text-primary data-[state=active]:border-primary flex justify-center items-center gap-2">
                        <PaymentIcon className="text-xl" />
                        <span className="sr-only md:not-sr-only group-data-[state=active]:!not-sr-only">Payment</span>
                    </Tabs.Trigger>

                    <Tabs.Trigger disabled value="settled" className="group flex-grow border-b-2 py-3 data-[state=active]:text-primary data-[state=active]:border-primary flex justify-center items-center gap-2">

                        <FinishIcon className="text-xl" />
                        <span className="sr-only md:not-sr-only group-data-[state=active]:!not-sr-only">Finish</span>

                    </Tabs.Trigger>

                </Tabs.List>



                <Tabs.Content value="form">
                    {children}
                </Tabs.Content>

                <Tabs.Content value="payment">

                    <div className="bg-white w-full max-w-5xl p-2 rounded-xl mx-auto">
                        <PaymentIframe />
                    </div>

                </Tabs.Content>

                <Tabs.Content value="settled" className="flex flex-col gap-6 items-center bg-landing-background">


                    Donation is in Settled State

                </Tabs.Content>


            </Tabs.Root>


        </div>
    )
}

function PaymentIframe() {

    const tabState = useEventStore((state) => state.tabState);

    const ref = useRef();
    useEffect(() => {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'start' });
    }, []);

    return (
        <iframe ref={ref} className="w-full" height={500} id="paymentFrame" src={`https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction&merchant_id=${tabState.meta.merchant_id}&encRequest=${tabState.meta.encRequest}&access_code=${tabState.meta.accessCode}`} />
    )
}