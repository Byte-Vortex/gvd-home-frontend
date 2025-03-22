import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";
import { Button } from "./ui/button";
import { DiscoverSection } from "@/app/(public)/_components/discover-section/discover-section";

export function ThankYouPage(
    {
        title = "Your payment has been successfully processed",
        subtitle = "Your payment has been successfully processed",
        text = "Thank you for Succesfully Donating to Gupt Vrindavan Dham. You will get a confirmation mail regarding your donation.",
        linkText = "Back To Home",
        link = "/"

    }
) {

    return (

        <div className="py-16 space-y-16">

            <div className="max-w-7xl mx-auto px-4 text-center space-y-8">

                <p className="bg-yellow-400 font-bold text-lg text-black px-4 py-2 rounded-md text-center max-w-4xl mx-auto">
                    {title}
                </p>
                <FaCheckCircle className="w-32 h-32 mx-auto text-green-500" />
                <h1 className="text-5xl font-bold text-center max-w-4xl mx-auto">{subtitle}</h1>

                <p className="bg-background p-4 rounded-xl max-w-2xl mx-auto">
                    {text}
                </p>


                <Button asChild className="max-w-max mx-auto px-12 py-3">
                    <Link href={link}>
                        {linkText}
                    </Link>
                </Button>

            </div>

            <DiscoverSection />

        </div>


    )
}