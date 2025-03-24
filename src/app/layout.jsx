import "swiper/css";
import "./globals.css";
import 'react-photo-view/dist/react-photo-view.css';
import { ThemeProvider } from "next-themes";
import { Cinzel, Urbanist, Open_Sans } from "next/font/google";
import ReactQueryProvider from "./_providers/react-query.provider";
import { getMetaData } from "./_server/get-meta-data";
import { SeoScripts } from "./seo-scripts";
import { createHmac } from 'node:crypto';
import dynamic from "next/dynamic";

const Toaster = dynamic(() => import('sonner').then((_) => _.Toaster), { ssr: false })
const TopLoader = dynamic(() => import('@/components/misc/top-loader').then((_) => _.TopLoader), { ssr: false })
const ScriptInjector = dynamic(() => import('@/components/ScriptInjector').then((mod) => mod.default), {
  ssr: false,
});

import { PhotoProvider } from "./_providers/photo-provider";


function getToken(id) {
  const hmac = createHmac('sha256', 'my_secret');
  hmac.update(JSON.stringify({ id: id }));
  const token = hmac.digest('hex');
  return token;
}

const headingFont = Urbanist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
})

const heroFont = Cinzel({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-hero',
})

const normalFont = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-normal',
})


export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#7256c3' },
    { media: '(prefers-color-scheme: dark)', color: '#141414' },
  ],
}

export const revalidate = 600;


export async function generateMetadata(props, state) {

  const res = Object.getOwnPropertySymbols(state || {})
    .map(p => state[p])
    .find(state => state?.hasOwnProperty?.("urlPathname"))
  const pathname = res?.urlPathname.replace(/\?.+/, "")

  const metadata = await getMetaData(pathname === "/" ? "global" : pathname);


  const title = metadata.title || "Gupt Vrindavan Dham"

  const token = getToken(title);
  return {
    alternates: {
      canonical: './',
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL),
    ...metadata,
    openGraph: {
      images: `/next-api/og?id=${encodeURIComponent(title)}&token=${token}`,
      ...metadata?.openGraph,
    },
  }
}

export default function RootLayout({ children }) {
  return (
    <ReactQueryProvider>
      <html lang="en" className={`${headingFont.variable} ${heroFont.variable} ${normalFont.variable}`} suppressHydrationWarning>
        <head>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <SeoScripts />
          <ScriptInjector slug="global" />
        </head>
        <body className="bg-background text-on-background font-Normal selection:text-background selection:bg-on-background/80 text-base">
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem="false"
            disableTransitionOnChange
          >
            <PhotoProvider>
              {children}
            </PhotoProvider>
            <Toaster richColors />
            <TopLoader showSpinner={false} />
          </ThemeProvider>
        </body>
      </html>
    </ReactQueryProvider>
  );
}
