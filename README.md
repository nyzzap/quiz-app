# quiz-app
quizz-app react &amp; nodejs, Mongodb

DataBase: MongoDB.
QuizServer: NodeJS, with Express & Mongoose ORM.
Packages
		bcryptjs: To hashing password.
		body-parser: Parsing the data that comes from request.
		jsonwebtoken: Helper 4 JWT Flow.
		Passport: 4 middlewareLogin.
		passport-jwt: authenticating endpoints.
		validator: To Validation in Middlware level.
npm install --save bcryptjs body-parser express jsonwebtoken mongoose passport passport-jwt validator
npm install -D nodemon
Routes:
	User
(POST) /register : Verify validations, verify exist name, create password hashed by password provide. & save data in MongoDB Schema User.		
(POST) /login: Verify validations, verify data name and password(hashed), return error or a Bearer Token with user data on PayLoad.
		(GET)   /me:Self User info, required JWT.

		
Validations: register
Name: not empty, 2 to 50 chars
PSW: not Empty, 2 to 50 chars
ConfirmPSW: not Empty, 2 to 50 chars & Match with PSW
Validations: login
Name: not empty, 2 to 50 chars & Exist document in db
PSW: not Empty, 2 to 50 chars & Exist match (hashed) document in db
