import { useEffect, useMemo, useState } from 'react'
import api from '../utils/api'

const emptyAluno = {
  nome: '',
  endereco: '',
  dataNascimento: '',
  cpf: '',
  matricula: '',
  telefone: '',
  email: '',
  curso: '',
}

export default function Alunos() {
  const [alunos, setAlunos] = useState([])
  const [q, setQ] = useState('')
  const [form, setForm] = useState(emptyAluno)
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')

  const load = async (query = '') => {
    const { data } = await api.get('/alunos', { params: { q: query || undefined } })
    setAlunos(data)
  }

  useEffect(() => {
    load()
  }, [])

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const startEdit = (a) => {
    setEditingId(a._id)
    setForm({
      nome: a.nome,
      endereco: a.endereco,
      dataNascimento: a.dataNascimento?.slice(0, 10) || '',
      cpf: a.cpf,
      matricula: a.matricula,
      telefone: a.telefone,
      email: a.email,
      curso: a.curso,
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setForm(emptyAluno)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const payload = { ...form, dataNascimento: new Date(form.dataNascimento).toISOString() }
      if (editingId) {
        await api.put(`/alunos/${editingId}`, payload)
      } else {
        await api.post('/alunos', payload)
      }
      cancelEdit()
      load(q)
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao salvar')
    }
  }

  const remove = async (id) => {
    if (!confirm('Excluir este aluno?')) return
    await api.delete(`/alunos/${id}`)
    load(q)
  }

  return (
    <div>
      <h2>Alunos</h2>
      <div className="toolbar">
        <input placeholder="Buscar por nome, matrícula, CPF" value={q} onChange={(e) => setQ(e.target.value)} />
        <button onClick={() => load(q)}>Buscar</button>
      </div>

      <form className="grid form" onSubmit={onSubmit}>
        <input name="nome" placeholder="Nome" value={form.nome} onChange={onChange} required />
        <input name="endereco" placeholder="Endereço" value={form.endereco} onChange={onChange} required />
        <input name="dataNascimento" type="date" placeholder="Data Nascimento" value={form.dataNascimento} onChange={onChange} required />
        <input name="cpf" placeholder="CPF" value={form.cpf} onChange={onChange} required />
        <input name="matricula" placeholder="Matrícula" value={form.matricula} onChange={onChange} required />
        <input name="telefone" placeholder="Telefone" value={form.telefone} onChange={onChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} required />
        <input name="curso" placeholder="Curso" value={form.curso} onChange={onChange} required />
        {error && <div className="error" style={{ gridColumn: '1 / -1' }}>{error}</div>}
        <div style={{ gridColumn: '1 / -1' }}>
          <button type="submit">{editingId ? 'Salvar' : 'Adicionar'}</button>
          {editingId && (
            <button type="button" onClick={cancelEdit} className="secondary">Cancelar</button>
          )}
        </div>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Matrícula</th>
            <th>CPF</th>
            <th>Curso</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((a) => (
            <tr key={a._id}>
              <td>{a.nome}</td>
              <td>{a.matricula}</td>
              <td>{a.cpf}</td>
              <td>{a.curso}</td>
              <td>{a.email}</td>
              <td>
                <button onClick={() => startEdit(a)}>Editar</button>
                <button onClick={() => remove(a._id)} className="danger">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}