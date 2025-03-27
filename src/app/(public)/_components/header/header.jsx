import {
  BsWhatsapp as WhatsappIcon,
  BsEnvelope as MailOutlineIcon,
} from "react-icons/bs";
import { BiLogoFacebook as FacebookIcon } from "react-icons/bi";
import { BiLogoInstagram as InstagramIcon } from "react-icons/bi";
import { FaXTwitter as XIcon } from "react-icons/fa6";
import { AiOutlineYoutube as YoutubeIcon } from "react-icons/ai";
import { getBasicDetails } from "@/server/get-basic-details";
import { TempleTime } from "./temple-time";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function Header() {
  const basicDetails = await getBasicDetails();
  return (
    <header className="max-w-[100vw] h-12 top-0 left-0 lg:px-[7vw] px-4 flex items-center justify-center bg-primary text-on-primary">
      <div className="w-full flex justify-between items-center mx-auto">
        <div className="flex text-xs md:text-base flex-wrap items-center gap-3">
          <Button
            asChild
            variant="ghost"
            className="text-on-primary hover:text-primary p-1.5 h-max rounded-xl"
          >
            <a target="_blank" rel="noopener" href={"mailto:" + basicDetails.contact_email}>
              <MailOutlineIcon className="inline text-xl" />
            </a>
          </Button>

          <Button
            asChild
            variant="link"
            className="text-on-primary py-0 px-1 rounded-none"
          >
            <a target="_blank" rel="noopener" href={"https://wa.me/" + basicDetails.whatsapp_number}>
              <WhatsappIcon className="inline mr-1 text-xl" />
              <span className="pl-1">{basicDetails.phone_number}</span>
            </a>
          </Button>
        </div>

        <div className="hidden md:flex items-center gap-4 text-lg">
          <TempleTime />

          <SocialLink href={basicDetails.socials.youtube}>
            <YoutubeIcon />
          </SocialLink>

          <SocialLink href={basicDetails.socials.instagram}>
            <InstagramIcon />
          </SocialLink>

          <SocialLink href={basicDetails.socials.twitter}>
            <XIcon />
          </SocialLink>

          <SocialLink href={basicDetails.socials.facebook}>
            <FacebookIcon />
          </SocialLink>
        </div>
      </div>
    </header>
  );
}


function SocialLink({ href = "#", children }) {
  return (
    <Button
      size="social"
      asChild
      className="p-0 border-on-primary/40 border flex items-center justify-center hover:bg-on-primary hover:text-primary duration-150 transition-all h-8 w-8 text-lg"
    >
      <Link href={href} target="_blank" rel="noopener">
        {children}
      </Link>
    </Button>
  );
}
