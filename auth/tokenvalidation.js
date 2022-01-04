const { verify } = require("jsonwebtoken");
var CryptoJS = require("crypto-js");


module.exports ={
    validate : (req, res, next) => {
        var jsontoken = req.get("Authorization");
        // var bytes  = CryptoJS.AES.decrypt(JSON.stringify({jsontoken}), process.env.SCRT_kEY).toString(CryptoJS.enc.Utf8);
        // var data = JSON.parse(bytes);
        // console.log(data)
    
        if (jsontoken){
            jsontoken = jsontoken.slice(7)
            verify(jsontoken, process.env.JSON_PASS, (err, decoded) =>{
                if(err){
                    return res.json({
                        success: 0,
                        message : "Invalid token"
                    });
                }else{
                    next();
                }
            });
            
        }else{
            res.json({
                success : 0,
                message : "Access denied! unauthorized token"
            });
        }
    }
}