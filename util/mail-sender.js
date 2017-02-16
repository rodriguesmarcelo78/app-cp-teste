'use strict';

var nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'cpplacaseletronicas@gmail.com',
        pass: 'cp2015*/'
    }
});



// setup e-mail data with unicode symbols
var templatePasswordRecovered = {
    from: 'CP Placas Eletrônicas App ✔ <cpplacaseletronicas@gmail.com>', // sender address
    to: '', // list of receivers
    subject: 'Recuperação de senha do app CP Placas Eletrônicas', // Subject line
    text: '', // plaintext body
    html: 'Olá __name__,<br /><br />Segue os seus dados do sistema CP Placas Eletrônicas<br/><br />Senha: __password__' // html body
};

var templateConfirmationCode = {
    from: 'CP Placas Eletrônicas App ✔ <cpplacaseletronicas@gmail.com>', // sender address
    to: '', // list of receivers
    subject: 'Ativação do Cadastro no sistema CP Placas Eletrônicas', // Subject line
    text: '', // plaintext body
    html: 'Olá __name__,<br /><br />Seu código de ativação para o sistema CP Placas Eletrônicas é: __codigoAtivacao__' // html body
};

module.exports = {

    sendPasswordRecovered: function (user) {
        var mailPasswordRecovered = JSON.parse(JSON.stringify(templatePasswordRecovered));
        mailPasswordRecovered.to = user.email;
        mailPasswordRecovered.html = mailPasswordRecovered.html.replace('__name__', user.nome)
        .replace('__username__', user.usuario)
        .replace('__password__', user.senha);
        //Send email
        transporter.sendMail(mailPasswordRecovered);
    },

    sendConfirmationCode: function (user) {
        var mailConfirmationCode = JSON.parse(JSON.stringify(templateConfirmationCode));
        mailConfirmationCode.to = user.email;
        mailConfirmationCode.html = mailConfirmationCode.html.replace('__name__', user.nome).replace('__codigoAtivacao__', user.codigoAtivacao);
        //Send email
        transporter.sendMail(mailConfirmationCode);        
    }

};

