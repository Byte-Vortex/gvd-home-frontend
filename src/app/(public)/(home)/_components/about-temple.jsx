import { DecorationProp2 } from "@/components/misc/decoration-prop-2"
import { Button } from "@/components/ui/button"
import { YouTubeEmbed } from "@/components/ui/youtube-embed"
import { ProseInnerHtmlContainer } from "@/components/prose-container"
import Link from "next/link"

export function AboutSection({ data }) {
  const aboutSection = data
  return (
    <div className="space-y-8">
      <DecorationProp2 className="block mx-auto" />

      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        <div className="w-full max-h-max my-auto overflow-hidden rounded-xl min-h-28 shadow-landing-primary/60 shadow-lg">
          <div className="aspect-w-16 aspect-h-9 relative">
            <YouTubeEmbed
              videoId={aboutSection.video}
              className="w-full h-full"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 py-0 md:py-2">
          <h1 className="font-bold text-3xl md:text-4xl">{aboutSection.title}</h1>

          <div>
            <ProseInnerHtmlContainer html={aboutSection.text} />

            <Button
              variant="link"
              asChild
              className="p-0 text-on-background hover:text-primary font-bold"
            >
              <Link href={"/mandir/about"}>Read More</Link>
            </Button>
          </div>
        </div>
      </div>

      <DecorationProp2 className="block mx-auto rotate-180 mt-0" />
    </div>
  )
}
