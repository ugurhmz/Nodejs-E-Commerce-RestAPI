const CategoryModel = require("../models/CategoryModel")
const {  verifyTokenAdmin}  = require("../middleware/tokenVerify")
const router = require("express").Router()

// CREATE CATEGORY
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

// GET ALL CATEGORIES
router.get("/get-all", async (req,res) => {
    try {
        let allCategories = await CategoryModel.find()
        res.status(200).json(allCategories)
    } catch(error) {
        res.status(500).json(error)
    }
})

// GET ONE CATEGORY
router.get("/:id", async (req, res) => {

    if (req.params.id < 0) { return res.status(500).json({error: 'Id number cannot be less than zero'})}
    try {
        const category = await CategoryModel.findById(req.params.id)
        res.status(200).json(category)
    } catch(err) {
        res.status(500).json({
            err,
            msg:"Category Not Found"
        })
    }
})

module.exports =  router