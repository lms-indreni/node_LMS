var crypto = require('crypto');

module.exports = class Books {
    constructor(id = null, code = this.generateCode(),student_code = null, title = null , author_name= null , publication = null , semester = null ,  status = 1,created_by = null ,updated_by = null , deleted_by = null , created_at = new Date(), updated_at = new Date() , deleted_at = null ){
        this.id = id;
        this.code = code;
        this.student_code = student_code;
        this.title = title;
        this.author_name = author_name;
        this.publication = publication;
        this.semester = semester;
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
        return crypto.createHash('md5').update(Books.name + rand.toString() + ((new Date()).toString())).digest('hex');
    }

};
