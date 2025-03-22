import { ProseInnerHtmlContainer } from "@/components/prose-container";
import { Slider } from "@/components/slider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { makeRequestServer } from "@/lib/fetch"
import { convertMySqlDateToJSDate, formatDate } from "@/lib/utils";
import Link from "next/link";
import { formatIndianCurrency } from "@/lib/utils";
import { format } from "date-fns";

export default async function Page() {

    const data = await makeRequestServer("/yatra/allyatras/");



    return (
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-10 gap-4 py-16 relative">
            {/* <div className="hidden lg:col-span-3 lg:block bg-surface h-[70vh] top-16 overflow-auto sticky" /> */}


            <div className="col-span-full grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {
                    data.map((card) => <Card data={card} key={card.id} />)
                }
            </div>
        </div>
    )
}

function Card({ data }) {


    return (
        <div className="bg-surface rounded-xl flex flex-col overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
                <Slider slides={data.images} />
            </div>

            <div className="p-4 flex-1 flex flex-col">
                <div className="text-xl font-medium mb-2">{data.name}</div>

                <div className="flex gap-1 text-on-surface/70 text-sm">
                    <span className="border-2 border-primary text-primary rounded-md px-1 inline-block font-bold">{data.duration}</span>
                    {/* <span>{data.rating}</span>
                    <StarIcon className="fill-yellow-500 text-yellow-500 w-5 h-5" />
                    <span>({data.reviews_count})</span> */}
                </div>

                <Separator className="bg-on-surface/70 my-4" />

                <ProseInnerHtmlContainer className="text-on-surface/70 sm:!prose-sm mb-4" html={data.itinerary} />


                <>
                    <div className="font-medium mb-1">Next Departure :</div>
                    <div className="flex gap-1 flex-wrap text-sm mb-2">

                        <div className="bg-background px-2.5 rounded-full">{format(convertMySqlDateToJSDate(data.next_departure_dates?.[0]?.date), "dd MMM, yyyy")}
                        </div>

                    </div>
                </>


                <div className="p-4 rounded-md flex items-center flex-wrap justify-between gap-4 bg-background text-on-background mt-auto">
                    <div className="text-on-surface/70 text-base">
                        <div>
                            <span className="text-lg font-medium text-on-surface">
                                {formatIndianCurrency(data.next_departure_dates?.[0]?.price_per_person)}
                            </span>/Person
                        </div>
                        <div>For Children: {formatIndianCurrency(data.next_departure_dates?.[0]?.price_for_children)}</div>
                    </div>

                    <Button asChild>
                        <Link href={"../" + data.slug}>
                            View Details
                        </Link>
                    </Button>
                </div>

            </div>

        </div>

    )
}


