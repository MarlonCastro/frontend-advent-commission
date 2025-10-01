# 📖 Instruções de Uso - Sistema de Votação IASD

## 🎯 Visão Geral

Este sistema foi desenvolvido para auxiliar no processo de **Comissão de Nomeações** da Igreja Adventista do Sétimo Dia. Ele permite organizar, visualizar e gerenciar as nomeações para os diversos ministérios e cargos da igreja.

## 🏗️ Estrutura Implementada

### ✅ Funcionalidades Atuais

1. **Lista Completa de Ministérios**

   - 23 ministérios e departamentos cadastrados
   - Organizados por categorias: Liderança, Ministérios e Clubes
   - Cada ministério com descrição detalhada
   - Explicação completa das responsabilidades

2. **Estrutura de Cargos**

   - **Ancionato**: Múltiplos anciãos (1º, 2º, 3º, 4º)
   - **Diaconato**: Diretores de Diáconos e Diaconisas (com associados)
   - **Secretaria**: 1º e 2º Secretário(a)
   - **Tesouraria**: 1º e 2º Tesoureiro(a)
   - **Demais Ministérios**: Diretor e Diretor Associado
   - **Exceções**: Aventureiros, Desbravadores e Ancionato (estrutura própria)

3. **Interface Responsiva**

   - Funciona em desktop, tablet e smartphone
   - Design moderno e intuitivo
   - Navegação fácil

4. **Armazenamento Local**
   - Todos os dados salvos no navegador (localStorage)
   - Não precisa de internet após carregar
   - Privacidade total (nada é enviado para servidores)

## 📱 Como Usar

### Navegação

#### Página Inicial (Home)

- Apresentação do sistema
- Acesso rápido às funcionalidades
- Informações sobre privacidade

#### Página de Ministérios

- Lista completa de todos os ministérios
- Filtros por categoria:
  - **Todos**: Visualizar todos de uma vez
  - **Liderança**: Ancionato, Diaconato, Secretaria, Tesouraria
  - **Ministérios**: Todos os departamentos
  - **Clubes**: Aventureiros e Desbravadores
- Clique em cada ministério para ver:
  - Descrição detalhada
  - Responsabilidades
  - Lista de cargos disponíveis

#### Página de Resultados

- _Em desenvolvimento_
- Futuramente terá:
  - Sistema de votação
  - Contagem de votos
  - Geração de relatórios PDF

## 📋 Ministérios Cadastrados

### Liderança da Igreja

1. **Ancionato** - Liderança espiritual e administrativa
2. **Diaconato** - Serviços práticos da igreja
3. **Secretaria** - Documentação e registros
4. **Tesouraria** - Administração financeira

### Ministérios Departamentais

5. **Escola Sabatina** - Educação religiosa
6. **Ministério Pessoal** - Evangelização
7. **Ministério Jovem** - Jovens 16-35 anos
8. **Ministério da Criança** - Crianças
9. **Ministério do Adolescente** - Adolescentes 13-17
10. **Ministério da Mulher** - Mulheres
11. **Ministério do Homem** - Homens
12. **Ministério da Família** - Famílias
13. **Ministério da Música** - Liturgia musical
14. **Ministério da Comunicação** - Comunicação e mídia
15. **Mordomia Cristã** - Administração de recursos
16. **Ministério de Publicações** - Literatura evangelística
17. **Ministério da Educação** - Educação adventista
18. **Ministério da Saúde** - Saúde e bem-estar
19. **ASA** - Ação Solidária Adventista
20. **Liberdade Religiosa** - Defesa da liberdade de culto
21. **Ministério Universitário** - Universitários
22. **Ministério de Recepção** - Acolhimento

### Clubes

23. **Clube de Aventureiros** - Crianças 6-9 anos
24. **Clube de Desbravadores** - Jovens 10-15 anos

## 🔧 Comandos Disponíveis

\`\`\`bash

# Executar em modo desenvolvimento

yarn dev

# Fazer build para produção

yarn build

# Visualizar build localmente

yarn preview

# Verificar código (linter)

yarn lint

# Deploy no GitHub Pages

yarn deploy
\`\`\`

## 💡 Dicas de Uso

### Para a Comissão de Nomeações

1. **Antes da Reunião**

   - Revise todos os ministérios
   - Entenda as responsabilidades de cada cargo
   - Prepare lista de possíveis candidatos

2. **Durante a Reunião**

   - Use a página de Ministérios para consulta rápida
   - Mosre as descrições para esclarecer dúvidas
   - _Em breve_: Registre as votações no sistema

3. **Após a Reunião**
   - _Em breve_: Gere relatórios em PDF
   - _Em breve_: Exporte dados para apresentação

### Confidencialidade

- Lembre-se: debates da comissão são confidenciais
- Não tire prints com nomes de candidatos
- Use o sistema apenas para consulta e organização

## 🔜 Próximas Funcionalidades

As seguintes features estão planejadas:

### Fase 2 - Sistema de Candidatos

- [ ] Cadastro de membros elegíveis
- [ ] Lista de candidatos por cargo
- [ ] Informações dos candidatos

### Fase 3 - Sistema de Votação

- [ ] Interface de votação por cargo
- [ ] Múltiplas opções por cargo
- [ ] Contagem automática de votos
- [ ] Registro de votos no localStorage

### Fase 4 - Relatórios

- [ ] Geração de PDF com resultados
- [ ] Relatório por ministério
- [ ] Relatório geral
- [ ] Ata da comissão
- [ ] Exportação em Excel

### Fase 5 - Recursos Adicionais

- [ ] Histórico de nomeações anteriores
- [ ] Período de mandato
- [ ] Lembretes de renovação
- [ ] Modo escuro
- [ ] Impressão otimizada

## 🆘 Suporte

### Problemas Comuns

**Dados não estão salvando**

- Verifique se o navegador permite localStorage
- Não use modo anônimo/privado
- Limpe o cache e tente novamente

**Página não carrega**

- Verifique sua conexão de internet (primeiro acesso)
- Limpe o cache do navegador
- Tente outro navegador

**Layout quebrado**

- Atualize a página (Ctrl/Cmd + Shift + R)
- Verifique se está usando navegador moderno
- Teste em outro dispositivo

## 📞 Contato

Para sugestões de melhorias ou reportar problemas:

- Abra uma issue no GitHub
- Entre em contato com o desenvolvedor
- Envie feedback através da igreja

---

**Desenvolvido com ❤️ para a Igreja Adventista do Sétimo Dia**
