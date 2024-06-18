const express = require("express");
const ClientService = require("../service/client-service");
const route = express.Router();
const CustomResponse = require("../utils/custom-response");
// const Joi = require('joi');
route.post("/register", (req, res) => {
  let payloadData = req.body;
  console.log("payload--inside register data", JSON.stringify(payloadData));
  ClientService.register(payloadData)
    .then((result) => {
      res
        .status(result.status)
        .send(
          CustomResponse.sendResponse(
            result.status,
            result.data,
            result.message
          )
        );
    })
    .catch((error) => {
      res
        .status(error.status)
        .send(
          CustomResponse.sendResponse(error.status, error.data, error.message)
        );
    });
});

route.get("/getClientList", (req, res) => {
  let payloadData = req.query;
  console.log("data inside controller", payloadData);
  ClientService.getClientList(payloadData)
    .then((result) => {
      console.log("data receiveed from database-->", result);
      res
        .status(200)
        .send(
          CustomResponse.sendResponse(
            200,
            result.data,
            (result.message = "Data Found")
          )
        );
    })
    .catch((error) => {
      res
        .status(error.status)
        .send(
          CustomResponse.sendResponse(error.status, error.data, error.message)
        );
    });
});

route.patch("/deleteData/:userName", (req, res) => {
  let params = req.params;
  let body = req.body;
  console.log("data inside controller", params, body);
  ClientService.deleteData(params, body)
    .then((result) => {
      console.log("result=============", result);
      res
        .status(result.status)
        .send(
          CustomResponse.sendResponse(
            result.status,
            result.data,
            result.message
          )
        );
    })
    .catch((error) => {
      res
        .status(error.status)
        .send(
          CustomResponse.sendResponse(error.status, error.data, error.message)
        );
    });
});
route.patch("/updateData/:userName", (req, res) => {
  let params = req.params;
  let body = req.body;
  console.log("data inside controller", params, body);
  ClientService.updateData(params, body)
    .then((result) => {
      console.log("result=============", result);
      res
        .status(result.status)
        .send(
          CustomResponse.sendResponse(
            result.status,
            result.data,
            result.message
          )
        );
    })
    .catch((error) => {
      res
        .status(error.status)
        .send(
          CustomResponse.sendResponse(error.status, error.data, error.message)
        );
    });
});

module.exports = route;
