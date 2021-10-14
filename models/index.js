const { db } = require("../db/config")

const mongodb = db({
    uri: "mongodb://127.0.0.1:27017",
    databaseName: "db_aripbudiman_betest"
})

module.exports = {
    mongodb
}