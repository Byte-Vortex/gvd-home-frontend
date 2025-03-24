import { makeRequestServer } from "@/lib/fetch";
import { HeroSection } from "./_components/hero-section";
import dynamic from "next/dynamic";
import { ProseInnerHtmlContainer } from "@/components/prose-container";
import { getScriptTags } from "@/app/_server/get-script-tags";
import { DynamicScripts } from "@/components/dynamic-scripts";
import InstagramSection from "../_components/instagram-section/InstagramSection";

const DonateSection = dynamic(() =>
  import("./_components/donate-section").then((_) => _.DonateSection)
);
const BeforeDonateSection = dynamic(() =>
  import("./before-donate-section").then((_) => _.BeforeDonateSection)
);
const AfterDonateSection = dynamic(() =>
  import("./after-donate-section").then((_) => _.AfterDonateSection)
);

export async function generateMetadata({ params }) {
  return {
    other: {
      "facebook-domain-verification": "6nz3m5aohicnvmk75dryx0k6uee564",
    },
  };
}

export default async function Home() {
  const [res, scripts] = await Promise.all([
    makeRequestServer("/home_page/"),
    getScriptTags("global"),
  ]);
  const data = res.data;
  return (
    <div>
      {/* <DynamicScripts pathname={"global"} scripts={scripts} /> */}
      <HeroSection data={data.heroSection} />
      <div className="max-w-[100vw] lg:px-[7.09vw] px-4">
      <BeforeDonateSection data={data} />
      <DonateSection data={data.donateSection} />
      <AfterDonateSection data={data} />
      <InstagramSection />
      <div className="w-full mx-auto px-4 pb-16">
        <ProseInnerHtmlContainer html={data.footer_body} />
      </div>
      </div>
    </div>
  );
}
