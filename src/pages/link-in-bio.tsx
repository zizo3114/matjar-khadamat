import * as React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  HeartHandshake, Camera, Video, Music2, AtSign, MessageCircle, Globe,
  ArrowLeft, Heart, Frown, Download, ExternalLink, Loader2,
} from 'lucide-react'

import {
  supabase, type Profile, type PortfolioItem, type DigitalProduct,
  createTipCheckout, createProductCheckout,
} from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog'
import { Field, FieldLabel, FieldError, FieldDescription } from '@/components/ui/field'
import { useSeoMeta } from '@/lib/use-seo-meta'

const platformIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Instagram: Camera,
  YouTube: Video,
  TikTok: Music2,
  Twitter: AtSign,
  Facebook: MessageCircle,
  Website: Globe,
}

const tipSchema = z.object({
  amount: z.string().refine((v) => {
    const n = parseFloat(v)
    return !isNaN(n) && n > 0
  }, 'Enter an amount greater than 0'),
  email: z.string().email('Enter a valid email'),
})
type TipValues = z.infer<typeof tipSchema>

const buySchema = z.object({
  email: z.string().email('Enter a valid email'),
})
type BuyValues = z.infer<typeof buySchema>

export default function LinkInBioPage() {
  const { username } = useParams<{ username: string }>()
  const [profile, setProfile] = React.useState<Profile | null>(null)
  const [portfolioItems, setPortfolioItems] = React.useState<PortfolioItem[]>([])
  const [products, setProducts] = React.useState<DigitalProduct[]>([])
  const [status, setStatus] = React.useState<'loading' | 'found' | 'notfound'>('loading')
  const [tipOpen, setTipOpen] = React.useState(false)
  const [buyProduct, setBuyProduct] = React.useState<DigitalProduct | null>(null)
  const [tipError, setTipError] = React.useState<string | null>(null)
  const [buyError, setBuyError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!username) { setStatus('notfound'); return }
    ;(async () => {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .maybeSingle()
      if (!profileData) { setStatus('notfound'); return }
      setProfile(profileData as Profile)
      const [portfolioRes, productsRes] = await Promise.all([
        supabase.from('portfolio_items').select('*').eq('profile_id', profileData.id).order('created_at', { ascending: false }),
        supabase.from('digital_products').select('*').eq('profile_id', profileData.id).order('created_at', { ascending: false }),
      ])
      setPortfolioItems(portfolioRes.data as PortfolioItem[] ?? [])
      setProducts(productsRes.data as DigitalProduct[] ?? [])
      setStatus('found')
    })()
  }, [username])

  const tipForm = useForm<TipValues>({
    resolver: zodResolver(tipSchema),
    defaultValues: { amount: '100', email: '' },
  })

  const buyForm = useForm<BuyValues>({
    resolver: zodResolver(buySchema),
    defaultValues: { email: '' },
  })

  useSeoMeta({
    title: profile ? `@${profile.username} — SupportLocal` : 'SupportLocal',
    description: profile?.bio ?? `Support ${profile?.username} on SupportLocal`,
    image: profile?.avatar_url ?? undefined,
    url: typeof window !== 'undefined' ? window.location.href : undefined,
    type: 'profile',
  })

  const onTipSubmit = async (values: TipValues) => {
    setTipError(null)
    const { data, error } = await createTipCheckout(profile!.id, parseFloat(values.amount), values.email)
    if (error || !data) { setTipError(error ?? 'Something went wrong'); return }
    window.location.href = data.checkout_url
  }

  const onBuySubmit = async (values: BuyValues) => {
    setBuyError(null)
    const { data, error } = await createProductCheckout(buyProduct!.id, values.email)
    if (error || !data) { setBuyError(error ?? 'Something went wrong'); return }
    window.location.href = data.checkout_url
  }

  if (status === 'loading') {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background">
        <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (status === 'notfound' || !profile) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-4 bg-background px-4 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-muted">
          <Frown className="size-8 text-muted-foreground" />
        </div>
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-foreground">Page not found</h1>
          <p className="text-sm text-muted-foreground">We couldn't find a creator with the username "{username}".</p>
        </div>
        <Link to="/"><Button variant="outline" size="sm"><ArrowLeft /> Go home</Button></Link>
      </div>
    )
  }

  const socialLinks = profile.social_links ?? {}
  const linkEntries = Object.entries(socialLinks).filter(([_, url]) => url)
  const initials = profile.username.slice(0, 2).toUpperCase()
  const hasPortfolio = portfolioItems.length > 0
  const hasProducts = products.length > 0
  const hasSocials = linkEntries.length > 0
  const tabCount = [hasSocials, hasPortfolio, hasProducts].filter(Boolean).length

  const formatPrice = (price: number) => `${price.toFixed(0)} DZD`

  return (
    <div className="relative flex min-h-svh flex-col items-center bg-gradient-to-b from-muted/40 to-background px-4 py-12">
      {/* Floating brand */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <HeartHandshake className="size-3" />
          </div>
          SupportLocal
        </div>
      </div>

      <div className="flex w-full max-w-md flex-1 flex-col items-center gap-6">
        {/* Avatar + name + bio */}
        <div className="flex flex-col items-center gap-4">
          <Avatar className="size-24 ring-4 ring-background shadow-lg">
            <AvatarImage src={profile.avatar_url ?? undefined} className="object-cover" />
            <AvatarFallback className="text-2xl font-bold">{initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-xl font-bold tracking-tight text-foreground">@{profile.username}</h1>
            {profile.bio && <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{profile.bio}</p>}
          </div>
        </div>

        {/* Support / Tip button */}
        <Button className="w-full max-w-xs gap-2 rounded-full" size="lg" onClick={() => setTipOpen(true)}>
          <Heart className="size-4" />
          Support Me
        </Button>

        {/* Tabs for socials / portfolio / products */}
        {(hasPortfolio || hasProducts || hasSocials) ? (
          <Tabs defaultValue="socials" className="w-full max-w-md">
            <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${tabCount}, 1fr)` }}>
              {hasSocials && <TabsTrigger value="socials">Links</TabsTrigger>}
              {hasPortfolio && <TabsTrigger value="portfolio">Work</TabsTrigger>}
              {hasProducts && <TabsTrigger value="products">Shop</TabsTrigger>}
            </TabsList>

            {/* Social Links */}
            {hasSocials && (
              <TabsContent value="socials" className="mt-4">
                <div className="flex flex-col gap-3">
                  {linkEntries.map(([platform, url]) => {
                    const Icon = platformIcons[platform] ?? Globe
                    return (
                      <a key={platform} href={url} target="_blank" rel="noopener noreferrer"
                        className="group flex w-full items-center gap-3 rounded-xl border bg-card px-4 py-3.5 text-sm font-medium text-card-foreground shadow-sm transition-all hover:shadow-md hover:border-primary/30">
                        <div className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                          <Icon className="size-4" />
                        </div>
                        <span className="flex-1 text-left">{platform}</span>
                        <span className="text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">Visit →</span>
                      </a>
                    )
                  })}
                </div>
              </TabsContent>
            )}

            {/* Portfolio */}
            {hasPortfolio && (
              <TabsContent value="portfolio" className="mt-4">
                <div className="columns-2 gap-3 [column-fill:_balance]">
                  {portfolioItems.map((item) => (
                    <div key={item.id} className="mb-3 break-inside-avoid overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md">
                      {item.image_url && (
                        <div className="overflow-hidden bg-muted">
                          <img src={item.image_url} alt={item.title} className="w-full object-cover" />
                        </div>
                      )}
                      <div className="p-3">
                        <p className="text-sm font-medium text-foreground">{item.title}</p>
                        {item.description && <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{item.description}</p>}
                        {item.project_url && (
                          <a href={item.project_url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                            <ExternalLink className="size-3" /> View project
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            )}

            {/* Products */}
            {hasProducts && (
              <TabsContent value="products" className="mt-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  {products.map((product) => (
                    <div key={product.id} className="overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md">
                      {product.cover_image_url && (
                        <div className="aspect-video overflow-hidden bg-muted">
                          <img src={product.cover_image_url} alt={product.title} className="size-full object-cover" />
                        </div>
                      )}
                      <div className="p-3">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-medium text-foreground">{product.title}</p>
                          <Badge variant={product.price > 0 ? 'default' : 'secondary'} className="shrink-0">
                            {product.price > 0 ? formatPrice(product.price) : 'Free'}
                          </Badge>
                        </div>
                        {product.description && <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{product.description}</p>}
                        {product.price > 0 ? (
                          <Button size="sm" className="mt-3 w-full gap-2" onClick={() => { setBuyProduct(product); buyForm.reset() }}>
                            <Download className="size-3.5" />
                            Buy for {formatPrice(product.price)}
                          </Button>
                        ) : (
                          <Link to={`/download?product_id=${product.id}`}>
                            <Button size="sm" className="mt-3 w-full gap-2" variant="outline">
                              <Download className="size-3.5" /> Download free
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            )}
          </Tabs>
        ) : (
          <p className="text-xs text-muted-foreground">This creator hasn't set up their page yet.</p>
        )}
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-xs text-muted-foreground">
          Want your own page?{' '}
          <Link to="/register" className="font-medium text-primary underline-offset-4 hover:underline">Join SupportLocal</Link>
        </p>
      </div>

      {/* Tip Dialog */}
      <Dialog open={tipOpen} onOpenChange={setTipOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Support @{profile.username}</DialogTitle>
            <DialogDescription>Enter an amount and your email to send a tip via Chargily Pay.</DialogDescription>
          </DialogHeader>
          <form onSubmit={tipForm.handleSubmit(onTipSubmit)}>
            <div className="space-y-4 py-2">
              <Controller
                name="amount"
                control={tipForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="tip-amount">Amount (DZD)</FieldLabel>
                    <Input {...field} id="tip-amount" type="number" min="1" step="1" placeholder="100" aria-invalid={fieldState.invalid} />
                    {fieldState.invalid ? (
                      <FieldError errors={[fieldState.error]} />
                    ) : (
                      <FieldDescription>Minimum 1 DZD. Chargily supports Edahabia and CIB cards.</FieldDescription>
                    )}
                  </Field>
                )}
              />
              <Controller
                name="email"
                control={tipForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="tip-email">Your email</FieldLabel>
                    <Input {...field} id="tip-email" type="email" placeholder="you@example.com" aria-invalid={fieldState.invalid} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              {tipError && (
                <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{tipError}</p>
              )}
            </div>
            <DialogFooter>
              <Button type="submit" disabled={tipForm.formState.isSubmitting} className="w-full">
                {tipForm.formState.isSubmitting ? (
                  <><Loader2 className="animate-spin" /> Redirecting…</>
                ) : (
                  <><Heart className="size-4" /> Continue to payment</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Buy Product Dialog */}
      <Dialog open={!!buyProduct} onOpenChange={(open) => { if (!open) setBuyProduct(null) }}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Buy "{buyProduct?.title}"</DialogTitle>
            <DialogDescription>
              {buyProduct && buyProduct.price > 0 ? `${formatPrice(buyProduct.price)} via Chargily Pay.` : 'Enter your email to get a download link.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={buyForm.handleSubmit(onBuySubmit)}>
            <div className="space-y-4 py-2">
              <Controller
                name="email"
                control={buyForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="buy-email">Your email</FieldLabel>
                    <Input {...field} id="buy-email" type="email" placeholder="you@example.com" aria-invalid={fieldState.invalid} />
                    {fieldState.invalid ? (
                      <FieldError errors={[fieldState.error]} />
                    ) : (
                      <FieldDescription>Your download link will be sent to this email after payment.</FieldDescription>
                    )}
                  </Field>
                )}
              />
              {buyError && (
                <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{buyError}</p>
              )}
            </div>
            <DialogFooter>
              <Button type="submit" disabled={buyForm.formState.isSubmitting} className="w-full">
                {buyForm.formState.isSubmitting ? (
                  <><Loader2 className="animate-spin" /> Redirecting…</>
                ) : (
                  <>Continue to payment</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
