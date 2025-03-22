import { makeRequestServer } from "@/lib/fetch";
import { HeroSection } from "../_components/event-hero";
import { AboutSection } from "../_components/about-section";
import { DetailsSection } from "../_components/details-section";
import { ResourcesSection } from "../_components/resources-section";
import { ImportanceSection } from "../_components/importance-section";
import { GuidelineSection } from "../_components/guideline-section";
import { VideoSliderSection } from "../_components/video-slider-section";
import { getBasicDetails } from "@/server/get-basic-details";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";

const LazyForm = dynamic(() => import("./lazy-form").then((_) => _.LazyForm), {
    ssr: false,
    loading: () => <Skeleton className={"h-96"} />

});


export default async function Page() {
    const [basicDetails, data] = await Promise.all([getBasicDetails(), makeRequestServer("/eventservices/events/jhulan-seva")])


    return (
        <>

            <HeroSection
                data={{
                    phoneImage: data.phoneimage,
                    desktopImage: data.desktopimage
                }}
            />
            <div className="px-4 py-24 space-y-24 max-w-[100vw] lg:px-32 mx-auto w-full">
                <AboutSection data={data.about_service} />
                <LazyForm
                    basicDetails={basicDetails}
                    data={data.formDetails}
                />
                <DetailsSection data={data.detail_service} />
                <ResourcesSection data={data.resource_service} />
                <VideoSliderSection data={data.videos} />
                <ImportanceSection data={data.impcard_service} />
                <GuidelineSection data={data.guidelines} />

            </div>
        </>
    )
}