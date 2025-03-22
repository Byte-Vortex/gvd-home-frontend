export function GuidelineSection({ data }) {
    return (
        !!data?.details?.length && <section className="space-y-6">

            <h3>{data.title}</h3>
            <ul className="flex flex-wrap justify-between gap-4 list-decimal px-4">
                {
                    data.details.map((obj, index) => (
                        <li key={index} className="w-full">
                            <p>{obj.englishtext}</p>
                            <p>{obj.hinditext}</p>
                        </li>
                    ))
                }
            </ul>

        </section>
    )
}