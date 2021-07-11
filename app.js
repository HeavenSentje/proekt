const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use('/api/auth', require('./routes/auth.routes'))

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '/my-app/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'my-app', 'build', 'index.html'))
    })
} else {
    app.get('/', (req, res) => {
        res.send("Api running")
    })
}

const PORT = process.env.PORT || 8080

async function start() {
    try {
        await mongoose.connect(config.get('MongoU'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()