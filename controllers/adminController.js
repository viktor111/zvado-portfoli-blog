const DbContext = require("../firebase/dbContext")
const JWTAuth = require("../services/jwtAuth")
const Authorisation = require("../helpers/jwtAuthorisation")

const getAdminLogin = (req, res) => {
    res.render("admin/login")
    res.end()   
}

const getAdminMain = (req, res) => {
    const authorisation =  new Authorisation();
    let logged = authorisation.IsLoggedIn(req)
    
    let data = authorisation.GetUserData(req)

    if(!logged){
        res.redirect("/")
        res.end()
    }
    else{
        res.render("admin/main")
    }
}

const postAdminLogin = (req, res) => {
    const {username, password} = req.body
    const expirySec = 300000;
    const jwtKey = "auth"
    console.log(username, password)

    const accountsContext = new DbContext().Initialize("accounts")
    const auth = new JWTAuth();

    let querry = accountsContext
    .where("username", "==", username)
    .get()
    .then((document) => {
        console.log("row 37")
        document.forEach((account) => {
            let passwordDb = account["_fieldsProto"]["password"]["stringValue"]
            console.log(passwordDb)
            if(password === passwordDb){
                let token = auth.JWTAuthenticate({username}, expirySec, jwtKey)
                res.cookie("token", token)
                res.redirect("/")
            }
        })
    })
    .catch(err => {
        console.log(err)
    })
}

module.exports = {
    getAdminLogin,
    postAdminLogin,
    getAdminMain
}