import React, { useEffect ,useState,useContext} from 'react';
import {useNavigate} from 'react-router-dom'
import { Navbar,Container,Offcanvas,Nav,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsBoxArrowRight } from "react-icons/bs";
import {logout} from '../../contextGlobal/actions'
import {GlobalContext} from '../../contextGlobal/context.jsx'
import Searchbar from './../searchbar/searchbar.jsx'
import './header.scss'

let links=[{route:'/',name:"Home"},{route:'about',name:"About"},{route:'contact',name:"Contact"}];


export default function Header(){
    const [screen,setScreen]= useState(window.screen.availWidth)
    let {dispatch}= useContext(GlobalContext)
    let nagivate = useNavigate()
   useEffect(()=>{
    window.addEventListener("resize", function(){
        setScreen(window.screen.availWidth)
    });
   },[screen])
   function handleLogout(e){
       logout(dispatch)
       setTimeout(()=>nagivate('/singIn'),(1000))
   }
   if(screen<=1024){
    return (<Navbar bg="light" expand={false} >
    <Container fluid>
      <Navbar.Brand href="#">Nice Food</Navbar.Brand>
      <Navbar.Toggle aria-controls="offcanvasNavbar" />
      <Navbar.Offcanvas
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id="offcanvasNavbarLabel">Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="justify-content-end flex-grow-1 pe-3">
            {links.map((e,i)=><Nav.Link className="LinksNav" key={i+"primary"} href={`${e.route}`}>{e.name}</Nav.Link>)}
          </Nav>
          <Searchbar/>
          <Button variant ="secondary" style={{margin:'0 1em'}} onClick={handleLogout}>
             <BsBoxArrowRight/>  
          </Button>
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </Container>
  </Navbar>)
   }else{
       return(
        <Navbar id="NavbarNormal"  expand="lg">
        <Container  id="NavContainer" fluid>
          <Navbar.Brand id="NavBrand" href="#">Nice Food</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
               {links.map((e,i)=><Nav.Link className="LinksNav" key={i+'secondary'} href={`${e.route}`}>{e.name}</Nav.Link>)}
            </Nav>
            <Searchbar/>
          <Button variant ="secondary" style={{margin:'0 1em'}} onClick={handleLogout}>
             <BsBoxArrowRight/>  
          </Button>

          </Navbar.Collapse>
        </Container>
      </Navbar>
       )
   }
}