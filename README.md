# nodejs-spak-assignment
This is a simple assignment to monitor the tasks like JIRA.

## To create a migration script
node node_modules\db-migrate\bin\db-migrate create <table_name>

## To run migration scripts
node node_modules\db-migrate\bin\db-migrate up

## To run perticualr migration scripts
node node_modules\db-migrate\bin\db-migrate <file_name>

## To Create and Import the tables
1. Create the DB using `CREATE DATABASE 'spak_task_assignment'`, then import the `migration.sql` file in MySQL, which is under scripts folder
2. Use the DB credentials or change that in `index.ts` under `configs/env` folder

## Procedure - 1 to run the project in Debug mode
1. Install typescript, as this project build on it - `npm install -g typescript`
2. Install neccessary packages under project folder - `npm install`
3. Open the project using VS code IDE
4. Open the `server.ts` file in the IDE, as it is the project initiate file
5. Select `Start Debugging` from the `Run` option of the Top Menu or use `F5`, to run the project in debug mode

## Procedure - 2 to run the project in Build mode
1. Install `tsc` - for compile and convert typescript to js file and `pm2` - for start the project like server
    - `npm install -g pm2`
    - `npm install -g tsc`
2. Install neccessary packages under project folder - `npm install`
3. Compile typescript source file to js file by typing tsc under project folder, it will generate compiled js files under `dist` folder
4. Start the poject under `dist` folder using - `pm2 start server.js` (use the postman / front end to access this application)
5. To stop the server - `pm2 stop server.js`

