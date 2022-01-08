# Back-end Challenge 🏅 2021 - Space Flight News #

# Introdução #

Esse projeto é a realização de um desafio da Coodesh, o qual fora desenvolvida uma API REST ulitlizando o Framework Nest.JS e o banco de dados não-relacional MongoDB.

## Tecnologias ##

- [MongoDB](https://www.mongodb.com/)
- [Node.js](https://nodejs.org/en/)
	- [Nest (Node.js Web Framework)](https://nestjs.com/) 
	- [Typescript](https://www.typescriptlang.org/)
	- [pnpm](https://pnpm.io/)
	- [Axios](https://github.com/axios/axios)
	- [Joi](https://joi.dev/)
	- [Passport](passportjs.org/)
	- [Eslint](https://eslint.org/)
	- [Prettier](https://prettier.io/)
	- [Jest](https://jestjs.io/)
	- [Sha3](https://www.npmjs.com/package/sha3)
- [Swagger](https://swagger.io/)
- [ULID](https://medium.com/@victoryosayi/ulid-universally-unique-lexicographically-sortable-identifier-d75c253bc6a8)
- [Docker](https://www.docker.com/)

# Execução #
Esse projeto pode ser executado de duas formas, através do Docker, facilitado pelo arquivo *compose* na raíz do projeto:

```bash
$ docker-compose up
```

Ou por meio do npm, que pode ser executado na raíz da pasta *space-flight-news* da seguinte forma:

```bash
$ npm install
```

Para execução em ambiente de desenvolvimento:

```bash
$ npm run start:dev
```

Para execução em ambiente de produção:

```bash
$ npm run build && npm run start:prod
```

## Documentação ##
Para acessar a documentação da API, se os passos anteriores foram executados com sucesso, o acesso estará disponível em: [http://localhost:3000/api](http://localhost:3000/api)

# Testes #

Para execução dos testes, na raíz da pasta *space-flight-news*, execute o seguinte comando:

```bash
$ npm run test
```

> This is a challenge by Coodesh

