const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const app = express()
const User = require('../models/user.model');
const { verificarToken, verificarRole } = require('../middlewares/autentication');


app.get('/user', [verificarToken, verificarRole], (req, res) => {

    /*return res.json({
        user: req.user,
        name: req.user.name,
        email: req.user.email
    });*/

    let desde = req.query.desde || 0 //mandar parametro... ejm ?desde=10
    desde = Number(desde);

    let limite = req.query.limite || 5
    limite = Number(limite);

    User.find({ status: true }, 'name email role status google img')
        .skip(desde)
        .limit(limite)
        .exec((err, user) => {
            if (err) {
                return res.status(400).json(err);
            }
            User.collection.countDocuments({ status: true }, (err, contar) => {
                res.json({ ok: true, user, cantidad: contar });
            })

        })

})

app.post('/user', [verificarToken, verificarRole], (req, res) => {

    let body = req.body;

    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    user.save((err, userDB) => {
        if (err) {
            return res.status(400).json(err);
        }
        res.json({
            ok: true,
            user: userDB
        })
    });
})

app.put('/user/:id', [verificarToken, verificarRole], (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'status']); //_.PICK solo los campos a actualizar

    User.findOneAndUpdate(id, body, { new: true, runValidators: false }, (err, userDB) => {
        if (err) {
            return res.status(400).json(err);
        }
        res.json({
            ok: true,
            user: userDB
        })
    })
})

app.delete('/user/:id', [verificarToken, verificarRole], (req, res) => {
    let id = req.params.id;

    User.findByIdAndRemove(id, (err, userRemoved) => {
        if (err) {
            res.json(err);
        }
        if (!userRemoved) {
            return res.status(400).json({
                ok: false,
                message: 'User not found'
            });
        }
        res.json({ ok: true, user: userRemoved });
    })
})

app.patch('/user/:id', (req, res) => {
    let id = req.params.id;

    User.findOneAndUpdate(id, { status: false }, { new: true, runValidators: false }, (err, userDB) => {
        if (err) {
            return res.status(400).json(err);
        }
        res.json({
            ok: true,
            user: userDB
        })
    })
})


module.exports = app;