import {get, post} from './request'

export const saveTemplate = (params) => post(`/saveTemplate`,params)
export const upload = (params) => post(`/upload`,params)
