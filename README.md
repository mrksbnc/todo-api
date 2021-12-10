# Todo API

##### Node.js Express.js RESTful API written in TypeScript

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
nodemon
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

```
npm run lint --fix
```

## Routes
  - #### AuthController
          /auth/register          POST     
          /auth/login             POST
  - #### UserController
          /user/get/:id           GET
          /user/get/email/:email  GET
          /user/update            PUT
          /user/delete/:id        DELETE
  - #### ListController
          /list/create            POST
          /list/get/:id           GET
          /list/get/user/:userId  GET
          /list/update            PUT
          /list/updateMany        PUT
          /list/delete/:id        DELETE
          /list/deleteMany        POST
  - #### TodoController
          /todo/create            POST
          /todo/createMany        POST
          /todo/get/:id           GET
          /todo/get/user/:id      GET
          /todo/get/list/:id      GET
          /todo/update            PUT
          /todo/updateMany        PUT
          /todo/delete/:id        DELETE
          /todo/deleteMany        POST
