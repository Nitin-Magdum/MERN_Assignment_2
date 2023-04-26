import { useState, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleInput = styled.input`
  width: 500px;
  font-size: 36px;
  padding: 10px;
  margin: 20px 0;
  border: none;
  border-bottom: 2px solid #ccc;
  outline: none;
  ::placeholder {
    color: #ccc;
    font-size: 24px;
  }
`;

const SubmitButton = styled.button`
  margin-top: 50px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 24px;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: #3e8e41;
  }
`;

const QuillToolbar = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  height: 50px;
  width: 50px;
`;

const QuillContainer = styled.div`
  height: 400px;

`;

const QuillEditor = styled(ReactQuill)`
  height: 100%; 
`;


const BlogForm = () => {
    const [title, setTitle] = useState('');
    const [blogSummary, setblogSummary] = useState('');
    const editorRef = useRef(null);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (value) => {
        setblogSummary(value);
    };

    const handleBoldClick = () => {
        const quill = editorRef.current.getEditor();
        const range = quill.getSelection();
        const formats = quill.getFormat(range);
        quill.format('bold', !formats.bold, Quill.sources.USER);
    };

    const handleSubmit = async () => {
        try {
          const res = await fetch('http://localhost:4000/api/AddBlog', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              title,
              blogSummary: blogSummary.replace(/(<([^>]+)>)/gi, '').slice(0, 500) 
            })
          });
          if (res.ok) {
            alert('Blog post created successfully!');
            history.push('/');
          } else {
            throw new Error(res.statusText);
          }
        } catch (err) {
          console.error(err);
        }
      };
      


    return (
        <Container>
            <TitleInput
                type="text"
                placeholder="Title"
                value={title}
                onChange={handleTitleChange}
            />
            <QuillToolbar onClickBold={handleBoldClick} />
            <QuillContainer>
                <QuillEditor
                    ref={editorRef}
                    value={blogSummary}
                    onChange={handleContentChange}
                />
            </QuillContainer>
            <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
        </Container>
    );
};

export default BlogForm;

