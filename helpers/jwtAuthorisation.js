const jwt = require('jsonwebtoken')

class Authorisation {

    IsLoggedIn(req) {

        const token = req.cookies.token;

        if (!token) {

            return false
        }
        else{
            
            return true
        }
    }

    GetUserData(req){

        const token = req.cookies.token;

        let payload = jwt.verify(token, 'auth')

        let data = {
            username: payload.username, 
        }

        return data
    }

}

module.exports = Authorisation