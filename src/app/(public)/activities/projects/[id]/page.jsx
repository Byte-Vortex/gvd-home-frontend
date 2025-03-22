import { notFound } from "next/navigation";
import { CardInnerPage } from "../../_components/card-inner-page";
import { makeRequestServer } from "@/lib/fetch";


export async function generateStaticParams() {
    return [];
}


export default async function Page({ params }) {
    const { id } = params;
    let data = null;
    try {
        data = await makeRequestServer("/activities/projects/" + id);
    } catch (err) {
        return notFound();
    }

    return <CardInnerPage data={data} />
}