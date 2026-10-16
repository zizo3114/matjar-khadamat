import * as React from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase, type Profile } from '@/lib/supabase'

type UpdateProfileInput = {
  bio?: string | null
  avatar_url?: string | null
  social_links?: Record<string, string> | null
}

type AuthContextValue = {
  session: Session | null
  user: User | null
  profile: Profile | null
  loading: boolean
  signUp: (email: string, password: string, name: string, role: 'creator' | 'supporter') => Promise<{ error: string | null }>
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
  updateProfile: (input: UpdateProfileInput) => Promise<{ error: string | null }>
}

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = React.useState<Session | null>(null)
  const [user, setUser] = React.useState<User | null>(null)
  const [profile, setProfile] = React.useState<Profile | null>(null)
  const [loading, setLoading] = React.useState(true)

  const fetchProfile = React.useCallback(async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle()
    setProfile(data as Profile | null)
  }, [])

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        ;(async () => {
          await fetchProfile(session.user.id)
          setLoading(false)
        })()
      } else {
        setLoading(false)
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      ;(async () => {
        if (session?.user) {
          await fetchProfile(session.user.id)
        } else {
          setProfile(null)
        }
      })()
    })

    return () => subscription.unsubscribe()
  }, [fetchProfile])

  const signUp = React.useCallback(async (
    email: string,
    password: string,
    name: string,
    role: 'creator' | 'supporter'
  ): Promise<{ error: string | null }> => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, role },
      },
    })
    if (error) return { error: error.message }
    return { error: null }
  }, [])

  const signIn = React.useCallback(async (
    email: string,
    password: string
  ): Promise<{ error: string | null }> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return { error: error.message }
    return { error: null }
  }, [])

  const signOut = React.useCallback(async () => {
    await supabase.auth.signOut()
  }, [])

  const refreshProfile = React.useCallback(async () => {
    if (user) await fetchProfile(user.id)
  }, [user, fetchProfile])

  const updateProfile = React.useCallback(async (input: UpdateProfileInput): Promise<{ error: string | null }> => {
    if (!user) return { error: 'Not authenticated' }
    const { error } = await supabase
      .from('profiles')
      .update(input)
      .eq('id', user.id)
    if (error) return { error: error.message }
    await fetchProfile(user.id)
    return { error: null }
  }, [user, fetchProfile])

  const value: AuthContextValue = {
    session,
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    refreshProfile,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = React.useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
