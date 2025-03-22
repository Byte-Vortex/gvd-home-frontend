import { getScriptTags } from "@/app/_server/get-script-tags";
import { DynamicScripts } from "@/components/dynamic-scripts";
import { makeRequestServer } from "@/lib/fetch";
import { Slider } from "./_components/slider";

export default async function Page() {

    const [data, scripts] = await Promise.all([makeRequestServer("/blogs/webstory"), getScriptTags("/web-stories/")]);

    return (

        <div className="max-w-[100vw] lg:px-32 mx-auto px-4 py-12">
            <DynamicScripts pathname={"/web-stories/"} scripts={scripts} />
            <h1 className="mb-12">{"Web Stories"}</h1>

            {/* <ProseInnerHtmlContainer className="mb-12 mt-2" html={data.text} /> */}

            <div className="space-y-20">
            {

                data.map((section, index) => (

                    <div key={index}>
                        <h3 className="mb-4">{section.title}</h3>
                        <Slider data={section.webstories} />
                    </div>
                ))
            }
            </div>

        </div>
    )

}