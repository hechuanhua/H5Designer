import { useEffect, useRef, useState, useContext } from "react";
import { useSelector, useDispatch } from 'react-redux'
import styled from "styled-components";
import { Upload, Modal } from "antd"
import { PlusOutlined } from '@ant-design/icons';
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
display:flex;
align-items: center;
`
const Setting = (e) => {
  const current = useSelector(state => {
    return state.setLibrary.current
  })
  const dispatch = useDispatch();
  console.log(current, 'current')
  const [fileList, setFileList] = useState([])
  const changeImg = (e) => {
    console.log(e, 'change')
    const arr = ['https://fanyi-cdn.cdn.bcebos.com/static/translation/img/header/logo_e835568.png', 'http://www.hy-ls.com/test/img2/1.gif']
    const url = arr[parseInt(Math.random() * (arr.length), 10)]
    setFileList([url])
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
      <h2>属性设置</h2>
      {
        current.id ?
          <ul>
            <Li>
              <div className="label">
                图片上传：
          </div>

              <div className="inputDiv">
                <Upload
                  accept="image/png,image/jpeg,image/gif,image/pjpeg"
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  maxCount={1}
                  fileList={fileList}
                  // onPreview={this.handlePreview}
                  onChange={changeImg}
                >
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>上传</div>
                  </div>
                </Upload>
              </div>
            </Li>
          </ul> : ""
      }


    </SettingWrap>
  );

};

export default Setting;
