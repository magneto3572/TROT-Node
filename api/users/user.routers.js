const {
    createUser, 
    deleteuser, 
    getAllUsers, 
    getUserbyid, 
    updateuser,
    login,
    createUserprofile,
    getUserProfbyid,
    updateuserbyid,
    fetchwalletbalacebyid,
    fetchtransactionbyid,
    addTransaction,
    getTransactionUsingMon,
    addUserSubscription,
    updateRideStatus
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

router.post("/api/login", login);
router.post("/api/create", createUser);
router.post("/api/updateuser", validate, updateuser);
router.post("/api/deleteuser", validate, deleteuser);
router.post("/api/getallusers", validate, getAllUsers);
router.post("/api/getusersbyid",validate, getUserbyid);
router.post("/api/createprofile",validate, createUserprofile);
router.post("/api/getuserprofile",validate, getUserProfbyid);
router.post("/api/updateuserprofile",validate, updateuserbyid);
router.post("/api/fetchwallet", validate, fetchwalletbalacebyid);
router.post("/api/fetchtransaction", validate, fetchtransactionbyid);
router.post("/api/addtransaction", validate, addTransaction)
router.post("/api/getTransaction", validate,  getTransactionUsingMon)
router.post("/api/addUserSubscription",validate, addUserSubscription)
router.post("/api/updateridestatus",validate, updateRideStatus)

router.post("/api/imgupload", validate,  upload.single('profile'), (req, res)=>{
    res.json({
        success: 1,
        profile_url: req.file.path
    })
});

module.exports = router;