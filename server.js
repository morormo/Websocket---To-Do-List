const express = require('express');
const socket = require('socket.io');
const cors = require('cors')

const app = express();
app.use(cors());

let tasks = ['Shopping', 'Go out with a dog'];

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running...');
});

const io = socket(server);

io.on('connection', (socket) => {
  socket.emit('updateData', tasks);
  socket.on('addTask', (newTask) => {
    tasks.push(newTask);
    socket.broadcast.emit('addTask', newTask);
  });
  socket.emit('removeTask', (idTask) => {
    tasks.splice(idTask);
    socket.broadcast.emit('removeTask', idTask);
  });
});

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});