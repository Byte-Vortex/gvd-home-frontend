import { FaBan as FailedIcon } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DiscoverSection } from "@/app/(public)/_components/discover-section/discover-section";

export default function Page() {

    return (

        <div className="py-16 space-y-16">

            <div className="max-w-7xl mx-auto px-4 text-center space-y-8">

                <p className="bg-yellow-400 font-bold text-lg text-black px-4 py-2 rounded-md text-center max-w-4xl mx-auto">
                That didn&apos;t work
                </p>
                <FailedIcon className="w-32 h-32 mx-auto text-red-500" />
                <h1 className="text-5xl font-bold text-center max-w-4xl mx-auto">Your transaction failed!</h1>

                <p className="bg-background p-4 rounded-xl max-w-2xl mx-auto">
                Something went wrong while we were processing your transaction, any money deducted will be refunded.
                </p>


                <Button asChild className="max-w-max mx-auto px-12 py-3">
                    <Link href="/">
                    Back To Home
                    </Link>
                </Button>

            </div>

            <DiscoverSection />

        </div>


    )
}