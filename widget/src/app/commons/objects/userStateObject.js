const initialData = () => ({
	userErrorMessage: '',
	user: null,
});

const setUserInfo = user => ({ user });

const userStateObject = {
	initialData,
	setUserInfo,
};

export default userStateObject;
