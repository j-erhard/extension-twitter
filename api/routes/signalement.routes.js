const signalementController = require("../controllers/signalement.controller");
const express = require("express");
let router = express.Router();


/**
 * @swagger
 * /signalement/signaleTweet:
 *   post:
 *      description:
 *      tags:
 *          - signalement
 *      parameters:
 *          - in: body
 *            name: tweet
 *            description: User data
 *            schema:
 *              type: object
 *              required:
 *                 - url
 *              properties:
 *                 url:
 *                      type: string
 *                      maxLength: 150
 *                      example: https://twitter.com/Visa_Fr/status/14501268814461050920
 *                 sujet:
 *                      type: ["string", "null"]
 *                      example:
 *                 description:
 *                      type: ["string", "null"]
 *                      example:
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */
router.post("/signaleTweet", signalementController.signaleTweet)

/**
 * @swagger
 * /signalement/signalementLevel:
 *   post:
 *      description:
 *      tags:
 *          - signalement
 *      parameters:
 *          - in: body
 *            name: tweet
 *            description: User data
 *            schema:
 *              type: object
 *              required:
 *                 - url
 *              properties:
 *                 url:
 *                      type: int
 *                      maxLength: 150
 *                      example: https://twitter.com/Visa_Fr/status/14501268814461050920
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */
router.post("/signalementLevel", signalementController.signalementLevel)


/**
 * @swagger
 * /signalement/addInformationToSignlement:
 *   post:
 *      description:
 *      tags:
 *          - signalement
 *      parameters:
 *          - in: body
 *            name: tweet
 *            description: User data
 *            schema:
 *              type: object
 *              required:
 *                 - url
 *              properties:
 *                 url:
 *                      type: int
 *                      maxLength: 150
 *                      example: https://twitter.com/Visa_Fr/status/14501268814461050920
 *                 sujet:
 *                      type: string
 *                      example: politique
 *                 description:
 *                      type: string
 *                      example: Pierre
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */
router.post("/addInformationToSignlement",signalementController.addInformationToSignlement)

module.exports = router;