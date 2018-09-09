import { put } from 'redux-saga/effects';
import { APP_ACTION } from '../actionTypes';
import restApi from '../../store/services/api';

function* handleRequestContactInformation(action) {
	try {
		console.log('Process contact information');
		yield put({ type: APP_ACTION.REQUEST_CONTACT_INFO_SUCCESS });
	} catch (error) {
		console.log('ERROR: ', error);
	}
}

const appMiddleware = {
	handleRequestContactInformation,
};

export default appMiddleware;
