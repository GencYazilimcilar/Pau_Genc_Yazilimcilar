import "../../assets/css/flex-slider.css";
import "../../assets/css/fontawesome.css";
import "../../assets/css/owl.css";
import "../../assets/css/templatemo-stand-blog.css";
import { Link } from 'react-router-dom';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import "./home.css"
import OwlCarousel from 'react-owl-carousel';
import NaviConsumer from '../contextApi/NaviContexApi';
import React from 'react';
import SponsorsConsumer from "../contextApi/SponsorsContextApi";
import NewsConsumer from "../contextApi/NewsContextApi";
import "../../assets/css/Dashboard.css";
import Modal from "react-bootstrap/Modal";
import AnnouncementsConsumer from "../contextApi/AnnouncementsContextApi";
class Index extends React.Component{
  state={
    showModal:false,
    modalData:undefined,
    sponsors:undefined,
    news:undefined,
    announcements:undefined,
    keys:undefined
  }
  componentDidMount(){
    window.scrollTo(0,0);
  }
  getSponsros=(funk,sponsors)=>{
    funk();
    this.setState({sponsors:sponsors});
  }
  getNews=(funk,news)=>{
    funk();
    if(news){
      this.setState({news:news,keys:Object.keys(news)});
    }
  }
  getAnnouncements=(funk,announcements)=>{
    funk();
    this.setState({announcements:announcements})
  }
  render(){
    return(
      <SponsorsConsumer>
        {
          values=>{
            const {sponsors,getDataSponsors}=values;
            return(
              <NewsConsumer>
                {
                  items=>{
                    const {news,getDataNews}=items;
                    return(
                      <NaviConsumer>
                        {
                          values=>{
                            const {dispatch,selectedMenuItem}=values;
                            return(
                              <AnnouncementsConsumer>
                                {
                                  values2=>{
                                    const {announcements,getDataAnnouncements}=values2;
                                    return (
                                      <div style={{}}>
                                        {(this.state.sponsors===undefined)&&this.getSponsros(getDataSponsors,sponsors)}
                                        {(this.state.news===undefined)&&this.getNews(getDataNews,news)}
                                        {(this.state.announcements===undefined )&&this.getAnnouncements(getDataAnnouncements,announcements)}
                                        {(selectedMenuItem!=="anasayfa")&&dispatch({type:"CHANGE_SELECTED_MENU_ITEM",payload:"anasayfa"})}
                                        <div className="header-text" style={{position:"relative"}}>
                                          <section className="page-heading">
                                            <div className="container">
                                                  <div className="text-content">
                                                    <h4>Duyurular</h4>
                                                  </div>
                                            </div>
                                          </section>
                                        </div>
                                          {
                                            (this.state.announcements!==undefined&&Object.keys(announcements).length>0)?
                                            <OwlCarousel key={"OwlCarousel"} className='owl-theme' autoPlay={true} autoplayTimeout={5000} autoplaySpeed={1000} loop margin={3} >
                                              {
                                                Object.keys(announcements).map(item=>(
                                                  <div key={announcements[item].title+"MainDiv"} className="item">
                                                    <img key={announcements[item].title+"CoverPhoto"} src={`data:image/png;base64, ${announcements[item].photo}`} style={{position:"relative",border:"1px solid #ddd"}} alt={announcements[item].title+""} />
                                                    
                                                    <div key={announcements[item].title+"MainDiv2"} style={{position:"relative",background:"#353535",top:"0",borderBottom:"1px solid #ddd",borderRight:"1px solid #ddd"}}>
                                                      <Link key={announcements[item].title+"Link"} to={"/post-details?name=announcements&id="+announcements[item].id}>
                                                        <h4 key={announcements[item].title+"h4"} style={{color:"white", textAlign:"center"}}>{`${announcements[item].title}`}</h4>
                                                      </Link>
                                                      <div style={{textAlign:"right", paddingRight:"1.5vw"}}>
                                                        <a href="#" key={announcements[item].title+"A"}  style={{color:"white"}} className='a'>{announcements[item].date}</a>
                                                      </div>
                                                    </div>
                                                  </div>
                                                ))
                                              }
                                            </OwlCarousel>
                                            :
                                            <div style={{height:"50vh"}}>
                                                <div className='outercube cube'>
                                                    <div className='innerCube cube'>
                                                        <div className='innerCube2 cube'></div>
                                                    </div>
                                                </div>
                                            </div>
                                          }
                                        <section className="blog-posts">
                                          <div className="container">
                                            <div className="row">
                                              <div className="col-lg-8">
                                                <div className=" header-text">
                                                  <section className="page-heading">
                                                    <div className="container">
                                                        <div className="text-content">
                                                          <h4>Haberler</h4>
                                                        </div>
                                                    </div>
                                                  </section>
                                                </div>
                                                <br/>
                                                {
                                                  (news && Object.keys(news).length>0)?
                                                    <div className="all-blog-posts">
                                                      <div className="row">
                                                        <div className="col-lg-12">
                                                          <div className="blog-post">
                                                            <div className="blog-thumb">
                                                              <img src={`data:image/png;base64, `+news[Object.keys(news).slice(-1)].coverPhoto} alt=""/>
                                                            </div>
                                                            <div className="down-content">
                                                              <Link to={"/post-details?name=news&id="+Object.keys(news).slice(-1).toString()}><h4>{news[Object.keys(news).slice(-1).toString()].title}</h4></Link>
                                                              <p>
                                                                {
                                                                  new DOMParser().parseFromString(news[Object.keys(news).slice(-1).toString()].content,"text/html").querySelectorAll("p")[0].innerHTML.slice(0,160)
                                                                }...
                                                              </p>
                                                              <div className="post-options">
                                                                <div className="row">
                                                                  <div className="col-6">
                                                                      <p style={{color:"#7a7a7a"}}>{news[Object.keys(news).slice(-1).toString()].date}</p>
                                                                  </div>
                                                                  <div className="col-6">
                                                                    <ul className="post-tags">
                                                                      <li><i className="fa fa-tags"></i></li>
                                                                      {
                                                                        news[Object.keys(news).slice(-1).toString()].tickets.map(item=>(
                                                                          <li key={item+"li"}><a key={item+"a"}>{item},</a></li>
                                                                        ))
                                                                      }
                                                                    </ul>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                          {
                                                            (Object.keys(news).length>1)?
                                                            <div className="blog-post">
                                                              <div className="blog-thumb">
                                                                <img src={`data:image/png;base64, `+news[Object.keys(news).slice(-2,-1)].coverPhoto} alt=""/>
                                                              </div>
                                                              <div className="down-content">
                                                                <Link to={"/post-details?name=news&id="+Object.keys(news).slice(-2,-1).toString()}><h4>{news[Object.keys(news).slice(-2,-1).toString()].title}</h4></Link>
                                                                <p>
                                                                  {
                                                                    new DOMParser().parseFromString(news[Object.keys(news).slice(-2,-1).toString()].content,"text/html").querySelectorAll("p")[0].innerHTML.slice(0,160)
                                                                  }...
                                                                </p>
                                                                <div className="post-options">
                                                                  <div className="row">
                                                                    <div className="col-6">
                                                                        <p style={{color:"#7a7a7a"}}>{news[Object.keys(news).slice(-2,-1).toString()].date}</p>
                                                                    </div>
                                                                    <div className="col-6">
                                                                      <ul className="post-tags">
                                                                        <li><i className="fa fa-tags"></i></li>
                                                                        {
                                                                          news[Object.keys(news).slice(-2,-1).toString()].tickets.map(item=>(
                                                                            <li key={item+"li"}><a key={item+"a"}>{item},</a></li>
                                                                          ))
                                                                        }
                                                                      </ul>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            </div>
                                                            :<div></div>
                                                          }
                                                          
                                                        </div>
                                                        <div className="col-lg-12">
                                                          <div className="main-button">
                                                            <Link to={"/haberler"} onClick={()=>{dispatch({type:"CHANGE_SELECTED_MENU_ITEM",payload:"haberler"});}}>
                                                              Bütün Haberleri Gör
                                                            </Link>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                :
                                                  <div></div>
                                                }
                                                
                                              </div>
                                              <div className="col-lg-4">
                                                <div className="sidebar">
                                                  <div className="row">
                                                    <div className="col-lg-12">
                                                      <div className=" header-text">
                                                        <section className="page-heading">
                                                          <div className="container">
                                                                <div className="text-content">
                                                                  <h4>Sponsorlar</h4>
                                                                </div>
                                                          </div>
                                                        </section>
                                                      </div>
                                                      <div className="row row-cols-2">
                                                        {
                                                          ((this.state.sponsors!==undefined)&&(sponsors!==undefined))&&
                                                          <div className='col'>
                                                            {
                                                              Object.keys(sponsors).map(item=>(
                                                                <div key={sponsors[item].name+"MainDiv"} style={{}}>
                                                                  <img style={{borderRadius:"50%"}} key={sponsors[item].name+"img"} onClick={()=>{this.setState({modalData:sponsors[item],showModal:true})}} src={`data:image/png;base64, ${sponsors[item].photo}`} className="img-thumbnail" alt={sponsors[item].name+""}/>
                                                                </div>
                                                              ))
                                                            }
                                                          </div>
                                                        }
                                                      </div>
                                                      <div>
                                                        {
                                                          (this.state.modalData!==undefined)?
                                                            <Modal show={this.state.showModal} centered animation={true} onHide={()=>{this.setState({showModal:false})}} >
                                                            <Modal.Header closeButton>
                                                                <Modal.Title>Sponsor</Modal.Title>
                                                            </Modal.Header>
                                                            <Modal.Body>
                                                              <div className="container">
                                                                <div className="row">
                                                                  <img style={{maxHeight:"45vh"}} src={`data:image/png;base64,`+this.state.modalData.photo} />
                                                                </div>
                                                                <div className="row">
                                                                  <div className="col-12">
                                                                    <p><h3>{this.state.modalData.name}</h3></p>
                                                                    <hr style={{color:"#393E46"}}></hr>
                                                                    <p>Ziyaret Sitesi: <br/><a target={"_blank"} href={this.state.modalData.webSite}>{this.state.modalData.webSite}</a> </p>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            </Modal.Body>
                                                            </Modal>
                                                          :<div></div>
                                                        }
                                                        
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
                              </AnnouncementsConsumer>
                            );
                          }
                        }
                      </NaviConsumer>
                    );
                  }
                }
              </NewsConsumer>
            );
          }
        }
      </SponsorsConsumer>
    );  
  }
}
export default Index;
