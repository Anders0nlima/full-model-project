## 🚀 Configuração do Backend: Node.js, Express, PostgreSQL e Prisma

Este guia detalha a configuração inicial do **backend** da aplicação, que utiliza **Node.js** com **Express** e **PostgreSQL** como banco de dados, orquestrados pelo **Prisma ORM**.

---

## 💻 Ambiente de Desenvolvimento da API

O backend foi construído em **Node.js** e estruturado para ser uma **API REST**.

### 1. Inicialização do Projeto Node.js e Express

1. **Inicializar o projeto Node.js:**Bash
    
    `npm init -y`
    
    - Este comando cria o arquivo `package.json`.
2. **Criar o ponto de entrada:**
    - Crie o arquivo principal, por exemplo, `index.js`.
3. **Instalar e configurar o Express:**Bash
    
    `npm i express`
    
    - **Express** é o framework que simplifica a criação de rotas e o manuseio de requisições HTTP.
    - Arquivos `node_modules` e `package-lock.json` serão criados.
4. **Configurar o tipo de módulo:**
    - Adicione a linha `"type": "module"` no arquivo `package.json` para usar a sintaxe de `import/export` (ES Modules).
5. **Instalar Nodemon para desenvolvimento:**Bash
    
    `npm i nodemon -D`
    
    - O **Nodemon** reinicia automaticamente o servidor ao detectar alterações nos arquivos.
    - Para rodar o servidor: `npx nodemon index.js`

### 2. Métodos HTTP e Teste de API

Os métodos HTTP (**GET**, **POST**, **PUT**, **DELETE**) são a base para operações **CRUD** (**Create, Read, Update, Delete**).

- Foi utilizada a ferramenta **Postman** (ou extensões do VS Code como **Thunder Client**) para criar, enviar e testar as requisições HTTP da API.

---

## ⚙️ Configuração do Prisma e PostgreSQL

O **Prisma** atua como o **ORM** (Object-Relational Mapper) que faz a ponte entre o **Express** (Node.js) e o banco de dados **PostgreSQL**.

### 1. Instalação e Inicialização do Prisma

1. **Instalar o Prisma CLI e o Cliente:**Bash
    
    `npm i prisma -D
    npm i @prisma/client`
    
2. **Inicializar o projeto Prisma:**Bash
    
    `npx prisma init`
    
    - Isso cria a pasta `prisma/` (contendo o arquivo `schema.prisma`), o arquivo `.env` e adiciona `.env` ao `.gitignore`.

> ⚠️ Observação sobre o schema.prisma
> 
> 
> Certifique-se de que a seção `generator` no seu `prisma/schema.prisma` esteja configurada corretamente para o JavaScript/Node.js:
> 
> `generator client {
>   provider = "prisma-client-js"
> }`
> 

### 2. Conexão com o PostgreSQL

1. **Criar o banco de dados:**
    - Crie um banco de dados vazio utilizando o **pgAdmin 4** ou outro cliente de sua preferência.
2. **Configurar a conexão:**Snippet de código
    - No arquivo **`.env`**, preencha a variável `DATABASE_URL` com as credenciais do seu banco de dados:
    
    `DATABASE_URL="postgresql://postgres:[SUA_SENHA]@localhost:[PORTA]/[NOME_DO_DB]?schema=public"`
    

### 3. Modelagem de Dados (Schema)

- Defina as **tabelas** do seu banco de dados no arquivo `prisma/schema.prisma` utilizando a sintaxe de **Model** do Prisma.

**Exemplo de Modelagem:**

Snippet de código

`model User {
  id    String @id @default(uuid())
  nome  String
  idade Int
}`

### 4. Migrações e Sincronização do Banco de Dados

Após definir os modelos, é necessário sincronizar o esquema com o banco de dados PostgreSQL.

1. **Criar e Aplicar a Migração (Recomendado em Desenvolvimento):**Bash
    
    `npx prisma migrate dev --name migracao_inicial`
    
    - Este comando: cria uma pasta de migração, aplica as alterações no banco de dados e atualiza o `@prisma/client`.
2. **Sincronizar sem Histórico de Migrações (Para pequenas alterações ou dados existentes):**
    - Se você **atualizar** o `schema.prisma` (ex: adicionar um novo campo) e quiser apenas aplicar a alteração:Bash
        
        `npx prisma db push`
        
    - Se você **criar uma tabela no pgAdmin** e quiser "puxar" essa estrutura para o `schema.prisma`:Bash
        
        `npx prisma db pull`
        

