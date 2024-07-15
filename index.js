const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Pozwala na parsowanie JSON

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
});

const PytanieSchema = new mongoose.Schema({
    pytanie: String,
    odpowiedz: String,
  });
  
const Pytanie = mongoose.model('Pytanie', PytanieSchema);

// app.post('/users', async (req, res) => {
//     const user = new User(req.body);
//     try {
//         await user.save();
//       res.status(201).send(user);
//     } catch (error) {
//       res.status(400).send(error);
//     }
//   });
  
app.get('/test', async (req, res) => {
    try {
      const pytania = await Pytanie.find();
      res.status(200).send(test);
    } catch (error) {
      res.status(500).send(error);
    }
  });