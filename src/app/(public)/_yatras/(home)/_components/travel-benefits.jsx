import { PhotoView } from "@/app/_providers/photo-provider";
import { Image } from "@/components/image";
import { ProseInnerHtmlContainer } from "@/components/prose-container";
import { cn } from "@/lib/utils"

export function TravelBenefitsSection({ data }) {
    return (
        <div className="grid lg:grid-cols-2 gap-8">

            <div className>
                <h2 className="font-light">{data.title}</h2>


                <div className="mt-16 sm:max-w-max mx-auto space-y-4 sm:space-y-0">

                    <div className="bg-white px-4 pb-4 pt-8 shadow-md w-full max-w-sm mx-auto sm:w-80 h-max relative sm:rotate-3">

                        <PhotoView src={data.images[0]}>
                            <div className="w-full h-64 relative">
                                <Image
                                    fill
                                    className="object-cover h-full w-full"
                                    src={data.images[0]}
                                />
                            </div>
                        </PhotoView>

                        <div className="hidden sm:flex absolute w-full -top-6 left-0">
                            <div className="bg-primary/50 h-10 w-48 mx-auto" />
                        </div>

                    </div>

                    <div className="bg-white px-4 pb-4 pt-8 shadow-md w-full max-w-sm mx-auto sm:w-80 h-max relative sm:-top-24 sm:left-32">

                        <PhotoView src={data.images[1]}>
                            <div className="w-full h-64 relative">
                                <Image
                                    fill
                                    className="object-cover h-full w-full"
                                    src={data.images[1]}
                                />
                            </div>
                        </PhotoView>

                        <div className="hidden sm:flex absolute w-full -top-6 left-0">
                            <div className="bg-primary/50 h-10 w-48 mx-auto" />
                        </div>

                    </div>

                </div>



            </div>

            <div className="grid sm:grid-cols-2 gap-4">
                {
                    data.benefits_cards.map((card, index) => {
                        const className = index === 0 ? "bg-primary text-on-primary" : "";
                        return (
                            <BenefitCard data={card} key={index} className={className} />
                        )
                    })
                }
            </div>
        </div>
    )
}

function BenefitCard({ data, className = "" }) {
    return (
        <div className={cn("bg-surface text-on-surface p-8 rounded-3xl space-y-2", className)}>
            <div className="bg-background text-on-background w-20 h-20 rounded-full relative overflow-hidden">
                <Image
                    src={data.image}
                    fill
                    className="object-cover w-full h-full object-top"
                />
            </div>
            <h4>{data.title}</h4>
            <ProseInnerHtmlContainer html={data.description} />
        </div>
    )
}

