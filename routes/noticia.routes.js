var express = require('express');
var router = express.Router();
var noticiaModel = require('../models/noticia.model');
var pushNotification = require('../util/push-notification');

router.get('/:id', function(req, res) {
  var id = req.params.id;
  noticiaModel.findById(id)
  .then(function (result) {
      res.status(200).send(result);
  })
  .catch (function (error) {
    if (error.status) {
        res.status(error.status).json(error.errorMessage);
    } else {
        res.status(500).json(JSON.stringify(error));
    }
  })

});

router.post('/create', function (req, res) {
  var form = req.body;
  noticiaModel.create(form)
  .then(function (noticia) {
    //Envia o Push
    pushNotification.sendNoticias();
    res.status(201).json(noticia);
  })
  .catch(function (error) {
    console.log(JSON.stringify(error));
      if (error.status) {
          res.status(error.status).json(error.errorMessage);
      } else {
          res.status(500).json(JSON.stringify(error));
      }
  });

});


module.exports = router;
