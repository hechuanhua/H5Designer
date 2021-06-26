import { get, post } from './request';

export const upload = params => post(`/upload`, params);

export const saveTemplate = params => post(`/saveTemplate`, params);

export const getTemplateList = params => get(`/getTemplateList`, params);

export const getLayoutByTid = params => get(`/getLayoutByTid`, params);

export const publish = params => post(`/publish`, params);

export const deleteTemplate = params => post(`/deleteTemplate`, params);

export const getHostList = params => get(`/getHostList`, params);

