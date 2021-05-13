import React, { createContext, useReducer } from 'react'

export const PagaDataContext = createContext({})

const initState = []
const reducer = (state, action) => {
  switch (action.type) {
    case 'background':
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
  //利用useReducer,将当前reducer中需要处理的方法进行导出，useReducer的第一个参数表示要处理的相关逻辑，第二个参数表示初始值
  const [state, dispatch] = useReducer(reducer, initState)
  return (
    //在这里我们使用了useContext进行了状态的共享
    <PagaDataContext.Provider value={{ state, dispatch }}>
      {props.children}
    </PagaDataContext.Provider>
  )
}