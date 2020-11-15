const bcrypt = require("bcrypt");
const { User, validate } = require("../models/User");
const { UserResource } = require("../resources/UserResource");

exports.logged = async function (req, res, next) {
    const user = await User.findById(req.user._id);
    if (!user) {
        res.send(false);
    }
    res.send(true);
}

exports.current = async function (req, res, next) {
    const user = await User.findById(req.user._id).select("-password");
    res.send(user);
}

exports.login = async function (req, res, next) {
    // validate the request body first
    const { error } = validate.validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("user not found.");

    bcrypt.compare(req.body.password, user.password, function (err, response) {
        if (err) throw err;
        if (response) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-origin, x-auth-token");
            res.header("Access-Control-Expose-Headers: x-auth-token")
            res.send({
                _id: user._id,
                username: user.username,
                email: user.email,
                token: user.generateAuthToken()
            });
        } else {
            return res.status(422).send("Data does not match!");
        }
    });
}

exports.register = async function (req, res) {
    const { error } = validate.validateRegister(req.body);
    if (error) return res.status(422).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(422).send("User already registered.");

    user = await User.findOne({ username: req.body.username });
    if (user) return res.status(422).send("Username taken.");

    bcrypt.hash(req.body.password, 10, function (err, hash) {
        if (err) return console.error(err);

        user = new User({
            username: req.body.username,
            password: hash,
            email: req.body.email
        });

        user.save(function (err, record) {
            if (err) return console.error(err);
            res.status(201).send(UserResource.singleUser(record));
        });
    });
}