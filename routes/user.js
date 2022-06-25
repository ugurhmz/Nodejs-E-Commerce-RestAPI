const router = require("express").Router()
const UserModel = require("../models/UserModel")
const { tokenVerify,  tokenVerifyAuthorization } = require("../middleware/tokenVerify")
const CryptoJs = require('crypto-js')

// UPDATE USER
router.put("/update-user/:id", tokenVerifyAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJs.AES.encrypt(req.body.password, process.env.PAS_SECURITY).toString()
    }

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body},
            { new: true }
        );
        res.status(200).json(updatedUser)
    } catch (err) {
        res.status(500).json(err)
    }
})


router.post("/posttest", (req, res) => {
    const username = req.body.username
    res.send('Username : ' + username)
})


module.exports = router