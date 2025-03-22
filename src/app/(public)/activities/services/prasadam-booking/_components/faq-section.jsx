import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function FaqSection({ faqSection }) {

    return (
        <div>

            <h2 className="text-3xl font-bold">Frequently Asked Question!</h2>
            <Accordion type="single" collapsible className="w-full">


                {
                    faqSection.map((item, index) => (
                        <AccordionItem key={index} value={index + ""}>
                            <AccordionTrigger className="hover:underline underline-offset-2 data-[state=open]:text-primary text-lg font-semibold my-3 text-left">{item.title}</AccordionTrigger>
                            <AccordionContent className="text-base">
                                <div className="text-base text-current" dangerouslySetInnerHTML={{ __html: item.text }} />
                            </AccordionContent>
                        </AccordionItem>
                    ))


                }
            </Accordion>

        </div>
    )
}