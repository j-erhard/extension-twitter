const tweetController = require("../controllers/tweet.controller");
const express = require("express");
let router = express.Router();

/**
 * @swagger
 * /tweet/findEtatTweetByUrl:
 *   post:
 *      description: Used to get a customer's info
 *      tags:
 *          - tweet
 *      parameters:
 *          - in: body
 *            name: sdf
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
 *      responses:
 *          '200':
 *              description: Resource returned successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */
router.post("/findEtatTweetByUrl", tweetController.findEtatTweetByUrl)


/**
 * @swagger
 * /tweet/findAllSignaledTweetOrderedByNbRequesDESC:
 *   get:
 *      description: Used to get a customer's info
 *      tags:
 *          - tweet
 *      responses:
 *          '200':
 *              description: Resource returned successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */
router.get("/findAllSignaledTweetOrderedByNbRequesDESC", tweetController.findAllSignaledTweetOrderedByNbRequesDESC)

module.exports = router;