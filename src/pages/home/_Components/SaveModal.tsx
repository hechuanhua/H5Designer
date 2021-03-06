
import React, { useEffect, useRef, useState } from 'react';
import { Radio, Button, message, Input, Form, Spin, Checkbox } from 'antd';
import { useDispatch } from 'react-redux';
import useEqualSelector from 'lib/hooks/useEqualSelector'
import html2canvas from 'html2canvas';
import CommonModal from 'components/Common/Modal';

import { saveTemplate, uploadImages } from 'api'

import { RootState } from 'typings/LayoutData'

interface Modal {
  visible: boolean
  onCancel: () => void
  defaultTitle?: string
  children?: any
}

const SaveModal = (props: Modal) => {
  const dispatch = useDispatch();
  const layoutData = useEqualSelector((state: RootState) => {
    return state.layoutData;
  });
  const { selected } = useEqualSelector((state: RootState) => {
    return state.templateData;
  });
  const { visible, onCancel, defaultTitle } = props

  const [title, setTitle] = useState(defaultTitle)
  const [loading, setLoading] = useState(false)

  const [isPopup,setIsPopup] = useState(false)
  useEffect(() => {
    setTitle(selected.title)
    console.log(selected, title, 'useEffect')
  }, [selected.title])

  const handleOk = () => {
    console.log(isPopup)
    if (!title || !title.replace(/^\s+|\s+$/g, '')) {
      return message.error('必须填写标题')
    }

    setLoading(true)
    // dispatch({
    //   type: 'layoutData/setActive',
    //   payload: {},
    // }) 
    dispatch({
      type: 'pageData/setPrint',
      payload: {
        print: true
      },
    })
    const canvas = document.querySelector<HTMLElement>('#canvas')
    if (!canvas) return
    setTimeout(() => {
      html2canvas(canvas, {
        useCORS: true,
      }).then(function (canvas) {
        const image = new Image();
        const src = canvas.toDataURL("image/png");
        image.src = src

        // document.body.appendChild(image)

        dispatch({
          type: 'layoutData/setPrint',
          payload: {
            print: false
          },
        })
        const newLayoutData = {
          flowLayout: layoutData.flowLayout,
          freedomLayout: layoutData.freedomLayout,
          layoutType: layoutData.layoutType
        }
        saveTemplate({
          title,
          tid: selected.tid,
          base64: src,
          layoutData: newLayoutData,
          isPopup
        }).then((res) => {
          setLoading(false)
          onCancel && onCancel()
          dispatch({
            type: 'layoutData/clearAllData',
            payload: {}
          })
          message.success('保存成功', 1, () => {
            dispatch({
              type: 'templateData/getTemplateList',
              payload: {}
            })
          })
        }).catch((res) => {
          setLoading(false)
        })

      });
    }, 0)
  }

  const changTitle = (e: any) => {
    setTitle(e.target.value)
  }


  return (
    <>
      <CommonModal visible={visible} onOk={handleOk} onCancel={()=>{setLoading(false);onCancel()}} title={defaultTitle ? defaultTitle : '确定保存？'} confirmLoading={loading}>
        <Form>
          <Form.Item label="模板标题">
            <Input onChange={changTitle} value={title}></Input>
          </Form.Item>
          <Checkbox onChange={()=>{setIsPopup(!isPopup)}} checked={isPopup}>是否是弹窗模板？</Checkbox>
        </Form>
      </CommonModal>
    </>
  )
}

export default SaveModal;


