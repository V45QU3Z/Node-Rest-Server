const jwt = require('jsonwebtoken');

//=========vericar tokrn=========

let verificarToken = (req, res, next) => {
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({ ok: false, error: { message: 'Token invalid' } });
        }
        //el decoded es el payload
        req.user = decoded.user;
        next();
    });

    //next es para ejecutar todo lo demas despues de obtener el token
};

let verificarRole = ((req, res, next) => {
    let user = req.user;
    if (user.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            error: { message: 'role is not your' }
        })
    }

})

module.exports = { verificarToken, verificarRole };