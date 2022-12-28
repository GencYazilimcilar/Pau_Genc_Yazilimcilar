import alertify from 'alertifyjs';
import { onValue, push, ref, set } from 'firebase/database';
import React, { useState,useEffect } from 'react';
import "../../assets/css/flex-slider.css";
import "../../assets/css/fontawesome.css";
import "../../assets/css/owl.css";
import "../../assets/css/templatemo-stand-blog.css";
import NaviConsumer from '../contextApi/NaviContexApi';
import { db } from '../root/firebase-init';
const Index = () => {
    const [data,setData]=useState({});
    useEffect(() => {
        window.scrollTo(0,0);
        getData();
    }, []);
    const getData=()=>{
        onValue(ref(db,"/Contact"),(snapshot)=>{
            let d=snapshot.val();
            if(d){
                setData(d);
            }
        })
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        let name=document.getElementById("name").value || "anonim";
        let email=document.getElementById("email").value || "anonim";
        let subject=document.getElementById("subject").value;
        let message=document.getElementById("message").value;
        let path;
        if(subject&&message){
            if(name.indexOf("<")===-1 && email.indexOf("<")===-1 && subject.indexOf("<")===-1 && message.indexOf("<")===-1){
                push(ref(db,"/messages"),{name:name,email:email,subject:subject,message:message}).then((e)=>{
                    path=e._path.pieces_[1];
                    set(ref(db,"/messages/"+path),{name:name,email:email,subject:subject,message:message,id:path}).then(()=>{
                        alertify.success("Mesajınız başarıyla iletilmiştir...");
                    })
                }).catch((e)=>{
                    alertify.error(e.message);
                })
            }
            else{
                alertify.error("İçeriğe <,> vb kullanamazsın");
            }
            
        }else{
            alertify.error("Beklenmedik bir hata...");
        }
    }
    return (
        <NaviConsumer>
            {
                values=>{
                    const {selectedMenuItem,dispatch}=values;
                    return(
                       <div>
                            {(data.length===0)&&getData()}
                            {(selectedMenuItem!=="iletisim")&&dispatch({type:"CHANGE_SELECTED_MENU_ITEM",payload:"iletisim"})}
                            <div className="header-text">
                                <section className="page-heading">
                                    <div className="container">
                                    <div className="row">
                                        <div className="col-lg-12">
                                        <div className="text-content">
                                            <h4>İletişim</h4>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </section>
                            </div>
                            <section className="contact-us">
                            <div className="container">
                                <div className="row">
                                <div className="col-lg-12">
                                    <div className="down-contact">
                                    <div className="row">
                                        <div className="col-lg-8">
                                        <div className="sidebar-item contact-form">
                                            <div className="sidebar-heading">
                                            <h2>Herhangi Bir Mesaj Gönder</h2>
                                            </div>
                                            <div className="content">
                                            <form id="contact" onSubmit={(e)=>handleSubmit(e)}>
                                                <div className="row">
                                                    <div className="col-md-6 col-sm-12">
                                                        <fieldset>
                                                            <input name="name" type="text" id="name" placeholder="İsim (isteğe bağlı)"/>
                                                        </fieldset>
                                                    </div>
                                                    <div className="col-md-6 col-sm-12">
                                                        <fieldset>
                                                            <input name="email" type="text" id="email" placeholder="Email (isteğe bağlı)"/>
                                                        </fieldset>
                                                    </div>
                                                    <div className="col-md-12 col-sm-12">
                                                        <fieldset>
                                                            <input name="subject" type="text" id="subject" placeholder="Konu" required/>
                                                        </fieldset>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <fieldset>
                                                            <textarea name="message" rows="6" id="message" placeholder="Mesajınız..." required></textarea>
                                                        </fieldset>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <fieldset>
                                                        <button type="submit" id="form-submit" className="main-button">Mesaj Gönder</button>
                                                        </fieldset>
                                                    </div>
                                                </div>
                                            </form>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="col-lg-4">
                                        <div className="sidebar-item contact-information">
                                            <div className="sidebar-heading">
                                            <h2>İletişim Bilgileri</h2>
                                            </div>
                                            <div className="content">
                                                <ul>
                                                    {
                                                        Object.keys(data).map(item=>(
                                                        <li key={item+"li"}>
                                                            <h5 key={item+"h5"}>{item}</h5>
                                                            <a href={data[item]}><span key={item+"span"}>{data[item]}</span></a>
                                                        </li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </section>
                        </div> 
                    );
                }
            }
        </NaviConsumer>
        
    );
}

export default Index;
