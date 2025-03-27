"use client";
import React from "react";
import dynamic from "next/dynamic";
import { usePathname, useSearchParams  } from "next/navigation";
import { Header } from "../app/(public)/_components/header/header";
const Navbar = dynamic(() => import("../app/(public)/_components/navbar/navbar"));
const Footer = dynamic(() =>
  import("../app/(public)/_components/footer/footer").then((_) => _.Footer)
);

export default function Wrapper({ children }) {
  const pathname = usePathname(); 
  const searchParams = useSearchParams();

  const shouldHideNavAndFooter =
  pathname.startsWith("/activities/education/quizzes/") &&
  searchParams.has("start");

  return (
    <main>
      {!shouldHideNavAndFooter && <Header />}
      {!shouldHideNavAndFooter && <Navbar />}
      {children}
      {!shouldHideNavAndFooter && <Footer />}
    </main>
  );
}