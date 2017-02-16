'use strict';

var Promise = require('bluebird');
var mongoose = require("mongoose");
var validator = require('validator');
var errorMessages = require('../util/error-messages');

// ------ MODEL --------- //
var ratingQuestionsSchema = mongoose.Schema({
    pergunta1: String,
    pergunta2: String,
    pergunta3: String,
    ativo: {
    	type: Boolean,
    	default: true
    }
});

var RatingQuestions = mongoose.model('RatingQuestions', ratingQuestionsSchema);

// ----- BUSINESS METHODS ---------- //
var create = function(form) {
	return new Promise(function (resolve, reject) {
        var errors = {
            status: 400,
            errorMessage: ""
        };
        //Perform validation
        if (validator.isNull(form.pergunta1)) {
            errors.errorMessage = errorMessages.rating_pergunta1_obrigatorio;
            throw(errors);
        }
        if (validator.isNull(form.pergunta2)) {
            errors.errorMessage = errorMessages.rating_pergunta2_obrigatorio;
            throw(errors);
        }
        if (validator.isNull(form.pergunta3)) {
            errors.errorMessage = errorMessages.rating_pergunta3_obrigatorio;
            throw(errors);
        }
        //Encontra e atualiza o campo ativo
        RatingQuestions.findOneAndUpdate({ativo: true}, {ativo: false}, {new: true}, function (err, model) {
        	if (err) {
        		throw(err);
        	} else {
		        //Save
		        var ratingQuestions = new RatingQuestions(form);
		        ratingQuestions.save(function (err, ratingQuestions) {
		        	if (err) {
		        		throw(err);
		        	} else {
		        		resolve(ratingQuestions);
		        	}
		        });
        	}
        });
    });
};

var getActiveRating = function () {
	return new Promise(function (resolve, reject) {
		RatingQuestions.findOne({ativo: true}, function (err, ratingQuestions) {
			if (err) {
				throw(err);
			} else {
				resolve(ratingQuestions);
			}
		});
	});
};


module.exports = {
    create: create,
    getActiveRating: getActiveRating
}
