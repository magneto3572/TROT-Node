const {
    create, 
    getUsers, 
    getUsersbyid, 
    updateusers, 
    deleteUsersbyid, 
    getuserbyemail,
    createUserProfile,
    getUserProfilebyId,
    updateUserProfilebyId,
    fetchWalletBalance,
    fetchTransactionHistory,
    addTransactionDetails,
    gettimestamp,
    addSubscription,
    updateridestatus
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
                console.log(results)
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
                console.log(results)
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
                console.log.results
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
                console.log("Invalid email or password")
                return res.json({
                    success : 0,
                    message : "invalid email or password"
                });
            }

            const result = compareSync(body.password, results.password)
            if(result){
                results.password = undefined;
                const jsontoken = sign({result : results}, process.env.JSON_PASS, {
                    expiresIn : "15d"
                });
                // var ciphertext = CryptoJS.AES.encrypt(jsontoken, process.env.SCRT_kEY).toString();
                // console.log(ciphertext)

               console.log(results)
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
                message : "User Added"
            });
        });
    },

    getUserProfbyid : (req, res) =>{
        const body = req.body;
        getUserProfilebyId(body.id, (err, results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success : 0,
                    message : "Database connection error"
                });
            }

            if(!results){
                console.log(results)
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

    updateuserbyid : (req, res) =>{
        const body = req.body
        updateUserProfilebyId(body, (err, results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success : 0,
                    message : "Database connection error"
                });
            }
            if(!results){
                console.log(results)
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

    fetchwalletbalacebyid : (req, res) =>{
        const body = req.body
        fetchWalletBalance(body, (err, results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success : 0,
                    message : "Database connection error"
                });
            }
            if(!results){
                console.log(results)
                return res.json({
                    success : 0,
                    message : "Failed to get user"
                });
            }
            return res.status(200).json({
                success : 1,
                data : results
            });
        });
    },

    fetchtransactionbyid : (req, res) =>{
        const body = req.body
        fetchTransactionHistory(body, (err, results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success : 0,
                    message : "Database connection error"
                });
            }
            if(!results){
                console.log(results)
                return res.json({
                    success : 0,
                    message : "Failed to get user"
                });
            }
            return res.status(200).json({
                success : 1,
                data : results
            });
        });
    },

    addTransaction : (req, res) =>{
        const body = req.body
        addTransactionDetails(body, (err, results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success : 0,
                    message : "Database connection error"
                });
            }
            if(!results){
                console.log(results)
                return res.json({
                    success : 0,
                    message : "Failed to update"
                });
            }
            return res.status(200).json({
                success : 1,
                message : "Transaction status updated"
            });
        });
    },

    getTransactionUsingMon : (req, res) =>{
        const body = req.body
        gettimestamp(body, (err, results)=>{
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
          
            var array = [];
            for (let i = 0; i < results.length; i++) {
                const c = results[i].transaction_at
                var dateObj = new Date(c);
                var month = dateObj.getUTCMonth() + 1;
                var day = dateObj.getUTCDate();
                var year = dateObj.getUTCFullYear();
                newdate = year + "-" + month + "-" + day;
              
                if(month == body.mon){
                   results[i].transaction_at = newdate
                   array.push(results[i])
                } 
            }
           
            return res.status(200).json({
                success : 1,
                message : "Success",
                data : array
            });
        });
    },

    addUserSubscription : async(req, res) => {
            const body = req.body;     
            var today = new Date();
            const tomorrow = new Date(today)
            var n = 200
            let count = 0
           
            if(body.package_type == "weekends"){
                for(let i = 0; i<= n; i++){
                    tomorrow.setDate(tomorrow.getDate() + 1)
                    var year = tomorrow.getUTCFullYear();
                    var month = tomorrow.getUTCMonth() + 1;
                    var day = tomorrow.getUTCDate();
                    newdate = year + "-" + month + "-" + day;

                    if(count == body.ride_count){
                        break;
                    } else{
                        if(tomorrow.getUTCDay() == 6 || tomorrow.getUTCDay() == 0){
                            count++
                            body.status = newdate
                            addSubscription(body, (err, results) => {
                                if(err){
                                    console.log(err);
                                    return res.status(500).json({
                                        success : 0,
                                        message : "Database connection error"
                                    });
                                }
                            });
                        }
                    }
                }
                return res.status(200).json({
                    success : 1,
                    message : "Subcriptions Added"
                });
            }  
            else if (body.package_type == "weekdays"){
                for(let i = 0; i<= n; i++){
                    tomorrow.setDate(tomorrow.getDate() + 1)
                    var year = tomorrow.getUTCFullYear();
                    var month = tomorrow.getUTCMonth() + 1;
                    var day = tomorrow.getUTCDate();
                    newdate = year + "-" + month + "-" + day;
                
                    if(count != body.ride_count){
                        if(!(tomorrow.getUTCDay() == 6 || tomorrow.getUTCDay() == 0)){
                            count ++
                            body.status = newdate

                            addSubscription(body, (err, results) => {
                                if(err){
                                    console.log(err);
                                    return res.status(500).json({
                                        success : 0,
                                        message : "Database connection error"
                                    });
                                }
                            });
                        }
                    } else{
                        break;
                    }
                }   

                return res.status(200).json({
                    success : 1,
                    message : "Subcriptions Added"
                });
            }
            else{
                    for (let i = 0; i < body.ride_count; i++) { 
                        tomorrow.setDate(tomorrow.getDate() + 1)
                        var month = tomorrow.getUTCMonth() + 1;
                        var day = tomorrow.getUTCDate();
                        var year = tomorrow.getUTCFullYear();
                        newdate = year + "-" + month + "-" + day;
                        body.status = newdate
                        
                        addSubscription(body, (err, results) => {
                            if(err){
                                console.log(err);
                                return res.status(500).json({
                                    success : 0,
                                    message : "Database connection error"
                                });
                            }
                        });
                    }  
                    return res.status(200).json({
                    success : 1,
                        message : "Subcriptions Added"
                    });
            }
    },

    updateRideStatus : (req, res) => {
        const body = req.body;
        updateridestatus(body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success : 0,
                    message : "Database connection error"
                });
            }

            return res.status(200).json({
                success : 1,
                message : "updated"
            });
        });
    }
}