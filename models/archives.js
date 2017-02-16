'use strict';

var Promise = require('bluebird');
var validator = require('validator');
var mongoose = require("mongoose");
var ObjectId = require('mongoose').Types.ObjectId; 
var errorMessages = require('../util/error-messages');

// ------ MODEL --------- //
var archiveSchema = mongoose.Schema({
	idTipo: Number, 
	tipo: String,
    nome: String,
    nomeArquivo: String,
    descricao: String,
    dataCadastro: {
        type: Date,
        default: Date.now
    }    
});

var Archive = mongoose.model('Archive', archiveSchema);


var archiveAttachSchema = mongoose.Schema({
    idFile: String,
    file: String
});

var ArchiveAttach = mongoose.model('ArchiveAttach', archiveAttachSchema);

var saveFile = function (form) {
	return new Promise(function (resolve, reject) {
		//Validate
        var errors = {
            status: 400,
            errorMessage: ""
        };
        //Perform validation
        if (validator.isNull(form.idTipo)) {
            errors.errorMessage = errorMessages.arquivo_tipo_obrigatorio;
            throw(errors);
        }
        if (form.idTipo != 1 && form.idTipo !=2 && form.idTipo !=3 ) {
            errors.errorMessage = errorMessages.arquivo_tipo_invalid;
            throw(errors);        	
        }
        if (validator.isNull(form.nome)) {
            errors.errorMessage = errorMessages.arquivo_nome_obrigatorio;
            throw(errors);
        }
        if (validator.isNull(form.nomeArquivo)) {
            errors.errorMessage = errorMessages.arquivo_nome_obrigatorio;
            throw(errors);
        }        
        if (validator.isNull(form.descricao)) {
            errors.errorMessage = errorMessages.arquivo_descricao_obrigatorio;
            throw(errors);
        }
        if (validator.isNull(form.file)) {
            errors.errorMessage = errorMessages.arquivo_arquivo_obrigatorio;
            throw(errors);
        }        
        if (form.idTipo == 1) form.tipo = "Placas para Lavadoras";
        if (form.idTipo == 2) form.tipo = "Placas para Refrigeradores";
        if (form.idTipo == 3) form.tipo = "Fonte Chaveada";
        //Save the file
        var archive = new Archive(form);
        archive.save(function (err, archive) {
        	if (err) {
        		throw(err);
        	} else {
                //Save the attachment
                var archiveAttach = new ArchiveAttach({idFile: archive._id, file: form.file});
                archiveAttach.save(function (err, file) {
                    if (err) {
                        throw(err);
                    } else {
                        resolve(archive);        
                    }
                })        		
        	}
        });
	});
};

var findArchivesByTipo = function(idTipo) {
	return new Promise(function (resolve, reject) {
		//Validate
        var errors = {
            status: 400,
            errorMessage: ""
        };
        //Perform validation
        if (validator.isNull(idTipo)) {
            errors.errorMessage = errorMessages.arquivo_tipo_obrigatorio;
            throw(errors);
        }
        if (idTipo != 1 && idTipo !=2 && idTipo !=3 ) {
            errors.errorMessage = errorMessages.arquivo_tipo_invalid;
            throw(errors);        	
        }
        //Busca os Dados
        Archive.find({idTipo: idTipo}).sort({ dataCadastro: -1 }).exec(function (err, archives) {
        	if (err) {
        		throw(err);
        	} else {
        		resolve(archives);
        	}
        });
    });
};

var getFile = function(idFile) {
    return new Promise(function (resolve, reject) {
        //Validate
        var errors = {
            status: 400,
            errorMessage: ""
        };
        //Perform validation
        if (validator.isNull(idFile)) {
            errors.errorMessage = errorMessages.arquivo_id_arquivo;
            throw(errors);
        }
        ArchiveAttach.findOne({idFile: idFile}, function (err, archiveAttach) {
            if (err) {
                throw(err);
            } else {
                resolve(archiveAttach);
            }
        });
    });
};

var listAll = function () {
    return new Promise(function (resolve, reject) {
        Archive.find().sort({ dataCadastro: -1 }).exec(function (err, archives) {
            if (err) {
                throw(err);
            } else {
                resolve(archives);
            }        
        });
    });
};

var destroy = function (idFile) {
    return new Promise(function (resolve, reject) {
        Archive.findOneAndRemove({_id: idFile}, function (err, result) {
            if (err) { 
                reject(err);
            } else {
                ArchiveAttach.findOneAndRemove({idFile: idFile}, function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            }
        })        
    });
};

var findById = function (idFile) {
    return new Promise(function (resolve, reject) {
        Archive.findOne({_id: new ObjectId(idFile)}, function (err, archive) {
            if (err) {
                throw(err);
            } else {
                //Verifica se encontrou o Arquivo
                if (archive == null) {
                    var errors = {
                        status: 404,
                        errorMessage: "O arquivo foi atualizado. Por favor faça um nova pesquisa no aplicativo"
                    };
                    reject(errors);
                } else {
                    resolve(archive);
                }
                
            }
        });
    });
};

var checkIfFilesExist = function (files) {
    return new Promise( function (resolve, reject) {
        //Transforma o array de files em Object
        var idFiles = [];
        var filesString = [];
        for (var i = 0; i < files.length; i++) {
            idFiles.push(new ObjectId(files[i]));
            filesString.push(files[i]);
        }
        //Faz a busca
        Archive.find({_id: { "$in" : idFiles}}, function (err, archives) {
            if (err) {
                throw(err);
            } else {
                //Verifica se o length são iguais. Se sim, todos os arquivos foram encontrados
                if (files.length == archives.length) {
                    resolve({});
                } else {
                    //Encontrar o valor que não foi encontrado
                    for (var i = 0; i < archives.length; i++) {
                        filesString.splice(filesString.indexOf(archives[i]._id.toString()), 1);
                    }
                    resolve(filesString);    
                }                
            }
        });  
    });
};


module.exports = {
	saveFile: saveFile,
	findArchivesByTipo: findArchivesByTipo,
    getFile: getFile,
    listAll: listAll,
    destroy: destroy,
    findById: findById,
    checkIfFilesExist: checkIfFilesExist
}