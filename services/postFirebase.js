const Post = require("../models/blog")
const DbContext = require("../firebase/dbContext")

class PostService{

    SavePost(Project){

        let dbContext = new DbContext().Initialize("posts")
        
        return dbContext.add({
            
            title: Project.title,
            description: Project.description,
            technology: Project.technology
        })
    }   
    
}

module.exports = PostService