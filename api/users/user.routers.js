const {
    createUser, 
    deleteuser, 
    getAllUsers, 
    getUserbyid, 
    updateuser,
    login
} = require("./user.controller");

const multer = require("multer")
const path = require("path");
const req = require("express/lib/request");

const storage = multer.diskStorage({
    destination : "./upload/images",
    filename : (req, file, cb) => {
        return  cb (null, `${"Test_img"}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage : storage
})


const router = require("express").Router();
const { validate }= require("../../auth/tokenvalidation");

router.post("/api/create", validate, createUser);
router.post("/api/deleteuser", validate, deleteuser);
router.post("/api/getallusers", validate, getAllUsers);
router.post("/api/getusersbyid",validate, getUserbyid);
router.post("/api/updateuser", validate, updateuser);

router.post("/api/imgupload", validate,  upload.single('profile'), (req, res)=>{
    res.json({
        success: 1,
        profile_url: req.file.path
    })
});

router.post("/api/login", login);


module.exports = router;