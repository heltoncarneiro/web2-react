import { useEffect, useState } from 'react'
import api from '../utils/api'

const empty = { nome: '', cargaHoraria: 40 }

export default function Disciplinas() {
  const [list, setList] = useState([])
  const [q, setQ] = useState('')
  const [form, setForm] = useState(empty)
  const [editingId, setEditingId] = useState(null)

  const load = async (query = '') => {
    const { data } = await api.get('/disciplinas', { params: { q: query || undefined } })
    setList(data)
  }

  useEffect(() => {
    load()
  }, [])

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const startEdit = (d) => {
    setEditingId(d._id)
    setForm({ nome: d.nome, cargaHoraria: d.cargaHoraria })
  }
  const cancelEdit = () => {
    setEditingId(null)
    setForm(empty)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const payload = { ...form, cargaHoraria: Number(form.cargaHoraria) }
    if (editingId) await api.put(`/disciplinas/${editingId}`, payload)
    else await api.post('/disciplinas', payload)
    cancelEdit()
    load(q)
  }

  const remove = async (id) => {
    if (!confirm('Excluir esta disciplina?')) return
    await api.delete(`/disciplinas/${id}`)
    load(q)
  }

  return (
    <div>
      <h2>Disciplinas</h2>
      <div className="toolbar">
        <input placeholder="Buscar por nome" value={q} onChange={(e) => setQ(e.target.value)} />
        <button onClick={() => load(q)}>Buscar</button>
      </div>

      <form className="grid form" onSubmit={onSubmit}>
        <input name="nome" placeholder="Nome" value={form.nome} onChange={onChange} required />
        <input name="cargaHoraria" type="number" min="1" placeholder="Carga Horária" value={form.cargaHoraria} onChange={onChange} required />
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
            <th>Carga Horária</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {list.map((d) => (
            <tr key={d._id}>
              <td>{d.nome}</td>
              <td>{d.cargaHoraria}</td>
              <td>
                <button onClick={() => startEdit(d)}>Editar</button>
                <button onClick={() => remove(d._id)} className="danger">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}