const connect = require('../MySQL')
module.exports = class Sql {
    constructor(){
        this.db = connect
    }
    async query(sql){
        return new Promise((resolve, reject) =>{
            this.db.query(sql, (err, result, fields) =>{
                if(err) return reject(err)
                if(result) return resolve(result)
            })
        })
    }
}