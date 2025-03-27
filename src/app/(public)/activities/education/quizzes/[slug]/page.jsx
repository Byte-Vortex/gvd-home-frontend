import { notFound } from "next/navigation";
import { makeRequestServer } from "@/lib/fetch";
import QuizForm from "../_components/quiz";
import { ProseInnerHtmlContainer } from "@/components/prose-container";

export async function generateStaticParams() {
    return [];
}

export default async function Page({ params }) {
    const { slug } = params;
    let data = null;
    try {
        data = await makeRequestServer("/quiz/" + slug);
        console.log(data);
    } catch (err) {
        return notFound();
    }

    const transformedData = {
        quizTitle:data.title,
        quizSlug: data.slug,
        startDate: data.start_time,
        endDate: new Date(new Date(data.start_time).getTime() + data.total_time * 60 * 1000).toISOString(),
        questions: data.questions
          .filter(q => q.correct_answer !== null && q.choices?.length >= q.correct_answer)
          .map(q => ({
            id: q.id,
            question: q.question_text,
            options: q.choices,
            correctAnswer: q.choices[q.correct_answer - 1] // Assuming 1-based index
          }))
      };

    return(
        <div className="max-w-[100vw] lg:px-[7.09vw] px-4 py-5 flex flex-col gap-4 ">
            <h2>{data.title}</h2>
            <ProseInnerHtmlContainer html={data.description}></ProseInnerHtmlContainer>
            <p>{data.total_time}</p>
            <QuizForm quizData={transformedData} ></QuizForm>
        </div>
    )
}