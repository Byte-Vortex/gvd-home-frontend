"use client"

import { ProseInnerHtmlContainer } from "@/components/prose-container"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { ShowMoreFadeContainer } from "@/components/ui/show-more-fade-container"
import { useState } from "react";

export function FaqSection({ data }) {

    const [showMore, setShowMore] = useState(false);
    return (
        <div>

            <h2 className="text-3xl font-bold">{data.title}</h2>
            <ProseInnerHtmlContainer html={data.text} className="mt-2 mb-6" />
            <ShowMoreFadeContainer isShowMoreVisible={data.faq.length >= 4} showMore={showMore} setShowMore={setShowMore}>
                <Accordion type="single" collapsible className="w-full">


                    {
                        data.faq.map((item, index) => (
                            (index < 4 || showMore) && <AccordionItem key={index} value={index + ""}>
                                <AccordionTrigger className="hover:underline underline-offset-2 data-[state=open]:text-primary text-lg font-semibold my-3 text-left">{item.title}</AccordionTrigger>
                                <AccordionContent className="text-base">
                                    <div className="text-base text-current" dangerouslySetInnerHTML={{ __html: item.text }} />
                                </AccordionContent>
                            </AccordionItem>
                        ))


                    }
                </Accordion>
            </ShowMoreFadeContainer>

        </div>
    )
}