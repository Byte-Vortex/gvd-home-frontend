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
    <header className="w-full h-12 top-0 left-0 flex items-center justify-center bg-primary text-on-primary">
      <div className="max-w-[100vw] w-full flex justify-between items-center mx-auto px-4 lg:px-24">
        <div className="flex w-full text-xs md:text-base md:w-max flex-wrap items-center justify-between gap-3">
          <Button
            asChild
            variant="ghost"
            className="text-on-primary hover:text-primary p-1.5 h-max rounded-xl"
          >
            <a
              target="_blank"
              rel="noopener"
              href={"mailto:" + basicDetails.contact_email}
            >
              <MailOutlineIcon className="inline text-xl" />
            </a>
          </Button>

          <Button
            asChild
            variant="link"
            className="text-on-primary py-0 px-1 rounded-none"
          >
            <a
              target="_blank"
              rel="noopener"
              href={"https://wa.me/" + basicDetails.whatsapp_number}
            >
              <WhatsappIcon className="inline mr-1 text-xl" />
              <span className="pl-1">{basicDetails.phone_number}</span>
            </a>
          </Button>
        </div>

        <div className="hidden md:flex items-center space-x-4 text-lg">
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
