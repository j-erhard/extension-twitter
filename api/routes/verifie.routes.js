const verifieController = require("../controllers/verifie.controller");
const express = require("express");
let router = express.Router();

/**
 * @swagger
 * /verifie/getVerificationOfVerificatorById:
 *   post:
 *      description:
 *      tags:
 *          - verifie
 *      parameters:
 *          - in: body
 *            name: verifie
 *            description: User data
 *            schema:
 *              type: object
 *              required:
 *                 - url
 *              properties:
 *                 url:
 *                      type: int
 *                      maxLength: 150
 *                      example: https://twitter.com/AmcbToraidhe/status/1466478885000790016
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */
router.post("/getVerificationOfVerificatorById", verifieController.getVerificationOfVerificatorById)


module.exports = router;