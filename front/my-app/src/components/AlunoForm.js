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

const FormField = styled.div`
  display: flex;
  flex-direction: column;
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
  margin-top: 0.25rem;
`;

// --- Validation Schema ---
// Basic validation, can be improved (e.g., for CPF)
const schema = yup.object().shape({
    nome: yup.string().required('Nome é obrigatório'),
    endereco: yup.string(),
    dataNascimento: yup.date().typeError('Data inválida'),
    matricula: yup.string().required('Matrícula é obrigatória'),
    telefone: yup.string(),
    email: yup.string().email('Email inválido').required('Email é obrigatório'),
    curso: yup.string().required('Curso é obrigatório'),
});

/**
 * A form for creating or editing an Aluno.
 * @param {function} onSubmit - The function to call when the form is submitted.
 * @param {object} [defaultValues] - The initial values for the form fields (used for editing).
 */
const AlunoForm = ({ onSubmit, defaultValues }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (defaultValues) {
            // Format date for the input type="date"
            const formattedValues = {
                ...defaultValues,
                dataNascimento: defaultValues.dataNascimento ? new Date(defaultValues.dataNascimento).toISOString().split('T')[0] : '',
            };
            reset(formattedValues);
        } else {
            reset({
                nome: '', endereco: '', dataNascimento: '', cpf: '',
                matricula: '', telefone: '', email: '', curso: '',
            });
        }
    }, [defaultValues, reset]);

    return (
        <StyledForm onSubmit={handleSubmit(onSubmit)} noValidate>
            <FormField>
                <Input {...register('nome')} placeholder="Nome Completo" />
                {errors.nome && <ErrorMessage>{errors.nome.message}</ErrorMessage>}
            </FormField>
            <FormField>
                <Input {...register('matricula')} placeholder="Matrícula" />
                {errors.matricula && <ErrorMessage>{errors.matricula.message}</ErrorMessage>}
            </FormField>
            <FormField>
                <Input {...register('email')} placeholder="Email" />
                {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
            </FormField>
            <FormField>
                <Input {...register('curso')} placeholder="Curso" />
                {errors.curso && <ErrorMessage>{errors.curso.message}</ErrorMessage>}
            </FormField>

            <button type="submit" style={{ display: 'none' }} />
        </StyledForm>
    );
};

export default AlunoForm;
