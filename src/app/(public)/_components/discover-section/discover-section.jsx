import { makeRequestServer } from "@/lib/fetch";
import { DiscoverClient } from "./discover-client";

export async function DiscoverSection() {
    const data = await makeRequestServer("/discoverpage");
    return <DiscoverClient data={data} />
}