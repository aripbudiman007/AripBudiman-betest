const { ObjectId } = require("bson")
const { mongodb } = require(".")
const collection = "users"

class Users {
    static findAll() {
        return mongodb.getDB().collection(collection).find().toArray()
    }

    static findOne(id) {
        return mongodb.getDB().collection(collection).find({ _id: ObjectId(id)}.toArray())
    }

    static create(data) {
        return mongodb.getDB().collection(collection).insertOne(data)
    }

    static update(id, data) {
        return mongodb.getDB().collection(collection).updateOne({ _id: ObjectId(id)}, { $set: data })
    }

    static destroy(id) {
        return mongodb.getDB().collection(collection).deleteOne({_id: ObjectId(id)})
    }
}

module.exports = Users