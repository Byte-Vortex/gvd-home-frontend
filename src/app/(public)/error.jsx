'use client' // Error components must be Client Components
import CrashImage from "@/assets/images/misc/app-crash.svg"
import { Image } from "@/components/image"
import { Button } from "@/components/ui/button"

export default function Error({ error, reset }) {

    return (
        <div className="flex flex-col gap-6 min-h-screen items-center justify-center max-w-lg mx-auto text-center p-4">
            <div className="relative">
                <Image
                    className="w-full h-auto"
                    src={CrashImage}
                />
            </div>
            <h1>Page crashed</h1>
            <p>Looks like something went wrong while loading this page! We&apos;ve
                tracked the error and will get right on it
            </p>
            <Button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Reload Page
            </Button>
        </div>
    )
}