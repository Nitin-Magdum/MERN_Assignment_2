import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Componants/Navbar"
import HomeScreen from "./Componants/HomeScreen"
import BlogForm from "./Componants/BlogForm"
import BlogPost from "./Componants/BlogPost";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/Blogform" element={<BlogForm />}/>
        <Route path="/BlogPost" element={<BlogPost/>}/>
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;





