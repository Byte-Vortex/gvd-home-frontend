import { Image } from '@/components/image';
import { makeRequestServer } from '@/lib/fetch';
import { FullSwiper } from './full-swiper';
import { ProseInnerHtmlContainer } from '@/components/prose-container';
import { PhotoView } from '@/app/_providers/photo-provider';


export default async function Gallery() {

    const res = await makeRequestServer("/homegallery/");
    const data = res.data;


    return (

        <div className="space-y-12 py-12">
            <div className="max-w-7xl mx-auto px-4 space-y-12">
                <h1>{"Gallery"}</h1>

                <ProseInnerHtmlContainer
                    html={"<p>The temple gallery housed a stunning collection of clicked images, each a visual tribute to its divine aura. From intricate carvings to sacred rituals, these photos captured the essence of spirituality in vivid detail. Each image spoke volumes, preserving the temple's sanctity in a timeless visual narrative.</p>"}
                />
            </div>



            {/* important-images */}
            <FullSwiper
                highlightedImages={data.highlightedImages}
            />


            <div className='max-w-7xl mx-auto space-y-12 p-4'>

                {
                    data.sections.map((data, index) => (
                        <div key={index} className='space-y-8'>

                            <h3 className='capitalize'>{(index + 1) + ". " + data.title}</h3>
                            <ProseInnerHtmlContainer html={data.text} />

                            <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-8'>

                                {
                                    data.images.map((image, index) => (
                                        <div
                                            style={{
                                                transform: (() => {
                                                    let random = Math.random();
                                                    let rotateDirection = random <= .5 ? -1 : 1;
                                                    let angle = rotateDirection * random * 2;

                                                    return `rotate(${angle}deg)`
                                                })()
                                            }}
                                            key={index} className='bg-surface p-4 pb-16 shadow-lg hover:!rotate-0 duration-150 hover:shadow-xl rounded-xl'>
                                            <PhotoView src={image}>
                                                <div className='w-full h-64 relative'>

                                                    <Image
                                                        sizes="500px"
                                                        fill
                                                        src={image} className="w-full h-full object-cover rounded-xl"
                                                    />

                                                </div>
                                            </PhotoView>
                                        </div>
                                    ))
                                }



                            </div>
                        </div>
                    ))


                }

            </div>




        </div >
    )
}