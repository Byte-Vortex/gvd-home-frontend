import { Image } from "@/components/image"
import Link from "next/link"
import { FaRegCalendar as CalendarIcon } from "react-icons/fa"
import { formatDate, sortCardsByDate } from "@/lib/utils"
import { makeRequestServer } from "@/lib/fetch"
import { Button } from "@/components/ui/button"
import { ProseInnerHtmlContainer } from "@/components/prose-container"
import { PhotoView } from "@/app/_providers/photo-provider"
import { getScriptTags } from "@/app/_server/get-script-tags"
import { DynamicScripts } from "@/components/dynamic-scripts"
import { format } from "date-fns"

export default async function Page() {
  const [data, scripts] = await Promise.all([
    makeRequestServer("/allfestivals"),
    getScriptTags("/festivals/"),
  ])
  const cards = sortCardsByDate(data.festivals)

  return (
    <div className="max-w-[100vw] lg:px-32 mx-auto px-4 py-12">
      <DynamicScripts pathname={"/festivals/"} scripts={scripts} />
      <h1>{data.title}</h1>

      <ProseInnerHtmlContainer className="mb-12 mt-2" html={data.text} />

      <section className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {cards.map((card, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 rounded-xl shadow-lg p-4 bg-surface text-on-surface max-w-sm mx-auto"
          >
            <div className="w-full h-auto rounded-xl relative overflow-hidden">
              <Image
                width={384}
                height={215}
                className="max-w-full h-full object-cover"
                src={card.imagelink}
              />
            </div>

            <h4 className="text-xl">{card.title}</h4>

            <div className="flex gap-2">
              <CalendarIcon className="text-primary" size={13}/>
              <span className="text-sm !leading-none font-semibold">{format(new Date(card.date), "MMM d, yyyy")}</span>
            </div>

            <p className="line-clamp-3 text-sm">{card.text}</p>

            <Button asChild className="mt-auto">
              <Link href={card.slug + "/"}>Read More</Link>
            </Button>
          </div>
        ))}
      </section>
    </div>
  )
}
