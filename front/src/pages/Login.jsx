import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../state/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await login(email, password)
      navigate('/alunos')
    } catch (err) {
      setError('Credenciais inválidas')
    }
  }

  return (
    <div className="card">
      <h2>Login do Professor</h2>
      <form onSubmit={onSubmit} className="form">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <div className="error">{error}</div>}
        <button type="submit">Entrar</button>
      </form>
      <div className="hint">
        Não tem conta? <Link to="/register">Criar usuário</Link>
      </div>
    </div>
  )
}