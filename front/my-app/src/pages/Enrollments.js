import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import toast from 'react-hot-toast';
import { getAllAlunosSimple, getAlunoById, getAvailableDisciplinas, addDisciplinaToAluno, removeDisciplinaFromAluno } from '../services/alunoService';

// --- Styled Components ---
const Title = styled.h1`
  margin-bottom: 1.5rem;
`;

const SelectContainer = styled.div`
  margin-bottom: 2rem;
`;

const Select = styled.select`
  width: 100%;
  max-width: 400px;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const EnrollmentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ListContainer = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem;
`;

const ListTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid ${({ theme }) => theme.primary};
  padding-bottom: 0.5rem;
`;

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f1f5f9;
`;

const ActionButton = styled.button`
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  color: white;
  &.add {
    background-color: #22c55e; // green-500
  }
  &.remove {
    background-color: #ef4444; // red-500
  }
`;


// --- Component ---
const Enrollments = () => {
    const [allAlunos, setAllAlunos] = useState([]);
    const [selectedAlunoId, setSelectedAlunoId] = useState('');

    const [enrolledDisciplinas, setEnrolledDisciplinas] = useState([]);
    const [availableDisciplinas, setAvailableDisciplinas] = useState([]);

    // Fetch all students for the dropdown
    useEffect(() => {
        const fetchAlunos = async () => {
            try {
                const data = await getAllAlunosSimple();
                setAllAlunos(data);
            } catch (error) {
                toast.error('Falha ao carregar lista de alunos.');
            }
        };
        fetchAlunos();
    }, []);

    // Fetch discipline lists when a student is selected
    const fetchDisciplineData = useCallback(async () => {
        if (!selectedAlunoId) {
            setEnrolledDisciplinas([]);
            setAvailableDisciplinas([]);
            return;
        };
        try {
            const [alunoDetails, available] = await Promise.all([
                getAlunoById(selectedAlunoId),
                getAvailableDisciplinas(selectedAlunoId)
            ]);
            setEnrolledDisciplinas(alunoDetails.disciplinas);
            setAvailableDisciplinas(available);
        } catch (error) {
            toast.error('Falha ao buscar disciplinas para o aluno.');
        }
    }, [selectedAlunoId]);

    useEffect(() => {
        fetchDisciplineData();
    }, [selectedAlunoId, fetchDisciplineData]);


    const handleSelectAluno = (e) => {
        setSelectedAlunoId(e.target.value);
    };

    const handleAddDisciplina = async (disciplinaId) => {
        try {
            await addDisciplinaToAluno(selectedAlunoId, disciplinaId);
            toast.success('Disciplina matriculada!');
            fetchDisciplineData(); // Refresh lists
        } catch (error) {
            toast.error('Falha ao matricular disciplina.');
        }
    };

    const handleRemoveDisciplina = async (disciplinaId) => {
        try {
            await removeDisciplinaFromAluno(selectedAlunoId, disciplinaId);
            toast.success('Matrícula removida!');
            fetchDisciplineData(); // Refresh lists
        } catch (error) {
            toast.error('Falha ao remover matrícula.');
        }
    };


    return (
        <div>
            <Title>Gerenciamento de Matrículas</Title>
            <SelectContainer>
                <Select value={selectedAlunoId} onChange={handleSelectAluno}>
                    <option value="">Selecione um Aluno</option>
                    {allAlunos.map(aluno => (
                        <option key={aluno._id} value={aluno._id}>{aluno.nome}</option>
                    ))}
                </Select>
            </SelectContainer>

            {selectedAlunoId && (
                <EnrollmentContainer>
                    <ListContainer>
                        <ListTitle>Disciplinas Matriculadas</ListTitle>
                        {/* Placeholder Data */}
                        {enrolledDisciplinas.length === 0 && <p>Nenhuma disciplina matriculada.</p>}
                        {enrolledDisciplinas.map(d => (
                            <ListItem key={d._id}>
                                <span>{d.nome}</span>
                                <ActionButton className="remove" onClick={() => handleRemoveDisciplina(d._id)}>Remover</ActionButton>
                            </ListItem>
                        ))}
                    </ListContainer>
                    <ListContainer>
                        <ListTitle>Disciplinas Disponíveis</ListTitle>
                        {availableDisciplinas.map(d => (
                            <ListItem key={d._id}>
                                <span>{d.nome}</span>
                                <ActionButton className="add" onClick={() => handleAddDisciplina(d._id)}>Adicionar</ActionButton>
                            </ListItem>
                        ))}
                    </ListContainer>
                </EnrollmentContainer>
            )}
        </div>
    );
};

export default Enrollments;
