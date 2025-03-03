const router = require("express").Router();
const userController = require("../controllers/taskController");

router.get("/", userController.getTasks);

module.exports = router;
