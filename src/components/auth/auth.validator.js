const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const options = {
  errors: {
    wrap: {
      label: ''
    }
  }
};

const validateLogin = (httpRequest) => {
  const schema = Joi.object({
 
      playerFullName: Joi.string().min(3).max(20).required()
  });
  return schema.validate(httpRequest.body, options);
};

module.exports = {
  validateLogin
};
