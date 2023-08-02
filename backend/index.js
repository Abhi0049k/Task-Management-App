const express = require('express');
const cors = require('cors')
const { userRouter } = require('./routes/users.routes');
const { connection } = require('./config/db');
const { todoRouter } = require('./routes/todos.routes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/user', userRouter);
app.use('/todo', todoRouter);

app.get('/', (req, res) => {
    res.status(200).send({ "msg": "Welcome to the home page" })
})

app.get('*', (req, res) => {
    res.status(404).send({ "err": "404 Page Not Found" });
})

app.listen(process.env.port, () => {
    connection();
    console.log('Server is running at port', process.env.port);
})