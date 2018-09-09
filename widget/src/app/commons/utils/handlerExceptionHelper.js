
function handlerException(error, type, message) {
	switch (error.code) {
		default:
			return {
				type,
				errorMessage: message,
			};
	}
}

const HandlerException = {
	handlerException,
};

export default HandlerException;
