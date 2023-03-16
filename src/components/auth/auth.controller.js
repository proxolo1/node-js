const AuthService = require('./auth.service');

const AuthController = {
  /**
   * Handle logging in user.
   * @async
   * @method
   * @param {ExpressRequest} httpRequest
   * @returns {Promise.<ControllerResponse> }
   */





    // function to register the user
    register: async (httpRequest) => {
      try {
        console.log("aaaa")
        const registerdata = await AuthService.doRegister(httpRequest.body);
        console.log("registerdata",registerdata)
        //response of api call of register function (status code and data)
        return {
          statusCode: 200,
          body: {
            data: registerdata
          }
        };
      } catch (error) {
 
        // throw new BadRequestError(error.message);
      }
    },

score: async (httpRequest) => {
  try {
    const updatedScore = await AuthService.doUpdateScore(httpRequest.body);
    //response of api call of register function (status code and data)
    return {
      statusCode: 200,
      body: {
        data: updatedScore
      }
    };
  } catch (error) {

    // throw new BadRequestError(error.message);
  }
}

  };






module.exports = AuthController;
