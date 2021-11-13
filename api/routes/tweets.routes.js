const tweetController = require("../controllers/tweets.controller");
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
 * /tweet/find/etat/tweet/by/url:
 *   get:
 *      description: Used to get a customer's info
 *      tags:
 *          - tweet
 *      parameters:
 *          - in: query
 *            name: url
 *            type: string
 *            required: true
 *            value: https://twitter.com/exemple/010203
 *      responses:
 *          '200':
 *              description: Resource returned successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */
router.get("/find/etat/tweet/by/url", tweetController.findEtatTweetByUrl)


/**
 * @swagger
 * /tweet/signale/tweet:
 *   post:
 *      description:
 *      tags:
 *          - tweet
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
router.post("/signale/tweet", tweetController.signaleTweet)

module.exports = router;