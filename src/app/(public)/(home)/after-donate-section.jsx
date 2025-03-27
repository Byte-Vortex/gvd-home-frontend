import { GallerySection } from "./_components/gallery-section";
import { VideoSection } from "./_components/video-section";
import { PrasadamSection } from "./_components/prasadam-section";
import { ActivitiesSection } from "./_components/activities-section";
import { VolunteerSection } from "./_components/volunteer-section";
import { BlogsSection } from "./_components/blogs-section";
import { FaqSection } from "./_components/faq-section";
import { WebStoriesSection } from "./_components/web-stories-section";

export function AfterDonateSection({ data }) {
    return (
        <div className=" max-w-[100vw] lg:px-[7.09vw] px-4 mx-auto space-y-12 md:space-y-16 pb-12 md:pb-16">
            <GallerySection data={data.gallerySection} />
            <VideoSection data={data.videoSection} />
            <PrasadamSection data={data.prasadamSection} />
            <ActivitiesSection data={data.activitesSection} />
            <BlogsSection data={data.blogSection} />
            <WebStoriesSection data={data.WebstorySection} />
            <FaqSection data={data.faqSection} />
            <VolunteerSection data={data.volunteerSection} />
        </div>
    )
}