> 🚨 Atenção ao Reset de Migrações:
> 
> 
> O comando `npx prisma migrate reset` **deleta todos os dados** e reinicia o histórico de migrações. **NUNCA** use em ambiente de **produção**! Use em desenvolvimento se precisar limpar o banco e recriar o esquema.
> 

### 5. Configuração do Cliente Prisma

Para interagir com o banco de dados via código, o **Prisma Client** é instanciado.

1. **Criar o arquivo de configuração do Cliente (ex: `src/db.js`):**JavaScript
    
    `// src/db.js
    import { PrismaClient } from "@prisma/client"; // Note: The path might be different depending on your setup.
    
    export const prisma = new PrismaClient();`
    
2. **Teste de Consulta Simples (Exemplo):**JavaScript
    - Usando o `db.js` e a tabela `User`:
    
    `// Exemplo em um script de teste ou rota
    import { prisma } from "./src/db.js";
    
    async function getUsers() {
        // Encontra todos os usuários
        const users = await prisma.user.findMany();
        console.log(users);
    }
    
    getUsers();
    // Para executar: node [nome-do-arquivo.js]`
    

### 6. Prisma Studio (Opcional, mas Recomendado)

O **Prisma Studio** é uma interface gráfica poderosa para visualizar, inserir, editar e deletar dados, simplificando as operações de CRUD durante o desenvolvimento.

- Para iniciar:Bash
    
    `npx prisma studio`
    

> 💡 Dica: Ao inserir dados no Studio, certifique-se de que os campos obrigatórios estejam preenchidos para que o registro seja salvo corretamente.
> 

---

## 🤝 Próximos Passos

- Integrar o **Prisma Client** nas rotas do **Express** para implementar as operações **CRUD** (**GET, POST, PUT, DELETE**).
- Detalhar a estrutura de **rotas** e **controllers** do Express.

## ⚛️ Configuração do Frontend com React e Vite

Esta seção detalha os passos para configurar o **Frontend** da aplicação utilizando **React** e **Vite**, e como gerenciar o projeto completo (**Frontend** e **Backend**) no **GitHub**.

---

## 1. Configuração do Frontend com Vite e React

O **Vite** é um bundler moderno que oferece um ambiente de desenvolvimento mais rápido e otimizado para aplicações React.

### 1.1. Inicialização do Projeto React

Partindo do pressuposto que você está na pasta raiz do seu projeto Full Stack (que já contém a pasta do Backend), crie a pasta do Frontend:

1. **Acessar a pasta raiz do projeto Full Stack.**
2. **Executar o comando de criação do Vite:**Bash
    
    `npm create vite@latest frontend -- --template react`
    
    - **Nota:** Se você deseja criar os arquivos diretamente na pasta atual, use:Bash
        
        `npm create vite@latest . -- --template react`
        
        No entanto, para uma arquitetura Full Stack organizada, é **altamente recomendado** criar em uma subpasta (ex: `frontend`, `client` ou `web`). O exemplo acima usa a subpasta `frontend`.
        
3. **Seguir as instruções do terminal** (escolher o nome do projeto, o framework - **React** - e a variante - **JavaScript** ou **TypeScript**).
4. **Acessar a nova pasta e instalar as dependências:**Bash
    
    `cd frontend
    npm install`
    
5. **Para rodar o projeto em desenvolvimento:**Bash
    
    `npm run dev`
    

---

## 💾 Gerenciamento e Deploy no GitHub (Full Stack)

Esta parte aborda como inicializar o repositório **git** na pasta **raiz** do projeto (contendo `backend/` e `frontend/`) e como fazer o *deploy* do frontend separadamente usando `gh-pages`.

### 2. Inicialização do Repositório Git (Pasta Raiz)

Estes passos devem ser executados na **pasta raiz** do projeto Full Stack.

1. **Inicializar o Git:**Bash
    
    `git init`
    
2. **Adicionar todos os arquivos ao *staging*:**Bash
    
    `git add .`
    
    - **Nota:** Certifique-se de que os arquivos de configuração (`.gitignore`) do Backend e Frontend estão ignorando pastas como `node_modules`.
3. **Fazer o primeiro *commit*:**Bash
    
    `git commit -m "feat: first commit of full stack project structure"`
    
4. **Renomear a *branch* principal (padrão do GitHub):**Bash
    
    `git branch -M main`
    
