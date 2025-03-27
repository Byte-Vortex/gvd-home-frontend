import dynamic from "next/dynamic";
import { Header } from "./_components/header/header";
const Navbar = dynamic(() => import('./_components/navbar/navbar'))
const Footer = dynamic(() => import('./_components/footer/footer').then(_ => _.Footer))
import { RootTransition } from "./root-transition";
import Wrapper from "@/components/wrapper";


export default function PublicLayout({ children }) {
    return (
        <>
            <Wrapper>

                <main className='relative z-0'>
                    <RootTransition>
                        {children}
                    </RootTransition>
                </main>

            </Wrapper>
        </>
    )
}