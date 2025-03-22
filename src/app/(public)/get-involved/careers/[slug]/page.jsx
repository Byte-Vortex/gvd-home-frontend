import { FaIndianRupeeSign } from "react-icons/fa6";
import { MdCardMembership } from "react-icons/md";
import { MdOutlineDiversity3 } from "react-icons/md";
import { CgWorkAlt } from "react-icons/cg";
import { FaRegClock } from "react-icons/fa6";
import { FaRegMap } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { FiCalendar } from "react-icons/fi";
import Form from "./form";
import { notFound } from "next/navigation";
import { ProseInnerHtmlContainer } from "@/components/prose-container";
import { makeRequestServer } from "@/lib/fetch";


export async function generateStaticParams() {
    return [];
}

export default async function Page({params}) {

    const { slug  } = params;

    const res = await makeRequestServer("/careers");
    const allJobs = res?.data;

    let data = null;

    for (let i = 0; i < allJobs.length; i++) {
        let job = allJobs[i];
        if (String(job.slug) === String(slug)) {
            data = job;
            break;
        }
    }

    if (!data) return notFound();


    return (

        <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
            <h1>{data.jobTitle}</h1>

            <div className="p-6 bg-surface text-on-surface rounded-xl grid min-[450px]:grid-cols-2 md:grid-cols-3 gap-4">
                <h3 className="text-lg font-semibold col-span-full">Job Summary</h3>
                {
                    data.salary &&


                    <SingleJobDetail
                        icon={<FaIndianRupeeSign className="text-lg" />}
                        name={"Salary"}
                        value={data.salary}
                    />
                }

                {
                    data.experience &&
                    <SingleJobDetail
                        icon={<MdCardMembership className="text-xl" />}
                        name={"Experience"}
                        value={data.experience}
                    />
                }

                {
                    data.vacancy &&
                    <SingleJobDetail
                        icon={<MdOutlineDiversity3 className="text-lg" />}
                        name={"Vacancy"}
                        value={data.vacancy}
                    />
                }

                {
                    data.jobType &&
                    <SingleJobDetail
                        icon={<CgWorkAlt className="text-lg" />}
                        name={"Job Type"}
                        value={data.jobType}
                    />
                }

                {
                    data.workingHours &&
                    <SingleJobDetail
                        icon={<FaRegClock className="text-lg" />}
                        name={"Working Hours"}
                        value={data.workingHours}
                    />
                }

                {
                    data.location &&
                    <SingleJobDetail
                        icon={<FaRegMap className="text-lg" />}
                        name={"Location"}
                        value={data.location}
                    />
                }

                {
                    data.benefits &&
                    <SingleJobDetail
                        icon={<MdOutlineDashboard className="text-lg" />}
                        name={"Benefits"}
                        value={data.benefits}
                    />
                }

                {
                    data.workingDays &&
                    <SingleJobDetail
                        icon={<FiCalendar className="text-lg" />}
                        name={"Working Days"}
                        value={data.workingDays}
                    />
                }

            </div>

            {/* Job Description */}
            <ProseInnerHtmlContainer html={data.description} />

            <Form jobId={data.id}/>
        </div>
    )
}

function SingleJobDetail({ icon, name, value }) {
    return (
        <div className="flex items-center gap-2">
            <div>
                {icon}
            </div>
            <div className="text-sm">
                <div className="text-sub-text">{name}</div>
                <div className="font-bold">{value}</div>
            </div>

        </div>
    )
}