const express = require("express");
const { GetBlogs, GetBlog, AddBlog } = require("../Controller/Controller");
const router = express.Router();

router.get("/GetBlogs", GetBlogs);
router.get("/GetBlog/:id", GetBlog);
router.post("/AddBlog", AddBlog);


module.exports = router;
