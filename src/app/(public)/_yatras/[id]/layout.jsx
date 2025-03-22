import { makeRequestServer } from "@/lib/fetch";
import { YatraStoreProvider } from "./_store/yatra.store";
import { notFound } from "next/navigation";

export default async function Layout({ children, params }) {
    const { id } = params;
    let data = null;

    try {
        data = await makeRequestServer("/yatra/yatradetail/" + id);
    } catch (err) {
        return notFound();
    }

    return (

        <YatraStoreProvider initialYatraDetails={{
            dates: data.dates,
            name: data.name
        }}>
            {children}
        </YatraStoreProvider>
    )
}