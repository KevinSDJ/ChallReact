import React ,{useState,useContext,useEffect}from 'react';
import {Form,FormControl,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {GlobalContext} from '../../contextGlobal/context' 
import {searchRecipe,clearSearchs,clearError} from '../../contextGlobal/actions'
import {BsXCircle,BsSearch} from "react-icons/bs";
import swal from 'sweetalert';
import './searchbar.scss';




export default function Searchbar(){
	const [input,setInput]= useState({
		search:''
	})
	let {state,dispatch} =useContext(GlobalContext)
	let {searchs,errors}=state
	useEffect(()=>{
		if(errors){
			 swal({
                title: "Error",
                text:`${errors}` ,
                icon: "error",
                dangerMode: true,
            })
            .then(re=>{
                clearError(dispatch)
            })
		}
	},[errors,dispatch])
	function handleSubmit(e){
		e.preventDefault()
		searchRecipe(input.search,dispatch)
		setTimeout(()=>{document.getElementById('search').value=''},(1000))

	}
	function handleChange(e){
		setInput(prev=>{
			return{...prev,[e.target.name]:e.target.value}
		})
	}
	return(<Form className="d-flex searchForm" onSubmit={handleSubmit} >
		        {searchs?<Button className="d-flex flex-row align-items-center" variant="outline-danger" onClick={(e)=>clearSearchs(dispatch)}><BsXCircle/>search</Button>:null}
            <FormControl
              id="search"
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="search"
              name='search'
              onChange={handleChange}
            />
            <Button id="btnSearch" type='submit'variant="outline-success"><BsSearch/></Button>
          </Form>)
}