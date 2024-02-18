const validator = require('../helpers/validate');

const savePatient = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    diagnosis: 'required|string',
    birthday: 'required|string',
    weightBearingStatus: 'required|string',
    therapyOrderEndDate: 'required|string',
    lastVisit: 'required|string',
    nextVisit: 'required|string',
    therapyGoals: 'required|string',
    assignedNurse: 'required|string',
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  savePatient
};
