const express = require('express'); // ES5
const router = express.Router();
const path = require('path');


/* GET home page. */
router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

module.exports = router;
