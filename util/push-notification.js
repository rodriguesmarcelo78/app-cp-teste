(function () {
	'use strict';
	var gcm = require('node-gcm');
	var apn = require('apn');
	var deviceModel = require('../models/device.model');

	var regTokens = [];
	// Set up the sender with you API key
	//DEV
	//var sender = new gcm.Sender('AIzaSyBbPO9qh7R1FqJ1_ByDt87cePUB7BV3ju8');
	//PROD
	//var sender = new gcm.Sender('AIzaSyDzRWWMQTsckKvedh4WDXnNuJ8wpPIuFzQ');
	var sender = new gcm.Sender((process.env.GCM_SENDER || "AIzaSyBbPO9qh7R1FqJ1_ByDt87cePUB7BV3ju8"));
	var apnsEnv = (process.env.APNS_ENV || "production");

	var sendMessageAndroid = function(message) {

		deviceModel.findAndroid()
		.then(function (result) {
			regTokens = result;

			while (regTokens.length) {
				var deviceIDUtilizado = [regTokens[0]];
				regTokens.splice(0,1);

				sender.send(message, { registrationTokens: deviceIDUtilizado }, function (err, response) {
					if(err) {
						deviceModel.deleteDeviceID(deviceIDUtilizado);
					} else {
						if (response.failure) {
							deviceModel.deleteDeviceID(deviceIDUtilizado);
						} else {
							//console.log("Sucesso");
						}
					}
				});
			}


		})
		.catch(function (error) {
			console.log('Erro: ' + JSON.stringify(error));
		});

	};

	var sendMessageIOS = function(note) {
		deviceModel.findIOS()
		
		.then(function (result) {
			regTokens = result;
			if (apnsEnv == "sandbox") {
				var options = { production: false,gateway: 'gateway.push.apple.com',
											  passphrase: "united88",
												cert: "./certificados/sandbox/cert.pem",
												key: "./certificados/sandbox/key.pem" };
			}
				if (apnsEnv == "production") {
				var options = { production: true,
											  passphrase: "mamute",
												cert: "./certificados/sandbox/cert.pem",
												key: "./certificados/sandbox/key.pem" };
			}
		  var apnConnection = new apn.Connection(options);
			apnConnection.pushNotification(note, regTokens);
			apnConnection.on("transmissionError", function (errorCode, notification, device) {
				if (errorCode === 8) {
						console.error('Token inválido', device.toString());
					//res.status(500).json(JSON.'Token inválido', device.toString());
				}
				console.log("passou aqui"+errorCode);
			});
			apnConnection.shutdown();
		});
	};


  module.exports = {
		sendNoticias: function () {
			//Mensagem para Android
			var message = new gcm.Message();
			message.addData('message', 'Existe uma novidade no aplicativo. Acesse agora mesmo');
			message.addData('tipo', 'novidade');
			message.addData('title', 'Novidade');
			console.log('Enviar para Android');
			sendMessageAndroid(message);
			//Mensagem para dispositivos iOS

			var note = new apn.Notification();
		  note.expiry = Math.floor(Date.now() / 24000) + 3600; // Expires 24 hour from now.
		  note.alert = "Existe uma novidade no aplicativo. Acesse agora mesmo";
		  note.payload = {'tipo': 'novidade'};
			console.log('Enviar para iOS');
			sendMessageIOS(note);		

		},

		sendPDF: function (categoria, pdf) {
			//Mensagem para dispositivos Android
			var message = new gcm.Message();
			message.addData('title', 'Novo Manual');
			message.addData('message', 'Olá! A CP acabou de disponibilizar um novo manual. Você pode acessá-lo agora!');
			message.addData('tipo', 'pdf');
			message.addData('categoria', categoria);
			message.addData('pdf', pdf);
			console.log('Enviar para Android');
			//sendMessageAndroid(message);
			//Mensagem para dispositivos iOS
			var note = new apn.Notification();
		  note.expiry = Math.floor(Date.now() / 24000) + 3600; // Expires 24 hour from now.
		  note.alert = "Olá! A CP acabou de disponibilizar um novo manual. Você pode acessá-lo agora!";
		  note.payload = {'tipo': 'pdf', 'categoria': categoria, 'pdf': pdf};
			console.log('Enviar para iOS');
			sendMessageIOS(note);
		},
	}

}());
