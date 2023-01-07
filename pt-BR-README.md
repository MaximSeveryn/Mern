# Node Task Manager RESTful API

Uma API RESTful para guardar e organizar suas tarefas. Ainda é uma API segura porque conta com autenticação, não deixando outros usuários acessarem suas tarefas

### Ferramentas

- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Nodemon](https://nodemon.io/)
- [Validator](https://www.npmjs.com/package/validator)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [JSON Web Token](https://www.npmjs.com/package/jsonwebtoken)
- [SendGrid](https://sendgrid.com/)
- [Jest](https://jestjs.io/)
- [SuperTest](https://www.npmjs.com/package/supertest)
- [Multer](https://github.com/expressjs/multer/)

## Table de conteúdos

**Observação: Essa applicação está disponível no Heroku. Se você quiser usar pelo Heroku, você pode pular e a configuração.**

- [Configuração (Opcional)](#configuração)
  - [Dependências](#dependências)
  - [Instalando](#instalando)
  - [Rodando os testes](#rodando-os-testes)
  - [Rodando a API](#rodando-a-api)
- [Todos os Endpoints](#todos-os-endpoints)
  - [URL base](#url-base)
  - [Endpoints de Usuários](#endpoints-de-usuarios)
  - [Endpoints de Tarefas](#endpoints-de-tarefas)
- [Como usar os Endpoints de Usuários](#como-usar-os-endpoints-de-usuarios)
  - [Criar novo usuário](#criar-novo-usuário)
  - [Login de um usuário](#login-de-um-usuário)
  - [Atualizar informações do usuário](#atualizar-informações-do-usuário)
  - [Buscar perfil de um usuário logado](#buscar-perfil-de-um-usuário-logado)
  - [Buscar perfil de usuário pelo ID](#buscar-perfil-de-usuário-pelo-id)
  - [Upload do avatar de usuário logado](#upload-do-avatar-de-usuário-logado)
  - [Buscar o avatar do usuário logado](#buscar-o-avatar-do-usuário-logado)
  - [Buscar avatar de um usuário pelo ID](#buscar-avatar-de-um-usuário-pelo-id)
  - [Deslogar usuário](#deslogar-usuário)
  - [Deslogar usuário de todos os aparelhos](#deslogar-usuário-de-todos-os-aparelhos)
  - [Deletar avatar do usuário logado](#deletar-avatar-do-usuário-logado)
  - [Deletar usuário logado](#deletar-usuário-logado)
- [Como usar os Endpoints de Tarefas](#como-usar-os-endpoints-de-tarefas)
  - [Criar nova tarefa para um usuário logado](#criar-nova-tarefa-para-um-usuário-logado)
  - [Buscar todas as tarefas de um usuário logado](#buscar-todas-as-tarefas-de-um-usuário-logado)
    - [Ordenando as tarefas](#ordenando-as-tarefas)
    - [Paginação de tarefas](#paginação-de-tarefas)
    - [Exemplos](#exemplos)
  - [Buscar tarefas por ID de um usuário logado](#buscar-tarefas-por-id-de-um-usuário-logado)
  - [Atualizar tarefas por ID de um usuário logado](#atualizar-tarefas-por-id-de-um-usuário-logado)
  - [Deletar tarefas por ID de um usuário logado](#deletar-tarefas-por-id-de-um-usuário-logado)
- [Autor](#autor)
  

## Configuração

### Dependências

```
Node
Mongodb
```

### Instalando

Clone o projeto:
```
$ git clone https://github.com/Lukazovic/node-task-manager-api.git
```

Entre na pasta do projeto::
```
$ cd node-task-manager-api
```

Instalando as dependências do projeto:
```
$ npm install
```

**Observação: Você precisará de algumas variáveis de ambiente para configurar o projeto, se quiser iniciar o servidor ou rodar os testes.**

Primeiro crie uma pasta `config` na raiz do projeto:
```
$ mkdir config
```

**To setup the server environment**: You will have to create a file at ``./config`` called ``dev.env`` and configure as the example bellow:
**Para configurar as variáveis de ambiente:** Você terá que criar um arquivo chamado `dev.env` na pasta `./config` e configurar como no exemplo abaixo:
```
PORT=<Número-da-Porta>
SENDGRID_API_KEY=<Chave-da-API-do-Sendgrip>
MONGODB_URL=mongodb://127.0.0.1:27017/<Nome-do-banco-de-dados>
JWT_SECRET=<Palavra-chave-para-JWT>
```
  - **Número-da-Porta:** Uma porta para acessar o servidor ``(exemplo: PORT=3000)``;
  - **Chave-da-API-do-Sendgrip:** Uma chave provida pelo [SendGrid](https://sendgrid.com/) assim podendo mandar emails diretamente pela aplicação.
  - **Nome-do-banco-de-dados:** O nome para o Banco de Dados ``(exemplo: node-task-manager-api)``;
  - **Palavra-chave-para-JWT:** Uma palavra secreta para gerar tokens JWT para a API ``(exemplo: minhachavesecreta)``.

**Para configurar o ambiente de testes:** Você precisará criar um arquivo  ``test.env`` na pasta ``./config`` e configurar como no exemplo acima **EXCETO o Nome-do-banco-de-dados que você deve trocar o nome ``(exemplo: node-task-manager-test-api)``;**

### Rodando os testes
```
$ npm run test
```

### Rodando a API

Para rodar a API (na pasta do projeto):
```
$ npm run start
```

> Acesse em: localhost:**Número-da-Porta**

## Todos os Endpoints

### URL Base

- [https://task-manager-node-rest-api.herokuapp.com/](https://task-manager-node-rest-api.herokuapp.com/)

### Endpoints de Usuários:

- POST: `/users` - Criar novo usuário
- POST: `/users/login` - Login de um usuário
- PATCH: `/users/me` - Atualizar informações do usuário
- GET : `/users/me` - Buscar perfil de um usuário logado
- GET: `/users/<id>` - Buscar perfil de usuário pelo ID
- POST: `/users/me/avatar` - Upload do avatar de usuário logado
- GET: `/users/me/avatar` - Buscar o avatar do usuário logado
- GET: `/users/<id>/avatar` - Buscar avatar de um usuário pelo ID
- POST: `/users/logout` - Deslogar usuário
- POST: `/users/logoutAll` - Deslogar usuário de todos os aparelhos
- DELETE: `/users/me/avatar` - Deletar avatar do usuário logado
- DELETE: `/users/me` - Deletar usuário logado

### Endpoints de Tarefas:

- POST: `/tasks` - Criar nova tarefa para um usuário logado
- GET: `/users` - Buscar todas as tarefas de um usuário logado
- GET : `/tasks/<id>` - Buscar tarefas por ID de um usuário logado
- PATCH: `/tasks/<id>` - Atualizar tarefas por ID de um usuário logado
- DELETE: `/tasks/<id>` - Deletar tarefas por ID de um usuário logado

## Como usar os Endpoints de Usuários

### Criar novo usuário

#### Método:

- POST: `/users`

#### URL Exemplo

> [https://task-manager-node-rest-api.herokuapp.com/users](https://task-manager-node-rest-api.herokuapp.com/users)

#### Parametros

|   Parametro   |       Descrição  |     Tipo     |   Necessário   |
| :------------: | :------------------: | :----------: | :----------: |
|      name      |   Nome do usuário        |    String    |     Sim     |
|      age       |   Idade do usuário         |    Integer   |     Não    |
|      email     |   Emial do usuário       |    String    |     Sim     |
|    password    |   Senha do usuário    |    String    |     Sim     |

##### Observação:

> **A senha precisa ter mais do que 7 caracteres e não pode conter a palavra: `password`**

##### JSON exemplo:

```json
{
	"name": "User Test",
	"age": 18,
	"email": "test@email.com",
	"password": "idontknow"
}
```

##### Observação:

> **Como resposta, você receberá um token JWT para poder autenticar o usuário quando precisar**
> Assim que um usuário for criado, a aplicação irá enviar um email para o email dele

##### Exemplo de resposta:

```json
{
    "user": {
        "age": 18,
        "_id": "5e6e0117bb997d0017c94f0d",
        "name": "User Test",
        "email": "test@email.com",
        "createdAt": "2020-03-15T10:19:03.027Z",
        "updatedAt": "2020-03-15T10:19:03.076Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTZlMDExN2JiOTk3ZDAwMTdjOTRmMGQiLCJpYXQiOjE1ODQyNjc1NDN9.aAvvkMcEaSeQxKyu6wDQXfQ1z4hM9zn1myJT8Iw689U"
}
```

### Login de um usuário

#### Método:

- POST: `/users/login`

#### URL Exemplo

> [https://task-manager-node-rest-api.herokuapp.com/users/login](https://task-manager-node-rest-api.herokuapp.com/users/login)

#### Parametros

|   Parametro   |       Descrição  |     Tipo     |   Necessário   |
| :------------: | :------------------: | :----------: | :----------: |
|      email     |   Email do usuário       |    String    |     Sim     |
|    password    |   Senha do usuário    |    String    |     Sim     |


##### JSON exemplo:

```json
{
	"email": "test@email.com",
	"password": "idontknow"
}
```

##### Observação:

> **Como resposta, você receberá um token JWT para poder autenticar o usuário quando precisar**

##### Exemplo de resposta:

```json
{
    "user": {
        "age": 18,
        "_id": "5e6e0117bb997d0017c94f0d",
        "name": "User Test",
        "email": "test@email.com",
        "createdAt": "2020-03-15T10:19:03.027Z",
        "updatedAt": "2020-03-15T10:29:26.514Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTZlMDExN2JiOTk3ZDAwMTdjOTRmMGQiLCJpYXQiOjE1ODQyNjgxNjZ9.MSTXSv6RHlZCSkc2HlMKHhr9vHS-4HV7NPHrG4JBkKs"
}
```

### Atualizar informações do usuário

#### Método:

- PATCH: `/users/me`

#### URL Exemplo

> [https://task-manager-node-rest-api.herokuapp.com/users/me](https://task-manager-node-rest-api.herokuapp.com/users/me)

#### Parametros

|   Parametro   |       Descrição  |     Tipo     |   Necessário   |
| :------------: | :------------------: | :----------: | :----------: |
|      name      |   Nome do usuário        |    String    |     Não    |
|      age       |   Idade do usuário         |    Integer   |     Não    |
|      email     |   Email do usuário       |    String    |     Não    |
|    password    |   Senha do usuário    |    String    |     Não    |
|  Authorization | Token do usuário | Bearer Token |     Sim     |

##### JSON exemplo:

```json
{
	"name": "User Test",
	"age": 18,
	"email": "test@email.com",
	"password": "idontknow"
}
```

### Buscar perfil de um usuário logado

#### Método:

- GET: `/users/me`

#### URL Exemplo

> [https://task-manager-node-rest-api.herokuapp.com/users/me](https://task-manager-node-rest-api.herokuapp.com/users/me)

#### Parametros

|   Parametro   |       Descrição  |     Tipo     |   Necessário   |
| :------------: | :------------------: | :----------: | :----------: |
|  Authorization | Token do usuário | Bearer Token |     Sim     |

### Buscar perfil de usuário pelo ID


#### Método:

- GET: `/users/<id>`
	- `<id> é a identificação do usuário`

#### URL Exemplo

> [https://task-manager-node-rest-api.herokuapp.com/users/5e6e0117bb997d0017c94f0d](https://task-manager-node-rest-api.herokuapp.com/users/5e6e0117bb997d0017c94f0d)

#### Parametros

|   Parametro   |       Descrição |   Tipo     |
| :------------: | :-----------------: | :--------: |
|      _id       |   ID do usuário         |   String   |

### Upload do avatar de usuário logado

#### Método:

- POST: `/users/me/avatar`

#### URL Exemplo

> [https://task-manager-node-rest-api.herokuapp.com/users/me/avatar](https://task-manager-node-rest-api.herokuapp.com/users/me/avatar)

#### Parametros

|   Parametro   |       Descrição  |     Tipo     |   Necessário   |
| :------------: | :------------------: | :----------: | :----------: |
|  Authorization | Token do usuário | Bearer Token |     Sim     |
|     avatar     |    Avatar do usuário     |  Form-Data   |     Sim     |

### Buscar o avatar do usuário logado

#### Método:

- GET: `/users/me/avatar`

#### URL Exemplo

> [https://task-manager-node-rest-api.herokuapp.com/users/me/avatar](https://task-manager-node-rest-api.herokuapp.com/users/me/avatar)

#### Parametros

|   Parametro   |       Descrição  |     Tipo     |   Necessário   |
| :------------: | :------------------: | :----------: | :----------: |
|  Authorization | Token do usuário | Bearer Token |     Sim     |

### Buscar avatar de um usuário pelo ID

#### Método:

- GET: `/users/<id>/avatar`
	- `<id> é a identificação do usuário`

#### URL Exemplo

> [https://task-manager-node-rest-api.herokuapp.com/users/5e6e0117bb997d0017c94f0d/avatar](https://task-manager-node-rest-api.herokuapp.com/users/5e6e0117bb997d0017c94f0d/avatar)

#### Parametros

|   Parametro   |       Descrição |   Tipo     |
| :------------: | :-----------------: | :--------: |
|      _id       |   ID do usuário         |   String   |

### Deslogar usuário

#### Método:

- POST: `/users/logout`

#### URL Exemplo

> [https://task-manager-node-rest-api.herokuapp.com/users/logout](https://task-manager-node-rest-api.herokuapp.com/users/logout)

#### Parametros

|   Parametro   |       Descrição  |     Tipo     |   Necessário   |
| :------------: | :------------------: | :----------: | :----------: |
|  Authorization | Token do usuário | Bearer Token |     Sim     |


### Deslogar usuário de todos os aparelhos

#### Método:

- POST: `/users/logoutAll`

#### URL Exemplo

> [https://task-manager-node-rest-api.herokuapp.com/users/logoutAll](https://task-manager-node-rest-api.herokuapp.com/users/logoutAll)

#### Parametros

|   Parametro   |       Descrição  |     Tipo     |   Necessário   |
| :------------: | :------------------: | :----------: | :----------: |
|  Authorization | Token do usuário | Bearer Token |     Sim     |


### Deletar avatar do usuário logado

#### Método:

- DELETE: `/users/me/avatar`

#### URL Exemplo

> [https://task-manager-node-rest-api.herokuapp.com/users/me/avatar](https://task-manager-node-rest-api.herokuapp.com/users/me/avatar)

#### Parametros

|   Parametro   |       Descrição  |     Tipo     |   Necessário   |
| :------------: | :------------------: | :----------: | :----------: |
|  Authorization | Token do usuário | Bearer Token |     Sim     |


### Deletar usuário logado

#### Método:

- DELETE: `/users/me`

#### URL Exemplo

> [https://task-manager-node-rest-api.herokuapp.com/users/me](https://task-manager-node-rest-api.herokuapp.com/users/me)

#### Parametros

|   Parametro   |       Descrição  |     Tipo     |   Necessário   |
| :------------: | :------------------: | :----------: | :----------: |
|  Authorization | Token do usuário | Bearer Token |     Sim     |

## Como usar os Endpoints de Tarefas

### Criar nova tarefa para um usuário logado

#### Método:

- POST: `/tasks`

#### URL Exemplo

> [https://task-manager-node-rest-api.herokuapp.com/tasks](https://task-manager-node-rest-api.herokuapp.com/tasks)

#### Parametros

|   Parametro   |      Descrição     |   Tipo     |   Necessário   |
| :------------: | :--------------------: | :--------: | :----------: |
|   description  |    Descrição da Tarefa |   String   |     Sim     |
|   completed    |    Situação da Tarefa    |   Boolean  |     Não    |

##### JSON exemplo:

```json
{
	"description": "Do a task",
	"completed": false
}
```

##### Exemplo de resposta:

```json
{
    "completed": false,
    "_id": "5e6e68914934ce0017892730",
    "description": "Do a task",
    "owner": "5e6e0117bb997d0017c94f0d",
    "createdAt": "2020-03-15T17:40:33.445Z",
    "updatedAt": "2020-03-15T17:40:33.445Z",
    "__v": 0
}
```

### Buscar todas as tarefas de um usuário logado

#### Método:

- GET: `/tasks`

#### URL Exemplo

> [https://task-manager-node-rest-api.herokuapp.com/tasks](https://task-manager-node-rest-api.herokuapp.com/tasks)

#### Ordenando as tarefas

Você pode ordenar as tarefas adicionando `?sortBy=completed:desc` à URL, para buscar todas as tarefas ordenando pelas não completadas primeiro.

Você pode buscar todas as tarefas ordenando para aparecerem primeiro as tarefas completadas adicionando `?sortBy=completed:asc` à URL.

#### Paginação de tarefas

You can get a limit of tasks by adding `?limit=10` to the URL so you will get 10 tasks.
Você pode limitar o número de tarefas adicionando `?limit=10` a URL, assim você receberá 10 tarefas.

Você pode pular as primeiras tarefas adicionando `?skip=10` à URL. Assim você pode usar páginação, limitando as tarefas que você recebe em cada requisição, e pulando algumas tarefas, adicionando `?limit=10&skip=10`

#### Exemplos

- Sorting tasks by completed:
- Ordenando tarefas por completadas:

> https://task-manager-node-rest-api.herokuapp.com/tasks?sortBy=completed:asc

- Ordenando tarefas por não completadas

> https://task-manager-node-rest-api.herokuapp.com/tasks?sortBy=completed:desc

- Buscar apenas as 10 primeiras tarefas:

> https://task-manager-node-rest-api.herokuapp.com/tasks?limit=10

- Pular as 10 primeiras tarefas:

> https://task-manager-node-rest-api.herokuapp.com/tasks?skip=10

- Paginação - Buscando tarefas com 10 tarefas por página.

> Página 1: https://task-manager-node-rest-api.herokuapp.com/tasks?limit=10&skip=10

> Página 2: https://task-manager-node-rest-api.herokuapp.com/tasks?limit=10&skip=20

> Página 3: https://task-manager-node-rest-api.herokuapp.com/tasks?limit=10&skip=30

- Tudo junto - Buscando a segunda página com 10 tarefas por página, e ordenando as tarefas para mostrar as não completadas antes.

> https://task-manager-node-rest-api.herokuapp.com/tasks?sortBy=completed:desc&limit=10&skip=10

### Buscar tarefas por ID de um usuário logado

#### Método:

 GET : `/tasks/<id>`
	- `<id> é a identificação da tarefa que deseja buscar`

#### URL Exemplo

> [https://task-manager-node-rest-api.herokuapp.com/tasks/5e6e0117bb997d0017c94f0d](https://task-manager-node-rest-api.herokuapp.com/tasks/5e6e0117bb997d0017c94f0d)

### Atualizar tarefas por ID de um usuário logado

#### Método:

- PATCH: `/tasks/<id>`
	- `<id> é a identificação da tarefa que deseja atualizar`

#### URL Exemplo

> [https://task-manager-node-rest-api.herokuapp.com/tasks/5e6e0117bb997d0017c94f0d](https://task-manager-node-rest-api.herokuapp.com/tasks/5e6e0117bb997d0017c94f0d)

#### Parametros

|   Parametro   |      Descrição     |   Tipo     |   Necessário   |
| :------------: | :--------------------: | :--------: | :----------: |
|   Descrição|    Descrição da Tarefa |   String   |     Não    |
|   completed    |    Situação da Tarefa    |   Boolean  |     Não    |

##### JSON exemplo:

```json
{
	"description": "Do a task",
	"completed": true
}
```

### Deletar tarefas por ID de um usuário logado

#### Método:

- PATCH: `/tasks/<id>`
	- `<id> é a identificação da tarefa que deseja deletar`

#### URL Exemplo

> [https://task-manager-node-rest-api.herokuapp.com/tasks/5e6e0117bb997d0017c94f0d](https://task-manager-node-rest-api.herokuapp.com/tasks/5e6e0117bb997d0017c94f0d)

## Autor

<table>
  <tr>
    <td align="center"><a href="https://github.com/Lukazovic"><img src="https://avatars0.githubusercontent.com/u/54550926?s=460&u=cdeeac652ce0597a986fbdcff6e249ad27a1f1da&v=4" width="100px;" alt=""/><br /><sub><b>Lucas Vieira</b></sub></a><br /><a href="https://github.com/Lukazovic/node-task-manager-api/" title="Code">💻</a></td>
  <tr>
</table>
