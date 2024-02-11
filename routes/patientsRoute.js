const express = require('express');
const router = express.Router();

const patientsController = require('../controllers/patientsController')

router.get('/', patientsController.getAllPatients);

router.get('/:id', patientsController.getOnePatient);

router.post('/', patientsController.addPatient);

router.put('/:id', patientsController.updatePatient);

router.delete('/:id', patientsController.deletePatient);

module.exports = router;
