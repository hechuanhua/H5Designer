import { message } from 'antd';
import config from 'config/config';

interface obj2StringPrams  {
	[key: string]: any
}
function obj2String(obj:obj2StringPrams, arr:any = [], idx:number = 0) {
	for (let item in obj) {
		arr[idx++] = [item, obj[item]];
	}
	return new URLSearchParams(arr).toString();
}

const get = (url:string, params:any) => {
	return new Promise((resolve, reject) => {
		fetch(`${url.indexOf('http')>-1?url:config.api+url}${params ? '?' + obj2String(params) : ''}`, {
			method: 'GET',
		})
			.then(response => response.json())
			.then(res => {
				if (res.code === '200') {
					resolve(res.data);
				} else {
					message.error(res.message,3)
					reject(res);
				}
			})
			.catch(e => {
				console.log('error');
			});
	});
};

const post = (url:string, params:any) => {
	return new Promise((resolve, reject) => {
		fetch(`${url.indexOf('http')>-1?url:config.api+url}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify(params),
		})
			.then(response => {
				return response.json();
			})
			.then(res => {
				if (res.code === '200') {
					resolve(res.data);
				} else {
					message.error(res.message,3)
					reject(res);
				}
			})
			.catch(e => {
				console.log('error');
			});
	});
};

export { get, post };
