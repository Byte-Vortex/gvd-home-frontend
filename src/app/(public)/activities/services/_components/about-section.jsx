import { PhotoView } from "@/app/_providers/photo-provider";
import { Image } from "@/components/image";
import { ProseInnerHtmlContainer } from "@/components/prose-container";

export function AboutSection({ data }) {

    return (
        !!data && <section className="space-y-6">


            <h1 className="text-4xl font-semibold">{data.about_title}</h1>

            <ProseInnerHtmlContainer html={data.about_text} />

            <div className="flex flex-wrap justify-center gap-4 items-center">
                {
                    data.cards.map((card, index) => (
                        <PhotoView key={index} src={card.cardsimage}>
                            <div className="relative h-96 w-72 rounded-xl overflow-hidden shadow-sm">
                                <Image sizes="400px" fill src={card.cardsimage} className={"w-full h-full object-cover"} />
                            </div>
                        </PhotoView>
                    ))
                }
            </div>

        </section>
    )
}