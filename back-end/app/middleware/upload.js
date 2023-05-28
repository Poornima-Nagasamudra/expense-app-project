const path = require("path")
const multer = require("multer")

const Storage = multer.diskStorage({
    destination : function(req , file , cb){
        cb(null , "uploads")
    },
    filename: function( req , file , cb){
        let ext = path.extname(file.originalname)
        cb(null , Date.now() + ext)
    }
})

const upload = multer({
    storage : Storage ,
    fileFilter : function  (req, file, callback){
        if(
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpeg"           
        ) {
            callback(null , true)
        } else {
            console.log("Only Jpeg and Png files Supporter")
            callback(null , false)
        }
    }
    // limits : {
    //     fileSize : 1024 * 1024 * 2
    // }
})

module.exports = upload