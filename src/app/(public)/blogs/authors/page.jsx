import { makeRequestServer } from "@/lib/fetch";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProseInnerHtmlContainer } from "@/components/prose-container";
import { Image } from "@/components/image";
import { DynamicScripts } from "@/components/dynamic-scripts";
import { getScriptTags } from "@/app/_server/get-script-tags";

export default async function Page() {
  const [data, scripts] = await Promise.all([
    makeRequestServer("/blogs/author/"),
    getScriptTags("/blogs/authors/"),
  ]);
  return (
    <div className="max-w-[100vw] lg:px-32 mx-auto px-4 space-y-12 py-12">
      <DynamicScripts pathname={"/blogs/authors/"} scripts={scripts} />
      <h1>All Authors</h1>
      <ProseInnerHtmlContainer
        html={
          "<p>Welcome to our 'All Authors' page! Here, you can meet the amazing team behind our blog. Each author has a unique story and perspective to share. Click on their profiles to read their articles and get to know them better. Enjoy exploring!"
        }
      />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data?.map((card, index) => (
          <Card key={index} data={card} />
        ))}
      </div>
    </div>
  );
}

function Card({ data }) {
  return (
    <Link
      href={data.slug}
      className="bg-surface text-on-surface rounded-xl max-w-sm mx-auto w-full"
    >
      <div className="relative w-full aspect-w-4 aspect-h-3 mt-auto">
        <Image
          fill
          className="w-full h-full object-cover rounded-xl"
          src={data.image}
        />
      </div>

      <div className="flex flex-col gap-2 p-4">
        <h5 className="text-center">{data.full_name}</h5>
        <ProseInnerHtmlContainer
          className="line-clamp-2"
          html={data.description}
        />

        <Button className="p-0 max-w-max text-base" variant="link">
          View
        </Button>
      </div>
    </Link>
  );
}
