# PokeApp - Aplicativo Pokémon com Ionic e Angular

[![Ionic Version](https://img.shields.io/badge/Ionic-8.0.0-3880FF.svg)](https://ionicframework.com/)
[![Angular Version](https://img.shields.io/badge/Angular-19.0.0-DD0031.svg)](https://angular.io/)

## Visão Geral

Aplicativo móvel que consome a PokeAPI para exibir informações sobre Pokémons, com funcionalidades de listagem, detalhes e favoritos.

## Funcionalidades Principais

- Listagem de Pokémons com paginação infinita
- Tela de detalhes com informações completas
- Sistema de favoritos persistente
- Interface responsiva para mobile
- Integração completa com a PokeAPI

## Tecnologias Utilizadas

### Dependências Principais
- ![Ionic](https://img.shields.io/badge/-Ionic-3880FF?logo=ionic&logoColor=white) `@ionic/angular` ^8.0.0
- ![Angular](https://img.shields.io/badge/-Angular-DD0031?logo=angular&logoColor=white) `@angular/core` ^19.0.0
- ![RxJS](https://img.shields.io/badge/-RxJS-B7178C?logo=reactivex&logoColor=white) `rxjs` ~7.8.0
- ![Axios](https://img.shields.io/badge/-Axios-5A29E4?logo=axios&logoColor=white) `axios` ^1.10.0
- ![Ionic Storage](https://img.shields.io/badge/-Ionic_Storage-3880FF?logo=ionic&logoColor=white) `@ionic/storage-angular` ^4.0.0

### Dependências de Desenvolvimento
- ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white) `typescript` ~5.6.3
- ![Jasmine](https://img.shields.io/badge/-Jasmine-8A4182?logo=jasmine&logoColor=white) `jasmine-core` ~5.1.0
- ![ESLint](https://img.shields.io/badge/-ESLint-4B32C3?logo=eslint&logoColor=white) `eslint` ^9.16.0

## Arquitetura e Padrões

- **Injeção de Dependência**: Todos os serviços são injetados nos componentes
- **Armazenamento Local**: Uso do `@ionic/storage-angular` para persistência de favoritos
- **Componentização**: UI dividida em componentes reutilizáveis
- **Gestão de Estado**: Serviços dedicados para gerenciar o estado da aplicação
- **Responsividade**: Layout adaptável a diferentes tamanhos de tela

## Como Executar o Projeto

### Pré-requisitos
- Node.js 18+
- npm 9+
- Ionic CLI 8+

### Instalação
```bash
# Clonar o repositório
git clone [URL_DO_REPOSITORIO]

# Instalar dependências
npm install

# Executar o servidor de desenvolvimento
ionic serve