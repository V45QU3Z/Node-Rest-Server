require('./config/config');
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())

app.get('/usuario', function(req, res) {
    res.json('Get usuario')
})

app.post('/usuario', (req, res) => {
    let user = req.body;
    res.json({ user });
})

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    res.json({ id });
})

app.delete('/usuario/:id', (req, res) => {
    let id = req.params.id;
    res.json({ id });
})

app.listen(process.env.PORT, () => {
    console.log('Listening on port', process.env.PORT)
})