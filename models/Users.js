var crypto = require('crypto');

module.exports = class Users {
    constructor(id = null, code = this.generateCode(),first_name = null, middle_name = null , last_name = null , phone_no = null , username = null , password = null , confirm_password = null , email =null , batch = null , status = 1,created_by = null ,updated_by = null , deleted_by = null , created_at = new Date(), updated_at = new Date() , deleted_at = null ){
        this.id = id;
        this.code = code;
        this.first_name = first_name;
        this.middle_name = middle_name;
        this.last_name = last_name;
        this.phone_no = phone_no;
        this.username = username;
        this.password =password;
        this.confirm_password = confirm_password;
        this.email = email;
        this.batch = batch;
        this.status = status;
        this.created_by = created_by;
        this.updated_by = updated_by;
        this.deleted_by = deleted_by;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
        
        
    }

    generateCode() {
        let rand = Math.floor(Math.random() * 1011010101010101010000);
        return crypto.createHash('md5').update(Users.name + rand.toString() + ((new Date()).toString())).digest('hex');
    }

};
