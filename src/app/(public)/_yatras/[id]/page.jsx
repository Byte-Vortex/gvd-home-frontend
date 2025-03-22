import { makeRequestServer } from "@/lib/fetch";
import { notFound } from "next/navigation";
import { BookingForm } from "./_components/booking-form";
import { ThumbSlider } from "./_components/thumb-slider";
import { UpcomingDestinationsSection } from "./_components/upcoming-destinations-section";
import { YatraTabs } from "./_components/yatra-tabs";


export default async function Page({ params }) {
    const { id } = params;

    let data = null;
    try {
    data = await makeRequestServer("/yatra/yatradetail/" + id);
    } catch {
        return notFound();
    }




    return (

        <div className="max-w-7xl mx-auto px-4 py-16">

            <div className="grid grid-cols-10 gap-4 relative">
                <div className="col-span-full lg:col-span-7">
                    <h1 className="mb-4">{data.name}</h1>


                    <ThumbSlider
                        data={data.images}


                    />

                    <div className="mt-12 lg:hidden">
                        <BookingForm />
                    </div>

                    <YatraTabs
                        data={data}
                    />



                </div>

                <div className="hidden lg:block col-span-3 sticky top-16 h-max">
                    <BookingForm />
                </div>

            </div>

            <div className="col-span-full mt-24">
                <UpcomingDestinationsSection data={data.upcoming_destinations} />

            </div>
        </div>

    )
}