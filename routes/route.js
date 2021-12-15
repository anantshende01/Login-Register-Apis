const router = require('express').Router();
const User = require('../model/User');
const { registerValidation } = require('../validation');
const { loginValidation } = require('../validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




router.post('/register', async(req, res) => {

    const { error } = registerValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const emailCheck = await User.findOne({ email: req.body.email });
    if (emailCheck) return res.status(400).send('Email already exists');

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
    // console.log(user);
    try {
        const savedUser = await user.save();
        res.send("Registered Successfully " + savedUser.name);
    } catch (errr) {
        res.status(400).send("error")
    }
});

router.post('/login', async(req, res) => {
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const userCheck = await User.findOne({ email: req.body.email })
    if (!userCheck) return res.status(400).send('Email does not exists');

    const correctPassword = await bcrypt.compare(req.body.password, userCheck.password);

    if (!correctPassword) return res.status(400).send("invalid Password");

    const token = jwt.sign({
        _id: userCheck._id
    }, process.env.TOKEN)

    console.log(token);
    res.header('auth-token', token).send("user data available")

});



module.exports = router;