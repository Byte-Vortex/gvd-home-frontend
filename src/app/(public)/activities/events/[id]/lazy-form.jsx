import { FormSection } from "../_components/form-section/form-section";
import { Form } from "./form";

export function LazyForm({ basicDetails, formDetails, eventId }) {
  return (
    <section id="form">
      <h2 className="text-center text-3xl font-semibold mb-8">{formDetails.title}</h2>

      <FormSection>
        <Form basicDetails={basicDetails} formDetails={formDetails} eventId={eventId}/>
      </FormSection>
    </section>
  );
}
