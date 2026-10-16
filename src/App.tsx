import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/contexts/auth-context'
import { ProtectedRoute, GuestRoute } from '@/components/route-guards'
import LoginPage from '@/pages/login'
import RegisterPage from '@/pages/register'
import DashboardPage from '@/pages/dashboard'
import EditProfilePage from '@/pages/edit-profile'
import PortfolioPage from '@/pages/portfolio'
import ProductsPage from '@/pages/products'
import LinkInBioPage from '@/pages/link-in-bio'
import PaymentSuccessPage from '@/pages/payment-success'
import PaymentFailedPage from '@/pages/payment-failed'
import DownloadPage from '@/pages/download'
import AnalyticsPage from '@/pages/analytics'
import WithdrawPage from '@/pages/withdraw'
import { Toaster } from '@/components/ui/sonner'

export default function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Root redirect */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Guest-only routes */}
            <Route element={<GuestRoute />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/dashboard/profile" element={<EditProfilePage />} />
              <Route path="/dashboard/portfolio" element={<PortfolioPage />} />
              <Route path="/dashboard/products" element={<ProductsPage />} />
              <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
              <Route path="/dashboard/withdraw" element={<WithdrawPage />} />
            </Route>

            {/* Public routes */}
            <Route path="/u/:username" element={<LinkInBioPage />} />
            <Route path="/payment/success" element={<PaymentSuccessPage />} />
            <Route path="/payment/failed" element={<PaymentFailedPage />} />
            <Route path="/download" element={<DownloadPage />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      <Toaster />
    </ThemeProvider>
  )
}
