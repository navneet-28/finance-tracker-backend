const express = require('express');

const {registerUser, authUser, allUsers, getUsers} = require('../controllers/userController');

const router = express.Router();


router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/all").get(getUsers);


module.exports = router;