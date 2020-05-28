require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//path para usar los html
const path = require('path');
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//habilitar el dir public
app.use(express.static(path.resolve(__dirname, '../public')));

//config de routes
app.use(require('./routes/index'));

//conection db
mongoose.set('useCreateIndex', true); //es opcional... agregue debido a un error de deprecation.....
mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err, res) => {
    if (err) throw err
    console.log('Live database');
});

app.listen(process.env.PORT, () => {
    console.log('Listening on port', process.env.PORT)
})