// src/components/AlunoForm.jsx

import React, { useState, useEffect } from 'react';
import styles from './AlunoForm.module.css';

// Recebe a função de submissão, os dados iniciais (para edição), e a função para fechar o formulário
function AlunoForm({ onSubmit, initialData = null, onClose }) {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const isEditing = initialData !== null;

  // Preenche o formulário se estiver em modo de edição
  useEffect(() => {
    if (isEditing) {
      setNome(initialData.nome || '');
      // A idade é um número no banco, mas deve ser string no input
      setIdade(String(initialData.idade || ''));
    } else {
      setNome('');
      setIdade('');
    }
  }, [initialData, isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação básica
    if (!nome.trim() || !idade.trim() || isNaN(parseInt(idade))) {
      alert("Preencha o nome e a idade (como número válido).");
      return;
    }

    const alunoData = {
      nome: nome,
      idade: parseInt(idade), // Garante que a idade seja enviada como número
    };

    onSubmit(alunoData); // Chama a função que fará a chamada da API
    
    // Limpa o formulário após o envio
    if (!isEditing) {
        setNome('');
        setIdade('');
    }
  };

  return (
    <div className={styles.formContainer}>
      <h3>{isEditing ? 'Editar Aluno' : 'Cadastrar Novo Aluno'}</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className={styles.inputField}
            placeholder="Digite o nome"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="idade">Idade:</label>
          <input
            type="number"
            id="idade"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            className={styles.inputField}
            placeholder="Digite a idade"
          />
        </div>
        <div className={styles.actions}>
          <button type="submit" className={styles.btnSubmit}>
            {isEditing ? 'Salvar Edição' : 'Cadastrar'}
          </button>
          {isEditing && (
            <button type="button" onClick={onClose} className={styles.btnCancel}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default AlunoForm;