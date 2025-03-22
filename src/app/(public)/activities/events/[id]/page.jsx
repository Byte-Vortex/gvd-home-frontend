import { makeRequestServer } from "@/lib/fetch";
import { notFound } from "next/navigation";
import { HeroSection } from "../_components/event-hero";
import { AboutSection } from "../_components/about-section";
import { DetailsSection } from "../_components/details-section";
import { ResourcesSection } from "../_components/resources-section";
import { ImportanceSection } from "../_components/importance-section";
import { GuidelineSection } from "../_components/guideline-section";
import { VideoSliderSection } from "../_components/video-slider-section";
import { LazyForm } from "./lazy-form";
import { getBasicDetails } from "@/server/get-basic-details";

export async function generateStaticParams() {
  return [];
}

const ifRenderForm = [
  'yoga-for-happiness',
  'folk-sessions',
  'vedic-gyan',
  'sharanagati',
  'indian-cultural-values-for-kids'
]

export default async function Page({ params }) {
  const basicDetails = await getBasicDetails();
  const { id } = params;
  let data = null;
  try {
    data = await makeRequestServer("/eventservices/events/" + id);
  } catch (err) {
    return notFound();
  }

  if (data.formDetails == undefined) {
    data.formDetails = {
      additional_form_text: 'We recommend you to contact the concern department related to Series, Timings & Days.',
      email: 'cdt@hkmjaipur.org',
      phone: '919829033170',
      title: 'Register for the Suggested Series',
      button_text: 'Register for Series'
    }
  }


  return (
    <>
      <HeroSection
        data={{
          phoneImage: data.phoneimage,
          desktopImage: data.desktopimage,
        }}
      />
      <div className="px-4 py-24 space-y-24 max-w-7xl mx-auto w-full">
        <AboutSection data={data.about_service} />
        {ifRenderForm.includes(id) && <LazyForm basicDetails={basicDetails} formDetails={data.formDetails} eventId = {id} />}
        <DetailsSection data={data.detail_service} />
        <ResourcesSection data={data.resource_service} />
        <VideoSliderSection data={data.videos} />
        <ImportanceSection data={data.impcard_service} />
        <GuidelineSection data={data.guidelines} />
      </div>
    </>
  );
}
