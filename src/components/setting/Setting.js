import { useEffect, useRef, useState, useContext } from "react";
import { useSelector, useDispatch } from 'react-redux'
import styled from "styled-components";
import { Upload, Modal } from "antd"
import { PlusOutlined } from '@ant-design/icons';


import TextSetting from './TextSetting'
import ImgSetting from './ImgSetting'
import RadioSetting from './RadioSetting'

const SettingWrap = styled.div` 
  display:flex;
  flex-direction: column;
  flex:1;
  margin-left:100px;
  position:fixed;
  right:120px;
  top:20px;
  width:300px;
`
const Li = styled.li`
display:flex;
align-items: center;
`
const Setting = (e) => {
  const current = useSelector(state => {
    return state.setLibrary.current
  })
  console.log(current,'Setting')
  const generateDOM = () => {
    console.log('generateDOM')
    if (current.config.type === 'img') {
      return <RadioSetting current={current}></RadioSetting>
    }
    if (current.config.type === 'text') {
      return <TextSetting current={current}></TextSetting>
    }
  }
  return (

    <SettingWrap>
      <h2>属性设置</h2>
      {
        current.id ?
          generateDOM() : ""
      }


    </SettingWrap>
  );

};

export default Setting;
