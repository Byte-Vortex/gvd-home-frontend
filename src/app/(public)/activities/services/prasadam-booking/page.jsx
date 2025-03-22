
import FaqSection from "./_components/faq-section";
import { FormSection } from "./_components/form-section";
import { HeroSection } from "./_components/hero-section";
import { SupportSection } from "./_components/support-section";
import { makeRequestServer } from "@/lib/fetch";
import { ProseInnerHtmlContainer } from "@/components/prose-container";

export default async function Page() {

    const res = await makeRequestServer("/prasadamdetails/");
    const data = res.data;

    return (
        <div>
            <HeroSection data={data.heroSection} />

            <div className="max-w-7xl mx-auto px-4 py-16 space-y-20">
                <div className="">
                    <h1>{data.aboutSection.title}</h1>

                    <ProseInnerHtmlContainer
                        className="mt-12"
                        html={data.aboutSection.text}
                    />
                </div>

                <FormSection />

                <SupportSection contactSection={data.contactSection} />

                <FaqSection faqSection={data.faqSection} />
            </div>

        </div>
    )
}