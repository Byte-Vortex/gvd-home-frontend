import VegImage from "./_images/veg.png"
import Link from "next/link";
import { Image } from "@/components/image";
import { ProseInnerHtmlContainer } from "@/components/prose-container";
import { Button } from "@/components/ui/button";

export function PrasadamSection({ data }) {

    return (
        <div className="rounded-xl grid md:grid-cols-5 bg-primary text-on-primary overflow-hidden shadow-md shadow-primary/50">

            <div className="w-full relative z-0 h-[20rem] md:col-span-3">
                <Image
                    loadingAnimation={false}
                    sizes="80vw"
                    fill
                    className="h-full w-full object-cover object-center md:object-top aboslute"
                    src={VegImage}
                />
                <div className="absolute top-0 bg-gradient-to-t md:bg-gradient-to-r from-primary via-transparent to-transparent h-full w-full z-[1]" />
            </div>

            <div className="flex flex-col gap-2 md:order-first p-4 sm:p-6 justify-around md:min-h-full md:col-span-2">
                <h3 className="text-3xl md:text-4xl">{data.title}</h3>
                <ProseInnerHtmlContainer html={data.text} className="text-on-primary" />
                {/* <Link className="bg-white px-9 py-2 font-bold rounded-full shadow-md shadow-white/60 text-landing-primary max-w-max hover:underline duration-150 text-center">Create My Fundraising Campaign</Link> */}

                <Button asChild className="bg-on-primary text-primary max-w-40 py-6">
                    <Link href={"/activities/services/prasadam-booking"} >Book Now</Link>
                </Button>

            </div>
        </div>

    )
}