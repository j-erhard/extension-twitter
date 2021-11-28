const siteWebController = require("../controllers/siteWeb.controller");
const express = require("express");
let router = express.Router();


/**
 * @swagger
 * /siteWeb/findAllSignaledTweetOrderedByNbRequesDESC:
 *   get:
 *      description: Used to get a customer's info
 *      tags:
 *          - siteweb
 *      responses:
 *          '200':
 *              description: Resource returned successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */
router.get("/findAllSignaledTweetOrderedByNbRequesDESC", siteWebController.findAllSignaledTweetOrderedByNbRequesDESC)




module.exports = router;