
import { ProseInnerHtmlContainer } from "@/components/prose-container";
import { makeRequestServer } from "@/lib/fetch";
import { FaqSection } from "./_components/faq-section";
import { BiLogoInstagram as InstagramIcon } from "react-icons/bi";
import { FaXTwitter as XIcon } from "react-icons/fa6";
import { BsWhatsapp as WhatsappIcon } from "react-icons/bs";
// import { FormSection } from "./_components/form-section";
import { Separator } from "@/components/ui/separator";
import { FormSection } from "./_components/form-section";


export default async function Page({ params }) {
    const { id } = params;
    const data = await makeRequestServer("/yatra/yatra-booking/" + id);


    return (

        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1>{data.section1.title}</h1>

            <ProseInnerHtmlContainer className="mt-2" html={data.section1.description} />

            <Separator className="bg-primary my-16" />


            <div className="max-w-4xl mx-auto">
                <FormSection data={data} />
            </div>


            <div className="grid md:grid-cols-2 gap-12 my-16">


                <div>
                    <h3>{data.section2.title}</h3>
                    <ProseInnerHtmlContainer className="mt-2 mb-6" html={data.section2.description} />
                    <p className="font-bold mb-2">Follow Us on Social Media</p>
                    <div className="flex items-center space-x-4 text-lg text-primary">

                        <a
                            href={data.contact_details.social_links.whatsapp}
                            target="_blank" rel="noopener" 
                            className="rounded-xl border border-primary flex items-center justify-center hover:bg-primary hover:text-on-primary duration-150 transition-all h-8 w-8"
                        >
                            <WhatsappIcon />
                        </a>

                        <a
                            href={data.contact_details.social_links.instagram}
                            target="_blank" rel="noopener" 
                            className="rounded-xl border border-primary flex items-center justify-center hover:bg-primary hover:text-on-primary duration-150 transition-all h-8 w-8"
                        >
                            <InstagramIcon />
                        </a>

                        <a
                            href={data.contact_details.social_links.twitter}
                            target="_blank" rel="noopener" 
                            className="rounded-xl border border-primary flex items-center justify-center hover:bg-primary hover:text-on-primary duration-150 transition-all h-8 w-8"
                        >
                            <XIcon />
                        </a>

                    </div>
                </div>

                <div className="space-y-4 break-all">

                    <a target="_blank" rel="noopener"  href={"mailto:" + data.contact_details.email} className="bg-surface text-on-surface rounded-3xl p-6 block hover:underline">
                        <div>You can email us here</div>
                        <div className="font-bold">{data.contact_details.email}</div>
                    </a>

                    <a href={"tel:" + data.contact_details.phone} target="_blank" rel="noopener"  className="bg-surface text-on-surface rounded-3xl p-6 block hover:underline">
                        <div>Chat with Us</div>
                        <div className="font-bold">{data.contact_details.phone}</div>
                    </a>

                    <div className="bg-surface text-on-surface rounded-3xl p-6">
                        <div>Office Hours</div>
                        <div className="font-bold">{data.contact_details.office_hours}</div>
                    </div>
                </div>

            </div>



            <Separator className="bg-primary mb-16" />

            <FaqSection data={data.faq} />
        </div>
    )
}