# Sistema de Votação - Igreja Adventista do Sétimo Dia

Sistema web para automatizar o processo de comissões de nomeações da Igreja Adventista do Sétimo Dia.

## 🎯 Funcionalidades

- ✅ **Lista Completa de Ministérios**: Todos os ministérios e departamentos da IASD
- ✅ **Estrutura de Cargos**: Sistema organizado com diretores e diretores associados
- ✅ **Interface Responsiva**: Funciona em desktop, tablet e celular
- ✅ **Armazenamento Local**: Todos os dados são salvos no navegador (localStorage)
- ✅ **Sem Backend**: Funciona 100% no navegador, ideal para GitHub Pages
- 🔄 **Sistema de Votação**: Em desenvolvimento
- 🔄 **Relatórios em PDF**: Em desenvolvimento

## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool rápido e moderno
- **React Router Dom** - Navegação entre páginas
- **Tailwind CSS** - Framework CSS utility-first
- **Lucide React** - Ícones modernos
- **jsPDF** - Geração de PDFs (para próximas features)
- **React Select** - Componentes de seleção avançados (para próximas features)

## 📦 Instalação e Execução

### Pré-requisitos

- Node.js 16+ instalado
- Yarn instalado

### Passos

1. Clone o repositório:
   \`\`\`bash
   git clone <url-do-repositorio>
   cd frontend-advent-commission
   \`\`\`

2. Instale as dependências:
   \`\`\`bash
   yarn install
   \`\`\`

3. Execute em modo de desenvolvimento:
   \`\`\`bash
   yarn dev
   \`\`\`

4. Abra no navegador:
   \`\`\`
   http://localhost:5173
   \`\`\`

## 🚀 Deploy no GitHub Pages

### 1. Configurar o projeto

O arquivo `vite.config.ts` já está configurado com a base correta.

### 2. Fazer o build

\`\`\`bash
yarn build
\`\`\`

### 3. Deploy

Você pode usar uma das seguintes opções:

#### Opção A: Usando gh-pages (Recomendado)

\`\`\`bash

# Instalar gh-pages

yarn add -D gh-pages

# Adicionar script no package.json:

# "deploy": "yarn build && gh-pages -d dist"

# Fazer deploy

yarn deploy
\`\`\`

#### Opção B: Manual

1. Faça o build: `yarn build`
2. Vá para Settings > Pages no GitHub
3. Selecione a branch `gh-pages` ou faça upload da pasta `dist`

### 4. Configurar GitHub Pages

No repositório do GitHub:

1. Vá em **Settings** > **Pages**
2. Em **Source**, selecione a branch `gh-pages` (se usou opção A)
3. Clique em **Save**
4. Aguarde alguns minutos e acesse: `https://<seu-usuario>.github.io/<nome-do-repo>/`

## 📁 Estrutura do Projeto

\`\`\`
src/
├── components/ # Componentes React reutilizáveis
│ ├── Header.tsx # Cabeçalho do site
│ └── Layout.tsx # Layout base com header e footer
├── pages/ # Páginas da aplicação
│ ├── Home.tsx # Página inicial
│ ├── Ministerios.tsx # Lista de ministérios
│ └── Resultados.tsx # Resultados da votação (em desenvolvimento)
├── hooks/ # Custom hooks
│ └── useLocalStorage.ts # Hook para persistência local
├── data/ # Dados da aplicação
│ └── ministerios.ts # Lista completa de ministérios
├── utils/ # Funções utilitárias
├── App.tsx # Componente principal com rotas
└── main.tsx # Ponto de entrada da aplicação
\`\`\`

## 📋 Ministérios Incluídos

### Liderança

- Ancionato (com múltiplos anciãos)
- Diaconato (diáconos e diaconisas)
- Secretaria
- Tesouraria

### Ministérios

- Escola Sabatina
- Ministério Pessoal
- Ministério Jovem
- Ministério da Criança
- Ministério do Adolescente
- Ministério da Mulher
- Ministério do Homem
- Ministério da Família
- Ministério da Música
- Ministério da Comunicação
- Mordomia Cristã
- Ministério de Publicações
- Ministério da Educação
- Ministério da Saúde
- Ação Solidária Adventista (ASA)
- Liberdade Religiosa
- Ministério Universitário
- Ministério de Recepção

### Clubes

- Clube de Aventureiros
- Clube de Desbravadores

## 🔐 Privacidade

- Todos os dados são armazenados localmente no navegador
- Nenhuma informação é enviada para servidores externos
- Funciona completamente offline após o primeiro carregamento

## 📝 Próximos Passos

- [ ] Implementar sistema de votação
- [ ] Sistema de candidatos/membros
- [ ] Contagem automática de votos
- [ ] Geração de relatórios em PDF
- [ ] Exportação de dados em diferentes formatos
- [ ] Sistema de autenticação simples (opcional)
- [ ] Modo escuro

## 🤝 Contribuindo

Este projeto foi desenvolvido para auxiliar igrejas adventistas no processo de nomeações. Sugestões e melhorias são bem-vindas!

## 📄 Licença

Este projeto é de código aberto e está disponível para uso por igrejas adventistas.

---

**Desenvolvido para a Igreja Adventista do Sétimo Dia**
