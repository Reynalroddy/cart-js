import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const initialState = {
  cart:cartItems,
total:0,
amount:0,
loading:false,
}



const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer,initialState)


const clearCart = ()=>{
  dispatch({type:"CLEAR_CART"})
}

const removeItem = (id)=>{
dispatch({type:"REMOVE_ITEM",payload:id})

}

const increaseItem = (id)=>{
dispatch({type:"INCREASE_ITEM",payload:id})

}

const decreaseItem = (id)=>{

  dispatch({type:"DECREASE_ITEM",payload:id})
}


const calcTotal = (arr)=>{

dispatch({type:"CALC_TOTAL"})
}


const fetchData = async (link)=>{
  dispatch({type:"LOADING"})
const response = await fetch(link);
const data = await response.json()
dispatch({type:"FETCH_DATA",payload:data})
}



useEffect(()=>{
fetchData(url)
},[])



useEffect(()=>{
calcTotal()

},[state.cart])
  return (
    <AppContext.Provider
      value={{
        ...state,clearCart,removeItem,increaseItem,decreaseItem,calcTotal
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use


export { AppContext, AppProvider }
