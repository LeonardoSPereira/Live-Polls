<h1 align="center">Live Polls</h1>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]() <br><br>
[Português](#pt) / [English](#en)
</div>

---
# Português <a name = "pt"></a>

## 📝 Tabela de conteúdos

- [Sobre](#about_pt)
- [Iniciando a aplicação](#getting_started_pt)
- [Usando](#usage_pt)
- [Estrutura do projeto](#project_structure_pt)
- [Tecnologias](#built_using_pt)

## 🧐 Sobre <a name = "about_pt"></a>
Esse projeto tem como objetivo criar uma aplicação de enquetes ao vivo, onde o usuário pode criar enquetes, votar e ver os resultados em tempo real. <br />
Ele foi criado durante o Next Level Week Expert da Rocketseat, na trilha de NodeJS.<br />
Foram utilizadas as tecnologias de TypeScript, NodeJS, PostgreSQL, Prisma, WebSockets e outros.<br />
Para o sistema de votação em tempo real, foi utilizado o WebSockets, que permite a comunicação em tempo real entre o servidor e o cliente, em integração com o Redis, que é um banco de dados em memória, para armazenar os resultados das votações.<br />
O sistema foi construído de forma a não permitir que um usuário vote mais de uma vez na mesma enquete, utilizando cookies para armazenar a informação de que o usuário já votou naquela enquete. Caso o usuário tente votar mais de uma vez na mesma opção, o sistema não aceitará o voto, mas caso o usuário tente votar em outra opção, o voto será aceito e o anterior será removido. 

## 🏁 Iniciando a aplicação <a name = "getting_started_pt"></a>
Essas instruções vão te permitir obter uma cópia do projeto e rodar a aplicação localmente para propósitos de desenvolvimento e teste.

### Pre-requisitos
- Primeiramente, é necessário ter o NodeJS instalado na máquina. Para isso, acesse o site oficial do NodeJS clicando [aqui](https://nodejs.org/) e siga as instruções de instalação para o seu sistema operacional.<br />
- Também é necessário ter o Docker instalado na máquina. Para isso, acesse o site oficial do Docker clicando [aqui](https://www.docker.com/) e siga as instruções de instalação para o seu sistema operacional.<br />
- Além disso, é necessário ter um aplicativo para testar requisições HTTP, que seja capaz de fazer requisições HTTP e requisições de WebSocket. Para isso, pode-se utilizar o Insomnia, Postman, Hoppscotch ou qualquer outro aplicativo de sua preferência.


### Instalação

1. Clone o repositório por meio do comando ou baixe o arquivo .zip e extraia o conteúdo:
```sh
git clone https://github.com/LeonardoSPereira/Live-Polls
```

2. Acesse a pasta do projeto

3. Instale as dependências do projeto
```sh
npm install
```

4. Rode o Docker para criar os containers do Postgres e do Redis
```sh
docker-compose up -d
```

5. Rode as migrations para criar as tabelas no banco de dados
```sh
npx prisma migrate dev
```

6. Rode o projeto
```sh
npm run dev
```

Para acessar o banco de dados PostgreSQL, o prisma possui um sistema de administração de banco de dados, que pode ser acessado por meio do seguinte comando:
```sh
npx prisma studio
```
com isso, será aberto um navegador com a interface do prisma, onde é possível visualizar e editar os dados do banco de dados.

## 🎈 Usando <a name="usage_pt"></a>
Para usar a aplicação, basta acessar o endereço http://localhost:3333 por meio do seu aplicativo de requisições. A partir daí, é possível criar enquetes, votar e ver os resultados em tempo real.

### Rotas da aplicação
- Criação de enquetes
  - Método: POST
  - Rota: **/polls**
  - Corpo da requisição:
    ```json
    {
      "title": "Título da enquete",
      "options": ["Opção 1", "Opção 2", "Opção 3"]
    }
    ```
  - Exemplo de resposta:
    ```json
    {
      "message": "Poll created successfully",
      "poll": {
        "id": "id da enquete",
        "title": "Título da enquete",
        "createdAt": "data de criação da enquete",
        "updatedAt": "data de atualização da enquete"
      }
    }
    ```

- Listagem de única enquete
  - Método: GET
  - Rota: **/polls/:pollId**
  - Parâmetros da requisição:
    - pollId: id da enquete que pode ser obtido na criação da enquete ou via acesso aos dados no banco de dados
  - Corpo da requisição: Não é necessário
  - Exemplo de resposta:
    ```json
    {
      "poll": {
        "id": "id da enquete",
        "title": "Título da enquete",
        "options": [
          {
            "id": "id da opção",
            "title": "Título da opção",
            "votes": "quantidade de votos na opção"
          },
          {
            "id": "id da opção",
            "title": "Título da opção",
            "votes": "quantidade de votos na opção"
          },
          {
            "id": "id da opção",
            "title": "Título da opção",
            "votes": "quantidade de votos na opção"
          }
        ]
      }
    }
    ```

- Votação em enquete
  - Método: POST
  - Rota: **/polls/:pollId/votes**
  - Parâmetros da requisição:
    - pollId: id da enquete que pode ser obtido na criação da enquete ou via acesso aos dados no banco de dados
  - Corpo da requisição:
    ```json
    {
      "pollOptionId": "id da opção que o usuário deseja votar"
    }
    ```
  - Exemplo de resposta:
    ```json
    {
      "message": "Vote registered successfully",
    }
    ```

- Request de WebSocket para atualização em tempo real dos resultados
  - Método: WebSocket
  - Rota: **/polls/:pollId/results**
  - Parâmetros da requisição:
    - pollId: id da enquete que pode ser obtido na criação da enquete ou via acesso aos dados no banco de dados
  - Corpo da requisição: Não é necessário
  - A cada voto, o servidor enviará uma mensagem com os resultados atualizados para o cliente

## 📁 Estrutura do projeto <a name = "project_structure_pt"></a>
A estrutura do projeto é a seguinte:

```
├── prisma: pasta onde se encontram os arquivos de configuração do prisma, juntamente com as migrations e os modelos do banco de dados.

├── src: pasta onde se encontram os arquivos da aplicação.
│   ├── http: pasta onde se encontram os arquivos relacionados à API.

│   │   ├── routes: pasta onde se encontram os arquivos de rotas da aplicação.
│   │   │   ├── create-polls.ts: arquivo de rota para criação de enquetes.
│   │   │   ├── get-poll.ts: arquivo de rota para listagem de enquetes.
│   │   │   ├── vote-on-poll.ts: arquivo de rota para votação em enquetes.

│   │   ├── ws: pasta onde se encontram os arquivos relacionados ao WebSocket.
│   │   │   ├── poll-results.ts: arquivo de WebSocket para atualização em tempo real dos resultados das enquetes.

│   │   ├── server.ts: arquivo de configuração do servidor.

│   ├── lib: pasta onde se encontram os arquivos de configuração e exportação de funções auxiliares.
│   │   ├── prisma.ts: arquivo de configuração do prisma.
│   │   ├── redis.ts: arquivo de configuração do Redis.

│   ├── utils: pasta onde se encontram os arquivos de funções auxiliares.
│   │   ├── voting-pub-sub.ts: arquivo de configuração do PubSub para atualização em tempo real dos resultados das enquetes.
```

## ⛏️ Tecnologias <a name = "built_using_pt"></a>
- [TypeScript](https://www.typescriptlang.org/) - Linguagem de programação
- [NodeJS](https://nodejs.org/) - Ambiente de execução
- [Fastify](https://www.fastify.io/) - Framework
- [Prisma](https://www.prisma.io/) - ORM
- [PostgreSQL](https://www.postgresql.org/) - Banco de dados
- [Redis](https://redis.io/) - Banco de dados em memória
- [WebSockets](https://developer.mozilla.org/pt-BR/docs/Web/API/WebSockets) - Protocolo de comunicação em tempo real
- [Docker](https://www.docker.com/) - Plataforma de containers
- [Zod](https://zod.dev) - Validação de dados para o TypeScript

---
# English <a name = "en"></a>

## 📝 Table of Contents <a name = "en"></a>
- [About](#about_en)
- [Getting Started](#getting_started_en)
- [Usage](#usage_en)
- [Project Structure](#project_structure_en)
- [Technologies](#built_using_en)

## 🧐 About <a name = "about_en"></a>
This project aims to create a live polling application, where the user can create polls, vote and see the results in real time. <br />
It was created during the Next Level Week Expert by Rocketseat, in the NodeJS track.<br />
The technologies used were TypeScript, NodeJS, PostgreSQL, Prisma, WebSockets and others.<br />
For the real-time voting system, WebSockets were used, which allows real-time communication between the server and the client, integrated with Redis, which is an in-memory database, to store the results of the votes.<br />
The system was built in such a way that it does not allow a user to vote more than once in the same poll, using cookies to store the information that the user has already voted in that poll. If the user tries to vote more than once in the same option, the system will not accept the vote, but if the user tries to vote in another option, the vote will be accepted and the previous one will be removed.

## 🏁 Getting Started <a name = "getting_started_en"></a>
These instructions will allow you to get a copy of the project and run the application locally for development and testing purposes.

### Prerequisites
- First, you need to have NodeJS installed on your machine. To do this, access the official NodeJS website by clicking [here](https://nodejs.org/) and follow the installation instructions for your operating system.<br />
- You also need to have Docker installed on your machine. To do this, access the official Docker website by clicking [here](https://www.docker.com/) and follow the installation instructions for your operating system.<br />
- In addition, you need to have an application to test HTTP requests, which is capable of making HTTP requests and WebSocket requests. For this, you can use Insomnia, Postman, Hoppscotch or any other application of your choice.

### Installation
1. Clone the repository using the command or download the .zip file and extract the contents:
```sh
git clone https://github.com/LeonardoSPereira/Live-Polls
```

2. Access the project folder

3. Install the project dependencies
```sh
npm install
```

4. Run Docker to create the Postgres and Redis containers
```sh
docker-compose up -d
```

5. Run the migrations to create the tables in the database
```sh
npx prisma migrate dev
```

6. Run the project
```sh
npm run dev
```

To access the PostgreSQL database, prisma has a database administration system, which can be accessed through the following command:
```sh
npx prisma studio
```
with that, a browser will open with the prisma interface, where you can view and edit the database data.

## 🎈 Usage <a name="usage_en"></a>
To use the application, just access the address http://localhost:3333 through your request application. From there, you can create polls, vote and see the results in real time.

### Application routes
- Poll creation
  - Method: POST
  - Route: **/polls**
  - Request body:
    ```json
    {
      "title": "Poll title",
      "options": ["Option 1", "Option 2", "Option 3"]
    }
    ```
  - Example response:
    ```json
    {
      "message": "Poll created successfully",
      "poll": {
        "id": "poll id",
        "title": "Poll title",
        "createdAt": "poll creation date",
        "updatedAt": "poll update date"
      }
    }
    ```

- Single poll listing
  - Method: GET
  - Route: **/polls/:pollId**
  - Request parameters:
    - pollId: poll id that can be obtained when creating the poll or by accessing the data in the database
  - Request body: Not required
  - Example response:
    ```json
    {
      "poll": {
        "id": "poll id",
        "title": "Poll title",
        "options": [
          {
            "id": "option id",
            "title": "Option title",
            "votes": "number of votes in the option"
          },
          {
            "id": "option id",
            "title": "Option title",
            "votes": "number of votes in the option"
          },
          {
            "id": "option id",
            "title": "Option title",
            "votes": "number of votes in the option"
          }
        ]
      }
    }
    ```

- Poll voting
  - Method: POST
  - Route: **/polls/:pollId/votes**
  - Request parameters:
    - pollId: poll id that can be obtained when creating the poll or by accessing the data in the database
  - Request body:
    ```json
    {
      "pollOptionId": "id of the option the user wants to vote for"
    }
    ```
  - Example response:
    ```json
    {
      "message": "Vote registered successfully",
    }
    ```

- WebSocket request for real-time update of results
  - Method: WebSocket
  - Route: **/polls/:pollId/results**
  - Request parameters:
    - pollId: poll id that can be obtained when creating the poll or by accessing the data in the database
  - Request body: Not required
  - With each vote, the server will send a message with the updated results to the client


## 📁 Project Structure <a name = "project_structure_en"></a>
The project structure is as follows:

```
├── prisma: folder where the prisma configuration files, migrations and database models are located.

├── src: folder where the application files are located.
│   ├── http: folder where the files related to the API are located.

│   │   ├── routes: folder where the application routes files are located.
│   │   │   ├── create-polls.ts: route file for poll creation.
│   │   │   ├── get-poll.ts: route file for poll listing.
│   │   │   ├── vote-on-poll.ts: route file for poll voting.

│   │   ├── ws: folder where the WebSocket files are located.
│   │   │   ├── poll-results.ts: WebSocket file for real-time update of poll results.

│   │   ├── server.ts: server configuration file.

│   ├── lib: folder where the configuration files and export of auxiliary functions are located.
│   │   ├── prisma.ts: prisma configuration file.
│   │   ├── redis.ts: Redis configuration file.

│   ├── utils: folder where the auxiliary functions files are located.
│   │   ├── voting-pub-sub.ts: PubSub configuration file for real-time update of poll results.
```

## ⛏️ Technologies <a name = "built_using_en"></a>
- [TypeScript](https://www.typescriptlang.org/) - Programming language
- [NodeJS](https://nodejs.org/) - Execution environment
- [Fastify](https://www.fastify.io/) - Framework
- [Prisma](https://www.prisma.io/) - ORM
- [PostgreSQL](https://www.postgresql.org/) - Database
- [Redis](https://redis.io/) - In-memory database
- [WebSockets](https://developer.mozilla.org/pt-BR/docs/Web/API/WebSockets) - Real-time communication protocol
- [Docker](https://www.docker.com/) - Containers platform
- [Zod](https://zod.dev) - Data validation for TypeScript
