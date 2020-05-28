const { mongoose, Schema, model } = require('mongoose');

//let Schema = mongoose.Schema;

//mongoose-unique-validator
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} is not a valid role'
};


let userSchema = new Schema({
    name: {
        type: String,
        requiere: [true, 'The required name']
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        required: true,
        enum: rolesValidos
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

//OBIAR password al hacer el return
userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

//....
userSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' })

module.exports = model('user', userSchema);