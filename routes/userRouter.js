const express = require("express");
const router = express.Router();
const {

    signup_post,
    get_user,
    get_all_user,
    delete_user
} = require("../controller/userController");
router.get("/signup", get_all_user);
router.post("/signup", signup_post);
router.get("/", get_user);

router.delete("/deleteUser/:userId", delete_user)
module.exports = router;