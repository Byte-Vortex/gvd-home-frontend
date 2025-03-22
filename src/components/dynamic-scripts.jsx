import Script from "next/script";

export async function DynamicScripts({ scripts, pathname }) {


    return scripts?.map((script, index) => (
        script.content && <Script
            key={index}
            id={pathname + index}
            type={script.type}
            dangerouslySetInnerHTML={{
                __html: String(script.type).toLowerCase() === "application/ld+json" ? JSON.stringify(script.content) : script.content
            }}
        />
    ))
}