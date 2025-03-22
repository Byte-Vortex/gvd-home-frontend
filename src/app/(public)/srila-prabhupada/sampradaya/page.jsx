import { Image } from "@/components/image";
import { makeRequestServer } from "@/lib/fetch"
import Link from "next/link";
import { VideoImageSliderTab } from "@/components/video-image-slider-tab";
import { Button } from "@/components/ui/button";
import { ProseInnerHtmlContainer } from "@/components/prose-container";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";


export default async function Page() {
    const data = await makeRequestServer("/sampradaya/");
    return (
        <div className="max-w-[100vw] lg:px-32 mx-auto px-4 space-y-12 py-12">
            <h1>{data.title}</h1>

            <VideoImageSliderTab videoId={data.video} images={data.images} />
            <ProseInnerHtmlContainer html={data.text} />

            <Table className="max-w-max mx-auto overflow-auto rounded-xl border-collapse border-primary border flex">
                <TableBody className="grid">
                    {
                        data.table.map((row, rIndex) => (

                            <TableRow key={rIndex} className="flex border-0">
                                {
                                    row.data.map((col, cIndex) => (
                                        <TableCell key={cIndex} className="first:font-bold border-collapse border-primary border py-2 px-3">
                                            <div className="relative w-56 min-h-32 flex items-center justify-center text-center rounded-xl overflow-hidden">
                                            {
                                                row.type === "text" ?
                                                    <ProseInnerHtmlContainer html={col} /> :
                                                    row.type === "image" ?
                                                        <Image src={col} fill className="fill object-cover h-full w-full object-top" /> :
                                                        null

                                            }
                                            </div>
                                        </TableCell>
                                    ))
                                }
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>

            <ProseInnerHtmlContainer html={data.textAfterTable} />

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {
                    data.cards.map((card, index) => (
                        <Card key={index} data={card} />
                    ))
                }
            </div>
        </div>
    )
}

function Card({ data }) {
    return (
        <div className="bg-surface text-on-surface rounded-xl p-4 gap-1 max-w-sm mx-auto w-full space-y-2">
            <h5>{data.title}</h5>
            <p className="line-clamp-2">{data.text}</p>

            <Button asChild className="p-0" variant="link" >
                <Link href={data.link}>
                    Read More
                </Link>
            </Button>
            <div className="relative w-full h-56">
                <Image
                    fill
                    className="w-full h-full object-cover rounded-xl"
                    src={data.image}
                />
            </div>

        </div>
    )
}