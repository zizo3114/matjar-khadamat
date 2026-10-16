import { supabase, type Profile } from '@/lib/supabase'

export async function generateSitemap(): Promise<string> {
  const { data: profiles } = await supabase
    .from('profiles')
    .select('username, updated_at')
    .eq('role', 'creator')

  const baseUrl = 'https://supportlocal.dz'
  const now = new Date().toISOString()

  const staticUrls = [
    { loc: `${baseUrl}/`, lastmod: now, changefreq: 'weekly', priority: '1.0' },
    { loc: `${baseUrl}/login`, lastmod: now, changefreq: 'monthly', priority: '0.5' },
    { loc: `${baseUrl}/register`, lastmod: now, changefreq: 'monthly', priority: '0.5' },
  ]

  const profileUrls = (profiles ?? []).map((p: Pick<Profile, 'username' | 'updated_at'>) => ({
    loc: `${baseUrl}/u/${p.username}`,
    lastmod: p.updated_at,
    changefreq: 'weekly',
    priority: '0.8',
  }))

  const allUrls = [...staticUrls, ...profileUrls]

  const urlsXml = allUrls
    .map(
      (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`
}
