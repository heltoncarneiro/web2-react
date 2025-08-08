import { useEffect, useMemo, useState } from 'react'
import api from '../utils/api'

export default function Gerenciar() {
  const [alunos, setAlunos] = useState([])
  const [disciplinas, setDisciplinas] = useState([])
  const [alunoId, setAlunoId] = useState('')
  const [selectedDisciplinaId, setSelectedDisciplinaId] = useState('')
  const [alocado, setAlocado] = useState([])

  useEffect(() => {
    api.get('/alunos').then(({ data }) => setAlunos(data))
    api.get('/disciplinas').then(({ data }) => setDisciplinas(data))
  }, [])

  const alunoSelecionado = useMemo(() => alunos.find((a) => a._id === alunoId), [alunos, alunoId])

  const loadAlocado = async () => {
    if (!alunoSelecionado) return setAlocado([])
    const { data } = await api.get('/aluno-disciplinas/por-matricula', {
      params: { matricula: alunoSelecionado.matricula },
    })
    setAlocado(data.disciplinas || [])
  }

  useEffect(() => {
    loadAlocado()
  }, [alunoSelecionado?.matricula])

  const alocar = async () => {
    if (!alunoId || !selectedDisciplinaId) return
    await api.post('/aluno-disciplinas/alocar', { alunoId, disciplinaId: selectedDisciplinaId })
    setSelectedDisciplinaId('')
    loadAlocado()
  }

  const desalocar = async (disciplinaId) => {
    await api.post('/aluno-disciplinas/desalocar', { alunoId, disciplinaId })
    loadAlocado()
  }

  return (
    <div>
      <h2>Gerenciar Disciplinas do Aluno</h2>

      <div className="grid form">
        <select value={alunoId} onChange={(e) => setAlunoId(e.target.value)}>
          <option value="">Selecione um aluno</option>
          {alunos.map((a) => (
            <option key={a._id} value={a._id}>
              {a.nome} ({a.matricula})
            </option>
          ))}
        </select>

        <select value={selectedDisciplinaId} onChange={(e) => setSelectedDisciplinaId(e.target.value)}>
          <option value="">Selecione uma disciplina</option>
          {disciplinas.map((d) => (
            <option key={d._id} value={d._id}>
              {d.nome}
            </option>
          ))}
        </select>
        <button onClick={alocar} disabled={!alunoId || !selectedDisciplinaId}>
          Alocar
        </button>
      </div>

      {alunoSelecionado && (
        <div className="card">
          <h3>Disciplinas alocadas para {alunoSelecionado.nome}</h3>
          {alocado.length === 0 && <div>Nenhuma disciplina alocada</div>}
          <ul className="list">
            {alocado.map((d) => (
              <li key={d._id}>
                <span>
                  {d.nome} ({d.cargaHoraria}h)
                </span>
                <button className="danger" onClick={() => desalocar(d._id)}>
                  Desalocar
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}