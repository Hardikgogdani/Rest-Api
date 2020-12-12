require("./model");

const controller = require("./controller");

const express = require("express");

const router = express.Router();

router.post("/", controller.create);

router.put("/:id", controller.update);

router.get("/:id", controller.findUserId);

router.put("/isActive/:id", controller.delete);

router.post("/login", controller.login);

router.get("/",controller.findAll);

module.exports = router;