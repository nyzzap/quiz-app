# quiz-app
## _quizz-app react & nodejs, Mongodb_
## DataBase: MongoDB.
## QuizServer: NodeJS, with Express & Mongoose ORM.

## Packages

 - bcryptjs: To hashing password.
 - body-parser: Parsing the data that comes from request.
 - jsonwebtoken: Helper 4 JWT Flow.
 - Passport: 4 middlewareLogin.
 - passport-jwt: authenticating endpoints.
 - validator: To Validation in Middlware level.

```sh
 npm install --save bcryptjs body-parser express jsonwebtoken mongoose passport passport-jwt validator npm install -D nodemon
```

## Routes:  /user
| Route | ACTION | Description|
| ------ | ------ |------ |
| /login | POST | Login|
| /register | POST | Create new User|
|/me | GET | get data current user|

## Routes:  /quiz
| Route | ACTION | Description|
| ------ | ------ |------ |
| /create-quiz | POST | Create new Quiz|
| /update-quiz | POST | Modify Quiz, && Questions|
| /delete-quiz | POST | Delete Quiz, && Questions|
| /global-list | GET | Get all quiz head|
| /questions | GET | get all questions of quiz id param|

## Routes:  /answers
| Route | ACTION | Description|
| ------ | ------ |------ |
| /create-answer | POST | Create new answer|
| /list-player | GET | Get all answers by player (userId)|
| /list-quiz | GET | get all answers of quiz (id)|
| /list-author | GET | get all answers of quiz (authorId)|


