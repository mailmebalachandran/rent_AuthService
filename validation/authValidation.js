const Joi = require('@hapi/joi');

const authticationWithRefreshToken = (body) =>{
    const schema = Joi.object({
        refresh_token : Joi.string().required()
    })
    return schema.validate(body).error;
}


module.exports = {  authticationWithRefreshToken };