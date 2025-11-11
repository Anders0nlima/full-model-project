// src/services/api.js

const API_URL = "https://full-model-project-1.onrender.com/"; // antes do render: "http://localhost:3000"
// Lembre-se: O backend DEVE estar rodando e ter o CORS configurado!

// ----------------------------------------------------
// READ (GET)
// ----------------------------------------------------
export async function getAlunos() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Erro ao buscar alunos! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Erro ao buscar alunos:", error);
        return [];
    }
}

// ----------------------------------------------------
// CREATE (POST)
// ----------------------------------------------------
export async function createAluno(alunoData) {
    try {
        const response = await fetch(`${API_URL}/cadatrar`, { // Seu endpoint /cadatrar (com erro de digitação, mas mantido)
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(alunoData),
        });
        
        if (!response.ok) {
            throw new Error(`Falha no cadastro! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Erro no cadastro:", error);
        return null;
    }
}

// ----------------------------------------------------
// UPDATE (PUT)
// ----------------------------------------------------
export async function updateAluno(id, alunoData) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(alunoData),
        });
        
        if (!response.ok) {
            throw new Error(`Falha na atualização! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Erro na atualização:", error);
        return null;
    }
}

// ----------------------------------------------------
// DELETE (DELETE)
// ----------------------------------------------------
export async function deleteAluno(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        
        if (!response.ok) {
            throw new Error(`Falha na exclusão! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Erro na exclusão:", error);
        return null;
    }
}