
import { ProseInnerHtmlContainer } from "@/components/prose-container";
import { Button } from "@/components/ui/button";
import { makeRequestServer } from "@/lib/fetch";
import Link from "next/link";


export async function generateStaticParams() {
    return [];
}

export default async function Career() {

    const res = await makeRequestServer("/careers");
    const data = res?.data;

    return (

        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1>Career Openings</h1>

            <ProseInnerHtmlContainer className="mb-12 mt-2" html={"Explore Exciting Opportunities with Gupt Vrindavan Dham! We believe in fostering a diverse and dynamic workforce. Join us on our mission to promote Vedic culture and spiritual learning. Discover fulfilling career paths across different trusts and locations. Your journey towards meaningful work begins here. Check out our current job vacancies and take the first step towards a rewarding career with Gupt Vrindavan Dham."} />



            <div className="grid grid-cols-1 items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">

                {
                    data.map((jobOpening, index) => (
                        <div key={index} className="rounded-xl border-b-2 shadow-md border-b-primary bg-surface text-on-surface px-4 py-4 flex flex-col max-w-xs w-full mx-auto h-full min-h-64">
                            <h4 className="mb-4">
                                {jobOpening.jobTitle}
                            </h4>

                            <div className="font-semibold mb-2 space-x-1">
                                <span className="text-sub-text">Experience:</span>
                                <span>{jobOpening.jobExperience}</span>
                            </div>

                            <div className="font-semibold space-x-1 mb-4">
                                <span className="text-sub-text">Job Type:</span>
                                <span className="">{jobOpening.jobType}</span>
                            </div>


                            <Button asChild className="mt-auto">
                                <Link href={jobOpening.slug + "/"}>
                                    Apply Now
                                </Link>
                            </Button>
                        </div>
                    ))
                }

            </div>

        </div>
    )
}