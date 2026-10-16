import { Link } from 'react-router-dom'
import { XCircle, HeartHandshake } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function PaymentFailedPage() {

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <HeartHandshake className="size-6" />
          </div>
        </div>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-2 flex size-14 items-center justify-center rounded-full bg-destructive/10">
              <XCircle className="size-7 text-destructive" />
            </div>
            <CardTitle>Payment failed</CardTitle>
            <CardDescription>
              Your payment could not be completed. This can happen if the card was declined or the payment was canceled.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-3">
            <p className="text-sm text-muted-foreground">No charge was made. You can try again anytime.</p>
            <Link to="/">
              <Button variant="outline">Back to home</Button>
            </Link>
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
