const Project = require("../models/project")
const DbContext = require("../firebase/dbContext")

class ProjectService{

    SaveProject(Project){

        let dbContext = new DbContext().Initialize("projects")
        
        return dbContext.add({
            
            title: Project.title,
            description: Project.description,
            technology: Project.technology
        })
    }   
    
}

module.exports = ProjectService