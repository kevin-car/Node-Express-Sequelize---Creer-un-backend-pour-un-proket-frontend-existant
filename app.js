/* Importation de l'application express et bodyparser*/
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

/* Importation du model Thing */
const Thing = require('./models/Thing');

/* Importation de l'application express */
const app = express();

/* Importation des routes */
const stuffRoutes = require('./routes/stuff');

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



/* Utilisation des routes contenu dans le fichier de route --> stuff.js */
app.use('/api/stuff', stuffRoutes);

/* Exporter le module app pour le server.js */
module.exports = app;