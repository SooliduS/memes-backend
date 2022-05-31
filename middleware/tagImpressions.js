const Tag = require ('../models/tagModel')
const {logEvents} = require('./logEvents')

const tagImpressions = async (req, res, next) => {
    console.log(req.params)
    if(!req?.body?.tags && !req?.params?.tag)  return next()
    next()
    console.log('tags :' )  
     const tags = req.body.tags || [req.params.tag]
    try{
        for (const tag of tags ) {
            const myTag = await Tag.findOne({tagName:tag}).exec()
            if(!myTag){
                const result = await Tag.create({tagName:tag , impressions : 1})
                logEvents(JSON.stringify(result) , 'tagLogs.txt')
            }
            else {
                myTag.impressions +=1
                const result = await myTag.save()
                logEvents(JSON.stringify(result) , 'tagLogs.txt')
            }
        }
    }catch(err){
        console.error(err)
    }
}

module.exports = tagImpressions