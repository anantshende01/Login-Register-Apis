const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
    res.send("data logged in users can access");
})

module.exports = router;