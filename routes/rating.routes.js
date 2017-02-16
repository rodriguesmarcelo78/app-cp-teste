var express = require('express');
var router = express.Router();
var ratingQuestions = require('../models/ratingQuestions.model');
var ratingModel = require('../models/rating.model');
var errorMessages = require('../util/error-messages');

router.post('/create', function (req, res) {
    var form = req.body;
    ratingQuestions.create(form)
    .then(function (ratingQuestions) {
        res.status(201).json(ratingQuestions);
    })
    .catch(function (error) {
        if (error.status) {
            res.status(error.status).json(error.errorMessage);    
        } else {
            res.status(500).json(JSON.stringify(error));    
        }        
    });
});

router.get('/get', function (req, res) {
	ratingQuestions.getActiveRating()
    .then(function (ratingQuestions) {
        res.status(200).json(ratingQuestions);
    })
    .catch(function (error) {
        if (error.status) {
            res.status(error.status).json(error.errorMessage);    
        } else {
            res.status(500).json(JSON.stringify(error));    
        }        
    });	
});

router.post('/submit', function (req, res) {
    var form = req.body;
    
    ratingModel.submitRating(form)
    .then(function (pesquisa) {
        res.status(201).json(pesquisa);
    })
    .catch(function (error) {
        if (error.status) {
            res.status(error.status).json(error.errorMessage);    
        } else {
            res.status(500).json(JSON.stringify(error));    
        }        
    });
});

router.get('/verificaUsuarioResposta/:idUser/:idRatingQuestion', function (req, res) {
    var idUser = req.params['idUser'];
    var idRatingQuestion = req.params['idRatingQuestion'];
    ratingModel.verificaUsuarioResposta(idUser, idRatingQuestion)
    .then(function (ratingAnswer) {
        res.status(200).json(ratingAnswer);
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
