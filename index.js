const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(express.json());

mongoose.connect('mongodb://192.168.100.188:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
  console.log('Connected to the database');
  
  // Pobierz listę kolekcji w bazie danych
  const collections = await mongoose.connection.db.listCollections().toArray();

  // Tworzenie dynamicznych endpointów dla każdej kolekcji
  collections.forEach(collection => {
    const collectionName = collection.name;

    // Tworzenie modelu dla każdej kolekcji
    const Model = mongoose.model(collectionName, new mongoose.Schema({}, { strict: false }), collectionName);

    // Tworzenie endpointu dla tej kolekcji
    app.get(`/${collectionName}`, async (req, res) => {
      try {
        const data = await Model.find({});
        res.status(200).json(data);
      } catch (error) {
        res.status(500).send(error);
      }
    });

    console.log(`Endpoint /${collectionName} is ready to handle requests`);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
