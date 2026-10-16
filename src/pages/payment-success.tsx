import * as React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle2, Loader2, Download, HeartHandshake } from 'lucide-react'

import { supabase, getTransactionByTxnId, type Transaction, type DigitalProduct } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function PaymentSuccessPage() {
  const [searchParams] = useSearchParams()
  const txnId = searchParams.get('checkout_id')
  const [txn, setTxn] = React.useState<Transaction | null>(null)
  const [product, setProduct] = React.useState<DigitalProduct | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (!txnId) { setLoading(false); return }
    let attempts = 0
    const interval = setInterval(async () => {
      attempts++
      const { data } = await getTransactionByTxnId(txnId)
      if (data) {
        setTxn(data)
        if (data.status === 'paid') {
          if (data.digital_product_id) {
            const { data: prod } = await supabase
              .from('digital_products')
              .select('*')
              .eq('id', data.digital_product_id)
              .maybeSingle()
            setProduct(prod as DigitalProduct | null)
          }
          setLoading(false)
          clearInterval(interval)
          return
        }
      }
      if (attempts >= 10) {
        setLoading(false)
        clearInterval(interval)
      }
    }, 2000)
    return () => clearInterval(interval)
  }, [txnId])

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Brand */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <HeartHandshake className="size-6" />
          </div>
        </div>

        {loading ? (
          <Card>
            <CardContent className="flex flex-col items-center gap-3 py-10">
              <Loader2 className="size-8 animate-spin text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Confirming your payment…</p>
            </CardContent>
          </Card>
        ) : txn?.status === 'paid' ? (
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-2 flex size-14 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle2 className="size-7 text-primary" />
              </div>
              <CardTitle>Payment successful!</CardTitle>
              <CardDescription>
                {txn.type === 'tip'
                  ? `Thank you for your tip of ${Number(txn.amount).toFixed(0)} DZD!`
                  : 'Your purchase is complete.'}
              </CardDescription>
            </CardHeader>
            {product && product.file_url && (
              <CardContent className="flex flex-col items-center gap-4">
                <div className="w-full rounded-lg border p-4">
                  <p className="text-sm font-medium text-foreground">{product.title}</p>
                  {product.cover_image_url && (
                    <img src={product.cover_image_url} alt={product.title} className="mt-2 w-full rounded-md object-cover" />
                  )}
                </div>
                <a href={product.file_url} download className="w-full">
                  <Button className="w-full gap-2">
                    <Download className="size-4" />
                    Download your file
                  </Button>
                </a>
                <Link to={`/download?product_id=${product.id}&email=${encodeURIComponent(txn.payer_email)}`}>
                  <Button variant="outline" size="sm">Open download page</Button>
                </Link>
              </CardContent>
            )}
          </Card>
        ) : (
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Payment processing</CardTitle>
              <CardDescription>
                Your payment is being confirmed. If you paid successfully, your download link will be available shortly.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Link to="/"><Button variant="outline">Back to home</Button></Link>
            </CardContent>
          </Card>
        )}

        <div className="text-center">
          <Link to="/" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
