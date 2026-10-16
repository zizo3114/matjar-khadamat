import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, HeartHandshake, TrendingUp, Wallet, ShoppingBag, Users, Loader2 } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useAuth } from '@/contexts/auth-context'
import { getCreatorStats, getCreatorTransactions, type Transaction, type CreatorStats } from '@/lib/supabase'

export default function AnalyticsPage() {
  const { profile } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = React.useState<CreatorStats | null>(null)
  const [transactions, setTransactions] = React.useState<Transaction[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (!profile) return
    ;(async () => {
      const [s, txns] = await Promise.all([
        getCreatorStats(profile.id),
        getCreatorTransactions(profile.id),
      ])
      setStats(s)
      setTransactions(txns.data ?? [])
      setLoading(false)
    })()
  }, [profile])

  // Build chart data: earnings per day for last 7 days
  const chartData = React.useMemo(() => {
    if (transactions.length === 0) return []
    const days: Record<string, number> = {}
    for (let i = 6; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const key = d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })
      days[key] = 0
    }
    for (const txn of transactions) {
      const d = new Date(txn.created_at)
      const key = d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })
      if (key in days) days[key] += parseFloat(String(txn.amount))
    }
    return Object.entries(days).map(([day, amount]) => ({ day, amount }))
  }, [transactions])

  const formatDate = (iso: string) => new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  const formatDZD = (n: number) => `${n.toFixed(0)} DZD`

  if (loading) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-14 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur sm:px-6">
        <Button variant="ghost" size="icon-sm" onClick={() => navigate('/dashboard')}>
          <ArrowLeft /><span className="sr-only">Back to dashboard</span>
        </Button>
        <span className="font-semibold text-foreground">Analytics</span>
        <div className="ml-auto flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <HeartHandshake className="size-4" />
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Analytics</h1>
            <p className="text-sm text-muted-foreground">Track your earnings, sales, and supporters.</p>
          </div>

          {/* Summary cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription><TrendingUp className="mb-1 size-4" /> Total Earnings</CardDescription>
                <CardTitle className="text-2xl">{formatDZD(stats?.totalEarnings ?? 0)}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription><Wallet className="mb-1 size-4" /> Available Balance</CardDescription>
                <CardTitle className="text-2xl">{formatDZD(stats?.availableBalance ?? 0)}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription><ShoppingBag className="mb-1 size-4" /> Sales</CardDescription>
                <CardTitle className="text-2xl">{stats?.salesCount ?? 0}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription><Users className="mb-1 size-4" /> Supporters</CardDescription>
                <CardTitle className="text-2xl">{stats?.supportersCount ?? 0}</CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Earnings chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Earnings (last 7 days)</CardTitle>
              <CardDescription>Daily earnings from tips and product sales.</CardDescription>
            </CardHeader>
            <CardContent>
              {chartData.length > 0 && chartData.some((d) => d.amount > 0) ? (
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
                      <XAxis dataKey="day" tickLine={false} axisLine={false} className="text-xs text-muted-foreground" />
                      <YAxis tickLine={false} axisLine={false} className="text-xs text-muted-foreground" />
                      <Tooltip
                        contentStyle={{ borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--card)' }}
                        formatter={(v) => [formatDZD(Number(v)), 'Earnings']}
                      />
                      <Bar dataKey="amount" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="flex h-[250px] items-center justify-center">
                  <p className="text-sm text-muted-foreground">No earnings data yet. Your chart will appear here once you receive your first payment.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Transaction history */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent transactions</CardTitle>
              <CardDescription>Your latest paid transactions.</CardDescription>
            </CardHeader>
            <CardContent>
              {transactions.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">No transactions yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Payer</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.slice(0, 15).map((txn) => (
                        <TableRow key={txn.id}>
                          <TableCell className="text-sm text-muted-foreground">{formatDate(txn.created_at)}</TableCell>
                          <TableCell>
                            <Badge variant={txn.type === 'tip' ? 'secondary' : 'default'}>
                              {txn.type === 'tip' ? 'Tip' : 'Sale'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">{txn.payer_email}</TableCell>
                          <TableCell className="text-right font-medium text-foreground">{formatDZD(parseFloat(String(txn.amount)))}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
