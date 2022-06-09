const express = require('express');
const router = express.Router();
const path = require('path');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../views/about.html'));
});

module.exports = router;