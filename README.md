# Node Task Manager RESTful API

A Backend RESTful API to store and organize your tasks. It is a secure API because it does not let other users acess your tasks by authenticate all users.

[Documentação em Português do Brasil](https://github.com/Lukazovic/node-task-manager-api/blob/master/pt-BR-README.md)

### Built With

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

## Table of Contents

**Observation: This application is deployed in Heroku. So if you want to use it from Heroku you can skip the setup part.**

- [Setup (Optional)](#setup)
  - [Prerequisites](#prerequisites)
  - [Installing](#installing)
  - [Running tests](#running-the-tests)
  - [Running API](#running-the-api)
- [All Endpoints](#all-endpoints)
  - [Base URL](#base-url)
  - [Users Endpoints](#users-endpoints)
  - [Tasks Endpoints](#tasks-endpoints)
- [How to use users API Endpoints](#how-to-use-users-api-endpoints)
  - [Create new user](#create-new-user)
  - [Login an existing user](#login-an-existing-user)
  - [Update user informations](#update-user-informations)
  - [Get profile from a logged user](#get-profile-from-a-logged-user)
  - [Get user profile by ID](#get-user-profile-by-id)
  - [Upload logged user avatar](#upload-logged-user-avatar)
  - [Get the avatar from a logged user](#get-the-avatar-from-a-logged-user)
  - [Get the user avatar profile by ID](#get-the-user-avatar-profile-by-id)
  - [Logout a user](#logout-a-user)
  - [Logout a user from all sessions](#logout-a-user-from-all-sessions)
  - [Delete a logged user avatar](#delete-a-logged-user-avatar)
  - [Delete a logged user](#delete-a-logged-user)
- [How to use tasks API Endpoints](#how-to-use-tasks-api-endpoints)
  - [Create new task to a logged user](#create-new-task-to-a-logged-user)
  - [Get all tasks from a logged user](#get-all-tasks-from-a-logged-user)
    - [Sorting tasks](#sorting-tasks)
    - [Pagination tasks](#pagination-tasks)
    - [Examples](#examples)
  - [Get task by ID from a logged user](#get-task-by-id-from-a-logged-user)
  - [Update task by ID from a logged user](#update-task-by-ID-from-a-logged-user)
  - [Delete task by ID from a logged user](#delete-task-by-id-from-a-logged-user)
- [Author](#author)
  

## Setup

### Prerequisites

```
Node
Mongodb
```

### Installing

Clone the project:
```
$ git clone https://github.com/Lukazovic/node-task-manager-api.git
```

Go into the project root folder:
```
$ cd node-task-manager-api
```

Install the projects modules:
```
$ npm install
```

**Observation: You will need to setup some environment configs in order to start the server or run the tests.**

First create a config folder at the root of the project:
```
$ mkdir config
```

**To setup the server environment**: You will have to create a file at ``./config`` called ``dev.env`` and configure as the example bellow:
```
PORT=<Port-Number>
SENDGRID_API_KEY=<Sendgrid-Api-Key>
MONGODB_URL=mongodb://127.0.0.1:27017/<Data-Base-Name>
JWT_SECRET=<Secret-JWT>
```
  - **Port-Number:** A port number to acess the server ``(example: PORT=3000)``;
  - **Sendgrid-Api-Key:** A key provided by [SendGrid](https://sendgrid.com/) so you can send emails directly from the application;
  - **Data-Base-Name:** A name to the database ``(example: node-task-manager-api)``;
  - **Secret-JWT:** A secret word to generate the tokens for the API ``(example: mysecretword)``.

**To setup the tests environment**: You will have to create a file at ``./config`` called ``test.env`` and configure as the example above **EXCEPT the Data-Base-Name where you should change the name ``(example: node-task-manager-test-api)``;**

### Running Tests
```
$ npm run test
```

### Running API

To run the API (in the project folder):
```
$ npm run start
```

> Access in: localhost:**Port-Number**

## All Endpoints

### Base URL

- [https://task-manager-node-rest-api.herokuapp.com/](https://task-manager-node-rest-api.herokuapp.com/)

### Users Endpoints:

- POST: `/users` - Create new user
- POST: `/users/login` - Login an existing user
- PATCH: `/users/me` - Update user informations
- GET : `/users/me` - Get profile from a logged user
- GET: `/users/<id>` - Get user profile by ID
- POST: `/users/me/avatar` - Upload logged user avatar
- GET: `/users/me/avatar` - Get the avatar from a logged user
- GET: `/users/<id>/avatar` - Get the user avatar profile by ID
- POST: `/users/logout` - Logout a user
- POST: `/users/logoutAll` - Logout a user from all sessions
- DELETE: `/users/me/avatar` - Delete a logged user avatar
- DELETE: `/users/me` - Delete a logged user

### Tasks Endpoints:

- POST: `/tasks` - Create new task to a logged user
- GET: `/users` - Get all tasks from a logged user
- GET : `/tasks/<id>` - Get task by ID from a logged user
- PATCH: `/tasks/<id>` - Update task by ID from a logged user
- DELETE: `/tasks/<id>` - Delete task by ID from a logged user

## How to use users API Endpoints

### Create new user

#### Method:

- POST: `/users`

#### URL Example

> [https://task-manager-node-rest-api.herokuapp.com/users](https://task-manager-node-rest-api.herokuapp.com/users)

#### Paramethers

|   Paramether   |       Description    |     Type     |   Required   |
| :------------: | :------------------: | :----------: | :----------: |
|      name      |   User's name        |    String    |     True     |
|      age       |   User's age         |    Integer   |     False    |
|      email     |   User's email       |    String    |     True     |
|    password    |   User's password    |    String    |     True     |

##### Observation:

> **Password length has to be greater than 7 and can not contain the word `password`**

##### JSON example:

```json
{
	"name": "User Test",
	"age": 18,
	"email": "test@email.com",
	"password": "idontknow"
}
```

##### Observation:

> **As response you will receive a token so you will be able to use it to authenticate the user when it needed**
> As soon as the user is created the application will send an email to the user's email

##### Response example:

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

### Login an existing user

#### Method:

- POST: `/users/login`

#### URL Example

> [https://task-manager-node-rest-api.herokuapp.com/users/login](https://task-manager-node-rest-api.herokuapp.com/users/login)

#### Paramethers

|   Paramether   |       Description    |     Type     |   Required   |
| :------------: | :------------------: | :----------: | :----------: |
|      email     |   User's email       |    String    |     True     |
|    password    |   User's password    |    String    |     True     |


##### JSON example:

```json
{
	"email": "test@email.com",
	"password": "idontknow"
}
```

##### Observation:

> **As response you will receive a token so you will be able to use it to authenticate the user when it needed**

##### Response example:

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

### Update user informations

#### Method:

- PATCH: `/users/me`

#### URL Example

> [https://task-manager-node-rest-api.herokuapp.com/users/me](https://task-manager-node-rest-api.herokuapp.com/users/me)

#### Paramethers

|   Paramether   |       Description    |     Type     |   Required   |
| :------------: | :------------------: | :----------: | :----------: |
|      name      |   User's name        |    String    |     False    |
|      age       |   User's age         |    Integer   |     False    |
|      email     |   User's email       |    String    |     False    |
|    password    |   User's password    |    String    |     False    |
|  Authorization | Session user's Token | Bearer Token |     True     |

##### JSON example:

```json
{
	"name": "User Test",
	"age": 18,
	"email": "test@email.com",
	"password": "idontknow"
}
```

### Get profile from a logged user

#### Method:

- GET: `/users/me`

#### URL Example

> [https://task-manager-node-rest-api.herokuapp.com/users/me](https://task-manager-node-rest-api.herokuapp.com/users/me)

#### Paramethers

|   Paramether   |       Description    |     Type     |   Required   |
| :------------: | :------------------: | :----------: | :----------: |
|  Authorization | Session user's Token | Bearer Token |     True     |

### Get user profile by ID


#### Method:

- GET: `/users/<id>`
	- `<id> is the identifier of the user`

#### URL Example

> [https://task-manager-node-rest-api.herokuapp.com/users/5e6e0117bb997d0017c94f0d](https://task-manager-node-rest-api.herokuapp.com/users/5e6e0117bb997d0017c94f0d)

#### Paramethers

|   Paramether   |       Description   |   Type     |
| :------------: | :-----------------: | :--------: |
|      _id       |   User's ID         |   String   |

### Upload logged user avatar

#### Method:

- POST: `/users/me/avatar`

#### URL Example

> [https://task-manager-node-rest-api.herokuapp.com/users/me/avatar](https://task-manager-node-rest-api.herokuapp.com/users/me/avatar)

#### Paramethers

|   Paramether   |       Description    |     Type     |   Required   |
| :------------: | :------------------: | :----------: | :----------: |
|  Authorization | Session user's Token | Bearer Token |     True     |
|     avatar     |    User's avatar     |  Form-Data   |     True     |

### Get avatar from a logged user

#### Method:

- GET: `/users/me/avatar`

#### URL Example

> [https://task-manager-node-rest-api.herokuapp.com/users/me/avatar](https://task-manager-node-rest-api.herokuapp.com/users/me/avatar)

#### Paramethers

|   Paramether   |       Description    |     Type     |   Required   |
| :------------: | :------------------: | :----------: | :----------: |
|  Authorization | Session user's Token | Bearer Token |     True     |

### Get the user avatar profile by ID

#### Method:

- GET: `/users/<id>/avatar`
	- `<id> is the identifier of the user`

#### URL Example

> [https://task-manager-node-rest-api.herokuapp.com/users/5e6e0117bb997d0017c94f0d/avatar](https://task-manager-node-rest-api.herokuapp.com/users/5e6e0117bb997d0017c94f0d/avatar)

#### Paramethers

|   Paramether   |       Description   |   Type     |
| :------------: | :-----------------: | :--------: |
|      _id       |   User's ID         |   String   |

### Logout a user

#### Method:

- POST: `/users/logout`

#### URL Example

> [https://task-manager-node-rest-api.herokuapp.com/users/logout](https://task-manager-node-rest-api.herokuapp.com/users/logout)

#### Paramethers

|   Paramether   |       Description    |     Type     |   Required   |
| :------------: | :------------------: | :----------: | :----------: |
|  Authorization | Session user's Token | Bearer Token |     True     |


### Logout a user from all sessions

#### Method:

- POST: `/users/logoutAll`

#### URL Example

> [https://task-manager-node-rest-api.herokuapp.com/users/logoutAll](https://task-manager-node-rest-api.herokuapp.com/users/logoutAll)

#### Paramethers

|   Paramether   |       Description    |     Type     |   Required   |
| :------------: | :------------------: | :----------: | :----------: |
|  Authorization | Session user's Token | Bearer Token |     True     |


### Delete a logged user avatar

#### Method:

- DELETE: `/users/me/avatar`

#### URL Example

> [https://task-manager-node-rest-api.herokuapp.com/users/me/avatar](https://task-manager-node-rest-api.herokuapp.com/users/me/avatar)

#### Paramethers

|   Paramether   |       Description    |     Type     |   Required   |
| :------------: | :------------------: | :----------: | :----------: |
|  Authorization | Session user's Token | Bearer Token |     True     |


### Delete a logged user

#### Method:

- DELETE: `/users/me`

#### URL Example

> [https://task-manager-node-rest-api.herokuapp.com/users/me](https://task-manager-node-rest-api.herokuapp.com/users/me)

#### Paramethers

|   Paramether   |       Description    |     Type     |   Required   |
| :------------: | :------------------: | :----------: | :----------: |
|  Authorization | Session user's Token | Bearer Token |     True     |

## How to use tasks API Endpoints

### Create new task to a logged user

#### Method:

- POST: `/tasks`

#### URL Example

> [https://task-manager-node-rest-api.herokuapp.com/tasks](https://task-manager-node-rest-api.herokuapp.com/tasks)

#### Paramethers

|   Paramether   |      Description       |   Type     |   Required   |
| :------------: | :--------------------: | :--------: | :----------: |
|   description  |    Tak's description   |   String   |     True     |
|   completed    |    Task's situation    |   Boolean  |     False    |

##### JSON example:

```json
{
	"description": "Do a task",
	"completed": false
}
```

##### Response example:

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

### Get all tasks from a logged user

#### Method:

- GET: `/tasks`

#### URL Example

> [https://task-manager-node-rest-api.herokuapp.com/tasks](https://task-manager-node-rest-api.herokuapp.com/tasks)

#### Sorting tasks

You can sort tasks by adding `?sortBy=completed:desc` to the URL in order to the GET all tasks sorted by not completed.

You can also GET all tasks sorted by completed by addind `?sortBy=completed:asc` to the URL.

#### Pagination tasks

You can get a limit of tasks by adding `?limit=10` to the URL so you will get 10 tasks.

You can skip the firsts tasks by adding `?skip=10` to the URL. So you can use pagination by limiting the tasks you get by each request and skiping some tasks by adding `?limit=10&skip=10`

#### Examples

- Sorting tasks by completed:

> https://task-manager-node-rest-api.herokuapp.com/tasks?sortBy=completed:asc

- Sorting tasks by completed:

> https://task-manager-node-rest-api.herokuapp.com/tasks?sortBy=completed:desc

- Get only the first 10 tasks:

> https://task-manager-node-rest-api.herokuapp.com/tasks?limit=10

- Skip the first 10 tasks: 

> https://task-manager-node-rest-api.herokuapp.com/tasks?skip=10

- Pagination - Getting pages with 10 tasks per page.

> Page 1: https://task-manager-node-rest-api.herokuapp.com/tasks?limit=10&skip=10

> Page 2: https://task-manager-node-rest-api.herokuapp.com/tasks?limit=10&skip=20

> Page 3: https://task-manager-node-rest-api.herokuapp.com/tasks?limit=10&skip=30

- All togheter - Getting the second page with 10 tasks by page and sorting by not completed ones.

> https://task-manager-node-rest-api.herokuapp.com/tasks?sortBy=completed:desc&limit=10&skip=10

### Get task by ID from a logged user

#### Method:

 GET : `/tasks/<id>`
		- `<id> is the identifier of the user`

#### URL Example

> [https://task-manager-node-rest-api.herokuapp.com/tasks/5e6e0117bb997d0017c94f0d](https://task-manager-node-rest-api.herokuapp.com/tasks/5e6e0117bb997d0017c94f0d)

### Update task by ID from a logged user

#### Method:

- PATCH: `/tasks/<id>`
	- `<id> is the identifier of the task you want to update`

#### URL Example

> [https://task-manager-node-rest-api.herokuapp.com/tasks/5e6e0117bb997d0017c94f0d](https://task-manager-node-rest-api.herokuapp.com/tasks/5e6e0117bb997d0017c94f0d)

#### Paramethers

|   Paramether   |      Description       |   Type     |   Required   |
| :------------: | :--------------------: | :--------: | :----------: |
|   description  |    Tak's description   |   String   |     False    |
|   completed    |    Task's situation    |   Boolean  |     False    |

##### JSON example:

```json
{
	"description": "Do a task",
	"completed": true
}
```

### Delete task by ID from a logged user

#### Method:

- PATCH: `/tasks/<id>`
	- `<id> is the identifier of the task you want to delete`

#### URL Example

> [https://task-manager-node-rest-api.herokuapp.com/tasks/5e6e0117bb997d0017c94f0d](https://task-manager-node-rest-api.herokuapp.com/tasks/5e6e0117bb997d0017c94f0d)

## Author

<table>
  <tr>
    <td align="center"><a href="https://github.com/Lukazovic"><img src="https://avatars0.githubusercontent.com/u/54550926?s=460&u=cdeeac652ce0597a986fbdcff6e249ad27a1f1da&v=4" width="100px;" alt=""/><br /><sub><b>Lucas Vieira</b></sub></a><br /><a href="https://github.com/Lukazovic/node-task-manager-api/" title="Code">💻</a></td>
  <tr>
</table>
