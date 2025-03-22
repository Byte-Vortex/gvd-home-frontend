import { makeRequestServer } from "@/lib/fetch"
import { getImageProps } from "next/image"
import Metadata from "./Metadata"
import Head from "next/head"
import { DynamicScripts } from "@/components/dynamic-scripts"
import Script from "next/script"

export const config = { amp: true }

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  }
}

export async function getStaticProps(context) {
  let data = null
  try {
    data = await makeRequestServer("/blogs/webstory/" + context.params.id)
  } catch (err) {}

  if (!data)
    return {
      notFound: true,
    }

  return {
    props: { data },
    revalidate: 600,
  }
}

export default function AmpPage({ data }) {
  const web_story_logo_src = getImageProps({
    src: "/web_story_logo.png",
    fill: true,
  }).props.src
  return (
    <>
      <Head>
        <Metadata metadata={data.meta_data.data} />
      </Head>
      <style jsx>
        {`
          amp-story {
            font-family: "Oswald", sans-serif;
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
            align-content: end;
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
            background: linear-gradient(
              to top,
              rgba(0, 0, 0, 1),
              rgba(0, 0, 0, 0)
            );
            height: 50%;
            z-index: -1;
            pointer-events: none;
          }
          .logo {
            top: 4px;
            left: 8px;
            height: 80px;
            width: 80px;
            position: absolute;
          }
        `}
      </style>

      <amp-story
        standalone=""
        title={data.title ?? "Gupt Vrindavan Dham"}
        publisher={data.publisher ?? "Gupt Vrindavan Dham"}
        publisher-logo-src={data.publisher_logo_src ?? "/web_story_logo.png"}
        poster-portrait-src={data.poster_portrait_src ?? data.posts[0].image}
      >
        {data.posts.map((post, index) => {
          const postImageSrc = getImageProps({
            src: post.image,
            fill: true,
          }).props.src

          return (
            <amp-story-page
              key={index}
              id={`page${index + 1}`}
              auto-advance-after="7s"
            >
              <amp-story-grid-layer template="fill">
                <amp-img
                  src={postImageSrc}
                  alt={post.image_alt}
                  width="720"
                  height="1280"
                  layout="responsive"
                ></amp-img>
              </amp-story-grid-layer>

              <amp-story-grid-layer template="thirds">
                <amp-img
                  width="1"
                  height="1"
                  className="logo"
                  src={web_story_logo_src}
                  alt="Gupt Vrindavan Dham Logo"
                  layout="responsive"
                ></amp-img>
              </amp-story-grid-layer>

              <amp-story-grid-layer template="vertical" className="bottom">
                <div className="bottom-blur" animate-in="fade-in"></div>
                <h1 animate-in="fly-in-left" animate-in-delay="0.2s">
                  {post.title}
                </h1>
                <div
                  animate-in="fly-in-bottom"
                  animate-in-duration="2s"
                  animate-in-delay="0.6s"
                  dangerouslySetInnerHTML={{ __html: post.description }}
                ></div>
              </amp-story-grid-layer>
            </amp-story-page>
          )
        })}
      </amp-story>
      {data.meta_data.data.schema_json && (
        <Script
            id="schema_json"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: data.meta_data.schema_json,
          }}
        />
      )}
    </>
  )
}
