
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
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default async function Page() {

    const data = await makeRequestServer("/contact_page");
    const basicDetails = await getBasicDetails();

    return (

        <div className="max-w-[100vw] lg:px-32 mx-auto px-4 py-12">
            <h1>{data.title}</h1>

            <ProseInnerHtmlContainer className="mt-2" html={data.text} />

            <Separator className="bg-primary my-20" />

            <div className="grid md:grid-cols-2 gap-12 mb-12">

                <div>
                    <h3>Contact Form</h3>
                    <p className="mt-2 mb-6">Fill out the form below, and one of our friendly team members will get back to you shortly.</p>

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

                <div className="bg-surface text-on-surface shadow-md rounded-xl p-4 md:p-6 col-span-full grid md:grid-cols-3 gap-6">

                    <div className="h-96 w-full bg-surface shadow-md rounded-xl overflow-hidden md:col-span-2 md:order-last">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.1107313044527!2d75.8558351!3d26.804602599999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396dc84b797bfe51%3A0x29a24c803cf5e7a1!2sGupt%20Vrindavan%20Dham!5e0!3m2!1sen!2sin!4v1732269199622!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />

                    </div>


                    <div className="flex h-full flex-col gap-6">
                        <h4>Gupt Vrindavan Dham</h4>
                        <div className="text-on-surface/80">{basicDetails.address}</div>

                        <Button asChild className="w-full mt-auto">
                            <Link href="https://maps.app.goo.gl/1sCf1nKfxfVogq9z6" target="_blank" rel="noopener" >
                                Get Directions
                            </Link>
                        </Button>
                    </div>

                </div>
            </div>

            <Separator className="bg-primary my-20" />

            <FaqSection data={data.faqSection} />
        </div>
    )
}