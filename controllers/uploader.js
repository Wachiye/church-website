require("dotenv").config();

var cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


exports.upload = (req, res) => {
    return new Promise( (resolve, reject) => {
        if(!req.file){
            res.status(400).json({
                message: "Error: No files selected"
            });
            return;
        }
        
        cloudinary.uploader.upload(req.file.path, (err, uploadedFile) =>{
            if (err) {
                data = {
                    message: err.message || "Error: Could not upload your file",
                    
                }
                console.log(data)
                reject(data.message);
            } else {
                data = {
                    message: "File uploaded",
                    uploadedFile: uploadedFile
                };
                console.log(data)
                resolve(data);
            }
        });
    });
}
    