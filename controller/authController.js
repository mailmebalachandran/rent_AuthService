const jwt = require('jsonwebtoken');
require('dotenv/config');
const userValidation = require('../validation/authValidation');

const authenticateUser = async (req, res) =>{
    let accessToken, refreshToken;
    if((req.body != null || req.body != undefined) && req.body.hasOwnProperty('_id'))
    {
        jwt.sign({user: req.body}, process.env.JWT_ACCESS_PRIVATE_KEY, {expiresIn:"5m"},(err, token) =>{
            accessToken = token;
          });
          jwt.sign({user: req.body}, process.env.JWT_REFRESH_PRIVATE_KEY, {expiresIn:"5d"},(err, token) =>{
              refreshToken = token;
              return res.status(200).send({"access_token" : accessToken, "refresh_token": refreshToken});
          });
    }
    else{
        return res.status(200).send({message: "Invalid user Details"});
    }
    // const validationResult = userValidation.authenticateValidation(req.body);
    // if(validationResult)
    //     return res.status(400).send({message: validationResult.details[0].message});
    
    // let user = await axios.post(process.env.USER_SERVICE_URL + "userService/authenticateUser", req.body)
    //      .then((res) =>{
    //         return res.data;
    //      })
    //      .catch((err) => {
    //         winston.error(err.message, err);
    //      });
        

}

const authenticateWithRefreshToken = async (req, res) =>{
    const validationResult = userValidation.authticationWithRefreshToken(req.body);
    if(validationResult)
        return res.status(400).send({message: validationResult.details[0].message});
    const authData = await jwt.decode(req.body.refresh_token);
    if(authData != null || authData != undefined){
        jwt.sign({user: authData.user}, process.env.JWT_ACCESS_PRIVATE_KEY, {expiresIn:"5m"},(err, token) =>{
            accessToken = token;
            
          });
          jwt.sign({user: authData.user}, process.env.JWT_REFRESH_PRIVATE_KEY, {expiresIn:"5d"},(err, token) =>{
              refreshToken = token;
              return res.status(200).send({"access_token" : accessToken, "refresh_token": refreshToken});
          });
    }
    else{
        return res.status(400).send({message:"Invalid Credentails Kindly login again"});
    }
}

const verifyToken = (req, res) =>{
    try{
        jwt.verify(req.body.access_token, process.env.JWT_ACCESS_PRIVATE_KEY, (err, authData) => {
            if(err){
                res.status(403).send({message:"Invalid Token"});
            }
            else{
                res.status(200).send(authData);
            }
        });
}
catch(err){
    res.status(400).send({message:"Exception is "+ err})
}
}

const decodeToken = (req, res) =>{
    try{
        jwt.verify(req.body.access_token, process.env.JWT_ACCESS_PRIVATE_KEY, (err, authData) => {
            if(err){
                res.status(403).send({message:"Invalid Token"});
            }
            else{
                res.status(200).send(authData);
            }
        });
}
catch(err){
    res.status(400).send({message:"Exception is "+ err})
}
}


module.exports = {
                authenticateUser,
                authenticateWithRefreshToken,
                verifyToken,
                decodeToken};