import api from './api';

export const getAlunos = async (page = 1, limit = 10, curso = '') => {
    const response = await api.get('/alunos', { params: { page, limit, curso } });
    return response.data;
};

export const getAllAlunosSimple = async () => {
    const response = await api.get('/alunos/all');
    return response.data;
};

export const getAlunoById = async (id) => {
    const response = await api.get(`/alunos/${id}`);
    return response.data;
};

export const createAluno = async (data) => {
    // Convert date to ISO format if it's not already
    if (data.dataNascimento) {
        data.dataNascimento = new Date(data.dataNascimento).toISOString();
    }
    const response = await api.post('/alunos', data);
    return response.data;
};

export const updateAluno = async (id, data) => {
    if (data.dataNascimento) {
        data.dataNascimento = new Date(data.dataNascimento).toISOString();
    }
    const response = await api.put(`/alunos/${id}`, data);
    return response.data;
};

export const deleteAluno = async (id) => {
    const response = await api.delete(`/alunos/${id}`);
    return response.data;
};

// Functions for student-discipline relationship
export const getAvailableDisciplinas = async (alunoId) => {
    const response = await api.get(`/alunos/${alunoId}/disciplinas/disponiveis`);
    return response.data;
};

export const addDisciplinaToAluno = async (alunoId, disciplinaId) => {
    const response = await api.post(`/alunos/${alunoId}/disciplinas/${disciplinaId}`);
    return response.data;
};

export const removeDisciplinaFromAluno = async (alunoId, disciplinaId) => {
    const response = await api.delete(`/alunos/${alunoId}/disciplinas/${disciplinaId}`);
    return response.data;
};
