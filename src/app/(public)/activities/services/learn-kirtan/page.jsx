import { HeroSection } from "../_components/event-hero";
import { FormSection } from "../_components/form-section/form-section";
import { Form } from "./form";
import { getBasicDetails } from "@/server/get-basic-details";
import { makeRequestServer } from "@/lib/fetch";
import { AboutSection } from "../_components/about-section";
import { ResourcesSection } from "../_components/resources-section";
import { ImportanceSection } from "../_components/importance-section";
import { DetailsSection } from "../_components/details-section";
import { GuidelineSection } from "../_components/guideline-section";
import { VideoSliderSection } from "../_components/video-slider-section";

export default async function Page() {

    const data = await makeRequestServer("/eventservices/services/learn-kirtan");
    const basicDetails = await getBasicDetails();

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

                <section id="form">
                    <h2 className="text-center text-3xl font-semibold mb-8">
                        Learn Kirtan
                    </h2>
                    <FormSection>
                        <Form
                            data={data.formDetails}
                            basicDetails={basicDetails}
                        />
                    </FormSection>
                </section>
                <DetailsSection data={data.detail_service} />
                <ResourcesSection data={data.resource_service} />
                <VideoSliderSection data={data.videos} />
                <ImportanceSection data={data.impcard_service} />
                <GuidelineSection data={data.guidelines} />

            </div>
        </>
    )
}