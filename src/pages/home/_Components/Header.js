
import { useEffect, useRef, useState } from 'react';
import { Radio, Button, message, Input, Form } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom"
import styled from "styled-components";
import html2canvas from 'html2canvas';
import CommonModal from '../../../components/common/Modal';
import {upload} from '../../../api'

const Head = styled.div`
	text-align:center;
  position: fixed;
  top: 0;
  width: 100%;
`;
const Operation = styled.div`
  display:flex;
  justify-content: flex-end;
  padding-right: 100px;
  background: #fff;
  padding: 10px 100px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
  button{
    margin-left:15px;
  }
`
const Center = styled.div`
  position:absolute;
  left:50%;
  transform: translateX(-50%);
`
const Header = (props) => {
  const dispatch = useDispatch();
  const { layoutType, freedomLayout, layoutData } = useSelector(state => {
    return state.setLibrary;
  });
  const onChange = (e) => {
    dispatch({
      type: 'setLibrary/setType',
      payload: {
        layoutType: e.target.value
      }
    });
  }
  const preview = () => {
    window.open(window.location.origin+'/preview')
  }

  const [visible,setVisible] = useState(false)
  const [title,setTitle] = useState('') 
  const [base64Img,setBase64Img] = useState('')
  const savePage = () => {
    html2canvas(document.getElementById('canvas'),{
      useCORS:true
    }).then(function(canvas) {
      console.log(canvas,333)
      var image = new Image();
      image.src = canvas.toDataURL("image/png");
      // upload(image)
      setBase64Img(image)
    });
    if(!freedomLayout.length && !layoutData.length){
      return message.error('请添加数据后再保存')
    }
    // setVisible(true)
  }

  const handleOk = () => {
    
    if(!title.replace(/^\s+|\s+$/g,'')){
      return message.error('必须填写标题')
    }

   
    dispatch({
      type: 'setLibrary/saveTemplateData',
      payload: {
        title,
        img: base64Img
      }
    }).then((res)=>{
      message.success('保存成功',1,()=>{
        dispatch({
          type: 'setLibrary/clearAllData',
          payload: {}
        })
      });
    })
  }

  const changTitle = (e) => {
    setTitle(e.target.value)
  }


  return (
    <Head>
      <Operation>
        <Center>
          <Radio.Group defaultValue={layoutType} onChange={onChange} style={{ marginBottom: 16 }}>
            <Radio.Button value={'flow'}>流动布局</Radio.Button>
            <Radio.Button value={'freedom'}>嵌套布局</Radio.Button>
          </Radio.Group>
        </Center>
        <Button type="primary" onClick={preview}>预览</Button>
        <Button onClick={savePage}>保存</Button>
        <Button>发布</Button>
      </Operation>

      <CommonModal visible={visible} onOk={handleOk} onCancel={()=>{setVisible(false)}} title={'确定保存？'}>
        <Form>
          <Form.Item label="模板标题" name="title">
            <Input onChange={changTitle} value={title}></Input>
          </Form.Item>
        </Form>
			</CommonModal>

    </Head>
  )
}

export default Header;
