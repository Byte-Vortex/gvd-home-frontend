import { Form } from "./form";
import { FormSection } from "../_components/form-section/form-section";

export function LazyForm({ basicDetails, data }) {

    return (
        <section id="form">
            <h2 className="text-center text-3xl font-semibold mb-8">
                {data.title}
            </h2>

            <FormSection>
                <Form
                    basicDetails={basicDetails}
                    data={data}
                />
            </FormSection>

        </section>
    )
}