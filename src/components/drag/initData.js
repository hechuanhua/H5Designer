const initData = {
  img: {
    w: 50,
    h: 238,
    config:{
      type:'img',
      url:'https://dummyimage.com/500x240'
    }
  },
  text: {
    w: 50,
    h: 40,
    config:{
      type:'text',
      text:'我是测试文字'
    }
  },
  radio:{
    w:50,
    h:150,
    config:{
      type:'radio',
      title:'我是单选字段标题',
      list:[{
        label:'我是字段1'
      },{
        label:'我是字段2'
      },{
        label:'我是字段3'
      }],
      layoutType:'3'

    }
  }
}
export default initData