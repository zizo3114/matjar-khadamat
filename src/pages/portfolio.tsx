import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Loader2, Plus, Trash2, Image as ImageIcon, ExternalLink, HeartHandshake } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldLabel, FieldError, FieldDescription } from '@/components/ui/field'
import { useAuth } from '@/contexts/auth-context'
import { supabase, uploadPortfolioImage, type PortfolioItem } from '@/lib/supabase'

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  project_url: z.string().url('Enter a valid URL').or(z.literal('')),
})

type FormValues = z.infer<typeof schema>

export default function PortfolioPage() {
  const { profile } = useAuth()
  const navigate = useNavigate()
  const [items, setItems] = React.useState<PortfolioItem[]>([])
  const [loading, setLoading] = React.useState(true)
  const [serverError, setServerError] = React.useState<string | null>(null)
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null)
  const [filePreview, setFilePreview] = React.useState<string | null>(null)

  const { control, handleSubmit, reset, formState: { isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { title: '', description: '', project_url: '' },
  })

  const fetchItems = React.useCallback(async () => {
    if (!profile) return
    const { data } = await supabase
      .from('portfolio_items')
      .select('*')
      .eq('profile_id', profile.id)
      .order('created_at', { ascending: false })
    setItems(data as PortfolioItem[] ?? [])
    setLoading(false)
  }, [profile])

  React.useEffect(() => {
    fetchItems()
  }, [fetchItems])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setFilePreview(URL.createObjectURL(file))
    }
  }

  const onSubmit = async (values: FormValues) => {
    setServerError(null)
    if (!profile) return
    let imageUrl: string | null = null

    if (selectedFile) {
      const { url, error } = await uploadPortfolioImage(selectedFile, profile.id)
      if (error) {
        setServerError(error)
        return
      }
      imageUrl = url
    }

    const { error } = await supabase.from('portfolio_items').insert({
      profile_id: profile.id,
      title: values.title,
      description: values.description || null,
      image_url: imageUrl,
      project_url: values.project_url || null,
    })

    if (error) {
      setServerError(error.message)
      return
    }

    reset()
    setSelectedFile(null)
    setFilePreview(null)
    fetchItems()
  }

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('portfolio_items').delete().eq('id', id)
    if (!error) fetchItems()
  }

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-14 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur sm:px-6">
        <Button variant="ghost" size="icon-sm" onClick={() => navigate('/dashboard')}>
          <ArrowLeft />
          <span className="sr-only">Back to dashboard</span>
        </Button>
        <span className="font-semibold text-foreground">Portfolio</span>
        <div className="ml-auto flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <HeartHandshake className="size-4" />
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Portfolio</h1>
            <p className="text-sm text-muted-foreground">Showcase your work with portfolio items that appear on your public page.</p>
          </div>

          {/* Add new item */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base">Add portfolio item</CardTitle>
              <CardDescription>Upload an image and add a link to your project.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                {/* File upload */}
                <Field>
                  <FieldLabel htmlFor="portfolio-image">Image</FieldLabel>
                  <div className="flex items-center gap-4">
                    <div className="flex size-20 items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-border bg-muted/50">
                      {filePreview ? (
                        <img src={filePreview} alt="Preview" className="size-full object-cover" />
                      ) : (
                        <ImageIcon className="size-6 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <Input id="portfolio-image" type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={handleFileChange} />
                      <FieldDescription>Max 5MB. JPEG, PNG, WebP, or GIF.</FieldDescription>
                    </div>
                  </div>
                </Field>

                <Controller
                  name="title"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="title">Title</FieldLabel>
                      <Input {...field} id="title" placeholder="My latest project" aria-invalid={fieldState.invalid} />
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
                      <Textarea {...field} id="description" rows={3} placeholder="Brief description of the work…" />
                    </Field>
                  )}
                />

                <Controller
                  name="project_url"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="project_url">Project URL (optional)</FieldLabel>
                      <Input {...field} id="project_url" placeholder="https://…" aria-invalid={fieldState.invalid} />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                {serverError && (
                  <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{serverError}</p>
                )}
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <><Loader2 className="animate-spin" /> Adding…</> : <><Plus /> Add item</>}
                </Button>
              </CardFooter>
            </form>
          </Card>

          {/* Existing items */}
          <div className="space-y-3">
            <h2 className="text-base font-semibold text-foreground">Your portfolio ({items.length})</h2>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="size-6 animate-spin text-muted-foreground" />
              </div>
            ) : items.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center gap-2 py-10 text-center">
                  <ImageIcon className="size-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">No portfolio items yet. Add your first one above.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    {item.image_url && (
                      <div className="aspect-video overflow-hidden bg-muted">
                        <img src={item.image_url} alt={item.title} className="size-full object-cover" />
                      </div>
                    )}
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">{item.title}</CardTitle>
                      {item.description && <CardDescription className="line-clamp-2">{item.description}</CardDescription>}
                    </CardHeader>
                    <CardFooter className="flex items-center justify-between gap-2 pt-0">
                      {item.project_url && (
                        <a href={item.project_url} target="_blank" rel="noopener noreferrer">
                          <Button variant="ghost" size="xs">
                            <ExternalLink /> Visit
                          </Button>
                        </a>
                      )}
                      <Button variant="ghost" size="xs" className="text-muted-foreground hover:text-destructive" onClick={() => handleDelete(item.id)}>
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
