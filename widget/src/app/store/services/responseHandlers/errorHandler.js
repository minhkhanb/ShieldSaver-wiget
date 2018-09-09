export const errorObject = (status, message) => ({
	code: status,
	message,
});

export const errorHandlerException = (res) => {
	switch (res.status) {
		case 200: // Success
			return res.data;
		case 400:
			return Promise.reject(errorObject(res.status, ''));
		default:
			return Promise.reject(errorObject(res.status, res.data));
	}
};
