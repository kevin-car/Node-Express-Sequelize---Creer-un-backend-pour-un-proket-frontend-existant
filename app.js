/* Importation de l'application express et bodyparser*/
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

/* Importation du model Thing */
const Thing = require('./models/thing');

/* Importation de l'application express */
const app = express();

/* Connexion à la base de donnée MangoDB */
mongoose.connect('mongodb+srv://kevin:Torino0668@cluster0.rhi97.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

/* CORS - règles de sécurité  */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

/* Conversion des fichiers JSON pour l'import de données */
app.use(bodyParser.json());

/* Middleware de création d'un nouveau produit */
app.post('/api/stuff', (req, res, next) => {
    /* Importation selon le model */
    delete req.body._id;
    const thing = new Thing({
      ...req.body
    });
    /* Enregistrement dans la BDD */
    thing.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  });

/* Récupération de tous les objets (page d'accueil) */
app.use('/api/stuff', (req, res, next) => {
    Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
  });

/* Afficher une page fiche produit avec l'ID en paramètre  */
app.get('/api/stuff/:id', (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
  });

/* Exporter le module app pour le server.js */
module.exports = app;