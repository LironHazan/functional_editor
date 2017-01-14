'use strict';

const express = require('express');
const router = express.Router();
const request = require('request-promise');
const conf = require('../conf').Conf();


router.post('/deploy/', (req, res) => {
    // request set on PUT
    //function composeCmd(funcName, lang){
    //    return funcName+'?lang='+lang;
    //}
    const options = {
        uri: conf.site + req.body.name,
        method: 'PUT',
        qs: { lang: req.body.lang },
        formData: { code: req.body.func }
    };
    request(options)
        .then( (result) => {
            res.send(result);
        })
        .catch( (err)  => {
            res.send(err);
        });
});

router.get('/list/', (req, res) => {
    const options = {
        uri: conf.site,
        method: 'GET'
    };
    request(options)
        .then( (result) => {
            res.send(result);
        })
        .catch( (err) => {
            res.send(err);
        });
});



module.exports = router;