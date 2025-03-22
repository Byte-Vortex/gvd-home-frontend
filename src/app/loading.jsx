import { FaSpinner } from "react-icons/fa6";

export default function RootLoading() {
    return (
        <div className="fixed z-50 bg-black flex items-center justify-center min-h-screen w-screen">
            <FaSpinner className="animate-spin text-white text-2xl" />
        </div>
    )
}