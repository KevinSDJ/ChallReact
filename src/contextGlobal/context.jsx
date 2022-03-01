import  React,{createContext,useReducer} from 'react'
import {reducer,initialtate} from './reducer'

export const GlobalContext=createContext()
export const StoreGlobal=({children})=>{
    let [state,dispatch]= useReducer(reducer,initialtate)
    return (<GlobalContext.Provider value={{state,dispatch}}>
        {children}
    </GlobalContext.Provider>)
}










