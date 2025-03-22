import { getScriptTags } from "@/app/_server/get-script-tags";
import { DynamicScripts } from "@/components/dynamic-scripts";
import { ProseInnerHtmlContainer } from "@/components/prose-container";
import { makeRequestServer } from "@/lib/fetch"


export default async function Page() {
    const [data, scripts] = await Promise.all([makeRequestServer("/privacy_policy/"), getScriptTags("/privacy-policy/")]);
    return (
        <div className="max-w-7xl mx-auto px-4 space-y-12 py-12">
            <DynamicScripts pathname={"/privacy-policy/"} scripts={scripts} />
            <ProseInnerHtmlContainer html={data.text} />
        </div>
    )
}