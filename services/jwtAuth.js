const jwt = require("jsonwebtoken")

class Auth {

    JWTAuthenticate(credentials, expirySec, jwtKey){

        const token = jwt.sign(credentials, jwtKey, {
            algorithm: "HS256",
            expiresIn: expirySec
        })

        return token;
    }
}

module.exports = Auth