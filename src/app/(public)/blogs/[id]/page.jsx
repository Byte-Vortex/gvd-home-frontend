import { Image } from "@/components/image";
import { ProseInnerHtmlContainer } from "@/components/prose-container";
import { Button } from "@/components/ui/button";
import { YouTubeEmbed } from "@/components/ui/youtube-embed";
import { makeRequestServer } from "@/lib/fetch";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaCalendar } from "react-icons/fa";
import { ShareButton } from "./share-button";
import BlogTag from "../(home)/_components/blog-tag";
import { format } from "date-fns";
import { DynamicScripts } from "@/components/dynamic-scripts";
import { getScriptTags } from "@/app/_server/get-script-tags";

export async function generateStaticParams() {
  return [];
}
export async function generateMetadata({ params }) {
  const { id } = params;

  const [data] = await Promise.all([makeRequestServer("/blogs/detail/" + id)]);
  return {
    openGraph: {
      images: [
        {
          url: data.image,
          width: "1503",
          height: "843",
        },
      ],
    },
    twitter: {
      images: [data.image],
    },
  };
}

export default async function Page({ params }) {
  const { id } = params;
  let data = null;
  let scripts = null;
  try {
    if (!id) throw new Error("No Id!");
    [data, scripts] = await Promise.all([
      makeRequestServer("/blogs/detail/" + id),
      getScriptTags("/blogs/" + id + "/"),
    ]);
  } catch (err) {
    return notFound();
  }

  return (
    <div className="grid grid-cols-4 px-4 py-12 gap-8 max-w-7xl mx-auto">
      <DynamicScripts pathname={"/blogs/" + id + "/"} scripts={scripts} />
      <div className="space-y-6 col-span-full lg:col-span-3 w-full">
        <div>
          <h1 className="font-bold text-5xl">{data.title}</h1>
        </div>

        <div className="flex flex-wrap justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="flex gap-2">
              <div className="flex-grow-0 flex-shrink-0 h-10 w-10 rounded-full overflow-hidden relative">
                <Image
                  fill
                  className="h-full w-full object-cover"
                  src={data.author_image}
                  alt={data.author}
                />
              </div>
              <Button variant="link" className="p-0">
                <Link href={"/blogs/authors/"+data.author_id}>
                {data.author}
                </Link>
              </Button>
              {/* <ShareButton /> */}
            </div>
            <span>|</span>
            <div className="flex items-center gap-2 pl-2">
              <FaCalendar className="text-lg text-primary" />
              <span>{format(new Date(data.updated_at), "MMM d, yyyy")}</span>
            </div>
          </div>

          <div className="flex flex-wrap text-sm items-start">
            <BlogTag data={data.tags[0]} />
          </div>
        </div>

        <div className="w-full max-w-6xl mx-auto">
          <div className="aspect-w-16 aspect-h-9 relative rounded-xl overflow-hidden shadow-md">
            {data.isbannervideo ? (
              <YouTubeEmbed videoId={data.video} />
            ) : (
              <Image
                fill
                className="w-full h-full object-cover"
                src={data.image}
              />
            )}
          </div>
        </div>

        <ProseInnerHtmlContainer className="mb-12 mt-1" html={data.body} />

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

      <div className="space-y-4 col-span-full">
        <h3>Related Blogs</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.related_blogs.map((blog, index) => (
            <Card key={index} data={blog} />
          ))}
        </div>
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

function Card({ data }) {
  return (
    <Link
      href={"../" + data.slug + "/"}
      className="flex min-h-[268px] flex-col bg-surface justify-between text-on-surface rounded-xl overflow-hidden w-full group hover:bg-primary hover:text-on-primary duration-150 max-w-xs mx-auto"
    >
      <div className="px-4 py-6">
        <div className="text-sm text-sub-text group-hover:text-on-primary font-semibold">
          {format(new Date(data.updated_at), "MMM d, yyyy")}&nbsp;.
          <span className="text-primary group-hover:text-on-primary px-1">
            {data.author}
          </span>
        </div>
        <p className="line-clamp-3">{data.title}</p>
      </div>

      <div className="group-hover:scale-105 duration-150 relative w-full">
        <Image
          width={290}
          height={193}
          className="max-w-full h-auto object-contain w-full"
          src={data.imageLink}
        />
      </div>
    </Link>
  );
}
