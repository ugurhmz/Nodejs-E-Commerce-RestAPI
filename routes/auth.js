const router = require("express").Router()
const UserModel =  require("../models/UserModel")
const CryptoJs = require('crypto-js')
const jwt = require('jsonwebtoken')

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

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const hasUser = await UserModel.findOne({  username : req.body.username })
        
       if (!hasUser) {
           return res.status(401).json("User not found, try again!")
       }
       const hashedPassword = CryptoJs.AES.decrypt (
            hasUser.password,
            process.env.PAS_SECURITY
       )
       const dbPassword = hashedPassword.toString(CryptoJs.enc.Utf8)
       if  (dbPassword !== req.body.password) {
           return  res.status(401).json("Your password is wrong please fix it!")
       }
     const accessToken = jwt.sign(
            {
                id: hasUser._id,
                isAdmin: hasUser.isAdmin
            },
            process.env.JWT_SECURITY,
            { 
                expiresIn: "7d"
            }
        );

        const { password, ...exceptThePassword} = hasUser._doc

        // response 
        const loginMsg = "Login success."
        res.status(200).json({
            ...exceptThePassword,
            accessToken,
            loginMsg
        })
        
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;