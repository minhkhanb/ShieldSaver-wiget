import {
	APP_ACTION,
} from '../../store/actionTypes'

const requestLogin = () => ({
	type: APP_ACTION.REQUEST_LOGIN,
});

const userActions = {
	requestLogin,
};

export default userActions;