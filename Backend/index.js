// Bibliotecas
const express = require('express');
const dotenv = require('dotenv');

// Arquivos
const connectToDatabase = require('./src/database/mongoose.database');
const TaskRouter = require('./src/routes/task.route');

dotenv.config();
const app = express();
app.use(express.json());

connectToDatabase();

app.use('/tasks', TaskRouter);


app.listen(8000, () => { console.log('Server is running on port 8000') })