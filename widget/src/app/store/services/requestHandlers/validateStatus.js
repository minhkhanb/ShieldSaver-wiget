export const validateStatusCode = (config) => {
	// Get token from storage
	// set token to request's header before sending to REST api
	const newConfig = {
		...config,
		validateStatus: status => status >= 200 && status < 500, // default,
	};
	return newConfig;
};

export default {
	validateStatusCode,
};
