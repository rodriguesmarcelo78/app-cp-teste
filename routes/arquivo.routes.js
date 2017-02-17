var express = require('express');
var router = express.Router();
var archiveModel = require('../models/archives');
var pushNotification = require('../util/push-notification');
var fs = require('fs');
var streamifier = require('streamifier');

router.post('/salvar', function (req, res) {
	var form = req.body;
	archiveModel.saveFile(form)
	.then(function (result) {
		pushNotification.sendPDF(result.idTipo, result.nome);
		res.status(201).json(result);
	})
	.catch(function (error) {
        if (error.status) {
            res.status(error.status).json(error.errorMessage);
        } else {
            res.status(500).json('xxx'+JSON.stringify(error));
        }
	});
});

router.get('/list/:idTipo', function (req, res) {
	var idTipo = req.params.idTipo;
	archiveModel.findArchivesByTipo(idTipo)
	.then(function (archives) {
		res.status(200).json(archives);
	})
	.catch(function (error) {
        if (error.status) {
            res.status(error.status).json(error.errorMessage);
        } else {
            res.status(500).json(JSON.stringify(error));
        }
	});
});

router.get('/listAll', function (req, res) {
	archiveModel.listAll()
	.then(function (archives) {
		res.status(200).json(archives);
	})
	.catch(function (error) {
        if (error.status) {
            res.status(error.status).json(error.errorMessage);
        } else {
            res.status(500).json(JSON.stringify(error));
        }
	});
});

router.get('/:idFile', function (req, res) {
	var idFile = req.params.idFile;
	archiveModel.getFile(idFile)
	.then(function (archiveAttach) {
		var pdfFile = new Buffer(archiveAttach.file, 'base64');

		var stream = streamifier.createReadStream(pdfFile);

		res.setHeader('Content-Length', archiveAttach.file.length);
		//res.setHeader('Transfer-Encoding', '');
		//res.useChunkedEncodingByDefault = false;
		res.setHeader('Content-type', 'application/pdf');
		stream.pipe(res);

		// or use event handlers
		stream.on('data', function(data) {
		  res.write(data);
		});

		stream.on('end', function() {
		  res.end();
		});
	})
	.catch(function (error) {
        if (error.status) {
            res.status(error.status).json(error.errorMessage);
        } else {
            res.status(500).json(JSON.stringify(error));
        }
	});
});

router.get('/exist/:idFile', function (req, res) {
	var idFile = req.params.idFile;
	archiveModel.findById(idFile)
	.then(function (archive) {
		res.status(200).json(archive);
	})
	.catch(function (error) {
        if (error.status) {
            res.status(error.status).json(error.errorMessage);
        } else {
            res.status(500).json(JSON.stringify(error));
        }
	});

});

router.get('/checkFiles/:files', function (req, res) {
	var files = req.params.files.split(',');
	archiveModel.checkIfFilesExist(files)
	.then(function (archives) {
		res.status(200).json(archives);
	})
	.catch(function (error) {
        if (error.status) {
            res.status(error.status).json(error.errorMessage);
        } else {
            res.status(500).json(JSON.stringify(error));
        }
	});

});

router.get('/destroy/:idFile', function (req, res) {
	var idFile = req.params.idFile;
	archiveModel.destroy(idFile)
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




module.exports = router;
