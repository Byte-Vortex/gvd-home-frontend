import { Image } from "@/components/image";
import { makeRequestServer } from "@/lib/fetch"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProseInnerHtmlContainer } from "@/components/prose-container";


export default async function Page() {
    const data = await makeRequestServer("/our_centers/");

    return (
        <div className="max-w-[100vw] lg:px-32 mx-auto px-4 space-y-12 py-12">
            <h1>{data.title}</h1>

            <ProseInnerHtmlContainer html={data.text} />

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {
                    data.cards.map((card, index) => (
                        !!card.show_as_card && <Card key={index} data={card} />
                    ))
                }
            </div>

            <div>
                <h5>List of Other Associated Centers</h5>
                <ul className="list-decimal list-inside">

                    {
                        data.cards.map((card, index) => (
                            !card.show_as_card && <li key={index}>
                                <Button asChild variant="link" className="p-0 text-base text-on-background hover:text-primary">
                                    <Link id={index} href={card.link}>
                                        {card.title}
                                    </Link>
                                </Button>
                            </li>

                        ))
                    }

                </ul>
            </div>
        </div>
    )
}

function Card({ data }) {
    return (
        <Link href={data.id + "/"} className="bg-surface text-on-surface rounded-xl overflow-hidden gap-1 max-w-sm mx-auto w-full">

            <div className="relative w-full h-64 mb-2">
                <Image
                    fill
                    className="w-full h-full object-cover"
                    src={data.image}
                />
            </div>

            <h5 className="p-4 text-center">
                {data.title}
            </h5>
        </Link>
    )
}