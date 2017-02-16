'use strict';

var Promise = require('bluebird');
var mongoose = require("mongoose");
var ObjectId = require('mongoose').Types.ObjectId;

// ------ MODEL --------- //
var deviceIDSchema = mongoose.Schema({
    deviceID: String,
    device: String
});

var DeviceID = mongoose.model('DeviceID', deviceIDSchema);


// ----- BUSINESS METHODS ---------- //
var register = function (form) {
    return new Promise(function (resolve, reject) {
        //Busca as Informações
        DeviceID.findOneAndUpdate({deviceID: form.deviceID}, {deviceID: form.deviceID, device: form.device}, {upsert: true}, function (err, model) {
          if (err) {
            throw(err);
          } else {
            resolve(model);
          }
        });
    });
};

var findAll = function() {
  return new Promise(function (resolve, reject) {
      //Busca as Informações
      DeviceID.find({}, function (err, model) {
        if (err) {
          throw(err);
        } else {
          var devicesID = [];
          for (var i = 0; i < model.length; i++) {
            devicesID.push(model[i].deviceID);
          }
          resolve(devicesID);
        }
      });
  });
};

var findAndroid = function() {
  return new Promise(function (resolve, reject) {
      //Busca as Informações
      DeviceID.find({device: "Android"}, function (err, model) {
        if (err) {
          throw(err);
        } else {
          var devicesID = [];
          for (var i = 0; i < model.length; i++) {
            devicesID.push(model[i].deviceID);
          }
          resolve(devicesID);
        }
      });
  });
}

var findIOS = function() {
  return new Promise(function (resolve, reject) {
      //Busca as Informações
      DeviceID.find({device: "Android"}, function (err, model) {
        if (err) {
          throw(err);
        } else {
          var devicesID = [];
          for (var i = 0; i < model.length; i++) {
            devicesID.push(model[i].deviceID);
          }
          resolve(devicesID);
        }
      });
  });
}

var deleteDeviceID = function(deviceID) {
  console.log("Removendo DeviceID: " + deviceID);
  DeviceID.find({deviceID: deviceID}).remove().exec();
}

module.exports = {
  register: register,
  findAll: findAll,
  findAndroid: findAndroid,
  findIOS: findIOS,
  deleteDeviceID: deleteDeviceID
}
