const UserController = require('../controller/UserController')
const authorization = require('../middleware/auth')

const router = require('express').Router()

router.get('/users', UserController.getAllUser)
router.post('/users', UserController.addUser)
router.get('/users/:id', UserController.getUserById)
router.put('/users/:id', authorization, UserController.updataUser)
router.delete('/users/:id', authorization, UserController.deleteUser)

module.exports = router