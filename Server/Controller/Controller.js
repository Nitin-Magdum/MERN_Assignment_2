const blogModel = require("../Model/Model");
const { v4: uuidv4 } = require("uuid");




function GetBlogs(req, res) {
    blogModel.find({})
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send({ message: 'Error getting blogs' });
        });
}


async function GetBlog(req, res) {
    try {
        const blog = await blogModel.findOne({ _id: req.params.id }).exec();
        if (blog !== null) {
            res.status(200).send(blog);
        } else {
            res.status(404).send({
                status: 404,
                message: `Blog with specified id: ${req.params.id} does not exist`,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
            status: 500,
            message: 'Internal server error',
        });
    }
}


function AddBlog(req, res) {
    const blog = new blogModel({
        _id: uuidv4(),
        title: req.body.title,
        blogSummary: req.body.blogSummary,
    });

    blog.save()
        .then(() => {
            res.status(201).send({ message: 'Blog added successfully' });
        })
        .catch((error) => {
            console.error('Error adding blog:', error);
            res.status(500).send({ message: 'Error adding blog' });
        });
}





module.exports = {
    GetBlogs,
    GetBlog,
    AddBlog
};
