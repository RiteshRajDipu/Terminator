const express = require('express');
const { body } = require('express-validator/check');

const User = require('../models/user');
const authController = require('../controllers/auth');

const router = express.Router();

router.put(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject('E-Mail address already exists!');
          }
        });
      })
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 5 }),
    body('name')
      .trim()
      .not()
      .isEmpty(),
    body('contact')
       .trim()
       .not()
       .isEmpty(),
    body('university')
       .trim()
       .not()
       .isEmpty()
      //   .custom((value, { req }) => {
      //    return User.collection("university").find({}).toArray(function(err, result) { 
      //      if (err) throw err;
      //       console.log(result);
      //       User.close();
      //    });
      //  })
      , 
       body('college')
       .trim()
       .not()
       .isEmpty(), 
    body('yearofadmission')
       .trim()
       .not()
       .isEmpty(), 
    body('branch')
       .trim()
       .not()
       .isEmpty(),              
  ],
  authController.signup
);

router.post('/login', authController.login);

module.exports = router;
