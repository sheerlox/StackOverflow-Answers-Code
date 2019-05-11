[<img align="right" src="https://cdn.rawgit.com/standard/standard/master/badge.svg">](https://standardjs.com/)
# Multiple Mongo Databases

To run the project:
```bash
git clone https://github.com/SherloxFR/StackOverflow-Answers-Code.git
cd StackOverflow-Answers-Code/multiple-mongo-databases
npm install
npm start
```

Then send requests to http://localhost:3000/api/todos (no frontend, API only).

You can find the endpoint specs in `routes/todos.js`


-------------------------

[StackOverflow Question](https://stackoverflow.com/questions/56084264/how-would-i-change-mongodb-active-database-based-on-a-req-param)

[StackOverflow Solution](https://stackoverflow.com/questions/56084264/how-would-i-change-mongodb-active-database-based-on-a-req-param/56084742#56084742)

### Question Recap:
- [x] Manage multiple MongoDB databases through Mongoose
- [x] Tell routes which database to use based on a request ~~parameter~~ **header** (`X-Use-Database`)
- [x] The schemas will be shared between the databases
- [ ] ?? The list of the databases is not definitive, a new database can be created when a new `X-Use-Database` header value is used. === BAD PRACTICE

For the last point of the recap, a special field should be added to every shema, specifying to which entity the document belongs.
This whole project then becomes useless.