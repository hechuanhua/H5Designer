import { get, post } from './request';

export const upload = params => post(`/upload`, params);

export const saveTemplate = params => post(`/saveTemplate`, params);

export const getTemplateList = params => get(`/getTemplateList`, params);

export const getLayoutById = params => get(`/getLayoutById`, params);
