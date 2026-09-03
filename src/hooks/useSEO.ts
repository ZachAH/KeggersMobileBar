import { useEffect } from 'react'

const SITE_NAME = 'Keggers Mobile Bar'
const SITE_URL = 'https://keggersmobilebar.com'

interface SEOOptions {
  title: string
  description: string
  noindex?: boolean
}

function setMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let tag = document.querySelector(`meta[${attr}="${key}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, key)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

export function useSEO({ title, description, noindex = false }: SEOOptions) {
  useEffect(() => {
    const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`
    const canonicalUrl = `${SITE_URL}${window.location.pathname}`

    document.title = fullTitle

    setMetaTag('name', 'description', description)
    setMetaTag('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')
    setMetaTag('property', 'og:title', fullTitle)
    setMetaTag('property', 'og:description', description)
    setMetaTag('property', 'og:url', canonicalUrl)
    setMetaTag('name', 'twitter:title', fullTitle)
    setMetaTag('name', 'twitter:description', description)

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', canonicalUrl)
  }, [title, description, noindex])
}
