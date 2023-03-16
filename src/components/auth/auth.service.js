const bcrypt = require('bcryptjs');
const { User } = require('../../db/models');
const JwtService = require('./jwt.service');
const db = require('../../db/db.js');
const { BadRequestError, NotFoundError } = require('../../utils/api-errors');

const AuthService = {
  /**
   * Login a user and generate token.
   * @async
   * @method
   * @param {UserDto} requestBody - Request Body
   * @returns {Context} Context object
   * @throws {NotFoundError} When the user is not found.
   */

  doRegister: async (requestBody) => {
    try {
      //name ,email and password from the object is stored to variable and binded to query
      console.log('requestBody');
      const { playerFullName, playerEmail, phoneNo, category } = requestBody;
      console.log('requestBody', requestBody);
      var sqlQuery = `SELECT playerEmail from player where playerEmail = '${playerEmail}'`;
      const emailResult = await db.promise(sqlQuery);
      // checking if email alredy exist or not
      if (!emailResult.length == 0) {
        return new BadRequestError('Email is already in use');
      }

      var sqlObj = `INSERT INTO player VALUES (?,?,?,?,?)`;
      // making db call for inset user in to user_account table with role table inserion
      const playerId = await db
        .promise(sqlObj, [, playerFullName, playerEmail, phoneNo, category])
        .then((result) => {
          let queryObj = `select playerId from player where playerId = '${result.insertId}'`;
          console.log('ppppppp', db.promise(queryObj));
          return db.promise(queryObj);
        })
        .then(async (result) => {
          let queryObj = `INSERT INTO score VALUES (?,?,?,?,?,?,?,?,?)`;
          const score = await db.promise(queryObj, [, result[0].playerId, 0, 0, 0, 0, 0, 0, 0]);
          return result[0].playerId;
        })
        .catch((err) => {
          console.log('catch error', err);
        });
      if (!playerId) {
        throw new BadRequestError('Insert failed');
      }

      return {
        playerId
      };
    } catch (error) {
      console.log('catch error', err);
    }
  },

  doUpdateScore: async (httpRequest) => {
    try {
      //name ,email and password from the object is stored to variable and binded to query
      console.log('requestBody1',httpRequest);
      const { player_id, gkScore, financialScore, retailScore, healthCareScore, manufactureScore, automationScore } = httpRequest;


      var sqlObj = `UPDATE score
        SET highScore = ( '${gkScore}'+'${financialScore}'+'${retailScore}'+'${healthCareScore}'+'${manufactureScore}'+'${automationScore}'),
        gkScore='${gkScore}',
        financialScore='${financialScore}',
        retailScore='${retailScore}',
        healthCareScore='${healthCareScore}',
        manufactureScore='${manufactureScore}',
        automationScore='${automationScore}'
        WHERE player_id ='${player_id}';`;

        console.log("sqlObj",sqlObj)
      const resultObj = await db.promise(sqlObj)
      return resultObj;
    } catch (error) {
      console.log('catch error', err);
    }
  }
};

module.exports = AuthService;
