const express = require('express');
const bodyParser = require("body-parser"); // json formatting
const cors = require("cors");
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Hallo1557',
    database: 'reacttodoapp'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))

app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT * from todos"
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    })
})

app.post('/api/insert', (req, res) => {

    const todoName = req.body.todoname;

    const sqlInsert = "INSERT INTO todos (todoname) VALUES (?)"
    db.query(sqlInsert, todoName, (err, result) => {
        console.log(err);
    })
})

app.listen(3001, () => {
    console.log("running on port 3001");
});