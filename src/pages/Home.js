import React,{useEffect,useContext} from 'react';
import {Outlet,useNavigate} from 'react-router-dom'
import {GlobalContext} from '../contextGlobal/context'
import {checkSession,getRecipes} from '../contextGlobal/actions'
import Header from '../components/Header/Header.jsx'



export default function Home(){
    let nagivate=useNavigate()
    let {state,dispatch}= useContext(GlobalContext)
    let {login}= state
    useEffect(()=>{
        if(!localStorage.getItem('sessionRecipe')&&!login){
            nagivate('/singIn')
        }
        if(!login&&localStorage.getItem('sessionRecipe')){
            checkSession(dispatch)
        }
    },[dispatch, login, nagivate])

    useEffect(()=>{
        getRecipes(dispatch)
    },[dispatch])
    return(<>
        <Header/>
        <Outlet/>
    </>)
} 