import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, HeartHandshake, Wallet, Loader2, CheckCircle2, Clock, XCircle } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldLabel, FieldError, FieldDescription } from '@/components/ui/field'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useAuth } from '@/contexts/auth-context'
import { getWithdrawalHistory, requestWithdrawal, type WithdrawalRequest } from '@/lib/supabase'

const MIN_WITHDRAWAL = 2000

const schema = z.object({
  amount: z.string().refine((v) => {
    const n = parseFloat(v)
    return !isNaN(n) && n >= MIN_WITHDRAWAL
  }, `Minimum withdrawal is ${MIN_WITHDRAWAL} DZD`),
  full_name: z.string().min(3, 'Full name must be at least 3 characters'),
  ccp_rip_number: z.string().refine((v) => {
    return /^\d{20}$/.test(v)
  }, 'CCP/RIP number must be exactly 20 digits'),
})

type FormValues = z.infer<typeof schema>

export default function WithdrawPage() {
  const { profile, refreshProfile } = useAuth()
  const navigate = useNavigate()
  const [withdrawals, setWithdrawals] = React.useState<WithdrawalRequest[]>([])
  const [loading, setLoading] = React.useState(true)

  const { control, handleSubmit, reset, formState: { isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { amount: '', full_name: '', ccp_rip_number: '' },
  })

  const fetchWithdrawals = React.useCallback(async () => {
    if (!profile) return
    const { data } = await getWithdrawalHistory(profile.id)
    setWithdrawals(data ?? [])
    setLoading(false)
  }, [profile])

  React.useEffect(() => {
    fetchWithdrawals()
  }, [fetchWithdrawals])

  const onSubmit = async (values: FormValues) => {
    const { success, error } = await requestWithdrawal(
      parseFloat(values.amount),
      values.ccp_rip_number,
      values.full_name,
    )
    if (success) {
      toast.success('Withdrawal requested!', { description: `${parseFloat(values.amount).toFixed(0)} DZD will be sent to your CCP account.` })
      reset()
      refreshProfile()
      fetchWithdrawals()
    } else {
      toast.error('Withdrawal failed', { description: error ?? 'Please try again.' })
    }
  }

  const balance = profile?.balance ?? 0
  const formatDate = (iso: string) => new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  const formatDZD = (n: number) => `${n.toFixed(0)} DZD`

  const statusBadge = (status: WithdrawalRequest['status']) => {
    if (status === 'approved') return <Badge variant="default" className="gap-1"><CheckCircle2 className="size-3" /> Approved</Badge>
    if (status === 'pending') return <Badge variant="secondary" className="gap-1"><Clock className="size-3" /> Pending</Badge>
    return <Badge variant="destructive" className="gap-1"><XCircle className="size-3" /> Rejected</Badge>
  }

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-14 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur sm:px-6">
        <Button variant="ghost" size="icon-sm" onClick={() => navigate('/dashboard')}>
          <ArrowLeft /><span className="sr-only">Back to dashboard</span>
        </Button>
        <span className="font-semibold text-foreground">Withdraw</span>
        <div className="ml-auto flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <HeartHandshake className="size-4" />
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-2xl space-y-8">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Withdraw funds</h1>
            <p className="text-sm text-muted-foreground">Request a payout to your CCP/RIP account. Minimum withdrawal is {MIN_WITHDRAWAL} DZD.</p>
          </div>

          {/* Balance card */}
          <Card className="border-primary/20">
            <CardHeader className="pb-2">
              <CardDescription><Wallet className="mb-1 size-4" /> Available Balance</CardDescription>
              <CardTitle className="text-3xl">{formatDZD(balance)}</CardTitle>
            </CardHeader>
          </Card>

          {/* Withdrawal form */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base">Request withdrawal</CardTitle>
              <CardDescription>Enter your CCP/RIP details to receive your payout.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                <Controller
                  name="amount"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="amount">Amount (DZD)</FieldLabel>
                      <Input {...field} id="amount" type="number" min={MIN_WITHDRAWAL} step="1" placeholder="2000" aria-invalid={fieldState.invalid} />
                      {fieldState.invalid ? (
                        <FieldError errors={[fieldState.error]} />
                      ) : (
                        <FieldDescription>Minimum {MIN_WITHDRAWAL} DZD. Your balance will be deducted immediately.</FieldDescription>
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="full_name"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="full_name">Full name</FieldLabel>
                      <Input {...field} id="full_name" placeholder="Ahmed Benali" aria-invalid={fieldState.invalid} />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                <Controller
                  name="ccp_rip_number"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="ccp_rip_number">CCP/RIP number</FieldLabel>
                      <Input {...field} id="ccp_rip_number" placeholder="00000000000000000000" maxLength={20} aria-invalid={fieldState.invalid} />
                      {fieldState.invalid ? (
                        <FieldError errors={[fieldState.error]} />
                      ) : (
                        <FieldDescription>Must be exactly 20 digits. Your Algérie Poste CCP or RIP account number.</FieldDescription>
                      )}
                    </Field>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isSubmitting || balance < MIN_WITHDRAWAL}>
                  {isSubmitting ? (
                    <><Loader2 className="animate-spin" /> Processing…</>
                  ) : (
                    'Request withdrawal'
                  )}
                </Button>
                {balance < MIN_WITHDRAWAL && (
                  <span className="ml-3 text-sm text-muted-foreground">You need at least {MIN_WITHDRAWAL} DZD to withdraw.</span>
                )}
              </CardFooter>
            </form>
          </Card>

          {/* Withdrawal history */}
          <div className="space-y-3">
            <h2 className="text-base font-semibold text-foreground">Withdrawal history</h2>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="size-6 animate-spin text-muted-foreground" />
              </div>
            ) : withdrawals.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center gap-2 py-10 text-center">
                  <Wallet className="size-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">No withdrawal requests yet.</p>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                          <TableHead>Account</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {withdrawals.map((w) => (
                          <TableRow key={w.id}>
                            <TableCell className="text-sm text-muted-foreground">{formatDate(w.created_at)}</TableCell>
                            <TableCell className="text-right font-medium text-foreground">{formatDZD(parseFloat(String(w.amount)))}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              <span className="font-mono">{w.ccp_rip_number.slice(0, 8)}…</span>
                              <span className="ml-2 text-xs">{w.full_name}</span>
                            </TableCell>
                            <TableCell>{statusBadge(w.status)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
