import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Card, CardContent, Typography, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import BlogPost from "./BlogPost";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  card: {
    marginTop: "10px",
    height: "100%",
    cursor: "pointer",
    border: "1px solid black",
    "&:hover": {
      cursor: "pointer",
      boxShadow: "0px 0px 20px 5px rgba(0, 0, 0, 0.5)",
    },
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const HomeScreen = () => {
  const navigate = useNavigate();

  const classes = useStyles();
  const [blogs, setBlogs] = useState([]);


  useEffect(() => {
    fetch(`http://localhost:4000/api/GetBlogs`)
      .then((response) => response.json())
      .then((data) => setBlogs(data))
      .catch((error) => console.error(error));
  }, []);

  const handleClick = (id) => {


    axios
      .get(`http://localhost:4000/api/GetBlog/${id}`)
      .then((response) => {
        const blogPostData = response.data;
        navigate("/BlogPost", { state: { blogPostData } });
      })
      .catch((error) => {
        console.log(error);
      });
  


};

return (
  <div className={classes.root}>
    <Grid container spacing={2}>
      {blogs.map((blog) => (
        <Grid item xs={12} sm={6} md={4} key={blog.id}>
          <Card
            className={classes.card}
            key={blog.id}
            onClick={() => handleClick(blog._id)}
          >
            <CardContent>
              <Typography variant="h5" component="h2">
                {blog.title}
              </Typography>
              <Typography variant="body2" component="p">
                {blog.blogSummary}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

      ))}
    </Grid>
    <Fab color="primary" aria-label="add" className={classes.fab}>
      <Link to="/BlogForm">
        <AddIcon to="/BlogForm" />
      </Link>
    </Fab>
  </div >

);
};

export default HomeScreen;
