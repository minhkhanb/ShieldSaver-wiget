import { errorHandlerException } from './errorHandler';

export const registerHandler = (response) => (
	response.use((res) => {
		// console.log('RESPONSE: ', res);

		const data = errorHandlerException(res);
		// console.log('DATA: ', data);
		return data;
	})
);

export default {
	registerHandler,
};
