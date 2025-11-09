// src/App.jsx

import React, { useState, useEffect } from 'react';
import { getAlunos, createAluno, updateAluno, deleteAluno } from './services/api';
import AlunoTable from './components/AlunoTable';
import AlunoForm from './components/AlunoForm';

function App() {
  const [alunos, setAlunos] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  
  // Estado para Edição: Armazena o aluno que está sendo editado (null = Cadastro)
  const [editingAluno, setEditingAluno] = useState(null); 

  // Função central para buscar e atualizar a lista
  const fetchAlunos = async () => {
    setIsLoading(true);
    const data = await getAlunos();
    setAlunos(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAlunos();
  }, []);

  // ------------------- Funções de CRUD -------------------

  // Função para lidar com o envio do formulário (Cadastro ou Edição)
  const handleFormSubmit = async (alunoData) => {
    let result;
    
    if (editingAluno) {
      // MODO EDIÇÃO
      result = await updateAluno(editingAluno.id, alunoData);
    } else {
      // MODO CADASTRO
      result = await createAluno(alunoData);
    }

    if (result) {
      // Atualiza a lista e limpa o formulário de edição
      fetchAlunos(); 
      setEditingAluno(null);
    } else {
      alert(`Falha na operação de ${editingAluno ? 'edição' : 'cadastro'}. Verifique o console.`);
    }
  };

  // Função de Edição (Envia o aluno para o formulário)
  const handleEdit = (aluno) => {
    setEditingAluno(aluno);
  };

  // Função de Exclusão
  const handleDelete = async (alunoId) => {
    if (window.confirm("Tem certeza que deseja excluir este aluno?")) {
      const result = await deleteAluno(alunoId);
      if (result) {
        alert("Aluno excluído com sucesso!");
        fetchAlunos(); // Atualiza a lista após a exclusão
      } else {
        alert("Falha na exclusão.");
      }
    }
  };

  return (
    <div className="container">
      <h1>Gerenciador de Alunos</h1>
      <hr />

      {/* 1. Formulário de Cadastro/Edição */}
      <AlunoForm
        onSubmit={handleFormSubmit}
        initialData={editingAluno}
        onClose={() => setEditingAluno(null)} // Função para fechar o modo de edição
      />

      {/* 2. Lista e Tabela */}
      <h2>Lista de Alunos</h2>
      
      {isLoading ? (
        <p>Carregando alunos...</p>
      ) : (
        <AlunoTable 
          alunos={alunos} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      )}
    </div>
  );
}

export default App;