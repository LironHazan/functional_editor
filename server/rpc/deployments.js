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
        .then(function (result) {
            res.send(result);
        })
        .catch(function (err) {
            res.send(err);
        });
});

router.post('/fetch/', (req, res) => {
    // request set on PUT
    //function composeCmd(funcName, lang){
    //    return funcName+'?lang='+lang;
    //}
    const options = {
        uri: conf.site + req.body.name,
        method: 'GET',
        qs: { lang: req.body.lang }
       // formData: { code: req.body.func }
        //'Content-Type': 'application/json'
    };
    request(options)
        .then(function (result) {
            res.send(result);
        })
        .catch(function (err) {
            res.send(err);
        });
});



module.exports = router;