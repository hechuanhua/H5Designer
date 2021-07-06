

export interface HostList {
  host: string
  remake: string
}

export interface PageData {
  pageHeight: number,
  print: boolean,
  wechatPopup: boolean,
  hostList: Array<HostList>,
  contextmenu: {
    isShow: boolean,
    x: number,
    y: number
  },
}