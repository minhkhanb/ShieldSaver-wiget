import axios from 'axios';
import { registerIntercepters } from './intercepters';
import  URL  from '../../../commons/constants/url';

const restApi = axios.create({
	baseURL: URL.API_URL,
	headers: {
		'content-type': 'application/json',
	}
});

registerIntercepters(restApi);

export default restApi;
