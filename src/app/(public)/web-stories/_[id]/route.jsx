import { makeRequestServer } from '@/lib/fetch';
import { notFound } from 'next/navigation';
import { getImageProps } from 'next/image';

export const dynamic = 'force-dynamic'


/**
 * Handles the incoming request and sends an AMP HTML response.
 *
 * @param {import('next').NextApiRequest} request - The incoming request object.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 */
export async function GET(request, context) {
  // const { searchParams } = new URL(request.url)


  const webStoryId = context.params.id;
  let data = null;
  try {
    data = await makeRequestServer("/blogs/webstory/" + webStoryId);
  } catch (err) { };


  if (!data) return notFound();



  const html = `<!doctype html>
<html ⚡>
  <head>
    <meta charset="utf-8">
    <title>${data.title ?? "Gupt Vrindavan Dham"}</title>
    <link rel="canonical" href="/web-stories/${webStoryId}">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script async custom-element="amp-video"
        src="https://cdn.ampproject.org/v0/amp-video-0.1.js"></script>
    <script async custom-element="amp-story"
        src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
    <link href="https://fonts.googleapis.com/css?family=Oswald:200,300,400" rel="stylesheet">
    <style amp-custom>
      amp-story {
        font-family: 'Oswald',sans-serif;
        color: #fff;
      }
      amp-story-page {
        background-color: #000;
      }
      h1 {
        font-weight: bold;
        font-size: 2rem;
        font-weight: normal;
        line-height: 1.174;
      }
      p {
        font-weight: normal;
        font-size: 1.3em;
        line-height: 1.5em;
        color: #fff;
      }
      q {
        font-weight: 300;
        font-size: 1.1em;
      }
      amp-story-grid-layer.bottom {
      position: relative;
        align-content:end;
      }
      amp-story-grid-layer.noedge {
        padding: 0px;
      }
      amp-story-grid-layer.center-text {
        align-content: center;
      }
      .bottom-blur {
        bottom: 0;
        position: absolute;
        background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
        height: 50%;
        z-index: -1;
        pointer-events: none;
      }
      .logo {
      top:16px;
      left:8px;
      height: 63px;
      width: 112px;
      position:absolute;
      }
    </style>
  </head>
  <body>
    <!-- Cover page -->
    <amp-story standalone
        title="${data.title ?? "Gupt Vrindavan Dham"}"
        publisher="${data.publisher ?? "Gupt Vrindavan Dham"}"
        publisher-logo-src="${data.publisher_logo_src ?? "/hkm_logo.png"}"
        poster-portrait-src="${data.poster_portrait_src ?? data.posts[0].image}">

     ${
    //Generating amp_pages dynamically
    (function () {

      let amp_pages = '';

      let id = 0;
      for (let post of data.posts) {

        const postImageSrc = getImageProps({
          src: post.image,
          fill: true,
        }).props.src;


        id++;
        amp_pages += `
        
        <amp-story-page id="page${id}">
        <amp-story-grid-layer template="fill">
          <amp-img 
          src="${postImageSrc}"
alt="${post.image_alt}"
              width="720" height="1280"
              layout="responsive">
          </amp-img>
        </amp-story-grid-layer>


         <amp-story-grid-layer template="upper-third">
          <amp-img 
          width="1920" height="1080"
          class="logo"
          src="/hkm_logo.png"
alt="Gupt Vrindavan Dham Logo"
              layout="responsive">
          </amp-img>
        </amp-story-grid-layer>

      
        <amp-story-grid-layer template="vertical" class="bottom">
          <div class="bottom-blur" animate-in="fade-in"></div>
          <h1 animate-in="fly-in-left" animate-in-delay="0.2s">${post.title}</h1>
          <div animate-in="fly-in-bottom" animate-in-duration="2s" animate-in-delay="0.6s">
          ${post.description}
          </div>
        </amp-story-grid-layer>
      </amp-story-page>`
      }
      return amp_pages;
    })()
    }
    </amp-story>
  </body>
</html>
`;

  // console.log(html);
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8'
    }
  });

  // return Response.json({ product })


}