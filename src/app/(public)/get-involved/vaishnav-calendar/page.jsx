import { ProseInnerHtmlContainer } from '@/components/prose-container';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { DiscoverSection } from '../../_components/discover-section/discover-section';
import { makeRequestServer } from '@/lib/fetch';

const VaishnavCalendar = dynamic(() => import("./calendar"), { ssr: false })

export default async function Page() {

    const data = await makeRequestServer("/vaishnavcalender/");

    return (

        <div className='py-12 space-y-24'>
            <div className="max-w-7xl mx-auto px-4 space-y-6">
                <h1>{data.title}</h1>

                <ProseInnerHtmlContainer className="" html={data.text} />

                <div className='flex justify-center max-w-5xl mx-auto'>

                    <Suspense fallback={<Skeleton className={"h-[500px] w-full"} />}>
                        <VaishnavCalendar data={data.events} />
                    </Suspense>


                </div>

            </div>

            <DiscoverSection />

        </div>

    )
}