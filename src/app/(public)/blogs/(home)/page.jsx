import { makeRequestServer } from "@/lib/fetch";
import { HeroSection } from "./_components/hero-section";
import { CategoriesSection } from "./_components/categories-section";
import { MoreCategoriesAuthorsSection } from "./_components/more-categories-authors-section";
import { getScriptTags } from "@/app/_server/get-script-tags";
import { DynamicScripts } from "@/components/dynamic-scripts";
import { WebStoriesSection } from "./_components/web-stories-section";

export default async function Page() {
  const [data, scripts] = await Promise.all([
    makeRequestServer("/blogs/home"),
    getScriptTags("/blogs/"),
  ]);

  return (
    <div className="max-w-[100vw] lg:px-32 mx-auto p-4 py-16 space-y-24">
      <DynamicScripts pathname={"/blogs/"} scripts={scripts} />
      <HeroSection data={data.banners} />
      <CategoriesSection data={data.important_categories} />
      <WebStoriesSection data={data.webstories} />
      <MoreCategoriesAuthorsSection data={data} />
    </div>
  );
}
