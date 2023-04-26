import { useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
// import { Typography } from '@mui/material';
import { Card, CardContent, Typography } from '@mui/material';

function BlogPost() {
    const location = useLocation();
    const blogPostData = location.state.blogPostData;
    console.log(blogPostData);

    return (
        <Card>
            <CardContent>
                <Typography variant="h4" component="h1" gutterBottom>
                    {blogPostData.title}
                </Typography>
                <Typography variant="body1">
                    {blogPostData.blogSummary}
                </Typography>
            </CardContent>
        </Card>
    );
}

BlogPost.propTypes = {
    blogPostData: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        blogSummary: PropTypes.string.isRequired,
        // add any other fields from your API response
    }).isRequired,
};

export default BlogPost;
