'use client' // Error components must be Client Components
import CrashImage from "@/assets/images/misc/app-crash.svg"
import { Image } from "@/components/image"
import { Button } from "@/components/ui/button"
import "./globals.css";
import { ThemeProvider } from "next-themes";

export default function GlobalError({ error, reset }) {

    return (
        <html>
            <body className="bg-background text-on-background font-Normal selection:text-background selection:bg-on-background/80 text-base">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="flex flex-col gap-6 min-h-screen items-center justify-center max-w-lg mx-auto text-center p-4">
                        <div className="relative">
                            <Image
                                className="w-full h-auto"
                                src={CrashImage}
                            />
                        </div>
                        <h1>Fatal crash!</h1>
                        <p>Looks like website has crashed unexpectedly We&apos;ve
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
                </ThemeProvider>
            </body>
        </html>
    )
}