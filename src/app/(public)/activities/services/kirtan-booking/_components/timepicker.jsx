import dynamic from "next/dynamic";
import { Suspense } from "react";

const TimePickerReact = dynamic(() => import("react-time-picker"), { ssr: false })

export function TimePicker(props) {

    return (
        <Suspense>
            <TimePickerReact {...props} />
        </Suspense>
    )
}