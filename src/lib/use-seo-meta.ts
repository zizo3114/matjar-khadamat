import * as React from 'react'

type SeoMeta = {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'profile'
}

function setMeta(attr: 'property' | 'name', key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function useSeoMeta(meta: SeoMeta) {
  React.useEffect(() => {
    if (meta.title) {
      document.title = meta.title
      setMeta('property', 'og:title', meta.title)
      setMeta('name', 'twitter:title', meta.title)
    }
    if (meta.description) {
      setMeta('name', 'description', meta.description)
      setMeta('property', 'og:description', meta.description)
      setMeta('name', 'twitter:description', meta.description)
    }
    if (meta.image) {
      setMeta('property', 'og:image', meta.image)
      setMeta('name', 'twitter:image', meta.image)
    }
    if (meta.url) {
      setMeta('property', 'og:url', meta.url)
    }
    if (meta.type) {
      setMeta('property', 'og:type', meta.type)
    }
  }, [meta.title, meta.description, meta.image, meta.url, meta.type])
}
