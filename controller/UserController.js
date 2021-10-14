const Users = require('../models/users')
const Redis = require('ioredis')
const redis = new Redis(6379, "localhost")

class UserController {
    static getAllUser(req, res, next) {
        const cacheUsers = JSON.parse(redis.get("users"))

        if(cacheUsers){
            res.status(200).json({
                success: true,
                body: {
                    users: cacheUsers
                }
            })
        }else {
            Users.findAll()
                .then((data) => {
                    redis.set("users", JSON.stringify(data))
                    res.status(200).json({
                        success: true,
                        body: {
                            users: data
                        }
                    })
                })
                .catch(next)
        }
    }

    static getUserById(req, res, next) {
        const { id } = req.params

        Users.findOne(id)
            .then((data) => {
                res.status(200).json({
                    success: true,
                    body: {
                        user: data
                    }
                })
            })
    }

    static addUser(req, res, next) {
        Users.create({...req.body})
            .then((data) => {
                redis.del("users")
                res.status(201).json({
                    status:true,
                    body: {
                        user:data
                    }
                })
            })
            .catch(next)
    }

    static updataUser(req, res, next) {
        const { id } = req.params

        Users.update(id, {...req.bdoy})
            .then((data) => {
                redis.del("users")
                res.status(201).json({
                    status: true,
                    body: {
                        user: data
                    }
                })
            })
            .catch(next)
    }

    static deleteUser(req, res, next) {
        const { id } = req.params

        Users.destroy(id)
            .then((data) => {
                redis.del("users")
                res.status(200).json({
                    success: true,
                    body: {
                        user: data
                    }
                })
            })
    }
}

module.exports = UserController