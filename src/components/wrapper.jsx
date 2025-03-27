"use client";
import { usePathname, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

const Header = dynamic(() => 
  import('../app/(public)/_components/header/header').then(m => m.Header)
);
const Footer = dynamic(() => 
  import('../app/(public)/_components//footer/footer').then(m => m.Footer)
);
const Navbar = dynamic(() => import('../app/(public)/_components//navbar/navbar'));


export default function Wrapper({ children, basicDetails }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const shouldHideNavAndFooter =
    pathname.startsWith("/activities/education/quizzes/") &&
    searchParams.has("start");

  return (
    <>
      {!shouldHideNavAndFooter && <Header basicDetails={basicDetails} />}
      {!shouldHideNavAndFooter && <Navbar />}
      {children}
      {!shouldHideNavAndFooter && <Footer basicDetails={basicDetails} />}
    </>
  );
}