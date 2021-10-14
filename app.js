const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const { mongodb } = require('./models')
const routers = require('./router')

app.use(express.json())
app.use(routers)

app.use((err, req, res, next) => {
    res.status(500).json({
        success: false,
        status:500,
        body: {
            error: err
        }
    })
})

mongodb
    .run()
    .then(() => {
        app.listen(port, () => {
            console.log(`app listen on port ${port}`);
        })
    })
    .catch((err) => {
        console.log(err);
    })
