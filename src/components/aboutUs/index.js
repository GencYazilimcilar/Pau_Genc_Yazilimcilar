import { onValue, ref } from 'firebase/database';
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../assets/css/flex-slider.css";
import "../../assets/css/fontawesome.css";
import "../../assets/css/owl.css";
import "../../assets/css/templatemo-stand-blog.css";
import NaviConsumer from '../contextApi/NaviContexApi';
import { db } from '../root/firebase-init';
const Index = () => {
    var controls=[false,false,false,false,false];
    const [about,setAbout]=useState({});
    const navigate=useNavigate();
    useEffect(() => {
        window.scrollTo(0,0);
        window.onkeydown=(e)=>{
            if(e.keyCode===65){
              controls[0]=true;
            }
            else if(e.keyCode===68&&controls[0]){
              controls[1]=true;
            }
            else if(e.keyCode===77&&controls[1]){
              controls[2]=true;
            }
            else if(e.keyCode===222&&controls[2]){
              controls[3]=true;
            }
            else if(e.keyCode===78&&controls[3]){
              navigate("/admin-panelewıncwımxsweewıxe");
            }
            else{
              controls=[false,false,false,false,false]
            }
          }
        onValue(ref(db,"/AboutUs"),(snapshot)=>{
            let data=snapshot.val();
            if(data){
                setAbout(data);
            }
        })
    }, []);
    const getPTags=()=>{
        Object.keys(about).map(item=>{
            const p=document.getElementById(item+"p")
            if(p){
                p.innerHTML=about[item];
            }
        })
    }
    useEffect(()=>{
        getPTags();
    },[about.length,about])
    
    return (
        <NaviConsumer>
            {
                values=>{
                    const {selectedMenuItem,dispatch}=values;
                    return(
                        <div>
                            {(selectedMenuItem!=="hakkimizda")&&dispatch({type:"CHANGE_SELECTED_MENU_ITEM",payload:"hakkimizda"})}
                            <div className=" header-text">
                                <section className="page-heading">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="text-content">
                                                    <h4>Hakkımızda</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <div>
                                {
                                    (Object.keys(about).length>1)?
                                        <section className="about-us">
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <img src="assets/images/about-us.jpg" alt=""/>
                                                    </div>
                                                </div>
                                                <div>
                                                    {
                                                        Object.keys(about).map(item=>(
                                                            <div key={item+"div"} className='my-5'>
                                                                <h4 key={item+"h4"}>{item}</h4>
                                                                <p key={item+"p"} id={item+"p"}>
                                                                    
                                                                </p>
                                                                <br/>
                                                                <hr></hr>
                                                            </div>
                                                        ))
                                                    }
                                                </div>



                                            </div>
                                        </section>
                                        :
                                        <div>
                                            
                                        </div>
                                }
                            </div>
                            
                        </div>
                    );
                }
            }
        </NaviConsumer>
        
    );
}

export default Index;