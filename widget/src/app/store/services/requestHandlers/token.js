import { USER_INFO } from '../../../commons/constants/store';
import restApi from '../api';
import axios from 'axios';
import URL from '../../../commons/constants/url';

export const setTokenHeader = async (config, appStorage) => {
	// Get token from storage
	// set token to request's header before sending to REST api
	const params = {
		"grant_type": "password",
		"client_id": 2,
		"client_secret": "gNLz4yD0EB7V6et8n6JzH5fTRMhkBmi4BDWDb25t",
		"username": "user@zaitenllc.com",
		"password": "Aa,123456",
		"scope": ""
	};
	const s_token = sessionStorage.getItem('s_token');
	let token;
	if (!s_token) {
		token = await axios.post(URL.API_URL + URL.GET_TOKEN, params);
		if (token) {
			sessionStorage.setItem('s_token', token.data.access_token);
		}
	} else {
		console.log('already a token');
		token = {
			data: {
				token_type: 'Bearer',
				access_token: s_token,
			}
		};
	}

	console.log('Check token', config);
	if (token) {
		const {data} = token;
		const newConfig = {
			...config,
			validateStatus(status) {
				return status >= 200 && status < 500;
			},
			headers: {
				...config.headers,
				Authorization: `${data.token_type} ${data.access_token}`,
			},
		};
		return newConfig;
	}
	return {
		...config,
		validateStatus: status => status >= 200 && status < 500,
	};
};

export default {
	setTokenHeader,
};
