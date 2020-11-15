const jwt = require('jsonwebtoken');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
});

Schema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, 'teste');
    return token;
}

const User = mongoose.model('User', Schema);

function validateRegister(user) {
    const schema =
        Joi.object({
            username: Joi.string().min(2).max(16).required(),
            email: Joi.string().min(5).max(255).required().email(),
            password: Joi.string().min(3).max(20).required()
        });

    return validator.query(schema, user);
}

function validateLogin(user) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email().unique(),
        password: Joi.string().min(3).max(20).required()
    });

    return validator.query(schema, user);
}

exports.User = User;
exports.validate = { validateRegister, validateLogin };