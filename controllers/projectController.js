const DbContext = require("../firebase/dbContext")
const Project = require("../models/project")
const ProjectService = require("../services/projectFirebase")

const getCreate = (req, res) => {

    const authorisation =  new Authorisation();
    let logged = authorisation.IsLoggedIn(req)
    
    let data = authorisation.GetUserData(req)

    if(!logged){
        res.redirect("/")
        res.end()
    }
    else{
        res.render("project/create")
        res.end()
    }

    
}

const getList = (req, res) => {
    const projectContext = new DbContext().Initialize("projects");

    let projects = []

    let querry = projectContext
    .get()
    .then((document) => {
        
        document.forEach((project) => {
            let title = project["_fieldsProto"]["title"]["stringValue"]
            let description = project["_fieldsProto"]["description"]["stringValue"]
            let technology = project["_fieldsProto"]["technology"]["stringValue"]

            projects.push(
                {title: title, 
                description: description, 
                technology: technology}
                )

        })

        res.render("project/list", {projects: projects})
    })
    .catch(err => {
        console.log(err)
    })

}

const postCreate =(req, res) => {
    const projectContext = new DbContext().Initialize("projects");
    const projectService = new ProjectService();
    const {title, description, technology} = req.body;
    const ProjectModel = new Project(title, description, technology)

    projectService
    .SaveProject(ProjectModel)
    .catch(err => {
        console.log(err)
    })

    res.redirect('/')
}

module.exports = {
    getCreate,
    postCreate,
    getList,
}