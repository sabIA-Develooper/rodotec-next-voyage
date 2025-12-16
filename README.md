# RODOTEC - Website Institucional

## Sobre o Projeto

Site institucional da RODOTEC, empresa especializada em implementos e soluções para transporte rodoviário.

## Como desenvolver

### Pré-requisitos

- Node.js & npm instalados - [instalar com nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Passos para desenvolvimento local

```sh
# 1. Clone o repositório
git clone <YOUR_GIT_URL>

# 2. Navegue até o diretório do projeto
cd rodotec-next-voyage

# 3. Instale as dependências
npm i

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

O servidor estará disponível em `http://localhost:8080`

## Tecnologias Utilizadas

Este projeto foi construído com:

- **Vite** - Build tool
- **TypeScript** - Tipagem estática
- **React** - Framework UI
- **shadcn-ui** - Biblioteca de componentes
- **Tailwind CSS** - Estilização
- **React Router** - Roteamento
- **Lucide React** - Ícones

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Executa o linter
- `npm test` - Executa os testes

## Estrutura do Projeto

- `/src/components` - Componentes React reutilizáveis
- `/src/pages` - Páginas do site
- `/src/pages/admin` - Área administrativa
- `/src/contexts` - Contextos React (Auth, etc)
- `/src/data` - Camada de dados e repositórios
- `/src/lib` - Utilitários e configurações
