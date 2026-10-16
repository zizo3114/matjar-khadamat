import * as React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Download, Loader2, Lock, HeartHandshake, AlertCircle } from 'lucide-react'

import { supabase, getPaidTransactionForEmail, type DigitalProduct } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldLabel, FieldDescription } from '@/components/ui/field'

export default function DownloadPage() {
  const [searchParams] = useSearchParams()
  const productId = searchParams.get('product_id')
  const initialEmail = searchParams.get('email') ?? ''
  const [email, setEmail] = React.useState(initialEmail)
  const [product, setProduct] = React.useState<DigitalProduct | null>(null)
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'authorized' | 'denied' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (productId) {
      ;(async () => {
        const { data } = await supabase
          .from('digital_products')
          .select('*')
          .eq('id', productId)
          .maybeSingle()
        if (data) setProduct(data as DigitalProduct)
      })()
    }
  }, [productId])

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!productId || !email) return
    setStatus('loading')
    setErrorMsg(null)

    // First check if product is free
    if (product && product.price === 0) {
      setStatus('authorized')
      return
    }

    // Check for a paid transaction
    const { data: txn, error } = await getPaidTransactionForEmail(productId, email)
    if (error) {
      setStatus('error')
      setErrorMsg(error)
      return
    }
    if (txn) {
      setStatus('authorized')
    } else {
      setStatus('denied')
    }
  }

  if (!productId) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center bg-background px-4">
        <Card className="max-w-md">
          <CardHeader className="text-center">
            <AlertCircle className="mx-auto size-8 text-muted-foreground" />
            <CardTitle>No product specified</CardTitle>
            <CardDescription>This download link is incomplete. Please use the link from your email or payment confirmation page.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Link to="/"><Button variant="outline">Back to home</Button></Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <HeartHandshake className="size-6" />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Download your product</CardTitle>
            <CardDescription>
              {product ? product.title : 'Verify your purchase to download the file.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {product?.cover_image_url && (
              <img src={product.cover_image_url} alt={product.title} className="w-full rounded-lg object-cover" />
            )}

            {status === 'authorized' && product?.file_url ? (
              <div className="flex flex-col items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                  <Download className="size-6 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">Your purchase is verified. Click below to download.</p>
                <a href={product.file_url} download className="w-full">
                  <Button className="w-full gap-2">
                    <Download className="size-4" />
                    Download file
                  </Button>
                </a>
              </div>
            ) : status === 'denied' ? (
              <div className="flex flex-col items-center gap-3 py-4">
                <Lock className="size-8 text-muted-foreground" />
                <p className="text-center text-sm text-muted-foreground">
                  No paid purchase found for this email. If you recently paid, please wait a moment and try again — payment confirmation can take a few seconds.
                </p>
                <Button variant="outline" size="sm" onClick={() => setStatus('idle')}>Try again</Button>
              </div>
            ) : (
              <form onSubmit={handleVerify} className="space-y-4">
                <Field>
                  <FieldLabel htmlFor="dl-email">Email used for purchase</FieldLabel>
                  <Input
                    id="dl-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                  <FieldDescription>We'll verify your payment before allowing download.</FieldDescription>
                </Field>
                {errorMsg && (
                  <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{errorMsg}</p>
                )}
                <Button type="submit" className="w-full" disabled={status === 'loading'}>
                  {status === 'loading' ? (
                    <><Loader2 className="animate-spin" /> Verifying…</>
                  ) : (
                    <>Verify & download</>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <div className="text-center">
          <Link to="/" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
