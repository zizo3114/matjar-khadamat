import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Profile = {
  id: string
  username: string
  role: 'creator' | 'supporter'
  bio: string | null
  avatar_url: string | null
  social_links: Record<string, string> | null
  balance: number
  created_at: string
  updated_at: string
}

export type PortfolioItem = {
  id: string
  profile_id: string
  title: string
  description: string | null
  image_url: string | null
  project_url: string | null
  created_at: string
  updated_at: string
}

export type DigitalProduct = {
  id: string
  profile_id: string
  title: string
  description: string | null
  price: number
  cover_image_url: string | null
  file_url: string | null
  created_at: string
  updated_at: string
}

export type Transaction = {
  id: string
  payer_email: string
  profile_id: string
  type: 'tip' | 'product_purchase'
  digital_product_id: string | null
  amount: number
  status: 'pending' | 'paid' | 'failed' | 'canceled'
  checkout_id: string | null
  checkout_url: string | null
  created_at: string
  updated_at: string
}

export type CheckoutResponse = {
  checkout_url: string
  checkout_id: string
  transaction_id: string
}

export async function createTipCheckout(
  profileId: string,
  amount: number,
  payerEmail: string,
): Promise<{ data: CheckoutResponse | null; error: string | null }> {
  try {
    const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chargily-checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ type: 'tip', profile_id: profileId, amount, payer_email: payerEmail }),
    })
    if (!res.ok) {
      const err = await res.json()
      return { data: null, error: err.error ?? 'Failed to create checkout' }
    }
    const data = await res.json()
    return { data: data as CheckoutResponse, error: null }
  } catch {
    return { data: null, error: 'Network error' }
  }
}

export async function createProductCheckout(
  productId: string,
  payerEmail: string,
): Promise<{ data: CheckoutResponse | null; error: string | null }> {
  try {
    const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chargily-checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ type: 'product_purchase', digital_product_id: productId, payer_email: payerEmail }),
    })
    if (!res.ok) {
      const err = await res.json()
      return { data: null, error: err.error ?? 'Failed to create checkout' }
    }
    const data = await res.json()
    return { data: data as CheckoutResponse, error: null }
  } catch {
    return { data: null, error: 'Network error' }
  }
}

export async function getTransactionByTxnId(
  txnId: string,
): Promise<{ data: Transaction | null; error: string | null }> {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('id', txnId)
    .maybeSingle()
  if (error) return { data: null, error: error.message }
  return { data: data as Transaction | null, error: null }
}

export async function getPaidTransactionForEmail(
  productId: string,
  email: string,
): Promise<{ data: Transaction | null; error: string | null }> {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('digital_product_id', productId)
    .eq('payer_email', email)
    .eq('status', 'paid')
    .maybeSingle()
  if (error) return { data: null, error: error.message }
  return { data: data as Transaction | null, error: null }
}

export type WithdrawalRequest = {
  id: string
  profile_id: string
  amount: number
  ccp_rip_number: string
  full_name: string
  status: 'pending' | 'approved' | 'rejected'
  notes: string | null
  created_at: string
  updated_at: string
}

export type CreatorStats = {
  totalEarnings: number
  availableBalance: number
  salesCount: number
  supportersCount: number
}

export async function getCreatorStats(profileId: string): Promise<CreatorStats> {
  const [paidTxnsRes, supportersRes, profileRes] = await Promise.all([
    supabase.from('transactions').select('amount, payer_email').eq('profile_id', profileId).eq('status', 'paid'),
    supabase.from('transactions').select('payer_email').eq('profile_id', profileId).eq('status', 'paid'),
    supabase.from('profiles').select('balance').eq('id', profileId).maybeSingle(),
  ])

  const paidTxns = paidTxnsRes.data ?? []
  const totalEarnings = paidTxns.reduce((sum, t) => sum + parseFloat(String(t.amount)), 0)
  const salesCount = paidTxns.length
  const uniqueSupporters = new Set((supportersRes.data ?? []).map((t) => t.payer_email))
  const availableBalance = parseFloat(String(profileRes.data?.balance ?? 0))

  return { totalEarnings, availableBalance, salesCount, supportersCount: uniqueSupporters.size }
}

