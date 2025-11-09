// src/components/AlunoTable.jsx

import React from 'react';
import styles from './AlunoTable.module.css'; // Importa o CSS Module

function AlunoTable({ alunos, onEdit, onDelete }) {
  if (!alunos || alunos.length === 0) {
    return <p className={styles.noData}>Nenhum aluno cadastrado.</p>;
  }

  return (
    <div className={styles.tableContainer}>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Idade</th>
            <th>ID (Preview)</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => (
            <tr key={aluno.id}>
              <td>{aluno.nome}</td>
              <td>{aluno.idade}</td>
              <td className={styles.idCell}>{aluno.id.substring(0, 8)}...</td>
              <td className={styles.actionsCell}>
                <button 
                  className={styles.btnEdit} 
                  onClick={() => onEdit(aluno)}
                >
                  Editar
                </button>
                <button 
                  className={styles.btnDelete} 
                  onClick={() => onDelete(aluno.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AlunoTable;