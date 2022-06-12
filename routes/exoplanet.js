const express = require('express');
const router = express.Router();
const path = require('path');


/* GET exoplanet page. */
router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../views/exoplanet.html'));
});

module.exports = router;