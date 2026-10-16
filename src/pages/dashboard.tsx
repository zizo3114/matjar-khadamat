import { useNavigate } from 'react-router-dom'
import { HeartHandshake, User, Settings, LogOut, Paintbrush, TrendingUp, ArrowUpRight, Image, Package, BarChart3, Wallet } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/contexts/auth-context'

export default function DashboardPage() {
  const { user, profile, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  const initials = profile?.username
    ? profile.username.slice(0, 2).toUpperCase()
    : user?.email?.slice(0, 2).toUpperCase() ?? '?'

  const isCreator = profile?.role === 'creator'

  const formatDZD = (n: number) => `${n.toFixed(0)} DZD`

  return (
    <div className="flex min-h-svh flex-col bg-background">
      {/* Top nav */}
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-background/80 px-4 backdrop-blur sm:px-6">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <HeartHandshake className="size-4" />
          </div>
          <span className="font-semibold text-foreground">SupportLocal</span>
        </div>
        <div className="flex items-center gap-3">
          <Avatar size="sm">
            <AvatarImage src={profile?.avatar_url ?? undefined} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <Button variant="ghost" size="icon-sm" onClick={handleSignOut} title="Sign out">
            <LogOut />
            <span className="sr-only">Sign out</span>
          </Button>
        </div>
      </header>

      <main className="flex-1 px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Welcome banner */}
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Welcome back, {profile?.username ?? user?.email}!
            </h1>
            <p className="text-sm text-muted-foreground">Here's what's happening with your account.</p>
          </div>

          {/* Profile card */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Avatar size="lg">
                    <AvatarImage src={profile?.avatar_url ?? undefined} />
                    <AvatarFallback className="text-lg">{initials}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <CardTitle>{profile?.username ?? 'Your Profile'}</CardTitle>
                    <CardDescription>{user?.email}</CardDescription>
                    <Badge variant={isCreator ? 'default' : 'secondary'}>
                      {isCreator ? <><Paintbrush className="size-3" /> Creator</> : <><User className="size-3" /> Supporter</>}
                    </Badge>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate('/dashboard/profile')}>
                  <Settings /> Edit profile
                </Button>
              </div>
            </CardHeader>
            {profile?.bio && <CardContent><p className="text-sm text-muted-foreground">{profile.bio}</p></CardContent>}
          </Card>

          {/* Quick stats */}
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription><Wallet className="mb-1 size-4" /> Wallet Balance</CardDescription>
                <CardTitle className="text-2xl">{formatDZD(profile?.balance ?? 0)}</CardTitle>
              </CardHeader>
            </Card>
            <Card className="cursor-pointer transition-all hover:shadow-md hover:border-primary/30" onClick={() => navigate('/dashboard/analytics')}>
              <CardHeader className="pb-2">
                <CardDescription><BarChart3 className="mb-1 size-4" /> Analytics</CardDescription>
                <CardTitle className="text-2xl">View stats →</CardTitle>
              </CardHeader>
            </Card>
            <Card className="cursor-pointer transition-all hover:shadow-md hover:border-primary/30" onClick={() => navigate('/dashboard/withdraw')}>
              <CardHeader className="pb-2">
                <CardDescription><TrendingUp className="mb-1 size-4" /> Withdraw</CardDescription>
                <CardTitle className="text-2xl">Request payout →</CardTitle>
              </CardHeader>
            </Card>
          </div>

          <Separator />

          {/* Creator tools (only for creators) */}
          {isCreator && (
            <div className="space-y-3">
              <h2 className="text-base font-semibold text-foreground">Creator tools</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                <Card className="cursor-pointer transition-all hover:shadow-md hover:border-primary/30" onClick={() => navigate('/dashboard/profile')}>
                  <CardHeader>
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Settings className="size-5" />
                    </div>
                    <CardTitle className="text-base mt-2">Edit Profile</CardTitle>
                    <CardDescription>Update bio and social links</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="cursor-pointer transition-all hover:shadow-md hover:border-primary/30" onClick={() => navigate('/dashboard/portfolio')}>
                  <CardHeader>
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Image className="size-5" />
                    </div>
                    <CardTitle className="text-base mt-2">Portfolio</CardTitle>
                    <CardDescription>Showcase your work</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="cursor-pointer transition-all hover:shadow-md hover:border-primary/30" onClick={() => navigate('/dashboard/products')}>
                  <CardHeader>
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Package className="size-5" />
                    </div>
                    <CardTitle className="text-base mt-2">Products</CardTitle>
                    <CardDescription>Sell digital downloads</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="cursor-pointer transition-all hover:shadow-md hover:border-primary/30" onClick={() => navigate('/dashboard/analytics')}>
                  <CardHeader>
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <BarChart3 className="size-5" />
                    </div>
                    <CardTitle className="text-base mt-2">Analytics</CardTitle>
                    <CardDescription>Earnings and stats</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="cursor-pointer transition-all hover:shadow-md hover:border-primary/30" onClick={() => navigate('/dashboard/withdraw')}>
                  <CardHeader>
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Wallet className="size-5" />
                    </div>
                    <CardTitle className="text-base mt-2">Withdraw</CardTitle>
                    <CardDescription>Request a payout</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          )}

          {/* Next steps */}
          <div className="space-y-3">
            <h2 className="text-base font-semibold text-foreground">Get started</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {isCreator ? (
                <>
                  <Card className="border-dashed">
                    <CardHeader>
                      <CardTitle className="text-base">Set up your creator page</CardTitle>
                      <CardDescription>Add a bio, avatar, and social links so supporters can find you.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button size="sm" variant="outline" onClick={() => navigate('/dashboard/profile')}>Complete profile</Button>
                    </CardContent>
                  </Card>
                  <Card className="border-dashed">
                    <CardHeader>
                      <CardTitle className="text-base">Share your link</CardTitle>
                      <CardDescription>Share your public page with your audience.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {profile?.username && (
                        <Button size="sm" variant="outline" onClick={() => navigate(`/u/${profile.username}`)}>
                          View public page <ArrowUpRight />
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </>
              ) : (
                <>
                  <Card className="border-dashed">
                    <CardHeader>
                      <CardTitle className="text-base">Discover creators</CardTitle>
                      <CardDescription>Find local creators in your area and show your support.</CardDescription>
                    </CardHeader>
                    <CardContent><Button size="sm" variant="outline">Browse creators</Button></CardContent>
                  </Card>
                  <Card className="border-dashed">
                    <CardHeader>
                      <CardTitle className="text-base">Complete your profile</CardTitle>
                      <CardDescription>Add a username and avatar so creators know who you are.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button size="sm" variant="outline" onClick={() => navigate('/dashboard/profile')}>Edit profile</Button>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
