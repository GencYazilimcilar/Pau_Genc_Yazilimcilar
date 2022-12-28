import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../../assets/css/flex-slider.css";
import "../../assets/css/fontawesome.css";
import "../../assets/css/owl.css";
import "../../assets/css/templatemo-stand-blog.css";
import "../../assets/css/Dashboard.css";
import NewsConsumer from '../contextApi/NewsContextApi';
import NaviConsumer from '../contextApi/NaviContexApi';
const Index = () => {
    const [keys,setKeys]=useState([]);
    const [selectionPage,setSelectionPage]=useState(1);
    const [len,setLen]=useState(0);
    useEffect(() => {
        window.scrollTo(0,0);
    }, []);
    const getKeys=(news)=>{ 
        setKeys(Object.keys(news));
    }
    useEffect(() => {
        let a=Math.ceil((keys.length)/4);
        setLen(a);
    }, [keys]);
    const getItem=()=>{
        let data=[];
        if(len>0){
            for(let i=1;i<=len;i++){
                data.push(
                    <li key={"LiPage"+i} onClick={()=>{setSelectionPage(i)}} className={(selectionPage===i)?"page-item active":"page-item"}>
                        <a key={"APage"+i} className="page-link"  href="#">{i}</a>
                    </li>
                );
            }
            return data;
        }
    }
    const getNavigation=()=>{
        return(
            <ul className="pagination justify-content-center">
                <li onClick={()=>{(selectionPage>1)&&setSelectionPage(selectionPage-1)}} className={(selectionPage===1)?"page-item disabled":"page-item"}>
                    <a className="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                {
                    getItem()
                }
                <li onClick={()=>{(selectionPage<len)&&setSelectionPage(selectionPage+1)}} className={((selectionPage>=len))?"page-item disabled":"page-item"}>
                    <a className="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        );
    }
    const getContent=(news)=>{
        let data=[];
        //1,0 2,4 3,8 4,12 
        let son=(selectionPage-1)*4;
        for(let i=1;i<=4;i++){
            let sayi=(-1*(son+i));
            if(sayi*-1 <=keys.length){
                data.push(
                    <div key={sayi+"MainDiv"} className="col-lg-6">
                        <div key={sayi+"blog-post"} className="blog-post">
                            <div key={sayi+"blog-thumb"} className="blog-thumb">
                                <img key={sayi+"Img"} src={`data:image/png;base64, `+((sayi===-1)?news[keys.slice(sayi)].coverPhoto:news[keys.slice(sayi,sayi+1)].coverPhoto)} alt=""/>
                            </div>
                            <div key={sayi+"Down-content"} className="down-content">
                                {
                                    ((sayi)===-1)?
                                    <Link key={sayi+"Link1"} to={"/post-details?name=news&id="+keys.slice(sayi).toString()}><h4>{news[keys.slice((sayi)).toString()].title}</h4></Link>
                                    :
                                    <Link key={sayi+"Link2"} to={"/post-details?name=news&id="+keys.slice(sayi,sayi+1).toString()}><h4>{news[keys.slice((sayi),((sayi)+1)).toString()].title}</h4></Link>
                                }
                                <p key={sayi+"P"}>
                                    {
                                        ((sayi)===-1)?
                                            new DOMParser().parseFromString(news[keys.slice(-1).toString()].content,"text/html").querySelectorAll("p")[0].innerHTML.slice(0,160)
                                        :
                                            new DOMParser().parseFromString(news[keys.slice((sayi),((sayi)+1)).toString()].content,"text/html").querySelectorAll("p")[0].innerHTML.slice(0,160)
                                    }...
                                </p>
                                <div className="post-options" key={sayi+"post-options"}>
                                    <div className="row" key={sayi+"row"}>
                                        <div className="col-6" key={sayi+"col-6"}>
                                            <p style={{color:"#7a7a7a"}} key={sayi+"P2"}>
                                                {
                                                    ((sayi)===-1)?
                                                    news[keys.slice((sayi)).toString()].date
                                                    :
                                                    news[keys.slice((sayi),((sayi)+1)).toString()].date
                                                }
                                            </p>
                                        </div>
                                        <div className="col-6" key={sayi+"col-6-2"}>
                                            <ul className="post-tags" key={sayi+"ul3"}>
                                                <li key={sayi+"li3"}><i className="fa fa-tags" key={sayi+"i"}></i></li>
                                                {
                                                    ((sayi)===-1)?
                                                    news[keys.slice(-1).toString()].tickets.map(item=>(
                                                        <li key={item+"li4"}><a key={item+"a4"}>{item},</a></li>
                                                    ))
                                                    :
                                                    news[keys.slice(sayi,sayi+1).toString()].tickets.map(item=>(
                                                        <li key={item+"li5"}><a key={item+"a5"}>{item},</a></li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) 
            }
            
        }
        if(data.length>0){
            return data;
        }
    }
    return(
        <NaviConsumer>
            {
                values=>{
                    const {selectedMenuItem,dispatch}=values;
                    return (
                        <NewsConsumer>
                            {
                                values=>{
                                    const {news,getDataNews}=values;
                                    return (
                                        <div>
                                            {
                                                (news&&getDataNews&&selectedMenuItem)?
                                                    <div>
                                                        {(!(Object.keys(news).length>0))&&getDataNews()}
                                                        {((keys.length===0)&&(Object.keys(news).length>0))&&getKeys(news)}
                                                        {(selectedMenuItem!=="haberler")&&dispatch({type:"CHANGE_SELECTED_MENU_ITEM",payload:"haberler"})}
                                                        <div className="header-text">
                                                            <section className="page-heading">
                                                                <div className="container">
                                                                    <div className="row">
                                                                        <div className="col-lg-12">
                                                                            <div className="text-content">
                                                                                <h4>Haberler</h4>
                                                                                <h2></h2>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </section>
                                                        </div>
                                                        {
                                                            (keys.length>0)?
                                                            <section className="blog-posts grid-system">
                                                                <div className="container">
                                                                    <div className="row">
                                                                        <div className="col-lg-12">
                                                                            <div className="all-blog-posts">
                                                                                <div className="row">
                                                                                    {
                                                                                        getContent(news)
                                                                                    }
                                                                                    <div className="col-lg-12">
                                                                                        <nav aria-label="Page navigation">
                                                                                            {
                                                                                                getNavigation()
                                                                                            }
                                                                                        </nav>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        {/**/}
                                                                    </div>
                                                                </div>
                                                            </section>
                                                            :
                                                            <div style={{height:"50vh"}}>
                                                                <div className='outercube cube'>
                                                                    <div className='innerCube cube'>
                                                                        <div className='innerCube2 cube'>
                                                                            {getDataNews()}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>
                                                    :<div></div>
                                                }
                                            
                                        </div>
                                    );
                                }
                            }
                        </NewsConsumer>
                    )                
                }
            }
        </NaviConsumer>
    );
    
    
}

export default Index;
