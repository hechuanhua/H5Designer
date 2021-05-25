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
 
  return (
    <SettingDiv>
      <ul>
        <Li>
          <div className="label">
            图片上传
          </div>
          <input type="file" name="" id=""/>
        </Li>
      </ul>
    </SettingDiv>
  );

};

export default Setting;
