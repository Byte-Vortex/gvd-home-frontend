import { EventStoreProvider } from "../../_store/event.store";
import { FormSectionClient } from "./form-section-client";


export async function FormSection({ children }) {
    return (
        <EventStoreProvider>
            <FormSectionClient>
                {children}
            </FormSectionClient>
        </EventStoreProvider>
    )
}