5. **Vincular ao repositório remoto do GitHub:**Bash
    
    `git remote add origin https://github.com/<username>/<repositoryName>.git`
    
    - **Substitua** `<username>` e `<repositoryName>` pelos seus dados.
    - *Se você receber o erro `error: remote origin already exists.`, ignore e vá para o próximo passo, ou use `git remote set-url origin <nova-url>` para redefinir.*
6. **Enviar o código para o GitHub:**Bash
    
    `git push -u origin main`
    

> ⭐ Dica: O uso do GitHub Desktop simplifica drasticamente estes comandos, permitindo que você realize o Commit e Push com apenas alguns cliques.
> 

### 3. Configuração de Deploy (Frontend)

Para fazer o deploy do frontend em ambientes de hospedagem estática, como o **GitHub Pages**, é necessário o pacote `gh-pages`.

1. **Instalar `gh-pages` (na pasta `frontend/`):**Bash
    
    `cd frontend
    npm install gh-pages --save-dev`
    
2. **Configurar o *script* de *deploy* (no `package.json` do Frontend):**JSON
    - No arquivo `frontend/package.json`, adicione as seguintes linhas dentro do objeto `"scripts"`:
    
    `"scripts": {
      "predeploy": "npm run build",
      "deploy": "gh-pages -d dist",
      // ...outros scripts...
    }`
    
3. **Executar o Deploy (na pasta `frontend/`):**Bash
    
    `npm run deploy`
    
    - Este comando primeiro executa o `npm run build` e depois envia a pasta `dist/` (que contém os arquivos estáticos de produção do Vite) para a *branch* `gh-pages` do seu repositório.

### 4. Fluxo de Atualização Contínua

Para manter o seu repositório sincronizado com as últimas alterações:

| **Parte** | **Ações no Terminal (ou GitHub Desktop)** |
| --- | --- |
| **Backend** (Pasta Raiz) | 1. `git add .` (se não usar Desktop) |
|  | 2. `git commit -m "sua mensagem"` |
|  | 3. `git push origin main` |
| **Frontend** (Pasta `frontend/`) | 1. `git add .` (se não usar Desktop) |
|  | 2. `git commit -m "sua mensagem"` |
|  | 3. `git push origin main` |
|  | 4. **Fazer o Deploy:** `npm run deploy` |

---

Este fluxo garante que **tanto o Backend quanto o Frontend** estejam salvos no seu repositório principal (`main`), e que a versão de produção do **Frontend** seja enviada para o **GitHub Pages** (via `gh-pages`).

## 🌐 Integração e Deploy da Aplicação Full Stack

Esta seção finaliza a documentação, abordando a conexão entre o **Frontend** (React/Vite) e o **Backend** (Node/Express/Prisma), e detalha o processo de **Deploy** em serviços de hospedagem (Render para Backend e Vercel para Frontend).

---

## 1. Conexão entre Frontend e Backend

A comunicação entre o cliente (Frontend) e o servidor (Backend) requer ajustes de segurança e uma centralização das chamadas HTTP.

### 1.1. Configuração de CORS (Backend)

O **CORS (Cross-Origin Resource Sharing)** é um mecanismo crucial de segurança. Como o Frontend (geralmente na porta 5173) e o Backend (porta 3000) rodam em "origens" diferentes, o Backend precisa autorizar o acesso do Frontend.

- **Arquivo:** `backend/index.js`

JavaScript

`// Importe e use o pacote 'cors'
import cors from "cors";
// ... outras importações ...

const app = express();
app.use(cors()); // Permite que o Frontend se conecte ao Backend
// ... suas rotas ...`

### 1.2. Centralização de Chamadas (Frontend)

Toda a lógica de requisições HTTP (CRUD) deve ser centralizada em um módulo para manter o componente principal (`App.jsx`) limpo e focado na interface.

- **Arquivo:** `frontend/api.js`

Este arquivo deve conter funções assíncronas para cada operação CRUD, como `getAlunos()`, `createAluno()`, `updateAluno()`, e `deleteAluno()`, todas se comunicando com o endpoint **`http://localhost:3000/`** (durante o desenvolvimento).

### 1.3. Lógica de Componente (Frontend)

O componente principal (`App.jsx`) gerencia o estado da aplicação e as interações do usuário.

- **Arquivo:** `frontend/App.jsx`
1. **Estados:** Utiliza `useState` para gerenciar a lista de dados (ex: `alunos`) e o estado de edição (`editingAluno`).
2. **Carregamento Inicial:** Utiliza `useEffect` para chamar `getAlunos()` (via **GET**) assim que o componente é montado e armazenar os dados no estado.
3. **Lógica CRUD:** Implementa a lógica condicional para determinar qual chamada da API usar:
    - Se o objeto de edição (`editingAluno`) for **`null`**, chama `createAluno()` (**POST**).
    - Se o objeto de edição for **válido** (contém um ID), chama `updateAluno()` (**PUT**).

