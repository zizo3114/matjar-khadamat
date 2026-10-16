import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Loader2, Plus, Trash2, Image as ImageIcon, Download, HeartHandshake } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldLabel, FieldError, FieldDescription } from '@/components/ui/field'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/contexts/auth-context'
import { supabase, uploadProductCover, uploadProductFile, type DigitalProduct } from '@/lib/supabase'

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  price: z.string().refine((v) => {
    const n = parseFloat(v)
    return !isNaN(n) && n >= 0
  }, 'Enter a valid price (0 or more)'),
})

type FormValues = z.infer<typeof schema>

export default function ProductsPage() {
  const { profile } = useAuth()
  const navigate = useNavigate()
  const [products, setProducts] = React.useState<DigitalProduct[]>([])
  const [loading, setLoading] = React.useState(true)
  const [serverError, setServerError] = React.useState<string | null>(null)
  const [coverFile, setCoverFile] = React.useState<File | null>(null)
  const [coverPreview, setCoverPreview] = React.useState<string | null>(null)
  const [productFile, setProductFile] = React.useState<File | null>(null)

  const { control, handleSubmit, reset, formState: { isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { title: '', description: '', price: '0' },
  })

  const fetchProducts = React.useCallback(async () => {
    if (!profile) return
    const { data } = await supabase
      .from('digital_products')
      .select('*')
      .eq('profile_id', profile.id)
      .order('created_at', { ascending: false })
    setProducts(data as DigitalProduct[] ?? [])
    setLoading(false)
  }, [profile])

  React.useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCoverFile(file)
      setCoverPreview(URL.createObjectURL(file))
    }
  }

  const handleProductFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setProductFile(file)
  }

  const onSubmit = async (values: FormValues) => {
    setServerError(null)
    if (!profile) return
    let coverUrl: string | null = null
    let fileUrl: string | null = null

    if (coverFile) {
      const { url, error } = await uploadProductCover(coverFile, profile.id)
      if (error) { setServerError(error); return }
      coverUrl = url
    }

    if (productFile) {
      const { url, error } = await uploadProductFile(productFile, profile.id)
      if (error) { setServerError(error); return }
      fileUrl = url
    }

    const { error } = await supabase.from('digital_products').insert({
      profile_id: profile.id,
      title: values.title,
      description: values.description || null,
      price: parseFloat(values.price),
      cover_image_url: coverUrl,
      file_url: fileUrl,
    })

    if (error) { setServerError(error.message); return }

    reset()
    setCoverFile(null)
    setCoverPreview(null)
    setProductFile(null)
    fetchProducts()
  }

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('digital_products').delete().eq('id', id)
    if (!error) fetchProducts()
  }

  const formatPrice = (price: number) => `₱${price.toFixed(2)}`

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-14 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur sm:px-6">
        <Button variant="ghost" size="icon-sm" onClick={() => navigate('/dashboard')}>
          <ArrowLeft />
          <span className="sr-only">Back to dashboard</span>
        </Button>
        <span className="font-semibold text-foreground">Digital Products</span>
        <div className="ml-auto flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <HeartHandshake className="size-4" />
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Digital Products</h1>
            <p className="text-sm text-muted-foreground">Sell digital downloads like presets, ebooks, templates, and more.</p>
          </div>

          {/* Add new product */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base">Add digital product</CardTitle>
              <CardDescription>Upload a cover image and the downloadable file.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                {/* Cover image */}
                <Field>
                  <FieldLabel htmlFor="cover-image">Cover image</FieldLabel>
                  <div className="flex items-center gap-4">
                    <div className="flex size-20 items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-border bg-muted/50">
                      {coverPreview ? (
                        <img src={coverPreview} alt="Preview" className="size-full object-cover" />
                      ) : (
                        <ImageIcon className="size-6 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <Input id="cover-image" type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={handleCoverChange} />
                      <FieldDescription>Max 5MB. JPEG, PNG, WebP, or GIF.</FieldDescription>
                    </div>
                  </div>
                </Field>

                {/* Product file */}
                <Field>
                  <FieldLabel htmlFor="product-file">Downloadable file</FieldLabel>
                  <Input id="product-file" type="file" onChange={handleProductFileChange} />
                  <FieldDescription>Max 50MB. PDF, ZIP, image, video, or audio.</FieldDescription>
                </Field>

                <Controller
                  name="title"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="title">Product title</FieldLabel>
                      <Input {...field} id="title" placeholder="My Photo Preset Pack" aria-invalid={fieldState.invalid} />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel htmlFor="description">Description</FieldLabel>
                      <Textarea {...field} id="description" rows={3} placeholder="What's included? What format?" />
                    </Field>
                  )}
                />

                <Controller
                  name="price"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="price">Price (PHP)</FieldLabel>
                      <Input {...field} id="price" type="number" step="0.01" min="0" placeholder="0.00" aria-invalid={fieldState.invalid} />
                      {fieldState.invalid ? (
                        <FieldError errors={[fieldState.error]} />
                      ) : (
                        <FieldDescription>Use 0 for a free download.</FieldDescription>
                      )}
                    </Field>
                  )}
                />

                {serverError && (
                  <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{serverError}</p>
                )}
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <><Loader2 className="animate-spin" /> Adding…</> : <><Plus /> Add product</>}
                </Button>
              </CardFooter>
            </form>
          </Card>

          {/* Existing products */}
          <div className="space-y-3">
            <h2 className="text-base font-semibold text-foreground">Your products ({products.length})</h2>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="size-6 animate-spin text-muted-foreground" />
              </div>
            ) : products.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center gap-2 py-10 text-center">
                  <Download className="size-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">No products yet. Add your first one above.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    {product.cover_image_url && (
                      <div className="aspect-video overflow-hidden bg-muted">
                        <img src={product.cover_image_url} alt={product.title} className="size-full object-cover" />
                      </div>
                    )}
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-sm">{product.title}</CardTitle>
                        <Badge variant={product.price > 0 ? 'default' : 'secondary'}>
                          {product.price > 0 ? formatPrice(product.price) : 'Free'}
                        </Badge>
                      </div>
                      {product.description && <CardDescription className="line-clamp-2">{product.description}</CardDescription>}
                    </CardHeader>
                    <CardFooter className="pt-0">
                      <Button variant="ghost" size="xs" className="text-muted-foreground hover:text-destructive" onClick={() => handleDelete(product.id)}>
                        <Trash2 /> Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
