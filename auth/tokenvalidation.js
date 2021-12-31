const { verify } = require("jsonwebtoken");

module.exports ={
    validate : (req, res, next) => {
        var token = req.get("Authorization");
        if (token){
            token = token.slice(7)
            verify(token, process.env.JSON_PASS, (err, decoded) =>{
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