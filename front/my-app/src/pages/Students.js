import React, { useState, useEffect, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import toast from 'react-hot-toast';
import Spinner from '../components/Spinner';
import Table from '../components/Table';
import Modal from '../components/Modal';
import AlunoForm from '../components/AlunoForm';
import { getAlunos, createAluno, updateAluno, deleteAluno } from '../services/alunoService';
import { useDebounce } from '../hooks/useDebounce'; // A custom hook for debouncing

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

const FilterInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  &.edit {
    background-color: #fde047;
  }
  &.delete {
    background-color: #f87171;
  }
`;

// --- Component ---
const Students = () => {
    const [alunos, setAlunos] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');
    const debouncedFilter = useDebounce(filter, 500);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedAluno, setSelectedAluno] = useState(null);

    const fetchData = useCallback(async (page = 1, curso = '') => {
        setLoading(true);
        try {
            const data = await getAlunos(page, 10, curso);
            setAlunos(data.alunos);
            setPagination({ page: data.page, totalPages: data.totalPages });
        } catch (error) {
            toast.error('Falha ao buscar alunos.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData(1, debouncedFilter);
    }, [fetchData, debouncedFilter]);

    const handlePageChange = (newPage) => {
        fetchData(newPage, debouncedFilter);
    };

    const handleOpenModal = (aluno = null) => {
        setSelectedAluno(aluno);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedAluno(null);
        setIsModalOpen(false);
    };

    const handleOpenDeleteModal = (aluno) => {
        setSelectedAluno(aluno);
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setSelectedAluno(null);
        setIsDeleteModalOpen(false);
    };

    const handleFormSubmit = async (formData) => {
        try {
            if (selectedAluno) {
                await updateAluno(selectedAluno._id, formData);
                toast.success('Aluno atualizado com sucesso!');
            } else {
                await createAluno(formData);
                toast.success('Aluno criado com sucesso!');
            }
            fetchData(pagination.page, debouncedFilter);
            handleCloseModal();
        } catch (error) {
            toast.error(error.response?.data?.msg || 'Falha ao salvar aluno.');
        }
    };

    const handleDeleteConfirm = async () => {
        if (!selectedAluno) return;
        try {
            await deleteAluno(selectedAluno._id);
            toast.success('Aluno excluído com sucesso!');
            fetchData(1, debouncedFilter);
            handleCloseDeleteModal();
        } catch (error) {
            toast.error('Falha ao excluir aluno.');
        }
    };

    const columns = useMemo(() => [
        { header: 'Nome', accessorKey: 'nome' },
        { header: 'Email', accessorKey: 'email' },
        { header: 'Curso', accessorKey: 'curso' },
        { header: 'Matrícula', accessorKey: 'matricula' },
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
                <Title>Alunos</Title>
                <AddButton onClick={() => handleOpenModal()}>Adicionar Aluno</AddButton>
            </PageHeader>
            <FilterInput
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Filtrar por curso..."
            />

            {loading ? (
                <Spinner />
            ) : (
                <Table
                    columns={columns}
                    data={alunos}
                    pagination={pagination}
                    onPageChange={handlePageChange}
                />
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={() => document.querySelector('form').requestSubmit()}
                title={selectedAluno ? 'Editar Aluno' : 'Adicionar Aluno'}
                confirmText="Salvar"
            >
                <AlunoForm
                    onSubmit={handleFormSubmit}
                    defaultValues={selectedAluno}
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
                <p>Você tem certeza que deseja excluir o aluno <strong>{selectedAluno?.nome}</strong>?</p>
            </Modal>
        </div>
    );
};

export default Students;
