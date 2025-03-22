import { ProseInnerHtmlContainer } from "@/components/prose-container";
import { makeRequestServer } from "@/lib/fetch";
import { Image } from "@/components/image";
import { notFound } from "next/navigation";
import { FaCalendar } from "react-icons/fa";
import Link from "next/link";
import { YouTubeEmbed } from "@/components/ui/youtube-embed";
import { formatDateToDDMMYYYY } from "@/lib/utils";
import { getScriptTags } from "@/app/_server/get-script-tags";
import { DynamicScripts } from "@/components/dynamic-scripts";
import { format } from "date-fns";

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }) {
  const { id } = params;

  const res = await makeRequestServer("/allfestivals/" + id);

  const data = res.data[0];

  return {
    openGraph: {
      images: [
        {
          url: data.bannerlink,
          width: "1503",
          height: "843",
        },
      ],
    },
    twitter: {
      images: [data.bannerlink],
    },
  };
}

export default async function Page({ params }) {
  const { id } = params;
  let res = null;
  let scripts = null;
  try {
    if (!id) throw new Error("No Id!");
    [res, scripts] = await Promise.all([
      makeRequestServer("/allfestivals/" + id),
      getScriptTags("/festivals/" + id + "/"),
    ]);
    if (!res?.data) throw new Error("Invalid Id");
  } catch (err) {
    return notFound();
  }

  const data = res.data[0];

  return (
    <div className="grid grid-cols-4 px-4 py-12 gap-8 max-w-7xmax-w-[100vw] lg:px-32 mx-auto">
      <DynamicScripts pathname={"/festivals/" + id + "/"} scripts={scripts} />
      <div className="space-y-5 col-span-full lg:col-span-3 w-full">
        <h1 className="font-bold text-5xl">{data.title}</h1>

        <div className="flex">
          <div className="flex items-center gap-2">
            <FaCalendar className="text-lg text-primary" />
            <span>{format(new Date(data.date), "MMM d, yyyy")}</span>
          </div>
        </div>

        <div className="w-full max-w-6xl mx-auto">
          <div className="aspect-w-16 aspect-h-9 relative rounded-xl overflow-hidden shadow-md">
            {data.isbannervideo ? (
              <YouTubeEmbed videoId={data.videolink} />
            ) : (
              <Image
                fill
                className="w-full h-full object-cover"
                src={data.bannerlink}
              />
            )}
          </div>
        </div>

        <ProseInnerHtmlContainer
          className="mb-12 mt-1"
          html={data.htmlContent}
        />

        <div className="hidden lg:grid grid-cols-3 gap-8 mt-8">
          {(function () {
            let arr = [];
            let ads = data.ads;
            for (let i = 3; i < ads.length; i++) {
              arr.push(<AdImage key={i} data={ads[i]} />);
            }

            return arr;
          })()}
        </div>

        <div className="flex flex-wrap gap-8 py-6 lg:hidden justify-center">
          {(function () {
            let arr = [];
            let ads = data.ads;
            for (let i = 0; i < ads.length; i++) {
              arr.push(<AdImage key={i} data={ads[i]} />);
            }

            return arr;
          })()}
        </div>
      </div>

      <div className="hidden lg:flex flex-col justify-start gap-8">
        {(function () {
          let arr = [];
          let ads = data.ads;
          for (let i = 0; i < 3 && i < ads.length; i++) {
            arr.push(<AdImage key={i} data={ads[i]} />);
          }

          return arr;
        })()}
      </div>
    </div>
  );
}

function AdImage({ data }) {
  return (
    <Link
      target="_blank"
      rel="noopener"
      href={data.link}
      className="w-full max-w-sm"
    >
      <div className="aspect-1 rounded-xl shadow-md overflow-hidden hover:brightness-75 duration-150 relative">
        <Image
          fill
          className="w-full h-full object-cover"
          src={data.imagelink}
        />
      </div>
    </Link>
  );
}
