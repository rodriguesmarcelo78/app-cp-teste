var express = require('express');
var router = express.Router();
var userModel = require('../models/user-model');
var mailSender = require('../util/mail-sender');
var errorMessages = require('../util/error-messages');

router.post('/authenticate', function(req, res, next) {
    var form = req.body;
    userModel.authenticate(form)
    .then(function (user) {
        res.status(200).json(user);
    })
    .catch(function (error) {
        if (error.status) {
            res.status(error.status).json(error.errorMessage);    
        } else {
            res.status(500).json(JSON.stringify(error));    
        }        
    });
});

router.post('/authenticateWEB', function(req, res, next) {
    var form = req.body;
    userModel.authenticateWEB(form)
    .then(function () {
        res.status(200).send();
    })
    .catch(function (error) {
        if (error.status) {
            res.status(error.status).json(error.errorMessage);    
        } else {
            res.status(500).json(JSON.stringify(error));    
        }        
    });
});

router.post('/create', function (req, res) {
    var form = req.body;
    userModel.create(form)
    .then(function (user) {
        //Return Status 201
        res.status(201).json(user);
    })
    .catch(function (error) {
        if (error.status) {
            res.status(error.status).json(error.errorMessage);    
        } else {
            res.status(500).json(JSON.stringify(error));    
        }        
    });
});

router.put('/update', function (req, res) {
    var form = req.body;
    userModel.update(form)
    .then(function (user) {
        res.status(200).json(user);
    })
    .catch(function (error) {
        if (error.status) {
            res.status(error.status).json(error.errorMessage);    
        } else {
            res.status(500).json(JSON.stringify(error));    
        }        
    });
});

router.get('/recovery/:email', function (req, res) {
    var email = req.params.email;
    userModel.recoveryPassword(email)
    .then(function (user) {
        //Envia o email
        mailSender.sendPasswordRecovered(user);
        res.status(200).send();
    })
    .catch(function (error) {
        if (error.status) {
            res.status(error.status).json(error.errorMessage);    
        } else {
            res.status(500).json(JSON.stringify(error));    
        }
    });
});

router.get('/:id', function (req, res) {
    var id = req.params.id;
    userModel.findById(id)
    .then(function (user) {
        res.status(200).json(user);
    })
    .catch(function (error) {
        if (error.status) {
            res.status(error.status).json(error.errorMessage);    
        } else {
            res.status(500).json(JSON.stringify(error));    
        }
    });

});


module.exports = router;
