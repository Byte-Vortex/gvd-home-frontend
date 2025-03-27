"use client";

import LogoPurple from "@/assets/images/gupt-vrindavan-dham-logo-purple.png";
import LogoWhite from "@/assets/images/gupt-vrindavan-dham-logo.png";
import Link from "next/link";
import {
  Menubar,
  MenubarMenu,
  MenubarContent,
  MenubarItem,
  MenubarTrigger,
} from "./_components/menubar";
import allNavLinks from "./all-nav-links";
import { Button } from "@/components/ui/button";
import ThemeButton from "./_components/theme-button";
import * as PhoneMenubar from "./_components/phone-menubar";
import { ActiveLink } from "@/components/misc/active-link";
import clsx from "clsx";
import { Image } from "@/components/image";

export default function Navbar() {
  return (
    <>
      <div className=" max-w-[100vw] sticky top-0 left-0 h-14 text-sm z-50 shadow-md bg-surface text-on-surface px-4 lg:px-[7vw] flex items-center justify-center">
        <div className="flex w-full items-center justify-between h-full mx-auto font-medium">
          <Link href="/" className="">
            <Image
              loadingAnimation={false}
              className="block dark:hidden h-auto w-auto max-w-[67px] sm:max-h-[40px]"
              width={87}
              height={52}
              src={LogoPurple}
              alt="Logo"
            />
            <Image
              loadingAnimation={false}
              className="hidden dark:block h-auto w-auto max-w-[67px] sm:max-h-[40px]"
              width={87}
              height={52}
              src={LogoWhite}
              alt="Logo"
            />
          </Link>

          <Menubar className="hidden min-[900px]:flex gap-10 whitespace-nowrap py-1 h-full justify-center items-center text-sm flex-grow font-semibold">
            {allNavLinks.desktop.map((item, index) =>
              !item.children ? (
                <ActiveLink
                  key={index}
                  href={item.to}
                  className={(isActive) =>
                    clsx(
                      "hover:text-primary hover:underline",
                      isActive && "text-primary"
                    )
                  }
                >
                  {item.title}
                </ActiveLink>
              ) : (
                <MenubarMenu key={index}>
                  <MenubarTrigger isActive={false}>{item.title}</MenubarTrigger>
                  <MenubarContent className="grid grid-cols-1 bg-surface text-on-surface font-semibold">
                    {item.children.map((child, index) => (
                      <MenubarItem asChild isActive={false} key={index}>
                        <ActiveLink href={child.to}>{child.title}</ActiveLink>
                      </MenubarItem>
                    ))}
                  </MenubarContent>
                </MenubarMenu>
              )
            )}
          </Menubar>

          <div className="ml-auto mr-2">
            <ThemeButton />
          </div>
          <Button asChild>
            <Link href={"https://donation.guptvrindavandham.org"}>Donate</Link>
          </Button>
        </div>
      </div>
      <div className="fixed z-50 bottom-0 shadow-md min-[900px]:hidden w-full bg-surface text-on-surface h-14 flex items-center justify-around text-xs border-t border-outline">
      <div className="fixed z-50 bottom-0 shadow-md min-[900px]:hidden w-full bg-surface text-on-surface h-14 flex items-center justify-around text-xs border-t border-outline">
        {allNavLinks.mobile.map((item, index) => {
          if (!item.children)
            return (
              <PhoneMenubar.Link
                key={index}
                icon={<div className="text-xl">{item.icon}</div>}
                title={item.title}
                to={item.to}
              />
            );

          return (
            <PhoneMenubar.Root key={index}>
              <PhoneMenubar.Trigger
                icon={<div className="text-xl">{item.icon}</div>}
                title={item.title}
              />

              <PhoneMenubar.Content>
                {item.children.map((child, index) => {
                  if (!child.children?.length) {
                    return (
                      <PhoneMenubar.LinkItem
                        key={index}
                        to={child.to}
                        title={child.title}
                      />
                    );
                  }

                  return (
                    <PhoneMenubar.Accordion key={index} type="single">
                      <PhoneMenubar.AccordionItem value={child.title}>
                        <PhoneMenubar.AccordionTrigger>
                          {child.title}
                        </PhoneMenubar.AccordionTrigger>

                        <PhoneMenubar.AccordionContent>
                          {child.children.map((child, index) => (
                            <PhoneMenubar.LinkItem
                              key={index}
                              to={child.to}
                              title={child.title}
                            />
                          ))}
                        </PhoneMenubar.AccordionContent>
                      </PhoneMenubar.AccordionItem>
                    </PhoneMenubar.Accordion>
                  );
                })}
              </PhoneMenubar.Content>
            </PhoneMenubar.Root>
          );
        })}
      </div>
      </div>
    </>
  );
}