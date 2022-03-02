import React, { useEffect ,useState,useContext} from 'react';
import {useNavigate} from 'react-router-dom'
import { Navbar,Container,Offcanvas,Nav,Button,Image} from 'react-bootstrap';
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
    return (<Navbar className="Navbarheader" expand={false} >
    <Container className="ContainerHeader" fluid>
      <Navbar.Brand href="#" className="NavBrand" ><Image src="https://dsm01pap002files.storage.live.com/y4m4ZvTnU-BhxDBxrG_gzQN0qAqdLLYipN_VVJAl_ii-qYR0Af7B1Epum6pGp5Qi7zdag9I_bH6cuDTkdYLpadYzcw0bk5dEiy7SGJQ7qBK52Vk3eEctNwXGiYwZLi_92NIMR4hdqXgzJ5v97CGK77-2ipHGSNdhDOB175xH2OBZKflZdl5t3WbUCIg4iMGWFhW?width=996&height=995&cropmode=none" style={{width:"60px",marginLeft:'1em',marginRight:"0.5em"}} fluid/>Nice Food</Navbar.Brand>
      <Navbar.Toggle aria-controls="offcanvasNavbar" />
      <Navbar.Offcanvas
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
        placement="end"
      >
        <Offcanvas.Header id="offCanvaheader" closeButton>
          <Offcanvas.Title  id="offcanvasNavbarLabel">Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body id="offCanvabody">
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
        <Navbar className="Navbarheader"  expand="lg">
        <Container  className="ContainerHeader"  fluid>
          <Navbar.Brand className="NavBrand" href="#"><Image src="https://dsm01pap002files.storage.live.com/y4m4ZvTnU-BhxDBxrG_gzQN0qAqdLLYipN_VVJAl_ii-qYR0Af7B1Epum6pGp5Qi7zdag9I_bH6cuDTkdYLpadYzcw0bk5dEiy7SGJQ7qBK52Vk3eEctNwXGiYwZLi_92NIMR4hdqXgzJ5v97CGK77-2ipHGSNdhDOB175xH2OBZKflZdl5t3WbUCIg4iMGWFhW?width=996&height=995&cropmode=none" style={{width:"60px",marginLeft:'1em',marginRight:"0.5em"}} fluid/>Nice Food</Navbar.Brand>
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