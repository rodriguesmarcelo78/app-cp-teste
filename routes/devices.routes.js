var express = require('express');
var router = express.Router();
var deviceModel = require('../models/device.model');

router.post('/register', function(req, res) {
  var form = req.body;
  deviceModel.register(form)
  .then(function (result) {
      res.status(201).send(result);
  })
  .catch (function (error) {
    if (error.status) {
        res.status(error.status).json(error.errorMessage);
    } else {
        res.status(500).json(JSON.stringify(error));
    }
  })

});

module.exports = router;
