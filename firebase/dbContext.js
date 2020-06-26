const admin = require("firebase-admin");

class DbContext{

    Initialize(db){
        
        let dbRefferal = admin.firestore().collection(db);

        return dbRefferal;
    }
}

module.exports = DbContext;