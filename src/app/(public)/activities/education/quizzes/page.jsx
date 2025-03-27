import { makeRequestServer } from "@/lib/fetch"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Image } from "@/components/image";
import { ProseInnerHtmlContainer } from "@/components/prose-container";


export default async function Quizzes() {
    const data = await makeRequestServer("/activities/education/quizzes")


    const cards = data;


    return (
        <div className="max-w-[100vw] lg:px-32 mx-auto px-4 py-12">
                <h1>Quizzes For Youth</h1>
                <ProseInnerHtmlContainer html={data?.text || null} className="mb-12 mt-2" />
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {
                    cards.map((card, index) => (
                        <Card key={index} data={card} />
                    ))
                }
            </div>
        </div>
    )
}

function Card({ data }) {
    return (
        <Link href={data.slug} className="bg-surface text-on-surface rounded-xl p-4 gap-1 max-w-sm mx-auto w-full space-y-2">
            <h5>{data.title}</h5>
            <ProseInnerHtmlContainer html={data.description} className="line-clamp-2" />

           { data.buttonText?  (<> <Button className="p-0" variant="link" >
             {data.buttonText}
         </Button></>):(<></>)
            
           }
            <div className="relative w-full h-56">
                <Image
                    fill
                    className="w-full h-full object-cover rounded-xl"
                    src={data.image}
                />
            </div>

        </Link>
    )
}