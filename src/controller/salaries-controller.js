const express = require("express");
const SalariesService = require("../service/salaries-service");
const route = express.Router();
const CustomResponse = require("../utils/custom-response");
// const Joi = require('joi');
route.post("/salaryPaid", (req, res) => {
  let payloadData = req.body;
  console.log("payload--inside register data", JSON.stringify(payloadData));
  SalariesService.salaryPaid(payloadData)
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

route.get("/getSalariesByUserName", (req, res) => {
  let payloadData = req.query;
  console.log("data inside controller", payloadData);
  SalariesService.getSalariesByUserName(payloadData)
    .then((result) => {
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

module.exports = route;