export async function getCreatorTransactions(
  profileId: string,
  limit = 50,
): Promise<{ data: Transaction[] | null; error: string | null }> {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('profile_id', profileId)
    .eq('status', 'paid')
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) return { data: null, error: error.message }
  return { data: data as Transaction[], error: null }
}

export async function getWithdrawalHistory(
  profileId: string,
): Promise<{ data: WithdrawalRequest[] | null; error: string | null }> {
  const { data, error } = await supabase
    .from('withdrawal_requests')
    .select('*')
    .eq('profile_id', profileId)
    .order('created_at', { ascending: false })
  if (error) return { data: null, error: error.message }
  return { data: data as WithdrawalRequest[], error: null }
}

export async function requestWithdrawal(
  amount: number,
  ccpRipNumber: string,
  fullName: string,
): Promise<{ success: boolean; error: string | null }> {
  const { data, error } = await supabase.rpc('request_withdrawal', {
    p_amount: amount,
    p_ccp_rip_number: ccpRipNumber,
    p_full_name: fullName,
  })
  if (error) return { success: false, error: error.message }
  const result = data as { error?: string; success?: boolean }
  if (result?.error) return { success: false, error: result.error }
  return { success: true, error: null }
}

const MAX_IMAGE_SIZE = 5 * 1024 * 1024
const MAX_FILE_SIZE = 50 * 1024 * 1024
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/zip',
  'application/x-zip-compressed',
  'image/jpeg',
  'image/png',
  'video/mp4',
  'audio/mpeg',
  'text/plain',
]

export type UploadResult = { url: string | null; error: string | null }

export async function uploadPortfolioImage(file: File, profileId: string): Promise<UploadResult> {
  if (file.size > MAX_IMAGE_SIZE) {
    return { url: null, error: 'Image must be 5MB or less' }
  }
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return { url: null, error: 'Only JPEG, PNG, WebP, and GIF images are allowed' }
  }
  const ext = file.name.split('.').pop()
  const path = `${profileId}/${crypto.randomUUID()}.${ext}`
  const { error } = await supabase.storage.from('portfolio-images').upload(path, file)
  if (error) return { url: null, error: error.message }
  const { data } = supabase.storage.from('portfolio-images').getPublicUrl(path)
  return { url: data.publicUrl, error: null }
}

export async function uploadProductCover(file: File, profileId: string): Promise<UploadResult> {
  if (file.size > MAX_IMAGE_SIZE) {
    return { url: null, error: 'Cover image must be 5MB or less' }
  }
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return { url: null, error: 'Only JPEG, PNG, WebP, and GIF images are allowed' }
  }
  const ext = file.name.split('.').pop()
  const path = `${profileId}/${crypto.randomUUID()}.${ext}`
  const { error } = await supabase.storage.from('product-files').upload(path, file)
  if (error) return { url: null, error: error.message }
  const { data } = supabase.storage.from('product-files').getPublicUrl(path)
  return { url: data.publicUrl, error: null }
}

export async function uploadProductFile(file: File, profileId: string): Promise<UploadResult> {
  if (file.size > MAX_FILE_SIZE) {
    return { url: null, error: 'File must be 50MB or less' }
  }
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return { url: null, error: 'File type not allowed. Use PDF, ZIP, image, video, or audio files.' }
  }
  const ext = file.name.split('.').pop()
  const path = `${profileId}/${crypto.randomUUID()}.${ext}`
  const { error } = await supabase.storage.from('product-files').upload(path, file)
  if (error) return { url: null, error: error.message }
  const { data } = supabase.storage.from('product-files').getPublicUrl(path)
  return { url: data.publicUrl, error: null }
}
