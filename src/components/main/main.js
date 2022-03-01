import React, { useState,useContext} from 'react';
import { Container, Row, Col, ListGroup,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.scss';
import Card from '../card/card';
import {GlobalContext} from '../../contextGlobal/context'
import Image from 'react-bootstrap/Image'
import {getRecipeDetail,delRecipe,addTomenu} from '../../contextGlobal/actions'
import { BsTrash,BsPlusCircleFill} from "react-icons/bs";
import FiltersConteiner from './../customsearch/filtersContainer.js'
import swal from 'sweetalert';

export default function Main() {
    const [opendetails, setOpenDet] = useState(false)
    let {state,dispatch}= useContext(GlobalContext)
    let {recipes}=state
    let {searchs}= state


    function activeDetail(e){
        getRecipeDetail(e.currentTarget.id,dispatch)
        setOpenDet(!opendetails)

    }
    async function capDel(e){
        let d= new Promise((resolve,rejected)=>{
            if(e.currentTarget.id){
                resolve(e.currentTarget.id)
            }else{
                rejected("error")
            }
        })
        d.then(res=>{
            swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            }).then((weeldelete)=>{
                if(weeldelete){
                    delRecipe(res,dispatch)
                swal("Poof! Your imaginary file has been deleted!", {icon: "success",})
                }else{
                    swal("Your imaginary file is safe!");
                }
            })
        })
    }
    function addItems(e){
        let d= new Promise((resolve,rejected)=>{
            if(e.currentTarget.className){
                resolve(e.currentTarget.className.split(" ")[0])
            }else{
                rejected("error")
            }
        })
        d.then(res=>{
            swal({
            title: "Are you sure?",
            text: "Are you sure you want to add this recipe?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            }).then((weeladd)=>{
                if(weeladd){
                    addTomenu(res,dispatch)
                swal("Yes!, new recipe added", {icon: "success"})
                }else{
                    swal("Well, it will be the next");
                }
            })
        })

    }
    if(searchs){
        return (<Container className='containerMain' fluid>
        {opendetails?<Card on={opendetails} close={setOpenDet}/>:null}
        <Row className="Rows">
            <Col className='column column1' sm={3}><FiltersConteiner/></Col>
            <Col className='column column2' sm={9} lg >
                <ListGroup>
                {searchs?searchs.map(e=><ListGroup.Item className="LinkItems" key={e.id}  action variant="outline-primary"  >
                <div id={e.id} onClick={activeDetail}>
                <Image id="thumbnailImage" src={e.image} thumbnail/>
                {e.name}
                </div>
                <Button className={e.id} type='button' variant="outline-success" onClick={addItems}><BsPlusCircleFill/></Button>
                </ListGroup.Item>):null}
                </ListGroup>
            </Col>
        </Row>
    </Container>)
    }else{
        return (<Container className='containerMain' fluid>
        {opendetails?<Card on={opendetails} close={setOpenDet}/>:null}
        <Row className="Rows">
            <Col className='column column1' sm={3}><FiltersConteiner/></Col>
            <Col className='column column2' sm={9} lg >
                <ListGroup>
                {recipes?recipes.map(e=><ListGroup.Item className="LinkItems" key={e.id}  action variant="outline-primary"  >
                <div id={e.id} onClick={activeDetail}>
                <Image id="thumbnailImage" src={e.image} thumbnail/>
                {e.title}
                </div>
                <Button id={e.title} type='button' variant="outline-danger" onClick={capDel}><BsTrash/></Button>
                </ListGroup.Item>):null}
                </ListGroup>
            </Col>
        </Row>
    </Container>)
    }
}