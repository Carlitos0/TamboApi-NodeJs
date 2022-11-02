const router = require("express").Router();

router.get("/", async (req,res) => {
    res.json({
        message: "Welcome to Tambo API"
    })
})

module.exports = router;