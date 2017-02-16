'use strict';

var Promise = require('bluebird');
var mongoose = require("mongoose");
var validator = require('validator');
var errorMessages = require('../util/error-messages');

// ------ MODEL --------- //
var ratingSchema = mongoose.Schema({
    idUser: String,
    idRatingQuestion: String,
    resposta1: Number,
    resposta2: Number,
    resposta3: Number
});

var Rating = mongoose.model('RatingAnswers', ratingSchema);


// ----- BUSINESS METHODS ---------- //
var submitRating = function (form) {
    return new Promise(function (resolve, reject) {
        var errors = {
            status: 400,
            errorMessage: ""
        };
        //Perform validation
        if (validator.isNull(form.idUser)) {
            errors.errorMessage = errorMessages.rating_id_user_obrigatorio;
            throw(errors);
        }
        if (validator.isNull(form.idRatingQuestion)) {
            errors.errorMessage = errorMessages.rating_id_ratingQuestion_obrigatorio;
            throw(errors);
        }

        //Salva        
        var rating = new Rating(form);
        rating.save(function (err, rating) {
            if (err) {
                throw(err);
            } else {
                resolve(rating);
            }
        });
    });    
};

var verificaUsuarioResposta = function(idUser, idRatingQuestion) {
    return new Promise(function (resolve, reject) {
        //Perform validation
        if (validator.isNull(idUser)) {
            errors.errorMessage = errorMessages.rating_id_user_obrigatorio;
            throw(errors);
        }
        if (validator.isNull(idRatingQuestion)) {
            errors.errorMessage = errorMessages.rating_id_ratingQuestion_obrigatorio;
            throw(errors);
        }
        //Pesquisa
        Rating.find({idUser: idUser, idRatingQuestion: idRatingQuestion}, function (err, ratingAnswer) {
            if (err) {
                throw(err)
            } else {
                resolve(ratingAnswer);
            }
        });

    });
};


module.exports = {
    submitRating: submitRating,
    verificaUsuarioResposta: verificaUsuarioResposta
}