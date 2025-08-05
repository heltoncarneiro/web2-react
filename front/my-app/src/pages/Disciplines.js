import React, { useState, useEffect, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import toast from 'react-hot-toast';
import Spinner from '../components/Spinner';
import Table from '../components/Table';
import Modal from '../components/Modal';
import DisciplinaForm from '../components/DisciplinaForm';
import { getDisciplinas, createDisciplina, updateDisciplina, deleteDisciplina } from '../services/disciplinaService';

// --- Styled Components ---
const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.text};
`;

const AddButton = styled.button`
  padding: 0.6rem 1.2rem;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border-radius: 4px;
  font-weight: bold;
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  &.edit {
    background-color: #fde047; // yellow-300
  }
  &.delete {
    background-color: #f87171; // red-400
  }
`;

// --- Component ---
const Disciplines = () => {
    const [disciplinas, setDisciplinas] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedDisciplina, setSelectedDisciplina] = useState(null);

    const fetchData = useCallback(async (page = 1) => {
        setLoading(true);
        try {
            const data = await getDisciplinas(page);
            setDisciplinas(data.disciplinas);
            setPagination({ page: data.page, totalPages: data.totalPages });
        } catch (error) {
            toast.error('Falha ao buscar disciplinas.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData(1);
    }, [fetchData]);

    const handlePageChange = (newPage) => {
        fetchData(newPage);
    };

    const handleOpenModal = (disciplina = null) => {
        setSelectedDisciplina(disciplina);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedDisciplina(null);
        setIsModalOpen(false);
    };

    const handleOpenDeleteModal = (disciplina) => {
        setSelectedDisciplina(disciplina);
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setSelectedDisciplina(null);
        setIsDeleteModalOpen(false);
    };

    const handleFormSubmit = async (formData) => {
        try {
            if (selectedDisciplina) {
                await updateDisciplina(selectedDisciplina._id, formData);
                toast.success('Disciplina atualizada com sucesso!');
            } else {
                await createDisciplina(formData);
                toast.success('Disciplina criada com sucesso!');
            }
            fetchData(pagination.page);
            handleCloseModal();
        } catch (error) {
            toast.error(error.response?.data?.msg || 'Falha ao salvar disciplina.');
        }
    };

    const handleDeleteConfirm = async () => {
        if (!selectedDisciplina) return;
        try {
            await deleteDisciplina(selectedDisciplina._id);
            toast.success('Disciplina excluída com sucesso!');
            fetchData(1); // Go back to first page after delete
            handleCloseDeleteModal();
        } catch (error) {
            toast.error('Falha ao excluir disciplina.');
        }
    };

    const columns = useMemo(() => [
        { header: 'Nome', accessorKey: 'nome' },
        { header: 'Carga Horária', accessorKey: 'cargaHoraria' },
        {
            header: 'Ações',
            cell: ({ row }) => (
                <ActionsContainer>
                    <ActionButton className="edit" onClick={() => handleOpenModal(row.original)}>Editar</ActionButton>
                    <ActionButton className="delete" onClick={() => handleOpenDeleteModal(row.original)}>Excluir</ActionButton>
                </ActionsContainer>
            )
        }
    ], []);

    return (
        <div>
            <PageHeader>
                <Title>Disciplinas</Title>
                <AddButton onClick={() => handleOpenModal()}>Adicionar Disciplina</AddButton>
            </PageHeader>

            {loading ? (
                <Spinner />
            ) : (
                <Table
                    columns={columns}
                    data={disciplinas}
                    pagination={pagination}
                    onPageChange={handlePageChange}
                />
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={() => document.querySelector('form').requestSubmit()}
                title={selectedDisciplina ? 'Editar Disciplina' : 'Adicionar Disciplina'}
                confirmText="Salvar"
            >
                <DisciplinaForm
                    onSubmit={handleFormSubmit}
                    defaultValues={selectedDisciplina}
                />
            </Modal>

            <Modal
                isOpen={isDeleteModalOpen}
                onClose={handleCloseDeleteModal}
                onConfirm={handleDeleteConfirm}
                title="Confirmar Exclusão"
                confirmText="Excluir"
                confirmVariant="danger"
            >
                <p>Você tem certeza que deseja excluir a disciplina <strong>{selectedDisciplina?.nome}</strong>?</p>
            </Modal>
        </div>
    );
};

export default Disciplines;
