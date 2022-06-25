const router = require("express").Router()
const UserModel =  require("../models/UserModel")

// REGISTER
router.post("/register", async (req, res) => {

    const newUser = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        userImg: req.body.userImg
    })

    try {
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (err) {
        res.status(500).json(err)
    } 
})

module.exports = router;