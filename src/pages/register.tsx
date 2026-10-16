import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { HeartHandshake, Loader2, User, Paintbrush } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldLabel, FieldError } from '@/components/ui/field'
import { useAuth } from '@/contexts/auth-context'
import { cn } from '@/lib/utils'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  role: z.enum(['creator', 'supporter']),
}).refine((d) => d.password === d.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

type FormValues = z.infer<typeof schema>

export default function RegisterPage() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [serverError, setServerError] = React.useState<string | null>(null)

  const { control, handleSubmit, watch, formState: { isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '', role: 'supporter' },
  })

  const selectedRole = watch('role')

  const onSubmit = async (values: FormValues) => {
    setServerError(null)
    const { error } = await signUp(values.email, values.password, values.name, values.role)
    if (error) {
      setServerError(error)
      return
    }
    navigate('/dashboard')
  }

  return (
    <div className="flex min-h-svh items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Branding */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <HeartHandshake className="size-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Join SupportLocal
          </h1>
          <p className="text-sm text-muted-foreground">
            Support local creators or share your work with the community
          </p>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Create your account</CardTitle>
            <CardDescription>Fill in the details below to get started</CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              {/* Role selector */}
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => field.onChange('supporter')}
                      className={cn(
                        'flex flex-col items-center gap-2 rounded-lg border-2 p-4 text-sm transition-all',
                        field.value === 'supporter'
                          ? 'border-primary bg-primary/5 text-foreground'
                          : 'border-border text-muted-foreground hover:border-muted-foreground'
                      )}
                    >
                      <User className="size-5" />
                      <span className="font-medium">Supporter</span>
                      <span className="text-xs text-center leading-snug">Back creators you love</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => field.onChange('creator')}
                      className={cn(
                        'flex flex-col items-center gap-2 rounded-lg border-2 p-4 text-sm transition-all',
                        field.value === 'creator'
                          ? 'border-primary bg-primary/5 text-foreground'
                          : 'border-border text-muted-foreground hover:border-muted-foreground'
                      )}
                    >
                      <Paintbrush className="size-5" />
                      <span className="font-medium">Creator</span>
                      <span className="text-xs text-center leading-snug">Share your work &amp; earn</span>
                    </button>
                  </div>
                )}
              />

              {/* Name */}
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="name">Full name</FieldLabel>
                    <Input
                      {...field}
                      id="name"
                      placeholder="Jane Dela Cruz"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* Email */}
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email address</FieldLabel>
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      placeholder="jane@example.com"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* Password */}
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      placeholder="At least 8 characters"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* Confirm Password */}
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="confirmPassword">Confirm password</FieldLabel>
                    <Input
                      {...field}
                      id="confirmPassword"
                      type="password"
                      placeholder="Repeat your password"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {serverError && (
                <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {serverError}
                </p>
              )}

              <p className="text-xs text-muted-foreground">
                {selectedRole === 'creator'
                  ? 'As a creator, you can set up your page, post updates, and receive support from fans.'
                  : 'As a supporter, you can discover and back local creators you love.'}
              </p>
            </CardContent>

            <CardFooter className="flex flex-col gap-3">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Creating account…
                  </>
                ) : (
                  'Create account'
                )}
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                Already have an account?{' '}
                <Link to="/login" className="text-primary font-medium underline-offset-4 hover:underline">
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
