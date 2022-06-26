const CategoryModel = require("../models/CategoryModel")
const {  verifyTokenAdmin}  = require("../middleware/tokenVerify")
const router = require("express").Router()


router.post("/create", verifyTokenAdmin, async (req, res) => {
    const { name } =   req.body

    try {
        let dbCategory = await CategoryModel.findOne({name})
        
        if (dbCategory) {
            return res.status(403).json({error: 'Category already exist!'})
        }

        const newCategory = new CategoryModel(req.body)
        const saveCategory = await newCategory.save()
        res.status(200).json(saveCategory)
    
    } catch(error) {
        res.status(500)
    }

})

module.exports =  router