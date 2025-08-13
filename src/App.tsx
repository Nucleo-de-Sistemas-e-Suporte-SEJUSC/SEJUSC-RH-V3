import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";

import LoginPage from "./pages/LoginPage";
import FrequenciaPage from "./pages/FrequenciaPage";
import PrivateLayout from "./shared/PrivateLayout";
import ProtectedRoute from "./shared/ProtectedRoute";
import FuncionariosPage from "./pages/FuncionariosPage";
import DashboardPage from "./pages/DashboardPage";
import HistoricoPage from "./pages/HistoricoPage";
import DesenvolvidoPage from "./pages/DesenvolvidoPage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/desenvolvido" element={<DesenvolvidoPage />} />
          <Route
            element={
              <ProtectedRoute>
                <PrivateLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/frequencia" element={<FrequenciaPage />} />
            <Route path="/funcionarios" element={<FuncionariosPage />} />
            <Route path="/historico" element={<HistoricoPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Toaster richColors position="top-right" />
      </BrowserRouter>
    </AuthProvider>
  );
}
