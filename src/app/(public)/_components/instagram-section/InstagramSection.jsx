import { makeRequestServer } from "@/lib/fetch";
import InstagramSlider from "./InstagramSlider";

export default async function InstagramSection() {
  const data = await makeRequestServer("/gvd_darshans/");
  return (
    <div className="mx-auto space-y-5">
      <h3 className="text-3xl md:text-4xl font-bold">Gupt Vrindavan Darshan</h3>
      <InstagramSlider imagesData={data.data} />
    </div>
  );
}
