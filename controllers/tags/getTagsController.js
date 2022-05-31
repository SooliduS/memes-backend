const Tag = require('../../models/tagModel')

const getTags = async (req , res) => {
    const tags = await Tag.find({}).sort({impressions:-1}).limit(6).exec()
    res.status(200).json({tags})
}

const getAllTags = async (req , res) => {
    const page = req.params.page || 1
    const tags = await Tag.find({}).sort({impressions:-1}).skip((page-1)*50).limit(50).exec()
    res.status(200).json({tags})
}
module.exports = {getTags , getAllTags}