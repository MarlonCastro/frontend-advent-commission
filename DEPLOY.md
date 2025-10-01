# 🚀 Guia de Deploy - GitHub Pages

## Pré-requisitos

1. Ter o Git instalado
2. Ter uma conta no GitHub
3. Node.js e Yarn instalados

## Passo a Passo para Deploy

### 1. Inicializar o Repositório Git

\`\`\`bash
# Se ainda não inicializou o git
git init

# Adicionar todos os arquivos
git add .

# Fazer o commit inicial
git commit -m "Initial commit: Sistema de Votação IASD"
\`\`\`

### 2. Criar Repositório no GitHub

1. Acesse [GitHub](https://github.com)
2. Clique em "New Repository"
3. Nome sugerido: `sistema-votacao-iasd`
4. Deixe como **público**
5. **NÃO** adicione README, .gitignore ou licença (já temos)
6. Clique em "Create Repository"

### 3. Conectar com o Repositório Remoto

\`\`\`bash
# Adicionar o remote (substitua SEU_USUARIO e SEU_REPOSITORIO)
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git

# Ou se preferir SSH:
git remote add origin git@github.com:SEU_USUARIO/SEU_REPOSITORIO.git

# Fazer push da branch main
git branch -M main
git push -u origin main
\`\`\`

### 4. Fazer o Deploy

\`\`\`bash
# Executar o deploy (isso fará o build e publicará automaticamente)
yarn deploy
\`\`\`

Este comando vai:
- Executar `yarn build` automaticamente
- Criar uma branch `gh-pages`
- Fazer push da pasta `dist` para essa branch

### 5. Configurar GitHub Pages (se necessário)

1. No GitHub, vá para o seu repositório
2. Clique em **Settings** (Configurações)
3. No menu lateral, clique em **Pages**
4. Em **Source**, selecione a branch `gh-pages`
5. Clique em **Save**

### 6. Acessar o Site

Após alguns minutos, seu site estará disponível em:

\`\`\`
https://SEU_USUARIO.github.io/SEU_REPOSITORIO/
\`\`\`

## Atualizações Futuras

Sempre que fizer alterações:

\`\`\`bash
# 1. Adicionar as mudanças
git add .

# 2. Fazer commit
git commit -m "Descrição das alterações"

# 3. Push para o GitHub
git push

# 4. Fazer novo deploy
yarn deploy
\`\`\`

## Solução de Problemas

### Página em branco após deploy

Se a página aparecer em branco:

1. Verifique se o `base` no `vite.config.ts` está correto
2. Se o repositório se chama `sistema-votacao-iasd`, o base deve ser:
   \`\`\`typescript
   base: '/sistema-votacao-iasd/',
   \`\`\`
3. Se preferir que funcione em qualquer lugar:
   \`\`\`typescript
   base: './',
   \`\`\`

### Erro 404 ao navegar

Se funciona na home mas dá erro 404 em outras páginas:

1. Crie um arquivo `dist/404.html` que seja cópia do `dist/index.html`
2. Ou use Hash Router ao invés de Browser Router (já implementado)

### Deploy falhou

\`\`\`bash
# Limpar cache do gh-pages
rm -rf node_modules/.cache/gh-pages

# Tentar novamente
yarn deploy
\`\`\`

## Domínio Personalizado (Opcional)

Se você tem um domínio próprio:

1. Crie um arquivo `public/CNAME` com seu domínio:
   \`\`\`
   www.seudominio.com.br
   \`\`\`

2. Configure o DNS do seu domínio:
   - Tipo: `CNAME`
   - Nome: `www`
   - Valor: `SEU_USUARIO.github.io`

3. No GitHub Pages settings, adicione o custom domain

## Verificar Build Localmente

Antes de fazer deploy, você pode testar o build localmente:

\`\`\`bash
# Fazer o build
yarn build

# Visualizar o build
yarn preview
\`\`\`

Acesse `http://localhost:4173` para ver como ficará em produção.

---

**Dica**: Sempre teste localmente antes de fazer deploy! 🚀

