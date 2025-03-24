import { ShineBorder } from "@/components/fancy/shine-border";
import { ProseInnerHtmlContainer } from "@/components/prose-container";
import AnimatedCircularProgress from "@/components/ui/animated-circular-progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// export function CampaignSection({ data }) {
//     return (

//         <ShineBorder
//         borderRadius={12}
//             color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
//             className={"bg-surface text-on-surface"}
//         >
//             <div
//                 className="p-4 sm:p-6 grid md:grid-cols-2 gap-y-6 md:gap-y-12 gap-x-4 shadow-md min-h-80 relative">

//                 <div className="max-w-md space-y-3 my-auto">
//                     <h2 className="text-3xl md:text-4xl">{data.title}</h2>
//                     <ProseInnerHtmlContainer html={data.text} />
//                     <Button asChild className="hidden md:inline-flex">
//                         <Link href={data.link}>
//                             Donate Now
//                         </Link>
//                     </Button>
//                 </div>

//                 <div className="grid sm:grid-cols-2 gap-4 justify-center">
//                     <div className="w-48 md:w-56 space-y-4 mx-auto my-auto">
//                         <AnimatedCircularProgress maxPercentage={((parseFloat(data.achieved) / parseFloat(data.goal)) * 100).toFixed(2)} />
//                     </div>
//                     <div className="text-lg md:text-xl my-auto space-y-2 md:space-y-4 text-center">
//                         <div>Goal: {new Intl.NumberFormat("en-IN").format(data.goal)} Sq. Ft.</div>
//                         <div>
//                             <span
//                                 style={{ color: "#349c03" }}
//                                 className="text-4xl md:text-5xl font-bold"
//                             >
//                                 {new Intl.NumberFormat("en-IN").format(data.achieved)}
//                             </span>
//                             &nbsp;
//                             Achieved
//                         </div>

//                     </div>
//                 </div>

//                 <Button asChild className="max-w-max md:hidden">
//                     <Link href={data.link}>
//                         Donate Now
//                     </Link>
//                 </Button>
//             </div>
//         </ShineBorder>
//     )
// }

export function CampaignSection({ data }) {
    return (

        <ShineBorder
        borderRadius={12}
            color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
            className={"bg-surface text-on-surface"}
        >
            <div
                className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-10 shadow-md min-h-80 relative w-full justify-items-center">

                <div className="flex flex-col space-y-3 my-auto justify-center items-center text-center">
                    <h2 className="text-3xl md:text-4xl">{data.title}</h2>
                    <ProseInnerHtmlContainer html={data.text} />
                    <Button asChild className="hidden md:inline-flex w-32">
                        <Link href={data.link}>
                            Donate Now
                        </Link>
                    </Button>
                </div>
                <div className="w-48 md:w-56 space-y-4 mx-auto my-auto">
                        <AnimatedCircularProgress maxPercentage={((parseFloat(data.achieved) / parseFloat(data.goal)) * 100).toFixed(2)} />
                    </div>

                {/* <div className="grid sm:grid-cols-2 gap-4 justify-center">


                </div> */}
                <div className="text-lg md:text-xl my-auto space-y-2 md:space-y-4 text-end">
                        <div>Goal: {new Intl.NumberFormat("en-IN").format(data.goal)} Sq. Ft.</div>
                        <div>
                            <span
                                style={{ color: "#349c03" }}
                                className="text-4xl md:text-5xl font-bold"
                            >
                                {new Intl.NumberFormat("en-IN").format(data.achieved)}
                            </span>
                            &nbsp;
                            Achieved
                        </div>

                    </div>

                <Button asChild className="max-w-max md:hidden">
                    <Link href={data.link}>
                        Donate Now
                    </Link>
                </Button>
            </div>
        </ShineBorder>

    )
}