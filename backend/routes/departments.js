const express = require('express');

const { body } = require('express-validator');

const departmentsController = require('../controllers/departments');

const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, departmentsController.fetchAll);

router.post(
  '/',
  [
    auth,
    body('title').trim().isLength({ min: 5 }).not().isEmpty(),
    body('body').trim().isLength({ min: 10 }).not().isEmpty(),
    body('user').trim().not().isEmpty(),
  ],
  departmentsController.postDepartment
);

router.delete('/:id', auth, departmentsController.deleteDepartment);

module.exports = router;
