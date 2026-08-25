import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ProtectedRoute } from './components/ProtectedRoute'
import { About } from './pages/About'
import { Dashboard } from './pages/admin/Dashboard'
import { Login } from './pages/admin/Login'
import { Home } from './pages/Home'
import { Menu } from './pages/Menu'
import { WhereWellBe } from './pages/WhereWellBe'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      networkMode: 'always',
    },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="menu" element={<Menu />} />
            <Route path="where-well-be" element={<WhereWellBe />} />
            <Route path="about" element={<About />} />
            <Route path="admin/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="admin" element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
