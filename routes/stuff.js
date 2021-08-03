const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff')
const auth = require('../middleware/auth')

/* Création d'un nouveau produit */
router.post('/', auth, stuffCtrl.createThing);

/* Modification d'un objet existant avec l'ID en paramètre */
router.put('/:id', auth, stuffCtrl.modifyThing);

/* Supprimer un élément précis avec l'ID en paramètre */
router.delete('/:id', auth, stuffCtrl.deleteThing);

/* Afficher une page fiche produit avec l'ID en paramètre  */
router.get('/:id', auth, stuffCtrl.getOneThing);

/* Récupération de tous les objets (page d'accueil) */
router.get('/', auth, stuffCtrl.getAllThings);

/* Exporter le module router pour les routes */
module.exports = router;