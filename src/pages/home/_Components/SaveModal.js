
import { useEffect, useRef, useState } from 'react';
import { Radio, Button, message, Input, Form, Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import html2canvas from 'html2canvas';
import CommonModal from '../../../components/Common/Modal';

import { saveTemplate } from '../../../api'

const SaveModal = (props) => {
  const dispatch = useDispatch();
  const layoutData =  useSelector(state => {
    return state.layoutData;
  });
  const {selected} =  useSelector(state => {
    return state.templateData;
  });
  const {visible,onCancel,defaultTitle} = props

  const [title,setTitle] = useState(defaultTitle) 
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    setTitle(selected.title)
    console.log(selected,title,'useEffect')
  },[selected.title])

  const handleOk = () => {
    if(!title.replace(/^\s+|\s+$/g,'')){
      return message.error('必须填写标题')
    }

    setLoading(true)
    dispatch({
      type: 'layoutData/setActive',
      payload: {},
    })
    dispatch({
      type: 'pageData/setPrint',
      payload: {
        print:true
      },
    })
    
    setTimeout(()=>{
      html2canvas(canvas,{
        useCORS:true,
      }).then(function(canvas) {
        const image = new Image();
        const src = canvas.toDataURL("image/png");
        image.src = src
        // document.body.appendChild(image)
        console.log(333)
        dispatch({
          type: 'layoutData/setPrint',
          payload: {
            print:false
          },
        })
        saveTemplate({
          title,
          tid:selected.tid,
          base64: src,
          layoutData
        }).then((res)=>{
          setLoading(false)
          onCancel()
          dispatch({
            type: 'layoutData/clearAllData',
            payload: {}
          })
          message.success('保存成功',1,()=>{
            dispatch({
              type: 'templateData/getTemplateList',
              payload: {}
            })
          })
        }).catch((res)=>{
          setLoading(false)
        })
  
      });
    },0)  
  }

  const changTitle = (e) => {
    setTitle(e.target.value)
  }

  
  return (
    <>
      <CommonModal visible={visible} onOk={handleOk} onCancel={onCancel} title={defaultTitle?defaultTitle:'确定保存？'} confirmLoading={loading}>
        <Form>
          <Form.Item label="模板标题">
            <Input onChange={changTitle} value={title}></Input>
          </Form.Item>
        </Form>
      </CommonModal>
    </>
  )
}

export default SaveModal;


