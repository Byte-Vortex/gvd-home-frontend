import React from 'react'

function Metadata({ metadata }) {
  if (metadata != null) {
    return (
      <>
        <title>{metadata.title || "Gupt Vrindavan Dham"}</title>
        {metadata.description && <meta name="description" content={metadata.description}></meta>}
        {metadata.keywords && <meta name="keywords" content={metadata.keywords}></meta>}
        {(metadata.openGraph && metadata.openGraph.title) && <meta property="og:title" content={metadata.openGraph.title}></meta>}
        {(metadata.openGraph && metadata.openGraph.description) && <meta property="og:description" content={metadata.openGraph.description}></meta>}
        {(metadata.openGraph && metadata.openGraph.url) && <meta property="og:url" content={metadata.openGraph.url}></meta>}
        {(metadata.openGraph && metadata.openGraph.siteName) && <meta property="og:site_name" content={metadata.openGraph.siteName}></meta>}
        {(metadata.openGraph && metadata.openGraph.locale) && <meta property="og:locale" content={metadata.openGraph.locale}></meta>}
        {(metadata.openGraph && metadata.openGraph.images) && <meta property="og:image" content={metadata.openGraph.images[0].url}></meta>}
        {(metadata.openGraph && metadata.openGraph.images) && <meta property="og:image:width" content={metadata.openGraph.images[0].width}></meta>}
        {(metadata.openGraph && metadata.openGraph.images) && <meta property="og:image:height" content={metadata.openGraph.images[0].height}></meta>}
        {(metadata.openGraph && metadata.openGraph.images) && <meta property="og:image:alt" content={metadata.openGraph.images[0].alt}></meta>}
        {(metadata.openGraph && metadata.openGraph.type) && <meta property="og:type" content={metadata.openGraph.type}></meta>}
        {(metadata.twitter && metadata.twitter.card) && <meta name="twitter:card" content={metadata.twitter.card}></meta>}
        {(metadata.twitter && metadata.twitter.title) && <meta name="twitter:title" content={metadata.twitter.title}></meta>}
        {(metadata.twitter && metadata.twitter.description) && <meta name="twitter:description" content={metadata.twitter.description}></meta>}
        {(metadata.twitter && metadata.twitter.images) && <meta name="twitter:image" content={metadata.twitter.images}></meta>}
      </>
    )
  }
  return null;
}

export default Metadata