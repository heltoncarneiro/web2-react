import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Alunos from './pages/Alunos'
import Disciplinas from './pages/Disciplinas'
import Gerenciar from './pages/Gerenciar'
import Consultar from './pages/Consultar'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <div className="container">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/alunos"
            element={
              <ProtectedRoute>
                <Alunos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/disciplinas"
            element={
              <ProtectedRoute>
                <Disciplinas />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gerenciar"
            element={
              <ProtectedRoute>
                <Gerenciar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/consultar"
            element={
              <ProtectedRoute>
                <Consultar />
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </div>
  )
}