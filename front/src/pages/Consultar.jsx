import { useState } from 'react'
import api from '../utils/api'

export default function Consultar() {
  const [matricula, setMatricula] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setResult(null)
    try {
      const { data } = await api.get('/aluno-disciplinas/por-matricula', { params: { matricula } })
      setResult(data)
    } catch (err) {
      setError(err.response?.data?.message || 'Erro na consulta')
    }
  }

  return (
    <div>
      <h2>Consultar Disciplinas por Matrícula</h2>
      <form className="form" onSubmit={onSubmit}>
        <input placeholder="Matrícula" value={matricula} onChange={(e) => setMatricula(e.target.value)} required />
        <button type="submit">Consultar</button>
      </form>
      {error && <div className="error">{error}</div>}
      {result && (
        <div className="card">
          <h3>
            {result.aluno.nome} - {result.aluno.matricula}
          </h3>
          {result.disciplinas.length === 0 ? (
            <div>Nenhuma disciplina alocada</div>
          ) : (
            <ul className="list">
              {result.disciplinas.map((d) => (
                <li key={d._id}>
                  {d.nome} ({d.cargaHoraria}h)
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}