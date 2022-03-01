export let initialtate={
    recipes:'',
    recipeDetail:{},
    searchs:'',
    login:false,
    errors:''
}


export const reducer=(state,action)=>{
    console.log(action.type)
    switch (action.type){
        case 'setuser':
            return {...state,login:true}
        case 'logout':
            return {...state,login:false}
        case 'setallrecipes':
            return {...state,recipes:action.payload}
        case 'recipeDetail':
             return {...state,recipeDetail:action.payload}
        case 'seterrors':
            return {...state,errors:action.payload}
        case "clearerrors":
            return {...state,errors:''}
        case 'removeRecipe':
            return {...state,recipes:state.recipes.filter(e=> e.title!==action.payload)}
        case 'searchrecipe':
            return {...state,searchs:action.payload}
        case 'addToMenu':
            return {...state,recipes:state.recipes.concat(action.payload)}
        case 'clearSearchs':
            return {...state,searchs:''}
        default:
            return state
    }
}