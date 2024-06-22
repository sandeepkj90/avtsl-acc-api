const express = require("express");
const ClientBillService = require("../service/client-bill-service");
const route = express.Router();
const CustomResponse = require("../utils/custom-response");
// const Joi = require('joi');
route.post("/addBill", (req, res) => {
  let payloadData = req.body;
  console.log("payload--inside register data", JSON.stringify(payloadData));
  ClientBillService.addBill(payloadData)
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

route.get("/getBillByUserName", (req, res) => {
  let payloadData = req.query;
  console.log("data inside controller", payloadData);
  ClientBillService.getBillByUserName(payloadData)
    .then((result) => {
      res
        .status(200)
        .send(CustomResponse.sendResponse(200, result.data, result.message));
    })
    .catch((error) => {
      res
        .status(error.status)
        .send(
          CustomResponse.sendResponse(error.status, error.data, error.message)
        );
    });
});
route.patch("/billPaid/:billId", (req, res) => {
  let payloadData = req.params;
  console.log("data inside controller", payloadData);
  ClientBillService.billPaid(payloadData)
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
