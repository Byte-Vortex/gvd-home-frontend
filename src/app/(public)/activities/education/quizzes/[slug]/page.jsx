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
    } catch (err) {
        return notFound();
    }

    const transformedData = {
        quizTitle: data.title,
        quizSlug: data.slug,
        startDate: data.startDate,
        endDate: new Date(new Date(data.start_time).getTime() + data.total_time * 60 * 1000).toISOString(),
        questions: data.questions
          .filter(q => {
            // Ensure that questions have valid choices and correct_answer is not null and matches a valid choice
            return q.correct_answer !== null && q.choices?.length >= 1;
          })
          .map(q => {
            const correctChoice = q.choices.find(choice => choice.id === q.correct_answer); // Find the correct choice based on the ID
            return {
              id: q.id,
              question: q.question_text,
              options: q.choices.map(choice => choice.choice_text), // Get the text for each choice
              correctAnswer: correctChoice ? correctChoice.choice_text : null // Use the correct choice's text
            };
          })
      };
      

    return(
        <div className="max-w-[100vw] lg:px-[7.09vw] px-4 py-5 flex flex-col gap-4 ">
            <h2>{data.title}</h2>
            <ProseInnerHtmlContainer html={data.description}></ProseInnerHtmlContainer>
            <QuizForm quizData={transformedData} ></QuizForm>
        </div>
    )
}