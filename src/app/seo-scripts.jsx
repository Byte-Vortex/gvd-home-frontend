// import { headers } from "next/headers";
// import { SeoScriptsClient } from "./SeoScriptsClient";
// import { getScriptTags } from "./_server/get-script-tags";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import Script from "next/script";
export async function SeoScripts() {

  // const headersList = headers();
  // const pathname = headersList.get("x-pathname");
  // const initialData = await getScriptTags(pathname === "/" ? "global" : pathname);
  return (
    <>
      <GoogleAnalytics gaId='G-CEN4632TKZ' />

      {/* info@hkm GTM */}
      <GoogleTagManager gtmId='GTM-K9KKCC4W' />


      {/* JSM Meta Pixel Tag */}
      <Script
        id='jsm meta pixel'
        dangerouslySetInnerHTML={{
          __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1607080606725750');
          fbq('track', 'PageView');
          `
        }}
      />
      {/* <SeoScriptsClient initialData={initialData} /> */}
    </>
  )
}