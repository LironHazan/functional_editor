'use strict';

const express = require('express');
const router = express.Router();


router.get('/deploy', (req, res) => {
    res.send('boo');
});


module.exports = router;