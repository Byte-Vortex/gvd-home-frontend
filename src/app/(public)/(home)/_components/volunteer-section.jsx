import GroupImage from "./_images/group.webp"
import Link from "next/link";
import { Image } from "@/components/image";
import { ProseInnerHtmlContainer } from "@/components/prose-container";
import { Button } from "@/components/ui/button";

export function VolunteerSection({ data }) {

    return (
        <div className="rounded-xl grid md:grid-cols-5  bg-primary text-on-primary overflow-hidden shadow-md shadow-primary/50">

            <div className="w-full relative z-0 h-[18rem] md:col-span-2">
                <Image
                    loadingAnimation={false}
                    sizes="100vw"
                    fill
                    className="h-full w-full object-contain object-center md:object-top"
                    src={GroupImage}
                />
                <div className="absolute top-0 bg-gradient-to-t md:bg-gradient-to-r from-primary via-transparent to-transparent h-full w-full z-[1]" />
            </div>

            <div className="flex flex-col md:gap-2 md:order-first p-4 min-h-56 sm:p-6 sm:min-h-full md:min-h-full md:col-span-3">
                <h3 className="text-3xl md:text-4xl font-bold">{data.title}</h3>
                <ProseInnerHtmlContainer html={data.text} className="text-on-primary" />

                <Button asChild className="bg-on-primary text-primary w-full max-w-40 py-6 mt-auto font-bold">
                    <Link href={"/get-involved/volunteer"} >Contact Now</Link>
                </Button>

            </div>
        </div>

    )
}