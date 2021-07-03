import { get, post } from './request';
import config from '../config/config'

export const upload = (params:any) => post(`/upload`, params);

export const saveTemplate = (params:any) => post(`/saveTemplate`, params);

export const getTemplateList = (params:any) => get(`/getTemplateList`, params);

export const getLayoutByTid = (params:any) => get(`/getLayoutByTid`, params);

export const publish = (params:any) => post(`/publish`, params);

export const deleteTemplate = (params:any) => post(`/deleteTemplate`, params);

export const getHostList = (params:any) => get(`/getHostList`, params);

export const uploadImages = (params:any) => post(`${config.fileUpload}`, params);

