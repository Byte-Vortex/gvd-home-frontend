import { ProseInnerHtmlContainer } from "@/components/prose-container";
import Image from "next/image";
import Link from "next/link";
import { YouTubeEmbed } from "@/components/ui/youtube-embed";
export function CardInnerPage({ data }) {

    return (
        <div className="grid grid-cols-4 px-4 py-12 gap-8 max-w-7xl mx-auto">
            <div className="space-y-6 col-span-full lg:col-span-3 w-full">


                <div className="w-full max-w-6xl mx-auto">
                    <div className='aspect-w-16 aspect-h-9 relative rounded-xl overflow-hidden shadow-md'>
                        {
                            data.isbannervideo ?

                                <YouTubeEmbed videoId={data.videolink} />
                                :
                                <Image fill className="w-full h-full object-cover" src={data.bannerlink} />

                        }

                    </div>

                </div>


                <h1 className="font-bold text-5xl">{data.title}</h1>


                <ProseInnerHtmlContainer className="mb-12 mt-1" html={data.body} />


                <div className="hidden lg:grid grid-cols-3 gap-8 mt-8">
                    {
                        function () {
                            let arr = [];
                            let ads = data.ads;
                            for (let i = 3; i < ads.length; i++) {
                                arr.push(

                                    <AdImage key={i} data={ads[i]} />
                                );
                            }

                            return arr;
                        }()
                    }
                </div>

                <div className="flex flex-wrap gap-8 py-6 lg:hidden justify-center">
                    {
                        function () {
                            let arr = [];
                            let ads = data.ads;
                            for (let i = 0; i < ads.length; i++) {
                                arr.push(

                                    <AdImage key={i} data={ads[i]} />
                                );
                            }

                            return arr;
                        }()
                    }
                </div>

            </div>

            <div className="hidden lg:flex flex-col justify-start gap-8">
                {
                    function () {
                        let arr = [];
                        let ads = data.ads;
                        for (let i = 0; i < 3 && i < ads.length; i++) {
                            arr.push(
                                <AdImage key={i} data={ads[i]} />
                            );
                        }

                        return arr;
                    }()
                }
            </div>

        </div>
    )
}

function AdImage({ data }) {
    return (
        <Link target="_blank" rel="noopener"  href={data.link} className="w-full max-w-sm">
            <div className="aspect-1 rounded-xl shadow-md overflow-hidden hover:brightness-75 duration-150 relative">
                <Image fill className="w-full h-full object-cover" src={data.imagelink} />
            </div>
        </Link>
    )
}
