import dynamic from "next/dynamic";
import { Header } from "./_components/header/header";
const Navbar = dynamic(() => import('./_components/navbar/navbar'))
const Footer = dynamic(() => import('./_components/footer/footer').then(_ => _.Footer))
import { RootTransition } from "./root-transition";


export default function PublicLayout({ children }) {
    return (
        <>
            <Header />
            <Navbar />
            <main className='relative z-0'>
                <RootTransition>
                    {children}
                </RootTransition>
            </main>
            <Footer />
        </>
    )
}