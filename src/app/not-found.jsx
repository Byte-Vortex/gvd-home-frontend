import Link from "next/link";
import { Header } from "./(public)/_components/header/header";
import Navbar from "./(public)/_components/navbar/navbar";
import { DiscoverSection } from "./(public)/_components/discover-section/discover-section";
import { Footer } from "./(public)/_components/footer/footer";

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <Navbar />
      <div className="min-h-screen flex flex-col gap-24 pb-12 pt-20">
        <div className="text-center flex items-center justify-center flex-col my-auto">
          <h1 className="mb-4 text-6xl font-semibold text-red-500">404</h1>
          <p className="mb-4 text-lg">Oops! Looks like you&apos;re lost.</p>
          <div className="animate-bounce">
            <svg
              className="mx-auto h-16 w-16 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              ></path>
            </svg>
          </div>
          <p className="mt-4">
            Let&apos;s get you back{" "}
            <Link href="/" className="text-primary hover:underline">
              home
            </Link>
            .
          </p>
        </div>
        <div className="w-full">
          <DiscoverSection />
        </div>
      </div>
      <Footer />
    </>
  );
}
