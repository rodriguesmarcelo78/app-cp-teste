'use strict';

var Promise = require('bluebird');
var mongoose = require("mongoose");
var validator = require('validator');
var errorMessages = require('../util/error-messages');
var ObjectId = require('mongoose').Types.ObjectId;

// ------ MODEL --------- //
var noticiaSchema = mongoose.Schema({
    file: String,
    ativo: {
    	type: Boolean,
    	default: true
    },
    dataCadastro: {
        type: Date,
        default: Date.now
    }
});

var Noticia = mongoose.model('Noticia', noticiaSchema);


// ----- BUSINESS METHODS ---------- //
var findById = function (id) {
    return new Promise(function (resolve, reject) {
        var errors = {
            status: 400,
            errorMessage: ""
        };
        //Busca as Informações
        Noticia.findOne({ativo: true}, function (err, noticia) {
          if (err) {
              throw(err);
          } else {
              //Verifica se tem noticia
              if (noticia == null) {
                resolve();
              } else {
                //Verifica se o ID passado é o mesmo
                if (noticia._id == id) {
                  //Mesma noticia. Retorna vazio
                  resolve();
                } else {
                  //Retorna a Noticia
                  resolve(noticia);
                }
              }
          }
        });
    });
};

var create = function (form) {
  return new Promise(function (resolve, reject) {
        var errors = {
            status: 400,
            errorMessage: ""
        };
        //Perform validation
        if (validator.isNull(form.file)) {
            errors.errorMessage = errorMessages.noticia_arquivo_obrigatorio;
            throw(errors);
        }
        //Encontra e atualiza o campo ativo
        Noticia.findOneAndUpdate({ativo: true}, {ativo: false}, {new: true}, function (err, model) {
        	if (err) {
        		throw(err);
        	} else {
		        //Salva o novo
		        var noticia = new Noticia(form);
		        noticia.save(function (err, noticia) {
		        	if (err) {
		        		throw(err);
		        	} else {
		        		resolve(noticia);
		        	}
		        });
        	}
        });
    });
}

module.exports = {
    findById: findById,
    create: create
}
