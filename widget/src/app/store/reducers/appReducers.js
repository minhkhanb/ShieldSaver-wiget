import appState from '../../commons/objects/appStateObject';
import { APP_ACTION } from '../actionTypes';

function appHandler(state = appState.initialData(), action) {
	// console.log('Action type: ', action.type)
	switch (action.type) {
		case APP_ACTION.REQUEST_FIND_VEHICLE:
			return {
				...state,
				...appState.setIsRequesting(action.type),
			};
		case APP_ACTION.REQUEST_CONTACT_INFO:
		case APP_ACTION.REQUEST_FIND_VEHICLE_SUCCESS:
		case APP_ACTION.REQUEST_VEHICLE_MANUAL_BUILD_SUCCESS:
		case APP_ACTION.REQUEST_FIND_VEHICLE_BY_YEAR_SUCCESS:
		case APP_ACTION.REQUEST_FIND_VEHICLE_BY_YEAR_AND_MAKE_SUCCESS:
		case APP_ACTION.REQUEST_FIND_VEHICLE_BY_MODEL_SUCCESS:
		case APP_ACTION.REQUEST_FIND_VEHICLE_BY_STYLE_SUCCESS:
		case APP_ACTION.REQUEST_BUILD_QUOTE_SUCCESS:
			return {
				...state,
				...appState.setRequestSuccess(action.type),
			};
		default:
			return state;
	}
}

export default appHandler;
