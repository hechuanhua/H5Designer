import { useEffect, useRef, useState, useContext } from "react";
import { useSelector, useDispatch } from 'react-redux'
import styled from "styled-components";

const SettingDiv = styled.div` 
  display:flex;
  flex-direction: column;
  flex:1;
  margin-left:100px;
`
const Li = styled.li`
display:flex
`
const Setting = (e) => {
  const current = useSelector(state => {
    return state.setLibrary.current
  })
  const dispatch = useDispatch();
  console.log(current,'current')
  const [url,setUrl] =useState('')
  const change = (e) =>{
    console.log(e,'change')
    // setUrl('https://fanyi-cdn.cdn.bcebos.com/static/translation/img/header/logo_e835568.png')
    dispatch({
      type: "setLibrary/setting",
      payload:{
        url:'https://fanyi-cdn.cdn.bcebos.com/static/translation/img/header/logo_e835568.png'
      }
    })
  }
  return (
    <SettingDiv>
      <ul>
        <Li>
          <div className="label">
            图片上传
          </div>
          <div className="inputDiv">
            <input type="file" name="" id="" onChange={change}/>
          </div>
        </Li>
      </ul>
    </SettingDiv>
  );

};

export default Setting;
