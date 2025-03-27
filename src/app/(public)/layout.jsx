import dynamic from "next/dynamic";
import { getBasicDetails } from "@/server/get-basic-details";
import Wrapper from "@/components/wrapper";
import { Header } from "./_components/header/header";
import { Footer } from "./_components/footer/footer";
const Navbar = dynamic(() => import('./_components/navbar/navbar'))
import { RootTransition } from "./root-transition";

export default async function PublicLayout({ children }) {
  // Fetch data once at layout level
  const basicDetails = await getBasicDetails();

  return (
    <Wrapper basicDetails={basicDetails}>
      <main className='relative z-0'>
        <RootTransition>
          {children}
        </RootTransition>
      </main>
    </Wrapper>
  );
}