
import { useEffect, useRef, useState } from 'react';
import { Radio, Button, message, Input, Form, Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import styled from "styled-components";
import SaveModal from './SaveModal'
import PublishModal from './PublishModal'


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
  const layoutData =  useSelector((state:any) => {
    return state.layoutData;
  });
  const {selected} =  useSelector((state:any) => {
    return state.templateData;
  });
  const { layoutType, freedomLayout, flowLayout } = layoutData
  const onChange = (e) => {
    dispatch({
      type: 'layoutData/setType',
      payload: {
        layoutType: e.target.value
      }
    });
  }
  const preview = () => {
    window.open(`${window.location.origin}/#/preview${selected.tid?'?tid='+selected.tid:''}`)
  }

  const [saveVisible,setSaveVisible] = useState(false)
  const [publishVisible,setPublishVisible] = useState(false)

  const savePage = () => {
    if(!freedomLayout.length && !flowLayout.length){
      return message.error('请添加数据后再保存')
    }
    setSaveVisible(true)
  }

  const publish = () => {
    if(!freedomLayout.length && !flowLayout.length){
      return message.error('请添加数据后再保存')
    }
    setPublishVisible(true)
  }

  const clearData = (e) => {
    dispatch({
      type: 'layoutData/clearAllData',
      payload: {}
    })
  }
  
  return (
    <Head>
      <Operation>
        <Center>
          <Radio.Group defaultValue={layoutType} value={layoutType} onChange={onChange} style={{ marginBottom: 16 }}>
            <Radio.Button value={'flow'}>流动布局</Radio.Button>
            <Radio.Button value={'freedom'}>嵌套布局</Radio.Button>
          </Radio.Group>
        </Center>
        <Button onClick={clearData}>清空数据</Button>
        <Button type='primary' onClick={preview}>预览</Button>
        <Button onClick={savePage}>保存</Button>
        <Button onClick={publish}>发布</Button>
      </Operation>

      <SaveModal
        visible={saveVisible}
        onCancel={()=>{setSaveVisible(false)}}
        defaultTitle={'确定保存？'}
      >
      </SaveModal>

      <PublishModal
        visible={publishVisible}
        onCancel={()=>{setPublishVisible(false)}}
        defaultTitle={'确定发布？'}
      >
      </PublishModal>
      
    </Head>
  )
}

export default Header;


