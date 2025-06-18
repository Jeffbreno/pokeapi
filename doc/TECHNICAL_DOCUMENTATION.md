Obs.: Documento formatado pelo word

# Documentação Técnica - Pokédex Ionic + Angular
**Visão Geral
Este projeto é uma aplicação mobile desenvolvida com Ionic 8 e Angular, que consome a PokeAPI para listar, buscar, visualizar detalhes e favoritar Pokémons.**
## Tecnologias Utilizadas
- Ionic 8 com Angular Standalone Components
- TypeScript
- Ionic Storage para persistência local
- PokeAPI como backend RESTful
- NgModel para Two-Way Binding
- SCSS para estilização
## Estrutura de Pastas
>> src/app/ (Raiz)
# Componentes reutilizáveis como menu lateral
>> components/
# Páginas principais (home, detalhes, favoritos)
>> pages/
# Serviços (Comunicação com a API & Favoritos - Storage)
>> services/
# Rotas utilizadas na aplicação
>> app.routes.ts     
## Páginas
- HomePage: Lista os Pokémons com botão de favoritar, menu lateral e busca.
- DetailsPage: Exibe informações detalhadas do Pokémon (altura, peso, tipos, sprites, podendo favoritar na tela também, etc).
- FavoritesPage: Lista apenas os Pokémons marcados como favoritos, podendo remover da lista com botão “remover".
## Componentes
- MenuComponent: Componente standalone usado para criar o menu lateral com navegação entre telas.
Obs.: Pelo porte da aplicação não foram desenvolvidos mais componentes pela falta de necessidade maior
Serviços
- poke-api.service.ts: Realiza requisições HTTP para listar Pokémons e obter detalhes.
- favorites.service.ts: Gerencia o armazenamento local dos Pokémons favoritados usando Ionic Storage.
## Funcionalidades
- Busca por nome (sensível à grafia correta)
- Paginação controlada de forma automática ao rolar o final da tela 
- Marcar/Desmarcar favoritos com persistência local
- Navegação entre páginas via RouterModule
- Menu lateral acessível em todas as telas
## Responsividade
A aplicação foi testada em dispositivos móveis no modo retrato e paisagem, com layout adaptativo via Ionic Framework, além de funcionar normalmente em navegador comum, mas com aparência desfavorável.
Boas Práticas Adotadas
- Components e Services standalone para melhor modularização (tendo em vista também a praticidade pelo porte do projeto)
- Tipagem forte com TypeScript (Não foi tão acentuada, mas bem utilizada onde necessário)
- Injeção de dependência via construtores (DI)
- Commit semântico e frequente (Faltante neste projeto)
## Requisitos Atendidos
- Tela principal com nome e imagem
- Tela de detalhes com múltiplas informações
- Paginação com carregamento progressivo
- Busca por nome
- Marcar Pokémon como favorito
- Menu de navegação lateral
- Responsividade e UX mobile
- Projeto versionado no GitHub com README explicativo
## Diferenciais em Execução
- Documentação técnica (este arquivo)
- Mídia (GIFs ou vídeos) no repositório
________________________________________
Autor: Jefferson Lopes
Data: 18 de Junho de 2025

