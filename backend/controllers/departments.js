const { validationResult } = require('express-validator');


const Department = require('../models/department');

exports.fetchAll = async (req, res, next) => {
  try {
    const [allDepartments] = await Department.fetchAll();
    res.status(200).json(allDepartments);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postDepartment = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  const title = req.body.title;
  const body = req.body.body;
  const user = req.body.user;

  try {
    const department = {
      title: title,
      body: body,
      user: user,
    };
    const result = await Department.save(department);
    res.status(201).json({ message: 'Added!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteDepartment = async (req, res, next) => {
  try {
    const deleteResponse = await Department.delete(req.params.id);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
