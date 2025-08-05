import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from 'styled-components';

// --- Styled Components ---
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.error};
  font-size: 0.875rem;
  margin-top: -0.5rem;
`;

// --- Validation Schema ---
const schema = yup.object().shape({
    nome: yup.string().required('Nome é obrigatório'),
    cargaHoraria: yup.number()
        .typeError('Carga horária deve ser um número')
        .positive('Carga horária deve ser positiva')
        .required('Carga horária é obrigatória'),
});

/**
 * A form for creating or editing a Disciplina.
 * @param {function} onSubmit - The function to call when the form is submitted.
 * @param {object} [defaultValues] - The initial values for the form fields (used for editing).
 */
const DisciplinaForm = ({ onSubmit, defaultValues }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: defaultValues || { nome: '', cargaHoraria: '' },
    });

    useEffect(() => {
        reset(defaultValues || { nome: '', cargaHoraria: '' });
    }, [defaultValues, reset]);

    return (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <Input {...register('nome')} placeholder="Nome da Disciplina" />
            {errors.nome && <ErrorMessage>{errors.nome.message}</ErrorMessage>}

            <Input {...register('cargaHoraria')} type="number" placeholder="Carga Horária" />
            {errors.cargaHoraria && <ErrorMessage>{errors.cargaHoraria.message}</ErrorMessage>}

            <button type="submit" style={{ display: 'none' }} />
        </StyledForm>
    );
};

export default DisciplinaForm;
