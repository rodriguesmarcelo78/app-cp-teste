'use strict';

var Promise = require('bluebird');
var mongoose = require("mongoose");
var validator = require('validator');
var criptografia = require('../util/criptografia-util');
var errorMessages = require('../util/error-messages');
var ObjectId = require('mongoose').Types.ObjectId;

// ------ MODEL --------- //
var userSchema = mongoose.Schema({
    nome: String,
    senha: String,
    email: {
        type: String,
        lowercase: true,
        trim: true
    },
    latitude: Number,
    longitude: Number,
    empresa: String,
    dataCadastro: {
        type: Date,
        default: Date.now
    }
});

var User = mongoose.model('User', userSchema);


// ----- BUSINESS METHODS ---------- //
var authenticate = function (form) {
    return new Promise(function (resolve, reject) {
        var errors = {
            status: 400,
            errorMessage: ""
        };
        //Perform validation
        if (validator.isNull(form.email)) {
            errors.errorMessage = errorMessages.user_email_obrigatorio;
            throw(errors);
        }
        if (validator.isNull(form.senha)) {
            errors.errorMessage = errorMessages.user_senha_obrigatorio;
            throw(errors);
        }
        //Check Username
        findByEmail(form.email)
        .then(function (user) {
            //Check password
            if (user && user.senha === form.senha) {
                resolve(user);
            } else {
                errors.errorMessage = errorMessages.user_usuario_nao_existe;
                reject(errors);
            }
        })
        .catch(function (error) {
            reject(error);
        })
    });
};

var authenticateWEB = function (form) {
    return new Promise(function (resolve, reject) {
        var errors = {
            status: 400,
            errorMessage: ""
        };
        //Perform validation
        if (validator.isNull(form.usuario)) {
            errors.errorMessage = errorMessages.user_usuario_obrigatorio;
            throw(errors);
        }
        if (validator.isNull(form.senha)) {
            errors.errorMessage = errorMessages.user_senha_obrigatorio;
            throw(errors);
        }
        if (form.usuario === "cpplacaseletronicas" && form.senha === "admin123") {
            resolve();
        } else {
            errors.errorMessage = errorMessages.user_usuario_nao_existe;
            reject(errors);
        }
    });
};

var findByEmail = function (email) {
    return new Promise(function (resolve, reject) {
        User.findOne({email: email.toLowerCase()}, function (err, user) {
            if (err) {
                throw(err);
            } else {
                //Descriptografa a senha
                if (user != null) {
                    var senha = criptografia.decrypt(user.senha);
                    user.senha = senha;
                }
                resolve(user);
            }
        });
    });
};

var create = function(form) {
    return new Promise(function (resolve, reject) {
        var errors = {
            status: 400,
            errorMessage: ""
        };
        //Perform validation
        if (validator.isNull(form.nome)) {
            errors.errorMessage = errorMessages.user_nome_obrigatorio;
            throw(errors);
        }
        if (!validator.isLength(form.nome, 5, 60)) {
            errors.errorMessage = errorMessages.user_nome_tamanhoInvalido;
            throw(errors);
        }
        if (validator.isNull(form.senha)) {
            errors.errorMessage = errorMessages.user_senha_obrigatorio;
            throw(errors);
        }
        if (form.senha != form.confirmaSenha) {
            errors.errorMessage = errorMessages.user_senha_invalido;
            throw(errors);
        }
        if (validator.isNull(form.email)) {
            errors.errorMessage = errorMessages.user_email_obrigatorio;
            throw(errors);
        }
        if (!validator.isEmail(form.email)) {
            errors.errorMessage = errorMessages.user_email_invalido;
            throw(errors);
        }
        //Check if the username already exists
        findByEmail(form.email)
        .then(function (user) {
            //Check if the username already exists
            if (user) {
                errors.errorMessage = errorMessages.user_email_existente;
                throw(errors);
            } else {
                return;
            }
        })
        .then(function () {
            //Save the User
            var user = new User(form);
            //Criptogra a senha
            var senha = criptografia.encrypt(form.senha);
            user.senha = senha;
            user.save(function (err, user) {
                if (err) {
                    throw(err);
                } else {
                    resolve(user);
                }
            });
        })
        .catch(function (error) {
            reject(error);
        });
    });
};

