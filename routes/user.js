const router = require("express").Router()
const UserModel = require("../models/UserModel")
const { tokenVerify,  tokenVerifyAuthorization, verifyTokenAdmin } = require("../middleware/tokenVerify")
const CryptoJs = require('crypto-js')
const { restart } = require("nodemon")

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

// DELETE USER
router.delete("/delete-user/:id", verifyTokenAdmin, async (req, res) => {
    try {
        await UserModel.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted.")
    } catch(err) {
        res.status(500).json(err)
    }
})

// GET USER
router.get("/:id", tokenVerifyAuthorization, async (req,res) => {
  
    try {
        let currentUser = await UserModel.findById(req.params.id)
        console.log("currentUser" +currentUser);
        res.status(200).json(currentUser)
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router