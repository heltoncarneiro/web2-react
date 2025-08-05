import React from 'react';
import styled from 'styled-components';

// --- Styled Components ---
const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 500px;
`;

const ModalTitle = styled.h2`
  margin-bottom: 1rem;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  font-weight: bold;
  border: 1px solid transparent;

  &.primary {
    background-color: ${({ theme }) => theme.primary};
    color: white;
  }

  &.secondary {
    background-color: #e2e8f0;
    color: ${({ theme }) => theme.text};
  }

  &.danger {
    background-color: ${({ theme }) => theme.error};
    color: white;
  }
`;

/**
 * A reusable Modal component for confirmations.
 * @param {boolean} isOpen - Controls if the modal is visible.
 * @param {function} onClose - Callback function to close the modal.
 * @param {function} onConfirm - Callback function for the confirm action.
 * @param {string} title - The title of the modal.
 * @param {React.ReactNode} children - The content/body of the modal.
 * @param {string} confirmText - The text for the confirm button (defaults to "Confirmar").
 * @param {string} confirmVariant - The color variant for the confirm button ('primary' or 'danger').
 */
const Modal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    children,
    confirmText = "Confirmar",
    confirmVariant = "primary"
}) => {
    if (!isOpen) {
        return null;
    }

    return (
        <ModalBackdrop onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalTitle>{title}</ModalTitle>
                <div>{children}</div>
                <ModalActions>
                    <Button className="secondary" onClick={onClose}>Cancelar</Button>
                    <Button className={confirmVariant} onClick={onConfirm}>{confirmText}</Button>
                </ModalActions>
            </ModalContent>
        </ModalBackdrop>
    );
};

export default Modal;