var recoveryPassword = function (email) {
    return new Promise(function (resolve, reject) {
        //Validation
        var errors = {
            status: 400,
            errorMessage: ""
        };
        //Perform validation
        if (validator.isNull(email)) {
            errors.errorMessage = errorMessages.user_email_obrigatorio;
            throw(errors);
        }
        //Procura o usuário pelo email
        findByEmail(email)
        .then(function (user) {
            if (user) {
                resolve(user);
            } else {
                errors.errorMessage = errorMessages.user_email_nao_existente;
                throw(errors);
            }
        })
        .catch(function (error) {
            reject(error);
        });
    });
};

var update = function (form) {
    return new Promise(function (resolve, reject) {
        var errors = {
            status: 400,
            errorMessage: ""
        };
        if (validator.isNull(form.email)) {
            errors.errorMessage = errorMessages.user_email_obrigatorio;
            throw(errors);
        }
        //Verifica se as senhas não foram digitadas. Se alguma foi digitada, precisa ser validado
        if (!validator.isNull(form.senhaAtual) || !validator.isNull(form.senha) || !validator.isNull(form.confirmaSenha)) {
            if (validator.isNull(form.senhaAtual)) {
                errors.errorMessage = errorMessages.user_senha_atual_obrigatorio;
                throw(errors);
            }
            if (validator.isNull(form.senha)) {
                errors.errorMessage = errorMessages.user_senha_obrigatorio;
                throw(errors);
            }
            if (validator.isNull(form.confirmaSenha)) {
                errors.errorMessage = errorMessages.user_senha_invalido;
                throw(errors);
            }
            if (form.senha != form.confirmaSenha) {
                errors.errorMessage = errorMessages.user_senha_invalido;
                throw(errors);
            }
            //Procura o usuario atual para verificar as senhas
            findByEmail(form.email)
            .then(function (user) {
                //Verifica se as senhas são iguais
                if (user.senha != form.senhaAtual) {
                    errors.errorMessage = errorMessages.user_senha_atual_invalida;
                    throw(errors);
                } else {
                    return(user);
                }
            })
            .then(function (user) {
                //Criptografa a senha
                var senha = criptografia.encrypt(form.senha);
                user.senha = senha;

                user.empresa = form.empresa;
                user.save(function (err, user) {
                    if (err) {
                        throw(err);
                    } else {
                        resolve(user);
                    }
                });
            })
            .catch(function (error) {
                reject(error);
            });
        } else {
            //Salva apenas a empresa
            findByEmail(form.email)
            .then(function (user) {
                //Criptogra a senha
                var senha = criptografia.encrypt(user.senha);
                user.senha = senha;

                user.empresa = form.empresa;
                user.save(function (err, user) {
                    if (err) {
                        throw(err);
                    } else {
                        resolve(user);
                    }
                });
            })
            .catch(function (error) {
                reject(error);
            });
        }
    });
};

var findById = function (id) {
    return new Promise(function (resolve, reject) {
        User.findOne({_id: new ObjectId(id)}, function (err, user) {
            if (err) {
                throw(err);
            } else {
                if (user == null) {
                  reject("Usuario nao encontrado");
                } else {
                  //Descriptografa a senha
                  var senha = criptografia.decrypt(user.senha);
                  user.senha = senha;
                  resolve(user);
                }
            }
        });
    });
};

module.exports = {

    authenticate: authenticate,
    create: create,
    recoveryPassword: recoveryPassword,
    authenticateWEB: authenticateWEB,
    update: update,
    findById: findById
}
