# ⚡ Modern Pokédex

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Turborepo](https://img.shields.io/badge/turborepo-%23EF4444.svg?style=for-the-badge&logo=turborepo&logoColor=white)

Uma aplicação web responsiva para pesquisar o mundo Pokémon, consumindo a [PokeAPI](https://pokeapi.co/).
Visite meu projeto aqui: [Pokedex](https://pokedex-web-ten.vercel.app/)

![Preview do Projeto](./Captura%20de%20tela%20de%202026-03-14%2009-43-23.png)`

## ✨ Funcionalidades

- **Busca:** Pesquisa de Pokémons em tempo real a API, utilizando a técnica de *debounce*.
- **Paginação Dinâmica:** Carregamento manipulando estado e limites da API.
- **Filtros por Tipo:** Navegação entre diferentes tipos de Pokémon (Fogo, Água, Planta, etc.).
- **Design System Customizado:** Interface construída com **shadcn/ui** e **Tailwind CSS**.
- **Glassmorphism UI:** Efeitos visuais modernos de desfoque e transparência.

## 🏗️ Arquitetura e Stack Tecnológica

Este projeto utiliza uma estrutura avançada de **Monorepo** (gerenciada por Turborepo/pnpm workspaces), separando a aplicação principal da biblioteca de componentes visuais.

- **Front-end:** React 18 + TypeScript + Vite
- **Estilização:** Tailwind CSS v4 + utilitários nativos de cores (`oklch`)
- **Componentes Base:** shadcn/ui (Radix UI)
- **Integração de Dados:** Fetch API nativa com tratamento de concorrência (`Promise.all`)

### Estrutura do Monorepo

```bash
pokedex/
├── apps/
│   └── web/
└── packages/
    └── ui/
```

### 🚀 Como Executar Localmente

### Pré-requisitos
Certifique-se de ter o **Node.js** (versão 18 ou superior) e o **pnpm** instalados na sua máquina.

### Passos para Instalação

1. Clone o repositório:
```bash
git clone [https://github.com/flavinhojrz/pokedex](https://github.com/flavinhojrz/pokedex)
```

2. Entre na pasta do projeto:
```bash
cd NOME_DO_REPOSITORIO
```

3. Instale todas as dependências do monorepo:
```bash
pnpm install
```

4. Inicie o servidor de desenvolvimento:
```bash
pnpm dev
```

5. Acesse no seu navegador: `http://localhost:5173`

---
Desenvolvido com ☕ e muito código.
