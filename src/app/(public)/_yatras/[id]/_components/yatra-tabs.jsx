"use client"

import { Image } from "@/components/image"
import { ProseInnerHtmlContainer } from "@/components/prose-container"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatIndianCurrency } from "@/lib/utils"
import { useRef } from "react"

export function YatraTabs({ data }) {
    const ref = useRef();

    return (

        <Tabs ref={ref} className="pt-12" onValueChange={() => { console.log("cat"); ref.current.scrollIntoView(true) }} defaultValue="about">
            <TabsList className="w-full flex mb-6 sticky top-16 z-10 shadow-lg border border-outline/20">
                <TabsTrigger value="about" className="flex-grow px-1">{data.tab_names.tab1}</TabsTrigger>
                <TabsTrigger value="package" className="flex-grow px-1">{data.tab_names.tab2}</TabsTrigger>
                <TabsTrigger value="itinerary" className="flex-grow px-1">{data.tab_names.tab3}</TabsTrigger>
                <TabsTrigger value="addons" className="flex-grow px-1">{data.tab_names.tab4}</TabsTrigger>
            </TabsList>

            {/* About */}
            <TabsContent value="about" className="space-y-6">
                <h4>Description</h4>
                <ProseInnerHtmlContainer html={data.about.description} />

                {data.about.key_features?.length &&
                    <ul className="bg-surface text-on-surface rounded-md border-2 grid sm:grid-cols-2 gap-x-8 gap-y-6 px-4 sm:px-8 py-8">
                        {
                            data.about.key_features.map((item, index) => (
                                <li key={index}>
                                    <h5>{item.feature}</h5>
                                    <p className="text-on-surface/60">{item.feature_description}</p>
                                </li>
                            ))
                        }
                    </ul>
                }
            </TabsContent>

            {/* package */}
            <TabsContent value="package">
                <ProseInnerHtmlContainer html={data.package_inclusions} />
            </TabsContent>


            {/* itinerary */}
            <TabsContent value="itinerary" className="space-y-6">

                <h4>Detailed Day Wise Itinerary</h4>

                <Accordion type="multiple" collapsible className="w-full">

                    {
                        data.itineraries.map((item, index) => (
                            <AccordionItem key={index} value={index + ""}>
                                <AccordionTrigger className="hover:underline underline-offset-2 data-[state=open]:text-primary text-lg font-semibold my-3 text-left capitalize">
                                    Day {item.day}:&nbsp;&nbsp; {item.date}: {item.start_location} To {item.end_location}
                                </AccordionTrigger>
                                <AccordionContent className="text-base">
                                    <ProseInnerHtmlContainer html={item.description} />
                                </AccordionContent>
                            </AccordionItem>
                        ))


                    }
                </Accordion>

            </TabsContent>

            {/* addons */}
            <TabsContent value="addons">
                
                <ProseInnerHtmlContainer html={data.about.add_ons} />
            </TabsContent>

        </Tabs>
    )
}
