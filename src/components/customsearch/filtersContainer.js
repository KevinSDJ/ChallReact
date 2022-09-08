import React,{useState,useEffect,useContext}from 'react';
import {Stack,Form} from 'react-bootstrap';
import {searchByFilter} from '../../contextGlobal/actions.js'
import {GlobalContext} from '../../contextGlobal/context.jsx'

let Diets=["Vegan","GlutenFree","Ketogenic","Vegetarian","Lacto-Vegetarian","Ovo-Vegetarian","Pescetarian","Paleo","Primal"]


export default function FiltersConteiner(){
const [diets,setDiets]=useState({
	Vegan:false,
	GlutenFree:false,
	Ketogenic:false,
	Vegetarian:false,
	'Lacto-Vegetarian':false,
	'Ovo-Vegetarian':false,
	Pescetarian:false,
	Paleo:false,
	Primal:false
})
const [listDiet,setListDiets]=useState([])
let {dispatch}=useContext(GlobalContext)

useEffect(()=>{
	let hasFilter=false
	for(let key in diets){
		if(diets[key]){
			hasFilter=true
		}
	}
	if(hasFilter&&listDiet.length>0){
	searchByFilter({type:"diet",params:listDiet},dispatch)	
	}
},[diets, dispatch, listDiet])

function handleChange(e){
	    !listDiet.includes(e.target.name.split(' ')[1])&&setListDiets(current=> current.concat(e.target.name.split(' ')[1]))
	    listDiet.includes(e.target.name.split(' ')[1])&&setListDiets(current=> current.splice(current.indexOf(e.target.name.split(' ')[1]),1))
   		setDiets(prev=>{
   		return {...prev,[`${e.target.name.split(" ")[1]}`]:!diets[`${e.target.name.split(" ")[1]}`]}
   	    })
   	  
   }

    
	return (<>
		<Form>
		<Stack gap={3}>
		  <div className="bg-light border">
		    Diet
		    {Diets.map(e=>
		    	<Form.Check
		    	  className="diets"
		    	  name={`diets ${e}`}
		    	  key={e} 
                  type="switch"
                  id="custom-switch"
                  label={e}
                  checked={diets[e]}
                  onChange={handleChange}
               />)} 
            </div>
		</Stack>
		</Form>
		</>)
} 