import React, { createContext, useReducer } from 'react'

export const PagaDataContext = createContext({})


const reducer = (state, action) => {
  console.log(state,action,111)
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

export const Color = (props) => {
  //利用useReducer,将当前reducer中需要处理的方法进行导出，useReducer的第一个参数表示要处理的相关逻辑，第二个参数表示初始值
  const [color, dispatch] = useReducer(reducer, 'blue')
  return (
    //在这里我们使用了useContext进行了状态的共享
    <PagaDataContext.Provider value={{ color, dispatch }}>
      {props.children}
    </PagaDataContext.Provider>
  )
}