---

## 2. Fluxo de Execução em Desenvolvimento

Para rodar a aplicação localmente (Full Stack):

1. **Backend:** Iniciar o servidor API (Express).Bash
    
    `cd backend
    npm install # Se for a primeira vez
    npx nodemon index.js # Ou node index.js`
    
    - **Endpoint:** `http://localhost:3000`
2. **Frontend:** Iniciar o servidor de desenvolvimento Vite.Bash
    
    `cd frontend
    npm install # Se for a primeira vez
    npm run dev`
    
    - **Endpoint:** `http://localhost:5173`

---

## 3. Deploy da Aplicação (Render e Vercel)

Para tornar a aplicação acessível na web, utilizamos serviços especializados.

### 3.1. Preparação (Ajuste de Variável de Ambiente)

É uma boa prática configurar a porta de escuta do servidor para ser dinâmica, permitindo que a plataforma de hospedagem (Render) defina a porta.

- **Arquivo:** `backend/index.js`JavaScript
    
    `const PORT = process.env.PORT || 3000;
    
    app.listen(PORT, () => {
        console.log(`Servidor rodando em: http://localhost:${PORT}`)
    });`
    
    *(Faça um `git commit` e `git push` desta alteração.)*
    

### 3.2. Deploy do Backend (Render: PostgreSQL + Web Service)

O Render será usado para hospedar tanto o Banco de Dados quanto o servidor Express.

### A. Criação do Banco de Dados PostgreSQL

1. Acesse o painel do **Render** $\rightarrow$ **New** $\rightarrow$ **PostgreSQL**.
2. Defina um nome (ex: `full-model-db-v2`) e escolha o plano **Free**.
3. Após a criação, vá em **Info** e **copie a `External Database URL`**. Esta URL será usada para conectar o servidor à base de dados.

### B. Criação do Serviço Web (Servidor Express)

1. No painel do **Render** $\rightarrow$ **New** $\rightarrow$ **Web Service**.
2. Conecte ao repositório **GitHub** (ex: `full-model-project`).
3. **Configurações Importantes:**
    - **Root Directory:** `backend` (Crucial para monorepos)
    - **Runtime:** Node
    - **Build Command:** `npm install && npx prisma migrate deploy`
        - *Este comando instala as dependências e aplica as migrações do Prisma no DB do Render.*
    - **Start Command:** `node index.js`
4. **Variáveis de Ambiente (Environment):**
    - Adicione uma variável: **Key**: `DATABASE_URL` | **Value**: Cole a `External Database URL` copiada na Etapa 3.2.A.
5. Clique em **Create Web Service**.

> ✅ Teste de Sucesso: Se o deploy for bem-sucedido, acessar a URL gerada pelo Render para o Serviço Web deve retornar uma resposta JSON vazia, como [], indicando que o servidor está no ar e respondendo.
> 

### 3.3. Deploy do Frontend (Vercel)

O Vercel é ideal para hospedar o Frontend estático do React/Vite.

### A. Ajuste da API (Frontend)

Antes de fazer o deploy, o Frontend deve saber qual é a URL de produção do Backend (a URL do Serviço Web do Render).

- **Arquivo:** `frontend/api.js` (ou onde a URL base é definida)

JavaScript

`const API_URL = "https://[SEU_LINK_RENDER].onrender.com"; // Substitua pelo seu link`

*(Faça um `git commit` e `git push` desta alteração.)*

### B. Hospedagem na Vercel

1. Acesse o **Vercel** $\rightarrow$ **New Project**.
2. Importe o repositório **GitHub** (ex: `full-model-project`).
3. **Configurações de Build:**
    - **Root Directory (Diretório Raiz):** Defina como `frontend` (crucial para monorepos).
    - Deixe as configurações de Build e Output como padrão; o Vercel deve detectar o **Vite** e usar o `npm run build` automaticamente, servindo a pasta `dist`.
4. Clique em **Deploy**.

> ⚠️ Nota de Limitação: O serviço gratuito do Render geralmente desliga após um período de inatividade e possui um tempo de vida limitado (ex: 1 mês) para o banco de dados. Este é um ambiente ideal para projetos de estudo e testes, mas não para produção comercial.
>
