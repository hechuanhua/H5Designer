
import { useEffect, useRef, useState } from 'react';
import { Radio, Button, message, Input, Form } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom"
import styled from "styled-components";
import html2canvas from 'html2canvas';
import CommonModal from '../../../components/common/Modal';

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
  const { layoutType, freedomLayout, flowLayout } = useSelector(state => {
    return state.layoutData;
  });
  const onChange = (e) => {
    dispatch({
      type: 'layoutData/setType',
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
  // const [base64Img,setBase64Img] = useState('')
  const savePage = () => {
    if(!freedomLayout.length && !flowLayout.length){
      return message.error('请添加数据后再保存')
    }
    setVisible(true)
  }

  const handleOk = () => {
    
    if(!title.replace(/^\s+|\s+$/g,'')){
      return message.error('必须填写标题')
    }

    const canvas = document.getElementById('canvas')
    // canvas.classList.add('print')
    dispatch({
      type: 'layoutData/setActive',
      payload: {},
    })
    setTimeout(()=>{
      html2canvas(canvas,{
        useCORS:true,
        // scrollX: -10, 
      }).then(function(canvas) {
        canvas.classList.remove('print')
        const image = new Image();
        const src = canvas.toDataURL("image/png");
        image.src = src
        // document.body.appendChild(image)
        dispatch({
          type: 'layoutData/saveTemplateData',
          payload: {
            title,
            base64: src
          }
        }).then((res)=>{
          setVisible(false)
          message.success('保存成功',1,()=>{
            dispatch({
              type: 'layoutData/clearAllData',
              payload: {}
            })
          });
        })
  
      });
    },0)
    

    
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
