import quoteWidget from '../../commons/objects/quoteWidgetStateObject';
import { APP_ACTION } from '../actionTypes';

function vehicleHandler(state = quoteWidget.initialData(), action) {
	let vehicle;
	switch (action.type) {
		case APP_ACTION.REQUEST_FIND_VEHICLE:
			return {
				...state,
			}
		case APP_ACTION.REQUEST_FIND_VEHICLE_SUCCESS:
			return {
				...state,
				...quoteWidget.updateVehicle(
					quoteWidget.wrapJSONVehicleToObject(action.vehicle, false)
				),
				...quoteWidget.setManualBuildVehicle(false),
			};

		case APP_ACTION.REQUEST_VEHICLE_MANUAL_BUILD_SUCCESS:
			return {
				...state,
				...quoteWidget.updateVehicle(action.vehicle),
				...quoteWidget.setManualBuildVehicle(true)
			};

		case APP_ACTION.REQUEST_FIND_VEHICLE_BY_YEAR_SUCCESS:
		case APP_ACTION.REQUEST_FIND_VEHICLE_BY_YEAR_AND_MAKE_SUCCESS:
		case APP_ACTION.REQUEST_FIND_VEHICLE_BY_MODEL_SUCCESS:
		case APP_ACTION.REQUEST_FIND_VEHICLE_BY_STYLE_SUCCESS:
		case APP_ACTION.REQUEST_BUILD_QUOTE_SUCCESS:
			const vehicle = {...state.vehicle, ...action.vehicle};
			return {
				...state,
				...quoteWidget.updateVehicle(
					quoteWidget.wrapJSONVehicleToObject(vehicle, true)
				),
				...quoteWidget.setManualBuildVehicle(true)
			}

		default:
			return state;
	}
}

export default vehicleHandler;
