import React from 'react';
import styled from 'styled-components'

const Icon = styled.div`
  font-size:30px
`
const Iconfont: React.FC<{
    style?:React.CSSProperties,
    children:any,
    className?:string,
    onClick?:any
  }>= ({style,children,className,onClick}) => {
  return (
    <Icon className={`iconfont ${className}`} onClick={onClick} style={style}>{children}</Icon>
  )
}

export default Iconfont