
import { ProseInnerHtmlContainer } from "@/components/prose-container";
import { makeRequestServer } from "@/lib/fetch";
import { FaqSection } from "./_components/faq-section";
import { getBasicDetails } from "@/server/get-basic-details";
import { BiLogoFacebook as FacebookIcon } from "react-icons/bi";
import { BiLogoInstagram as InstagramIcon } from "react-icons/bi";
import { FaXTwitter as XIcon } from "react-icons/fa6";
import { AiOutlineYoutube as YoutubeIcon } from "react-icons/ai";
import { FormSection } from "./_components/form-section";
import { Separator } from "@/components/ui/separator";


export default async function Page() {

    const data = await makeRequestServer("/volunteers");
    const basicDetails = await getBasicDetails();

    return (

        <div className="max-w-[100vw] lg:px-32 mx-auto px-4 py-12">
            <h1>{data.title}</h1>

            <ProseInnerHtmlContainer className="mt-2" html={data.text} />

            <Separator className="bg-primary my-20" />

            <div className="grid md:grid-cols-2 gap-12 mb-12">

                <div>
                    <h3>Volunteer Form</h3>
                    <p className="mt-2 mb-6">Let us know your area of interest to offer volunteer, we will get back soon with updates upon receiving this form.</p>

                    <div className="mb-6">
                        <p className="font-bold mb-2">Follow Us on Social Media</p>
                        <div className="flex items-center space-x-4 text-lg text-primary">
                            <a
                                href={basicDetails.socials.youtube}
                                target="_blank" rel="noopener" 
                                className="rounded-[7px] border border-primary flex items-center justify-center hover:bg-primary hover:text-white duration-150 transition-all h-8 w-8"
                            >
                                <YoutubeIcon />
                            </a>

                            <a
                                href={basicDetails.socials.instagram}
                                target="_blank" rel="noopener" 
                                className="rounded-[7px] border border-primary flex items-center justify-center hover:bg-primary hover:text-white duration-150 transition-all h-8 w-8"
                            >
                                <InstagramIcon />
                            </a>

                            <a
                                href={basicDetails.socials.twitter}
                                target="_blank" rel="noopener" 
                                className="rounded-[7px] border border-primary flex items-center justify-center hover:bg-primary hover:text-white duration-150 transition-all h-8 w-8"
                            >
                                <XIcon />
                            </a>

                            <a
                                href={basicDetails.socials.facebook}
                                target="_blank" rel="noopener" 
                                className="rounded-[7px] border border-primary flex items-center justify-center hover:bg-primary hover:text-white duration-150 transition-all h-8 w-8"
                            >
                                <FacebookIcon />
                            </a>
                        </div>
                    </div>

                    <div className="space-y-4 break-all">

                        <a href={"mailto:" + basicDetails.contact_email} target="_blank" rel="noopener"  className="bg-surface text-on-surface rounded-xl p-6 hover:underline block">
                            <div>You can email us here</div>
                            <div className="font-bold">{basicDetails.contact_email}</div>
                        </a>

                        <a href={"tel:" + basicDetails.phone_number} target="_blank" rel="noopener"  className="bg-surface text-on-surface rounded-xl p-6 hover:underline block">
                            <div>Chat with Us</div>
                            <div className="font-bold">{basicDetails.phone_number}</div>
                        </a>

                        <div className="bg-surface text-on-surface rounded-xl p-6">
                            <div>Office Hours</div>
                            <div className="font-bold">9:00 am - 6:00 pm</div>
                        </div>
                    </div>
                </div>

                <FormSection />
            </div>

            <Separator className="bg-primary my-20" />

            <FaqSection data={data.faqSection} />
        </div>
    )
}