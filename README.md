# Pokédex Ionic
Aplicativo desenvolvido com Ionic 8 + Angular 19 que consome a [PokeAPI](https://pokeapi.co/) para exibir uma lista paginada de Pokémons, com possibilidade de ver detalhes e marcar como favoritos. Interface responsiva com busca por nome, menu lateral e armazenamento local.

# Funcionalidades
- Listagem paginada dos Pokémons (foi feito um scroll infinito, para sempre que chegar ao fim da tela ele carregar mais Pokémons na lista).
- Busca por nome com filtro direto na API (O nome tem que ser exato caso contrário não funciona - isto é um limite da [API](https://pokeapi.co/) ).
- Tela de detalhes com informações e imagens.
- Sistema de favoritos com persistência local.
- Menu lateral para navegação (Interessante para adicionar mais opções futuramente a aplicação além de facilitar navegação do usuário).
- Interface 100% responsiva com Ionic. (foquei muito numa ideia mais mobile, mas funciona em todas as telas)

# Importante -> Como rodar o projeto
## 1. Instale os requisitos
Você precisa ter o [Node.js](https://nodejs.org/pt) e o Ionic CLI instalados:
>> npm install -g @ionic/cli

## 2. Clone o repositório
>> git clone git@github.com:Jeffbreno/pokeapi.git
>> cd pokeapi 

## 3. Instale as dependências
>> npm install

## 4. Rode a aplicação
>> ionic serve

# Considerações
O projeto foi criado para exemplificar domínio do framework ionic com angular
Todo os requisitos pedidos da lista foram implementados com foco em clareza, sempre deixei algumas partes principais como os serviços, bem comentado para melhor entendimento do que foi feito
