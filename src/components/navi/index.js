import React from 'react';
import { Link } from 'react-router-dom';
import "../../assets/css/flex-slider.css";
import "../../assets/css/fontawesome.css";
import "../../assets/css/owl.css";
import "../../assets/css/templatemo-stand-blog.css";
import NaviConsumer from '../contextApi/NaviContexApi';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./navi.css";
const Index = () => {
    return (
        <NaviConsumer>
            {
                values=>{
                    const {selectedMenuItem,dispatch,menuItem}=values;
                    return(
                        <Navbar className='py-4' bg="light" expand="lg"  id='nav'>
                            <Container>
                                <Link to={"/"} onClick={()=>{dispatch({type:"CHANGE_SELECTED_MENU_ITEM",payload:`anasayfa`})}} style={{textDecoration:"none"}}><Navbar.Brand>PAU GYT</Navbar.Brand></Link>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="me-auto">
                                        {
                                            menuItem.map(item=>(
                                                <li key={item} className={(selectedMenuItem===item)?"nav-item active":"nav-item"}>
                                                    <Link className='nav-link' style={{textDecoration:"none",margin:0}} onClick={()=>{dispatch({type:"CHANGE_SELECTED_MENU_ITEM",payload:`${item}`})}} to={(item==="anasayfa")?"/":`${item}`}>
                                                        {item}
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                    </Nav>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                        
                    );
                }
            }
        </NaviConsumer>
    );
}
export default Index;
