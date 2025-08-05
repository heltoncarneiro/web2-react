import api from './api';

export const getDisciplinas = async (page = 1, limit = 10) => {
    const response = await api.get('/disciplinas', { params: { page, limit } });
    return response.data;
};

export const createDisciplina = async (data) => {
    const response = await api.post('/disciplinas', data);
    return response.data;
};

export const updateDisciplina = async (id, data) => {
    const response = await api.put(`/disciplinas/${id}`, data);
    return response.data;
};

export const deleteDisciplina = async (id) => {
    const response = await api.delete(`/disciplinas/${id}`);
    return response.data;
};
