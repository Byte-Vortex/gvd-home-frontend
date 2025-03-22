import { Image } from "@/components/image";
import Link from "next/link";
import { makeRequestServer } from "@/lib/fetch";
import { Button } from "@/components/ui/button";
import { ProseInnerHtmlContainer } from "@/components/prose-container";
import { PhotoView } from "@/app/_providers/photo-provider";
import { getScriptTags } from "@/app/_server/get-script-tags";
import { DynamicScripts } from "@/components/dynamic-scripts";

export default async function Page() {

    const [data, scripts] = await Promise.all([makeRequestServer("/books"), getScriptTags("/srila-prabhupada/books")]);

    return (

        <div className="max-w-7xl mx-auto px-4 py-12">
            <DynamicScripts pathname={"/srila-prabhupada/books"} scripts={scripts} />
            <h1>{data.title}</h1>

            <ProseInnerHtmlContainer className="mb-12 mt-2" html={data.summary} />

            {

                data.book_category.map((section, index) => (

                    <div key={index} className="mb-12">
                        <h3>{section.title}</h3>
                        <p className="max-w-3xl mt-2 mb-8">{section.text}</p>



                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-12">

                            {
                                section.books.map((book, index) => (
                                    <div key={index} className="flex flex-col gap-4 bg-surface text-on-surface rounded-3xl shadow-lg p-4 max-w-sm mx-auto w-full">

                                        <PhotoView src={book.imageLink}>
                                            <div className="w-full h-72 rounded-3xl overflow-hidden relative">
                                                <Image sizes="400px" fill className="w-full h-full object-cover" src={book.imageLink} />
                                            </div>
                                        </PhotoView>

                                        <h3 className="text-lg font-bold">{book.title}</h3>

                                        <p className="line-clamp-2">{book.text}</p>


                                        <Button asChild size="sm" className="mt-auto">
                                            <Link target="_blank" rel="noopener"  href={book.downloadLink}>
                                                Download
                                            </Link>
                                        </Button>

                                    </div>
                                ))

                            }

                        </div>

                    </div>
                ))
            }

            <ProseInnerHtmlContainer className="mb-12 mt-2" html={data.footer_content} />
        </div>
    )

}