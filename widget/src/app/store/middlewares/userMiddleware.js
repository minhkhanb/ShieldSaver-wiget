import { put } from 'redux-saga/effects';
import { APP_ACTION } from '../actionTypes';
import restApi from '../../store/services/api';
import URL from '../../commons/constants/url';

function* handlerGetLogin(action) {
	try {


		const rs = yield restApi.get(URL.GET_USERS);

		// console.log('rs: ', rs);
		yield put({type: APP_ACTION.REQUEST_LOGIN_SUCCESS});
	} catch (error) {
		console.log('ERROR: ', error);
	}
}

const userMiddleware = {
	handlerGetLogin,
};

export default userMiddleware;
