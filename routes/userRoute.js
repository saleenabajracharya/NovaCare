const express = require('express');
const router = express.Router();
const {getUserData, getSingleUserData, updateUserData, removeUserData, removeAllUserData} = require('../controllers/userController');

router.get('/users', getUserData);
router.get('/user/:UserId', getSingleUserData);
router.put("/user/:UserId", updateUserData);
router.put("/users/:UserId", removeUserData);
router.put("/users", removeAllUserData);
module.exports = router;