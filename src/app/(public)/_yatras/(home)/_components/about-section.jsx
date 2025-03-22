import { ProseInnerHtmlContainer } from "@/components/prose-container";

export function AboutSection({ data }) {
    return (
        <div className="text-center space-y-6">
            <h1 className="text-4xl font-light max-w-xl mx-auto">{data.title}</h1>
            <div className="max-w-2xl mx-auto">
            <ProseInnerHtmlContainer html={data.description} />
            </div>
        </div>

    )
}