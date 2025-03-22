import { AboutSection } from "./_components/about-temple";
import { ExploreTemple } from "./_components/explore-temple";
import { TestimonialsSection } from "./_components/testimonials-section";
import { CountDownSection } from "./_components/countdown-section";
import { CampaignSection } from "./_components/campaign-section";
// import { ServicesSection } from "./_components/services-section";


export function BeforeDonateSection({ data }) {
    return (
        <div className="mx-auto space-y-12 md:space-y-16 pt-12 md:pt-16">
            <CountDownSection data={data.countdownSection} />
            <AboutSection data={data.aboutSection} />
            <ExploreTemple data={data.exploreTempleSection} />
            <CampaignSection data={data.campaignSection} />
            {/* <ServicesSection data={data.servicesSection} /> */}
            <TestimonialsSection data={data.testimonialsSection} />
        </div>
    )
}