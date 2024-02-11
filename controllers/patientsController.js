const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllPatients = async (req, res) => {
  const result = await mongodb.getDb().db('patients').collection('patients').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getOnePatient = async (req, res) => {
  const contactId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('patients').collection('patients').find({ _id: contactId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const addPatient = async (req, res) => {
  const patient = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    diagnosis: req.body.email,
    birthday: req.body.birthday,
    weightBearingStatus: req.body.weightBearingStatus,
    therapyOrderEndDate: req.body.therapyOrderEndDate,
    lastVisit: req.body.lastVisit,
    nextVisit: req.body.nextVisit,
    therapyGoals: req.body.therapyGoals,
    assignedNurse: req.body.assignedNurse
  };
  const response = await mongodb.getDb().db('patients').collection('patients').insertOne(patient);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Error occurred while creating patient.');
  }
};

const updatePatient = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const patient = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    diagnosis: req.body.email,
    birthday: req.body.birthday,
    weightBearingStatus: req.body.weightBearingStatus,
    therapyOrderEndDate: req.body.therapyOrderEndDate,
    lastVisit: req.body.lastVisit,
    nextVisit: req.body.nextVisit,
    therapyGoals: req.body.therapyGoals,
    assignedNurse: req.body.assignedNurse
  };
  const response = await mongodb
    .getDb()
    .db('patients')
    .collection('patients')
    .replaceOne({ _id: userId }, patient);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred while updating patient.');
  }
};

const deletePatient = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db('patients')
    .collection('patient')
    .deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'Error occurred while deleting the patient.');
  }
};

module.exports = { getAllPatients, getOnePatient, addPatient, updatePatient, deletePatient };