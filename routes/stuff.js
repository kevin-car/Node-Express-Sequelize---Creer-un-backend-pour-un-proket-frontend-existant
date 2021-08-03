const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff')

/* Création d'un nouveau produit */
router.post('/', stuffCtrl.createThing);

/* Modification d'un objet existant avec l'ID en paramètre */
router.put('/:id', stuffCtrl.modifyThing);

/* Supprimer un élément précis avec l'ID en paramètre */
router.delete('/:id', stuffCtrl.deleteThing);

/* Afficher une page fiche produit avec l'ID en paramètre  */
router.get('/:id', stuffCtrl.getOneThing);

/* Récupération de tous les objets (page d'accueil) */
router.get('/', stuffCtrl.getAllThings);

/* Exporter le module router pour les routes */
module.exports = router;