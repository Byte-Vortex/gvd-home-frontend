import { Image } from '@/components/image';
import Link from 'next/link';

export function HeroSection({ data }) {

    return (
        <section
            className={"w-full relative aspect-h-1 rounded-b-3xl overflow-hidden aspect-w-[0.59] min-[767px]:aspect-w-[2.63]"}
        >
            <Link href="#form" className='w-full h-full bg-[#181818] block' >

                <picture>
                    <source media="(max-width: 767px)" srcSet={data.phoneImage} />
                    <source srcSet={data.desktopImage} />

                    {data.desktopImage &&
                        <Image
                            loadingAnimation={false}
                            fill
                            priority
                            className='w-full h-full object-cover'
                            src={data.desktopImage}
                        />
                    }

                </picture>
            </Link>



        </section >
    )
}