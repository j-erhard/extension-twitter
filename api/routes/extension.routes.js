const extensionController = require("../controllers/extension.controller");
const express = require("express");
let router = express.Router();
//
// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *      sujet:
//  *          type: string
//  *          enum:
//  *              - politique
//  *              - religion
//  *      tags:
//  *          - tweet
//  *      parameters:
//  *          - in: query
//  *            name: url
//  *            type: string
//  *            required: true
//  *            value: https://twitter.com/exemple/010203
//  *      responses:
//  *          '200':
//  *              description: Resource returned successfully
//  *          '500':
//  *              description: Internal server error
//  *          '400':
//  *              description: Bad request
//  */



/**
 * @swagger
 * /extension/findEtatTweetByUrl:
 *   get:
 *      description: Used to get a customer's info
 *      tags:
 *          - extention
 *      parameters:
 *          - in: query
 *            name: url
 *            type: string
 *            required: true
 *            value: https://twitter.com/Visa_Fr/status/14501268814461050920
 *      responses:
 *          '200':
 *              description: Resource returned successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */
router.get("/findEtatTweetByUrl", extensionController.findEtatTweetByUrl)


/**
 * @swagger
 * /extension/signaleTweet:
 *   post:
 *      description:
 *      tags:
 *          - extention
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
 *                      example: https://twitter.com/exemple/010203
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
router.post("/signaleTweet", extensionController.signaleTweet)

/**
 * @swagger
 * /extension/signalementLevel:
 *   post:
 *      description:
 *      tags:
 *          - extention
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
router.post("/signalementLevel", extensionController.signalementLevel)


/**
 * @swagger
 * /extension/addInformationToSignlement:
 *   post:
 *      description:
 *      tags:
 *          - extention
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
 *                      example: https://twitter.com/lereglement/status/1462080465691713537
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
router.post("/addInformationToSignlement",extensionController.addInformationToSignlement)

module.exports = router;