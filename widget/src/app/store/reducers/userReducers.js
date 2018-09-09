import userState from '../../commons/objects/userStateObject';
import { APP_ACTION } from '../actionTypes';

function userHandler(state = userState.initialData(), action) {
	// console.log(action);
	switch (action.type) {
		case APP_ACTION.REQUEST_LOGIN_SUCCESS:
			return {
				...state,
				...userState.setUserInfo(action.user),
			};

		default: return state;
	}
}

export default userHandler;
