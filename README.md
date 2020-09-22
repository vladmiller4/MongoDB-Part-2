# mongo-homework

### Installation
1. Clone repo
2. Open project directory
3. run ```npm install``` command
3. run ```npm start``` command

### Task

1. Implement CRUD for users
  - 1.1 Use already created empty user schema, model, controller, route as example

#### User Schema

```
{
  firstName: type string, min length 4, max length 50, required field,
  lastName: type string, min length 3, max length 60, required field
  role: type string, only valid values is [admin, writer, guest],
  createdAt: type Datetime, with default value,
  numberOfArticles: type number, default value 0, not required,
  nickname: type string, not required
}
```

* Using [Postman](https://www.getpostman.com/), and api endpoint **/users (POST)**, I want to create new user document,
so that I can have possibility to find it in mongodb users collection

* Using [Postman](https://www.getpostman.com/), and api endpoint **/users/:userId (PUT)**, I want to have possibility 
to edit required user document fields, so that I will have possibility to easily update general user information

* Using [Postman](https://www.getpostman.com/), and api endpoint **/users/:userId (GET)**, I want to have possibility
to get information about any user just by passing specific user mongo id as an api parametr.
(Response also should contain all articles that user created)

* Using [Postman](https://www.getpostman.com/), and api endpoint **/users/:userId (DELETE)**, I want to have possibility
to remove specific user from mongodb and all articles that he created.

* Using [Postman](https://www.getpostman.com/), and api endpoint **/users/:userId/articles (GET)**, I want to have possibility
to get all articles that created by specific user.


2. Implement CRUD for articles
  - 2.1 Create schema, model, controller, routes

#### Article Schema

```
{
  title: type string, min length 5, max length 400, required field, add text index
  subtitle: type string, min length 5, not required field,
  description: type string, min length 5, max length 5000, required,
  owner: user reference, required field,
  category: valid options [sport, games, history], required
  createdAt: type datetime, required field
  updatedAt: type datetime, required field
}
```

* Using [Postman](https://www.getpostman.com/), and api endpoint **/articles (POST)**, I want to create new article,
so that I can have possibility to find it in mongodb articles collection. 
Before creating new article, you should check if owner exist. 
(Don't forget that all your articles should have reference to specific user - ***owner*** field, and also after creating new article, increment ***numberOfArticles*** field for that user)

* Using [Postman](https://www.getpostman.com/), and api endpoint **/articles/:articleId (PUT)**, I want to have possibility
to edit any article document. Before you make update action, you should always check if article / user exist, and only
after that start updating document.

* Using [Postman](https://www.getpostman.com/), and api endpoint **/articles (GET)**,
I want to have possibility to search for articles using next filters **title, subtitle, description, owner, category,
createdAt, updatedAt**. If I request endpoint without setting filter criteria, I should get all articles from database.
(Also you should populate owner field)

* Using [Postman](https://www.getpostman.com/), and api endpoint **/articles/:articleId (DELETE)**,
I want to have possibility to delete any article from database. (Don't forget to decrement ***numberOfArticles*** field for user that created this article)




