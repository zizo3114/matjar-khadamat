import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Loader2, Check, Plus, X, HeartHandshake } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldLabel, FieldError, FieldDescription } from '@/components/ui/field'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/contexts/auth-context'

const SOCIAL_PLATFORMS = [
  'Instagram',
  'YouTube',
  'TikTok',
  'Twitter',
  'Facebook',
  'Website',
] as const

const schema = z.object({
  bio: z.string().max(500, 'Bio must be 500 characters or less').optional(),
  socialLinks: z.array(
    z.object({
      platform: z.string().min(1, 'Select a platform'),
      url: z.string().url('Enter a valid URL').or(z.literal('')),
    })
  ),
})

type FormValues = z.infer<typeof schema>

type SocialLink = { platform: string; url: string }

function linksToRecord(links: SocialLink[]): Record<string, string> {
  const record: Record<string, string> = {}
  for (const link of links) {
    if (link.platform && link.url) {
      record[link.platform] = link.url
    }
  }
  return record
}

function recordToLinks(record: Record<string, string> | null): SocialLink[] {
  if (!record) return [{ platform: '', url: '' }]
  const entries = Object.entries(record)
  if (entries.length === 0) return [{ platform: '', url: '' }]
  return entries.map(([platform, url]) => ({ platform, url }))
}

export default function EditProfilePage() {
  const { profile, updateProfile } = useAuth()
  const navigate = useNavigate()
  const [serverError, setServerError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState(false)

  const { control, handleSubmit, formState: { isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      bio: profile?.bio ?? '',
      socialLinks: recordToLinks(profile?.social_links ?? null),
    },
  })

  const onSubmit = async (values: FormValues) => {
    setServerError(null)
    setSuccess(false)
    const socialLinksRecord = linksToRecord(values.socialLinks)
    const { error } = await updateProfile({
      bio: values.bio || null,
      social_links: socialLinksRecord,
    })
    if (error) {
      setServerError(error)
      return
    }
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <div className="flex min-h-svh flex-col bg-background">
      {/* Top nav */}
      <header className="sticky top-0 z-10 flex h-14 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur sm:px-6">
        <Button variant="ghost" size="icon-sm" onClick={() => navigate('/dashboard')}>
          <ArrowLeft />
          <span className="sr-only">Back to dashboard</span>
        </Button>
        <span className="font-semibold text-foreground">Edit Profile</span>
        <div className="ml-auto flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <HeartHandshake className="size-4" />
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-2xl space-y-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Edit your profile</h1>
            <p className="text-sm text-muted-foreground">
              Update your bio and social links. This is what visitors see on your public page.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Profile details</CardTitle>
                <CardDescription>Your public profile information</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Username (read-only) */}
                <Field>
                  <FieldLabel htmlFor="username">Username</FieldLabel>
                  <Input
                    id="username"
                    value={profile?.username ?? ''}
                    readOnly
                    disabled
                    className="bg-muted/50"
                  />
                  <FieldDescription>Your username is set when you create your account.</FieldDescription>
                </Field>

                {/* Bio */}
                <Controller
                  name="bio"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="bio">Bio</FieldLabel>
                      <Textarea
                        {...field}
                        id="bio"
                        rows={4}
                        placeholder="Tell visitors about yourself and your work…"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid ? (
                        <FieldError errors={[fieldState.error]} />
                      ) : (
                        <FieldDescription>A short description shown on your public page (max 500 characters).</FieldDescription>
                      )}
                    </Field>
                  )}
                />

                <Separator />

                {/* Social Links */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">Social links</p>
                      <p className="text-xs text-muted-foreground">Add links to your social profiles.</p>
                    </div>
                  </div>

                  <Controller
                    name="socialLinks"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-3">
                        {field.value.map((link: SocialLink, index: number) => (
                          <div key={index} className="flex flex-col gap-2 rounded-lg border p-3 sm:flex-row sm:items-start">
                            <div className="flex-1">
                              <label className="mb-1 block text-xs font-medium text-muted-foreground">Platform</label>
                              <select
                                value={link.platform}
                                onChange={(e) => {
                                  const updated = [...field.value]
                                  updated[index] = { ...updated[index], platform: e.target.value }
                                  field.onChange(updated)
                                }}
                                className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 dark:bg-input/30"
                              >
                                <option value="">Select…</option>
                                {SOCIAL_PLATFORMS.map((p) => (
                                  <option key={p} value={p}>{p}</option>
                                ))}
                              </select>
                            </div>
                            <div className="flex flex-1 items-start gap-2">
                              <div className="flex-1">
                                <label className="mb-1 block text-xs font-medium text-muted-foreground">URL</label>
                                <Input
                                  value={link.url}
                                  onChange={(e) => {
                                    const updated = [...field.value]
                                    updated[index] = { ...updated[index], url: e.target.value }
                                    field.onChange(updated)
                                  }}
                                  placeholder="https://…"
                                />
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon-sm"
                                className="mt-6 shrink-0 text-muted-foreground hover:text-destructive"
                                onClick={() => {
                                  const updated = field.value.filter((_: SocialLink, i: number) => i !== index)
                                  field.onChange(updated.length > 0 ? updated : [{ platform: '', url: '' }])
                                }}
                              >
                                <X />
                                <span className="sr-only">Remove link</span>
                              </Button>
                            </div>
                          </div>
                        ))}

                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => field.onChange([...field.value, { platform: '', url: '' }])}
                        >
                          <Plus />
                          Add another link
                        </Button>
                      </div>
                    )}
                  />
                </div>

                {serverError && (
                  <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                    {serverError}
                  </p>
                )}

                {success && (
                  <p className="flex items-center gap-2 rounded-md bg-primary/10 px-3 py-2 text-sm text-primary">
                    <Check className="size-4" />
                    Profile updated successfully!
                  </p>
                )}
              </CardContent>

              <CardFooter className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => navigate('/dashboard')}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Saving…
                    </>
                  ) : (
                    'Save changes'
                  )}
                </Button>
              </CardFooter>
            </Card>

            {profile?.username && (
              <div className="text-center">
                <Link
                  to={`/u/${profile.username}`}
                  className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                >
                  View your public page →
                </Link>
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  )
}
