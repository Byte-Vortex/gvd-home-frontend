import { makeRequestServer } from "@/lib/fetch";
import { AboutSection } from "./_components/about-section";
import { BlogsSection } from "./_components/blogs-section";
import { HeroSection } from "./_components/hero-section";
import { KeyFeatures } from "./_components/key-features";
import { QuoteSection } from "./_components/quote-section";
import { TestimonialsSection } from "./_components/testimonials-section";
import { TravelBenefitsSection } from "./_components/travel-benefits";
import { UpcomingDestinationsSection } from "./_components/upcoming-destinations-section";

export default async function Page() {
    const data = await makeRequestServer("/yatra/home");
    return (
        <>
            <HeroSection data={data.banners} />

            <div className="max-w-7xl mx-auto py-16 space-y-16 px-4">
                <AboutSection data={data.sacred_journey} />
                <TravelBenefitsSection data={data.travel_benefits} />
                <QuoteSection data={data.quote} />
            </div>

            <div className="bg-gradient-to-b from-surface to-transparent py-16 rounded-t-3xl space-y-16">
                <div className="max-w-7xl mx-auto px-4">
                    <UpcomingDestinationsSection data={data.upcoming_destination} />
                </div>
                <KeyFeatures data={data.key_features} />
            </div>

            <div className="max-w-7xl mx-auto space-y-16 pb-16 px-4">
                <TestimonialsSection data={data.testimonials} />


                {/* blogs */}
               <BlogsSection data={data.blogSection} />

            </div>

        </>
    )
}


