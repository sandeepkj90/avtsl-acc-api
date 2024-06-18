const Joi = require("joi");
const customerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.number().integer().required(),
  salary: Joi.number().integer().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,30}$")).required(),
  address: Joi.string().required(),
  role: Joi.string().valid("CUSTOMER", "EMPLOYEE", "OPERATOR").required(),
  profilePic: Joi.string().allow(""),
  active: Joi.boolean().required(),
});

module.exports = customerSchema;
