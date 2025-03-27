import { notFound } from "next/navigation";
import { CardInnerPage } from "../../_components/card-inner-page";
import { makeRequestServer } from "@/lib/fetch";


export async function generateStaticParams() {
    return [{ id: "quizzes" }]; 
}

export default async function Page({ params }) {
    const { id } = params;

    if (id === "quizzes") {
        return notFound(); // or redirect(`/education/quizzes`);
    }
    let data = null;
    try {
        data = await makeRequestServer("/activities/education/" + id);
    } catch (err) {
        return notFound();
    }

    return <CardInnerPage data={data} />
}