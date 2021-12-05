const jugementController = require("../controllers/jugement.controller");
const express = require("express");
let router = express.Router();

/**
 * @swagger
 * /jugement/nouveauJugement:
 *   post:
 *      description:
 *      tags:
 *          - jugement
 *      parameters:
 *          - in: body
 *            name: jugement
 *            description: User data
 *            schema:
 *              type: object
 *              required:
 *                 - url
 *                 - idUser
 *              properties:
 *                 url:
 *                      type: String
 *                      maxLength: 1500
 *                      example: https://twitter.com/AmcbToraidhe/status/1466478885000790016
 *                 idUtilisateur:
 *                      type: int
 *                      maxLength: 150
 *                      example: 2
 *                 decision:
 *                      type: string
 *                      maxLength: 150
 *                      example: vrai
 *                 description:
 *                      type: string
 *                      maxLength: 150
 *                      example: skjdkosjdo description
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */
router.post("/nouveauJugement",jugementController.nouveauJugement)

module.exports = router;