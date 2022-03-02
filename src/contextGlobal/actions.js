import axios from "axios";
import env from 'react-dotenv';

const SETUSER='setuser';
const LOGOUT="logout"
const SETALLRECIPES='setallrecipes'
const RECIPEDETAIL="recipeDetail"
const SETERRORS ="seterrors"
const CLEARERROR="clearerrors"
const DELETERECIPE="removeRecipe"
const SEARCHRECIPE='searchrecipe';
const ADDTOMENU ='addToMenu'
const CLEARSEARCH='clearSearchs'
const SEARCHBYFILTER="searchByfilter"



const setUser=(data,dispatch)=>{
    axios.post(`http://challenge-react.alkemy.org`,data)
    .then((success)=>{
        localStorage.setItem('sessionRecipe',success.data.token)
        dispatch({type:SETUSER})
    },(err)=>{
        dispatch({type:SETERRORS,payload:err.response.data})
    })
}
const logout =(dispatch)=>{
    localStorage.removeItem('sessionRecipe')
    dispatch({type:LOGOUT})
}
const checkSession=(dispatch)=>{
    dispatch({type:SETUSER})
}
const getRecipes=(dispatch)=>{
    console.log(env.REACT_API_KEY)
    axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${env.REACT_API_KEY}&number=100`)
    .then(success=>{
        dispatch({type:SETALLRECIPES,payload:success.data.results})
    },err=>{
        alert(err)
    })
}
const getRecipeDetail=(id,dispatch)=>{
    axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${env.REACT_API_KEY}&includeNutrition=true%20`)
    .then(res=>{
        dispatch({type:RECIPEDETAIL,payload:res.data})
    },err=>{
        alert(err)
    })
}
const clearError=(dispatch)=>{
    dispatch({type:CLEARERROR})
}
const delRecipe=(title,dispatch)=>{
    dispatch({type:DELETERECIPE,payload:title})
}
const searchRecipe=(search,dispatch)=>{
    console.log(search)
    axios.get(`https://api.spoonacular.com/food/search?apiKey=${env.REACT_API_KEY}&query=${search}`)
    .then(res=>{
        console.log(res.data['searchResults'][0].results)
        if(res.data['searchResults'][0].results.length<1){
            dispatch({type:SETERRORS,payload:"Results not found"})
        }else{
            dispatch({type:SEARCHRECIPE,payload:res.data['searchResults'][0].results})
        }
    },error=>{
        dispatch({type:SETERRORS,payload:error})
    })
}
const addTomenu=(id,dispatch)=>{
    axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${env.REACT_API_KEY}&includeNutrition=false`)
    .then(res=>{
        console.log(res.data)
        let {id,title,image}=res.data
        dispatch({type:ADDTOMENU,payload:[{id,title,image}]})
    },err=>{
        console.log(err)
    })
}
const clearSearchs=(dispatch)=>{
    dispatch({type:CLEARSEARCH})
}
const searchByFilter=(filtres,dispatch)=>{
    let {type}=filtres
    let {params}=filtres
    if(type==="diet"){
        console.log(filtres)
        let url=`https://api.spoonacular.com/recipes/complexSearch?apiKey=${env.REACT_API_KEY}`
         params.forEach(el=>{
            url+= `&diet=${el}`
         })
         url+="&number=100"
        axios.get(url)
        .then(res=>{
            console.log(res)
            dispatch({type:SEARCHBYFILTER,payload:res.data.results})
        })
    }
}
export {
    setUser,
    logout,
    checkSession,
    getRecipes,
    getRecipeDetail,
    clearError,
    delRecipe,
    searchRecipe,
    addTomenu,
    clearSearchs,
    searchByFilter
}