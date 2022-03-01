import React,{useState,useLayoutEffect,useContext}from 'react';
import {Button,Modal,Spinner,Card,Accordion,ButtonGroup,Image,ListGroup} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {GlobalContext} from '../../contextGlobal/context'
import './card.scss'



export default function CardItem ({on,close}){
    const [show, setShow] = useState(on);
    const [loading,setLoading]= useState(true)
    let {state}= useContext(GlobalContext)
    let {recipeDetail}= state
    const handleClose = () =>{
        if(close){
            close(false)
        }else{
            setShow(false)
        }
    } 
    useLayoutEffect(()=>{
        if(loading){
            setTimeout(()=>{
                setLoading(false)
            },(1000))
        }
    },[])
    const handleShow = () =>{
        if(close){
            close(true)
        }else{
            setShow(true)
        }
    }
    if(loading){
        return(<>
            <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
             <Spinner animation="border" variant="primary" />
          </Modal.Header>
          <Modal.Body>
             <Spinner animation="border" variant="primary" />
          </Modal.Body>
          <Modal.Footer>
             <Spinner animation="border" variant="primary" />
          </Modal.Footer>
        </Modal>
            </>)
    }else{
        return (
      <>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
        <Card style={{ width: '100%' }}>
           <Card.Img variant="top" src={recipeDetail.image} />
           <Card.Body>
              <ButtonGroup aria-label="Basic example">
                  <Button variant={`${recipeDetail.vegetarian?"success":'danger'}`}>vegetarian</Button>
                  <Button variant={`${recipeDetail.vegan?"success":'danger'}`}>vegan</Button>
                  <Button variant={`${recipeDetail.glutenFree?"success":'danger'}`}>gluten free</Button>
                  <Button variant={`${recipeDetail.dairyFree?"success":'danger'}`}>dairy free</Button> 
                  <Button variant={`${recipeDetail.cheap?"success":'danger'}`}>cheap</Button> 
              </ButtonGroup>
              <ButtonGroup aria-label="Basic example2">
                  <Button variant={`${recipeDetail.veryHealthy?"success":'danger'}`}>very healthy</Button>
                  <Button variant={`${recipeDetail.veryPopular?"success":'danger'}`}>very Popular</Button>
                  <Button variant={`${recipeDetail.sustainable?"success":'danger'}`}>sustainable</Button>
              </ButtonGroup>
              <Card.Title>{recipeDetail.title}</Card.Title>
               <Accordion>
                  <Accordion.Item eventKey="0">
                     <Accordion.Header>Instructions</Accordion.Header>
                     <Accordion.Body>
                       {recipeDetail.instructions}
                    </Accordion.Body>
                  </Accordion.Item>
               </Accordion>
               <Accordion>
                  <Accordion.Item eventKey="0">
                     <Accordion.Header>Ingredients</Accordion.Header>
                     <Accordion.Body>
                       <ListGroup>
                       {recipeDetail.extendedIngredients.map((e,i)=><ListGroup.Item className="listIngredients" key={i}>{e.name}<Image className="iconIngredients"  src={`https://spoonacular.com/cdn/ingredients_100x100/`+e.image}fluid/></ListGroup.Item>)}
                       </ListGroup>
                    </Accordion.Body>
                  </Accordion.Item>
               </Accordion>
           </Card.Body>
          </Card>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
    }
}