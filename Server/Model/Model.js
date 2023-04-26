const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    _id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    blogSummary: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("blog", blogSchema, "blogs");
