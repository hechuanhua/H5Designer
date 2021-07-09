import { get, post } from './request';
import config from 'config/config'

// export const upload = (params:any) => post(`/upload`, params);

// 保存模板库
export const saveTemplate = (params:any) => post(`/saveTemplate`, params);

// 获取模板库列表
export const getTemplateList = (params?:any) => get(`/getTemplateList`, params);

// 根据Tid获取模块数据
export const getLayoutByTid = (params:any) => get(`/getLayoutByTid`, params);

// 发布
export const publish = (params:any) => post(`/publish`, params);

// 删除模板
export const deleteTemplate = (params:any) => post(`/deleteTemplate`, params);

// 获取域名列表
export const getHostList = (params?:any) => get(`/getHostList`, params);

// 上传阿里云OSS
export const uploadImages = (params:any) => post(`${config.fileUpload}`, params);

// 上传图片库
export const uploadImageLibrary = (params:any) => post(`/uploadImageLibrary`, params);

// 获取图片库列表
export const getImageLibraryList = (params?:any) => get(`/getImageLibraryList`, params);