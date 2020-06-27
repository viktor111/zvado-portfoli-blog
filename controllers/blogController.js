const BlogService = require("../services/postFirebase")
const DbContext =  require("../firebase/dbContext")
const Authorisation = require("../helpers/jwtAuthorisation")
const Blog = require("../models/blog")


const getCreate = (req, res) => {
    const authorisation =  new Authorisation();
    let logged = authorisation.IsLoggedIn(req)
    
    let data = authorisation.GetUserData(req)

    if(!logged){
        res.redirect("/")
        res.end()
    }
    else{
        res.render("blog/post")
    }

}

const getMain = (req, res) => {
    const postsContext = new DbContext().Initialize("posts");

    let posts = []

    let querry = postsContext
    .get()
    .then((document) => {
        
        document.forEach((post) => {
            let id = post.id;
            let title = post["_fieldsProto"]["title"]["stringValue"]
            let description = post["_fieldsProto"]["description"]["stringValue"]
            let technology = post["_fieldsProto"]["technology"]["stringValue"]

            posts.push(
                {title: title, 
                description: description, 
                technology: technology,
                id: id
                }
                )

        })

        res.render("blog/main", {posts: posts})
    })
    .catch(err => {
        console.log(err)
    })

}

const postCreate =(req, res) => {

    const blogService = new BlogService()
    const {title, description, technology} = req.body;
    const BlogModel = new Blog(title, description, technology)

    blogService
    .SavePost(BlogModel)
    .catch(err => {
        console.log(err)
    })

    res.redirect('/')
}

module.exports = {
    postCreate,
    getMain,
    getCreate
}