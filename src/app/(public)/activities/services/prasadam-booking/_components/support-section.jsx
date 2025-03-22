import { BiLogoFacebook as FacebookIcon } from "react-icons/bi";
import { BiLogoInstagram as InstagramIcon } from "react-icons/bi";
import { FaXTwitter as XIcon } from "react-icons/fa6";
import { AiOutlineYoutube as YoutubeIcon } from "react-icons/ai";
import { getBasicDetails } from "@/server/get-basic-details";

export async function SupportSection({ contactSection }) {
    const basicDetails = await getBasicDetails();
    return (
        <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
                <h2 className="text-3xl font-bold">Support</h2>
                <p className="max-w-md ">Fill out the form above, and one of our friendly team members will get back to you shortly</p>

                <div>
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
                            className="rounded-xl border border-primary flex items-center justify-center hover:bg-primary hover:text-white duration-150 transition-all h-8 w-8"
                        >
                            <FacebookIcon />
                        </a>
                    </div>
                </div>
            </div>

            <div className="space-y-4 break-all">

                <div className="bg-surface text-on-surface rounded-xl p-6">
                    <div>You can email us here</div>
                    <div className="font-bold">{contactSection.email}</div>
                </div>

                <div className="bg-surface text-on-surface rounded-xl p-6">
                    <div>Chat with Us</div>
                    <div className="font-bold">{contactSection.phone}</div>
                </div>

                <div className="bg-surface text-on-surface rounded-xl p-6">
                    <div>Office Hours</div>
                    <div className="font-bold">{contactSection.timing}</div>
                </div>
            </div>
        </div>
    )
}