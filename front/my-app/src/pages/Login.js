import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import styled from 'styled-components';

// --- Styled Components (can be refactored into a common file) ---
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const FormContainer = styled.div`
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.text};
  text-align: center;
`;

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

const SubmitButton = styled.button`
  padding: 0.75rem;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  &:hover {
    opacity: 0.9;
  }
`;

const RegisterPrompt = styled.p`
  margin-top: 1rem;
  text-align: center;
  color: #666;
`;


// --- Validation Schema ---
const schema = yup.object().shape({
    email: yup.string().email('Email inválido').required('Email é obrigatório'),
    password: yup.string().required('Senha é obrigatória'),
});

// --- Component ---
const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            await login(data.email, data.password);
            toast.success('Login bem-sucedido!');
            navigate('/'); // Redirect to a dashboard or home page after login
        } catch (error) {
            toast.error(error.response?.data?.msg || 'Credenciais inválidas.');
        }
    };

    return (
        <PageContainer>
            <FormContainer>
                <Title>Login</Title>
                <StyledForm onSubmit={handleSubmit(onSubmit)}>
                    <Input {...register('email')} placeholder="Email" />
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

                    <Input {...register('password')} type="password" placeholder="Senha" />
                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

                    <SubmitButton type="submit">Entrar</SubmitButton>
                </StyledForm>
                <RegisterPrompt>
                    Não tem uma conta? <Link to="/register">Cadastre-se</Link>
                </RegisterPrompt>
            </FormContainer>
        </PageContainer>
    );
};

export default Login;
