
import { useEffect, useRef, useState } from 'react';
import styled from "styled-components";
import { Radio, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom"


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
  const history = useHistory()
  const { layoutType } = useSelector(state => {
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
    // history.push('/preview')
    window.open(window.location.origin+'/preview')
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
        <Button>保存</Button>
        <Button>发布</Button>
      </Operation>
    </Head>
  )
}

export default Header;
