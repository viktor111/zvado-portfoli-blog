const DbContext = require("../firebase/dbContext")
const Project = require("../models/project")
const ProjectService = require("../services/projectFirebase")

const getCreate = (req, res) => {
    res.render("project/create")
    res.end()
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
    postCreate
}