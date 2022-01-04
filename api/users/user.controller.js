const {
    create, 
    getUsers, 
    getUsersbyid, 
    updateusers, 
    deleteUsersbyid, 
    getuserbyemail,
    createUserProfile
} = require("./user.services");

const { genSaltSync, hashSync ,compareSync} = require("bcrypt");

const {sign} = require("jsonwebtoken")
var CryptoJS = require("crypto-js");

module.exports = {
    createUser : (req, res) =>{
        const body = req.body;
        const salt  = genSaltSync(10)
        body.password = hashSync(body.password, salt)
        create(body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success : 0,
                    message : "Database connection error"
                });
            }
            return res.status(200).json({
                success : 1,
                data : results
            });
        });
    },

    getUserbyid : (req, res) =>{
        const body = req.body;
        getUsersbyid(body.id, (err, results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success : 0,
                    message : "Database connection error"
                });
            }

            if(!results){
                return res.json({
                    success : 0,
                    message : "Record not found"
                });
            }
            return res.status(200).json({
                success : 1,
                data : results
            });
        });
    },

    getAllUsers : (req, res) =>{
        getUsers((err, results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success : 0,
                    message : "Database connection error"
                });
            }
            return res.status(200).json({
                success : 1,
                data : results
            });
        });
    },

    updateuser : (req, res) =>{
        const body = req.body
        const salt = genSaltSync(10)
        body.password = hashSync(body.password, salt)
        updateusers(body, (err, results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success : 0,
                    message : "Database connection error"
                });
            }
            if(!results){
                return res.json({
                    success : 0,
                    message : "Failed to  update user"
                });
            }
            return res.status(200).json({
                success : 1,
                message : "User updated sucessfully"
            });
        });
    },

    deleteuser : (req, res) =>{
        const body = req.body
        deleteUsersbyid(body.id, (err, results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success : 0,
                    message : "Database connection error"
                });
            }
            if(!results){
                return res.status(500).json({
                    success : 0,
                    message : "Record not found"
                });
            }
            return res.status(200).json({
                success : 1,
                message : "User deleted sucessfully"
            });
        });
    },

    login : (req, res) =>{
        const body = req.body;
        getuserbyemail(body.email, (err, results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success : 0,
                    message : "Database connection error"
                });
            }

            if(!results){
                return res.json({
                    success : 0,
                    message : "invalid email or password"
                });
            }

            const result = compareSync(body.password, results.password)
            if(result){
                results.password = undefined;
                const jsontoken = sign({result : results}, process.env.JSON_PASS, {
                    expiresIn : "1h"
                });
                // var ciphertext = CryptoJS.AES.encrypt(jsontoken, process.env.SCRT_kEY).toString();
                // console.log(ciphertext)

                return res.json({
                    success : 1,
                    message : "login sucessfully",
                    token : jsontoken
                });
            }else{
                return res.json({
                    success : 0,
                    data : "Invalid email or password"
                });
            }
        });
    },

    createUserprofile : (req, res) =>{
        const body = req.body;
        createUserProfile(body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success : 0,
                    message : "Database connection error"
                });
            }
            return res.status(200).json({
                success : 1,
                data : results
            });
        });
    },
}