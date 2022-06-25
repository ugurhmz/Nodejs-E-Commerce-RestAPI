const router = require("express").Router()
const UserModel =  require("../models/UserModel")
const CryptoJs = require('crypto-js')

// REGISTER
router.post("/register", async (req, res) => {

    const newUser = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJs.AES.encrypt(req.body.password, process.env.PAS_SECURITY),
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