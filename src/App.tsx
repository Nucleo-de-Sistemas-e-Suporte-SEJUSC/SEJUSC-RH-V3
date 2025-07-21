import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Toaster } from "sonner";
import { AuthProvider } from '@/context/AuthContext'

import LoginPage from "./pages/LoginPage";
import FrequenciaPage from "./pages/FrequenciaPage";
import PrivateLayout from "./shared/PrivateLayout";
import ProtectedRoute from "./shared/ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route element={
            <ProtectedRoute>
              <PrivateLayout />
            </ProtectedRoute>
          }>
            <Route path='/frequencia' element={<FrequenciaPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Toaster richColors position="top-right" />
      </BrowserRouter>
    </AuthProvider>
  )
}
