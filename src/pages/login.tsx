import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { HeartHandshake, Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldLabel, FieldError } from '@/components/ui/field'
import { useAuth } from '@/contexts/auth-context'

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

type FormValues = z.infer<typeof schema>

export default function LoginPage() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [serverError, setServerError] = React.useState<string | null>(null)

  const { control, handleSubmit, formState: { isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (values: FormValues) => {
    setServerError(null)
    const { error } = await signIn(values.email, values.password)
    if (error) {
      setServerError('Invalid email or password. Please try again.')
      return
    }
    navigate('/dashboard')
  }

  return (
    <div className="flex min-h-svh items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-sm space-y-6">
        {/* Branding */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <HeartHandshake className="size-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to your SupportLocal account
          </p>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Sign in</CardTitle>
            <CardDescription>Enter your email and password to continue</CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
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
                      autoComplete="email"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="flex items-center justify-between">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                    </div>
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      placeholder="Your password"
                      aria-invalid={fieldState.invalid}
                      autoComplete="current-password"
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
            </CardContent>

            <CardFooter className="flex flex-col gap-3">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Signing in…
                  </>
                ) : (
                  'Sign in'
                )}
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary font-medium underline-offset-4 hover:underline">
                  Create one
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
