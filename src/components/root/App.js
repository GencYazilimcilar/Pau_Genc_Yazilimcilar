import React,{useEffect} from "react";
import { Routes,Route } from "react-router-dom";
import Home from "../home";
import AboutUs from "../aboutUs";
import Navi from "../navi";
import Footer from "../footer";
import Blog from "../blog";
import Contact from "../contact";
import PostDetails from "../postDetails";
import Page404 from "../404";
import AdminPanel from "../admin-panel/index";
import "../../assets/css/Dashboard.css"
function App() {
  useEffect(() => {
      window.scrollTo(0,0);
  }, []);
  return (
    <div style={{height:"100vh",width:"100vw",top:0}}>
      <div style={{display:"block"}}>
        <Navi/>
      </div>
      <div className="">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/hakkimizda" element={<AboutUs/>}/>
          <Route path="/haberler" element={<Blog/>} />
          <Route path="/iletisim" element={<Contact/>} />
          <Route path="/post-details" element={<PostDetails/>} />
          <Route path="/admin-panelewıncwımxsweewıxe" element={<AdminPanel/>}/>
          <Route path="*" element={<Page404/>} />
        </Routes>
        <Footer/>
      </div>
      
    </div>
  );

}

export default App;
