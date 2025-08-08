import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../state/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="brand">Escola</div>
      <div className="links">
        {user ? (
          <>
            <Link to="/alunos">Alunos</Link>
            <Link to="/disciplinas">Disciplinas</Link>
            <Link to="/gerenciar">Gerenciar</Link>
            <Link to="/consultar">Consultar Matrícula</Link>
            <span className="user">{user.name}</span>
            <button onClick={handleLogout}>Sair</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Criar Usuário</Link>
          </>
        )}
      </div>
    </nav>
  )
}