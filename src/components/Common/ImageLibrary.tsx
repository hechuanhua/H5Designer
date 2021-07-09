import React, { useEffect, useState } from 'react';
import { Modal, List, Skeleton, Upload, Button } from 'antd'
import styled from 'styled-components'
import CommonModal from 'components/Common/Modal';
import PreImage from 'components/Common/PreImage';
import Iconfont from 'components/Common/Iconfont'
import config from 'config/config';

import { uploadImageLibrary, getImageLibraryList } from 'api'


const ImageLibrary_Header = styled.div`
  display: flex;
  justify-content: space-between;
`
const ImageLibrary: React.FC<{visible?:boolean,onCancel?:any,onChange:any}>= ({visible,onCancel,onChange}) => {

  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState([] as any)
  const [index, setIndex] = useState('' as string|number)

  useEffect(()=>{
    getImageLibraryList().then((res:any)=>{
      console.log(res,'uploadImageLibrary')
      setList(res.list)
    })
  },[])

  const loadMore = () => {
    return null
  }
  const handleOk = () => {
    onChange(list[index])
    onCancel()
  }
  
  const select = (item:any,index:number) => {
    setIndex(index)
  }

  const getExtraData = (file: any) => {
		console.log(file)
		return { ossPath: 'common/marketing/H5Designer/image_library' }
	}

  const onChangeImg = (res:any) => {
    console.log(res)
    const {status, response} = res.file
    if(status === 'done' && response.code === '200'){
      let url = response.data.url
      uploadImageLibrary({url}).then((res:any)=>{
        console.log(res,'uploadImageLibrary')
        setList(res.list)
      })
    }
  }

  return (
      <Modal
        title={
          <ImageLibrary_Header>
            图片库
            <div style={{marginRight:'50px'}}>
              <Upload
                name="files"
                action={`${config.fileUpload}`}
                data={getExtraData}
                maxCount={1}
                accept={"image/png,image/jpeg,image/gif,image/pjpeg"}
                onChange = {onChangeImg}
                showUploadList={false}
              >
                <Button>上传图片</Button>
              </Upload>
            </div>
          </ImageLibrary_Header>
        }
        visible={visible}
        onOk={handleOk}
        confirmLoading={loading}
        onCancel={onCancel}
        width={700}
        wrapClassName={'imageLibraryBox'}
      >
        <List
          loading={false}
          itemLayout="horizontal"
          loadMore={loadMore}
          dataSource={list}
          renderItem={(item:any,i) => (
            <List.Item onClick={()=>{select(item,i)}} className={index===i?'active':''}>
              <Skeleton title={false} loading={false} key={i}>
                <PreImage src={item.url} preview={true}></PreImage>
              </Skeleton>
              <Iconfont>&#xe69f;</Iconfont>
            </List.Item>
          )}
        />
      </Modal>
  )
}

export default ImageLibrary