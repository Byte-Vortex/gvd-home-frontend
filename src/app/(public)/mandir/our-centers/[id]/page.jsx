import { Image } from "@/components/image";
import { ProseInnerHtmlContainer } from "@/components/prose-container";
import { makeRequestServer } from "@/lib/fetch"
import { notFound } from "next/navigation";


export async function generateStaticParams() {
    return [];
}

export default async function Page({ params }) {
    const { id } = params;
    let data = null;
    try {
        data = await makeRequestServer("/our_centers/" + id);
    } catch (err) {
        return notFound();
    }

    return (
        <div className="max-w-7xl mx-auto px-4 space-y-12 py-12">

            <div className="max-w-6xl mx-auto">
            <div className="aspect-w-16 aspect-h-9 relative w-full rounded-xl overflow-hidden">
                <Image fill className="w-full h-full object-cover" src={data.image} />
            </div>
            </div>

            <ProseInnerHtmlContainer html={data.text} />

        </div>
    )
}