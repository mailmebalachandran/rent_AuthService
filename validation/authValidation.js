const Joi = require('@hapi/joi');

const authticationWithRefreshToken = (body) =>{
    const schema = Joi.object({
        Refresh_Token : Joi.string().required()
    })
    return schema.validate(body).error;
}


module.exports = {  authticationWithRefreshToken };