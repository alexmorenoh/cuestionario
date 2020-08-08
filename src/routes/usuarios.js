const express = require('express');
const router = express.Router();

const usuariosController = require('../controllers/usuariosController');

router.get('/', usuariosController.list);
router.post('/add', usuariosController.save);
router.get('/update/:registro', usuariosController.edit);
router.post('/update/:registro', usuariosController.update);
router.get('/delete/:registro', usuariosController.delete);

router.get('/listQuiz', usuariosController.listQuiz);
router.post('/addQuiz', usuariosController.saveQuiz);
router.get('/quizEdit/:id_preg', usuariosController.quizEdit);
router.post('/updateQuiz/:id_preg', usuariosController.updateQuiz);
router.get('/deleteQuiz/:id_preg', usuariosController.deleteQuiz);

router.get('/toQuiz/',usuariosController.preparaExam);
router.post('/addExam/', usuariosController.addExam);
router.post('/buscaReg', usuariosController.buscaCal);

module.exports = router;
