import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from 'styled-components';

// --- Styled Components ---
const StyledForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: ${({ fullWidth }) => (fullWidth ? '1 / -1' : 'auto')};
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
    endereco: yup.string().required('Endereço é obrigatório'),
    dataNascimento: yup.date().typeError('Data inválida').required('Data de nascimento é obrigatória'),
    cpf: yup.string().required('CPF é obrigatório').matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'Formato de CPF inválido (use XXX.XXX.XXX-XX)'),
    matricula: yup.string().required('Matrícula é obrigatória'),
    telefone: yup.string().required('Telefone é obrigatório'),
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
            <FormField fullWidth>
                <Input {...register('nome')} placeholder="Nome Completo" />
                {errors.nome && <ErrorMessage>{errors.nome.message}</ErrorMessage>}
            </FormField>
            <FormField fullWidth>
                <Input {...register('endereco')} placeholder="Endereço" />
                {errors.endereco && <ErrorMessage>{errors.endereco.message}</ErrorMessage>}
            </FormField>
            <FormField>
                <Input {...register('dataNascimento')} type="date" placeholder="Data de Nascimento" />
                {errors.dataNascimento && <ErrorMessage>{errors.dataNascimento.message}</ErrorMessage>}
            </FormField>
            <FormField>
                <Input {...register('cpf')} placeholder="CPF (XXX.XXX.XXX-XX)" />
                {errors.cpf && <ErrorMessage>{errors.cpf.message}</ErrorMessage>}
            </FormField>
            <FormField>
                <Input {...register('matricula')} placeholder="Matrícula" />
                {errors.matricula && <ErrorMessage>{errors.matricula.message}</ErrorMessage>}
            </FormField>
            <FormField>
                <Input {...register('telefone')} placeholder="Telefone" />
                {errors.telefone && <ErrorMessage>{errors.telefone.message}</ErrorMessage>}
            </FormField>
            <FormField fullWidth>
                <Input {...register('email')} placeholder="Email" />
                {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
            </FormField>
            <FormField fullWidth>
                <Input {...register('curso')} placeholder="Curso" />
                {errors.curso && <ErrorMessage>{errors.curso.message}</ErrorMessage>}
            </FormField>

            <button type="submit" style={{ display: 'none' }} />
        </StyledForm>
    );
};

export default AlunoForm;
