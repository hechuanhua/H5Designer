import { useEffect, useRef, useState, useContext } from "react";
import { useSelector, useDispatch } from 'react-redux'
import styled from "styled-components";
import { getImgInfo } from '../../utils/index'

const SettingWrap = styled.div` 
  display:flex;
  flex-direction: column;
  flex:1;
  margin-left:100px;
  position:fixed;
  right:120px;
  top:20px;
`
const Li = styled.li`
display:flex
`
const Setting = (e) => {
  const current = useSelector(state => {
    return state.setLibrary.current
  })
  const dispatch = useDispatch();
  console.log(current, 'current')
  const [url, setUrl] = useState('')
  const change = (e) => {
    console.log(e, 'change')
    // setUrl('https://fanyi-cdn.cdn.bcebos.com/static/translation/img/header/logo_e835568.png')
    const arr = ['https://fanyi-cdn.cdn.bcebos.com/static/translation/img/header/logo_e835568.png', 'http://www.hy-ls.com/test/img2/1.gif']
    const url = arr[parseInt(Math.random() * (arr.length), 10)]
    console.log(url, 'url')
    getImgInfo(url).then((res) => {
      console.log(res, 'img')
      const h = 500 * res.height / res.width
      const position = {
        x: 0,
        y: 0,
        w: 1,
        h
      }
      dispatch({
        type: "setLibrary/setting",
        payload: {
          position,
          config: {
            url: url
          }
        }
      })
    })
  }
  return (
    <SettingWrap>
      <ul>
        <Li>
          <div className="label">
            图片上传
          </div>
          <div className="inputDiv">
            <input type="file" name="" id="" onChange={change} />
          </div>
        </Li>
      </ul>
    </SettingWrap>
  );

};

export default Setting;
