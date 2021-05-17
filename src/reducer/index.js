import React, { useReducer, useState } from 'react'

const state = {
  current:{
    type:'img',
    order:0
  },
  info:[{
    type:'img',
    order:0, 
    x:0,
    y:0, 
    w:0,
    h:0,
  }]
}
const initState = []
const reducer = (state, action) => {
  switch (action.type) {
    case 'addLibrary':
      return action.data
    case 'img':
      return action.data
    case 'button':
      return action.data
    case 'question':
      return action.data
    default:
      return state
  }
}

export const PageContext = (props) => {
  const [state, dispatch] = useReducer(reducer, initState)
  const [currentType,setCurrentType] = useState({currentType:'',order:0})
  return (
    <PagaDataContext.Provider value={{ state, currentType,setCurrentType, dispatch }}>
      {props.children}
    </PagaDataContext.Provider>
  )
}