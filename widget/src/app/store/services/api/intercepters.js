import { registerHandler as registerRequestHandler } from '../requestHandlers';
import { registerHandler as registerResponseHandler } from '../responseHandlers';

export const registerIntercepters = (axios) => {
	registerRequestHandler(axios.interceptors.request);
	registerResponseHandler(axios.interceptors.response);
};

export default {
	registerIntercepters,
};
