const { MongoClient } = require('mongodb')

const db = ({ uri, databaseName }) => {
    const client = new MongoClient(uri)

    return {
        database: null,
        run: () => {
            return new Promise((resolve, reject) =>{
                client  
                    .connect()
                    .then((clinetData) => {
                        this.database = clinetData.db(databaseName)
                        resolve("success")
                    })
                    .catch((err) => {
                        reject(err)
                    })
            })
        },
        getDB: () => {
            return this.database
        },
        closeDb: () => {
            client.close()
        }
    }
}

module.exports = { db }