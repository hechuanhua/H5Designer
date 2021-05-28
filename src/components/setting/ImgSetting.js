import { useEffect, useRef, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Form, Input, Button, Select, Upload } from 'antd';
import { PlusOutlined, InboxOutlined } from '@ant-design/icons';
import { getImgInfo } from '../../utils/index';

const ImgSetting = props => {

  const config = useSelector(state => {
    return state.setLibrary?.current?.config
  })
  const dispatch = useDispatch();
  console.log(config, 'config');
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  const onFinish = values => {
    console.log(values);
  };
  const normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onValuesChange = (changedValues, allValues) => {
    console.log(changedValues, allValues, 'changedValues');
    if (Object.keys(changedValues)[0] === 'img') {
      const arr = [
        'https://fanyi-cdn.cdn.bcebos.com/static/translation/img/header/logo_e835568.png',
        'http://www.hy-ls.com/test/img2/1.gif',
      ];
      const url = arr[parseInt(Math.random() * arr.length, 10)];
      setFileList([url]);
      console.log(url, 'url');
      getImgInfo(url).then(res => {
        console.log(res, 'img');
        const h = (500 * res.height) / res.width;
        const position = {
          h,
        };
        dispatch({
          type: 'setLibrary/setting',
          payload: {
            position,
            config: {
              url: url,
            },
          },
        });
      });
    }
  };
  return (
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      onValuesChange={onValuesChange}
    >
      <Form.Item name="note" label="文本" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="上传图片：">
        <Form.Item
          name="img"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          noStyle
          accept="image/png,image/jpeg,image/gif,image/pjpeg"
        >
          <Upload.Dragger name="files" action="/upload.do" maxCount={1}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">点击上传</p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>
    </Form>
  );
};

export default ImgSetting;
