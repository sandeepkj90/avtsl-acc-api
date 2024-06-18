const express = require("express");
const InvestmentsService = require("../service/investment-service");
const route = express.Router();
const CustomResponse = require("../utils/custom-response");
// const Joi = require('joi');
route.post("/investmentAdd", (req, res) => {
  let payloadData = req.body;
  console.log("payload--inside register data", JSON.stringify(payloadData));
  InvestmentsService.investmentAdd(payloadData)
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

route.get("/getInvestmentsByCondition", (req, res) => {
  let payloadData = req.query;
  console.log("data inside controller", payloadData);
  InvestmentsService.getInvestmentsByCondition(payloadData)
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
