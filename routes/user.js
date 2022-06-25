const router = require("express").Router()



router.get("/test", (req, res) => {
    res.send("test response success: 200")
})

router.post("/posttest", (req, res) => {
    const username = req.body.username
    res.send('Username : ' + username)
})


module.exports = router