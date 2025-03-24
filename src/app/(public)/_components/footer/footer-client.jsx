"use client"

import React from "react"
import {
  BsWhatsapp as WhatsappIcon,
  BsEnvelope as MailIcon,
} from "react-icons/bs"
import { BsPlus as PlusIcon } from "react-icons/bs"
import { FaCheckCircle as CheckmarkIcon } from "react-icons/fa"
import { FaRegClock as ClockIcon } from "react-icons/fa"

import { BiLogoFacebook as FacebookIcon } from "react-icons/bi"
import { BiLogoInstagram as InstagramIcon } from "react-icons/bi"
import { FaXTwitter as XIcon } from "react-icons/fa6"
import { AiOutlineYoutube as YoutubeIcon } from "react-icons/ai"
import Logo from "@/assets/images/gupt-vrindavan-dham-logo-purple.png"
import LogoWhite from "@/assets/images/gupt-vrindavan-dham-logo.png"
import FooterImage from "@/assets/images/misc/Footer Image.png"
import { useState } from "react"
import { clsx } from "clsx"
import { Image } from "@/components/image"
import Link from "next/link"
import { MapIcon } from "lucide-react"

export function FooterClient({ basicDetails }) {
  const [footerState, setFooterState] = useState(() => ({
    timing: false,
    activities: false,
    about: false,
    contact: false,
  }))

  function openSection(section_name) {
    setFooterState((oldState) => {
      return {
        ...oldState,
        [section_name]: !oldState[section_name],
      }
    })
  }

  return (
    <footer className="font-medium max-w-[100vw] lg:px-[7vw] px-4 w-full min-h-72 gap-5">

      <div className="flex gap-2 justify-evenly flex-wrap mx-auto mt-12">
        {/* section one */}

        <div className="flex flex-col gap-10 my-8 lg:my-0 sm:flex-row lg:flex-col">
          <a
            href="https://guptvrindavandham.org/"
            className="relative hover:brightness-75 flex items-center justify-center"
          >
            <Image
              loadingAnimation={false}
              width={143}
              height={85}
              className="block dark:hidden h-auto max-w-[67px] mx-auto sm:max-w-[110px]"
              src={Logo}
              alt="HKM Jaipur"
            />
            <Image
              loadingAnimation={false}
              width={143}
              height={85}
              className="hidden dark:block  h-auto max-w-[67px] mx-auto sm:max-w-[110px]"
              src={LogoWhite}
              alt="HKM Jaipur"
            />
          </a>

          <div className="space-y-4 text-center max-w-full">
            <p>{basicDetails.address}</p>

            <div className="flex items-center gap-3 text-xl max-w-max mx-auto text-foreground">
              <a
                href={basicDetails.socials.youtube}
                target="_blank"
                rel="noopener"
                className="rounded-[7px] bg-surface text-on-surface flex items-center justify-center hover:bg-primary hover:text-on-primary duration-150 transition-all h-10 w-10"
              >
                <YoutubeIcon />
              </a>

              <a
                href={basicDetails.socials.instagram}
                target="_blank"
                rel="noopener"
                className="rounded-[7px] bg-surface text-on-surface flex items-center justify-center hover:bg-primary hover:text-on-primary duration-150 transition-all h-10 w-10"
              >
                <InstagramIcon />
              </a>

              <a
                href={basicDetails.socials.twitter}
                target="_blank"
                rel="noopener"
                className="rounded-[7px] bg-surface text-on-surface flex items-center justify-center hover:bg-primary hover:text-on-primary duration-150 transition-all h-10 w-10"
              >
                <XIcon />
              </a>

              <a
                href={basicDetails.socials.facebook}
                target="_blank"
                rel="noopener"
                className="rounded-[7px] bg-surface text-on-surface flex items-center justify-center hover:bg-primary hover:text-on-primary duration-150 transition-all h-10 w-10"
              >
                <FacebookIcon />
              </a>

              <a
                href={basicDetails.socials.googlemaps}
                target="_blank"
                rel="noopener"
                className="rounded-[7px] bg-surface text-on-surface flex items-center justify-center hover:bg-primary hover:text-on-primary duration-150 transition-all h-10 w-10"
              >
                <MapIcon />
              </a>
            </div>
          </div>
        </div>

        {/* Main Div */}
        <div className="flex md:justify-around justify-between w-full lg:w-[initial] flex-wrap flex-grow space-y-2 md:space-y-0">
          {/* section two */}

          <div className="w-full md:max-w-max border-y-2 border-outline py-2 md:py-0 md:border-y-0 space-y-2">
            <h5
              onClick={openSection.bind(null, "timing")}
              className="flex justify-between items-center text-primary"
            >
              <div className="flex-grow">Timing</div>
              <span className="text-3xl md:hidden">
                <PlusIcon
                  className={clsx(
                    "duration-150",
                    footerState["timing"] ? "rotate-45" : "rotate-0"
                  )}
                />
              </span>
            </h5>

            <div
              className={clsx(
                "md:flex md:flex-col gap-2 md:h-full justify-evenly",
                footerState["timing"] ? "flex flex-col" : "hidden"
              )}
            >
              <div className="inline-flex gap-1">
                <p className="pt-1">
                  <ClockIcon />
                </p>
                <p>Mangala Aarti - 4:30 AM</p>
              </div>

              <div className="inline-flex gap-1">
                <p className="pt-1">
                  <ClockIcon />
                </p>
                <p>Shringar Aarti - 7:30 AM</p>
              </div>

              <div className="inline-flex gap-1">
                <p className="pt-1">
                  <ClockIcon />
                </p>
                <p>Bhagvatam Class - 08:15 AM</p>
              </div>

              <div className="inline-flex gap-1">
                <p className="pt-1">
                  <ClockIcon />
                </p>
                <p>Rajbhog Aarti - 12:00 PM</p>
              </div>

              <div className="inline-flex gap-1">
                <p className="pt-1">
                  <ClockIcon />
                </p>
                <p>Sandhya Aarti - 7:00 PM</p>
              </div>

              <div className="inline-flex gap-1">
                <p className="pt-1">
                  <ClockIcon />
                </p>
                <p>Shayan Aarti - 8:15 PM</p>
              </div>
            </div>
          </div>

          {/* section three */}
          <div className="w-full md:max-w-max border-b-2 border-outline py-2 md:py-0 md:border-b-0 space-y-2">
            <h5
              onClick={openSection.bind(null, "activities")}
              className="flex justify-between items-center text-primary"
            >
              <div className="flex-grow">Our Activities</div>
              <span className="text-3xl md:hidden">
                <PlusIcon
                  className={clsx(
                    "duration-150",
                    footerState["activities"] ? "rotate-45" : "rotate-0"
                  )}
                />
              </span>
            </h5>

            <div
              className={clsx(
                "md:flex md:flex-col gap-2 md:h-full justify-evenly",
                footerState["activities"] ? "flex flex-col" : "hidden"
              )}
            >
              <Link
                href={"/activities/education/"}
                className="inline-flex text-center gap-2 hover:underline"
              >
                <p className="pt-1">
                  <CheckmarkIcon />
                </p>
                <p>Education</p>
              </Link>

              <Link
                href={"/activities/food-distribution/"}
                className="inline-flex text-center gap-2 hover:underline"
              >
                <p className="pt-1">
                  <CheckmarkIcon />
                </p>
                <p>Food Distribution</p>
              </Link>

              <Link
                href={"/activities/cow-protection/"}
                className="inline-flex text-center gap-2 hover:underline"
              >
                <p className="pt-1">
                  <CheckmarkIcon />
                </p>
                <p>Cow Protection</p>
              </Link>

              <Link
                href={"/activities/yuga-dharma/"}
                className="inline-flex text-center gap-2 hover:underline"
              >
                <p className="pt-1">
                  <CheckmarkIcon />
                </p>
                <p>Yuga Dharma</p>
              </Link>

              <Link
                href={"/activities/events/"}
                className="inline-flex text-center gap-2 hover:underline"
              >
                <p className="pt-1">
                  <CheckmarkIcon />
                </p>
                <p>Events</p>
              </Link>

              <Link
                href={"/activities/services/"}
                className="inline-flex text-center gap-2 hover:underline"
              >
                <p className="pt-1">
                  <CheckmarkIcon />
                </p>
                <p>Services</p>
              </Link>
            </div>
          </div>

          {/* section four */}

          <div className="w-full md:max-w-max border-b-2 border-outline py-2 md:py-0 md:border-b-0 space-y-2">
            <h5
              onClick={openSection.bind(null, "about")}
              className="flex justify-between items-center text-primary"
            >
              <div className="flex-grow">About</div>
              <span className="text-3xl md:hidden">
                <PlusIcon
                  className={clsx(
                    "duration-150",
                    footerState["about"] ? "rotate-45" : "rotate-0"
                  )}
                />
              </span>
            </h5>

            <div
              className={clsx(
                "md:flex md:flex-col flex-grow justify-evenly md:h-full gap-2",
                footerState["about"] ? "flex flex-col" : "hidden"
              )}
            >
              <div className="flex flex-col flex-grow justify-evenly gap-2">
                <Link
                  href={"/mandir/explore/"}
                  className="inline-flex text-center gap-2 hover:underline"
                >
                  <p className="pt-1">
                    <CheckmarkIcon />
                  </p>
                  <p>Explore Temple</p>
                </Link>
                <Link
                  href={"/mandir/our-centers/"}
                  className="inline-flex text-center gap-2 hover:underline"
                >
                  <p className="pt-1">
                    <CheckmarkIcon />
                  </p>
                  <p>Our Centers</p>
                </Link>
                <Link
                  href={"/web-stories/"}
                  className="inline-flex text-center gap-2 hover:underline"
                >
                  <p className="pt-1">
                    <CheckmarkIcon />
                  </p>
                  <p>Web Stories</p>
                </Link>
                <Link
                  href={"/blogs/"}
                  className="inline-flex text-center gap-2 hover:underline"
                >
                  <p className="pt-1">
                    <CheckmarkIcon />
                  </p>
                  <p>Blogs</p>
                </Link>
              </div>

              <div className="hidden md:flex flex-col flex-grow justify-between gap-2">
                <h5 className="text-primary">Contact Us</h5>

                <a
                  target="_blank"
                  rel="noopener"
                  href={"https://wa.me/" + basicDetails.whatsapp_number}
                  className="inline-flex text-center gap-2 items-center hover:underline"
                >
                  <span className="h-9 w-9 text-on-primary flex items-center justify-center rounded-[7px] bg-primary">
                    <WhatsappIcon />
                  </span>
                  <span>{basicDetails.phone_number}</span>
                </a>
                <a
                  target="_blank"
                  rel="noopener"
                  href={"mailto:" + basicDetails.contact_email}
                  className="inline-flex gap-2 items-center hover:underline"
                >
                  <span className="h-9 w-9 text-on-primary flex items-center justify-center rounded-[7px] bg-primary">
                    <MailIcon />
                  </span>
                  <span className="hover:underline">
                    {basicDetails.contact_email}
                  </span>
                </a>
              </div>

              {/* section five */}
            </div>
          </div>

          <div className="flex md:hidden flex-col flex-grow justify-between gap-2 border-b-2 border-outline space-y-2 py-2">
            <h5
              onClick={openSection.bind(null, "contact")}
              className="flex justify-between items-center text-primary"
            >
              <div className="flex-grow">Contact Us</div>
              <span className="text-3xl md:hidden">
                <PlusIcon
                  className={clsx(
                    "duration-150",
                    footerState["contact"] ? "rotate-45" : "rotate-0"
                  )}
                />
              </span>
            </h5>

            <div
              className={clsx(
                "md:flex md:flex-col flex-grow justify-evenly md:h-full gap-2",
                footerState["contact"] ? "flex flex-col" : "hidden"
              )}
            >
              <a
                target="_blank"
                rel="noopener"
                href={"https://wa.me/" + basicDetails.whatsapp_number}
                className="inline-flex text-center gap-2 items-center hover:underline"
              >
                <span className="h-9 w-9 text-on-primary flex items-center justify-center rounded-[7px] bg-primary">
                  <WhatsappIcon />
                </span>
                <span>{basicDetails.phone_number}</span>
              </a>
              <a
                target="_blank"
                rel="noopener"
                href={"mailto:" + basicDetails.contact_email}
                className="inline-flex gap-2 items-center hover:underline"
              >
                <span className="h-9 w-9 text-on-primary flex items-center justify-center rounded-[7px] bg-primary">
                  <MailIcon />
                </span>
                <span className="hover:underline">
                  {basicDetails.contact_email}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Copy Right Section */}

      <div className="relative z-0 mt-12">
        <Image
          loadingAnimation={false}
          sizes="1280px"
          src={FooterImage}
          className="w-full h-auto select-none"
        />

        <div className="h-14 bg-gradient-to-t from-neutral-900 via-neutral-900/80 to-transparent -mt-14 z-10 relative" />

        <div className="bg-neutral-900 pb-12">
          <div
            className="max-w-7xl px-4 pt-2 border-primary pb-10 text-sm mx-auto flex flex-col justify-between text-white
                    sm:flex-row gap-4 border-t"
          >
            <p>
              ©{new Date().getFullYear()}{" "}
              <a
                target="_blank"
                rel="noopener"
                className="text-primary hover:underline"
                href="https://guptvrindavandham.org/"
              >
                Hare Krishna Movement Jaipur.
              </a>{" "}
              All rights Reserved.
            </p>

            <div className="text-zinc">
              <Link href="/terms-and-conditions/" className="hover:underline">
                Terms of Use
              </Link>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <Link href="/privacy-policy/" className="hover:underline">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
