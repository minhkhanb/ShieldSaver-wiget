import { put } from 'redux-saga/effects';
import { APP_ACTION } from '../actionTypes';
import restApi from '../../store/services/api';
import qs from 'qs';
import URL from '../../commons/constants/url';
import HandlerException from '../../commons/utils/handlerExceptionHelper';
import quoteWidgetStateObject from '../../commons/objects/quoteWidgetStateObject';

function* handlerFindMyVehicle(action) {
	try {
		let params = {
			// state: 'CA',
			// license_plate: '5kqu870',
		};

		if (action) {
			params = action.params;
		}

		const result = yield restApi.get(URL.FIND_VEHICLE, {params});

		const vehicle = result.data;

		yield put({type: APP_ACTION.REQUEST_FIND_VEHICLE_SUCCESS, vehicle});
	} catch (error) {
		// console.log('ERROR: ', error);
		switch (error.code) {
			case 401:
				yield put(HandlerException.handlerException(error, APP_ACTION.AUTHORIZATION_FAILURE, ''));
				break;
			case 400:
				yield put({type: APP_ACTION.REQUEST_VEHICLE_MANUAL_BUILD, isManualBuildVehicle: true});
				break;
			default:
				yield put(HandlerException.handlerException(error, APP_ACTION.REQUEST_FIND_VEHICLE_FAILED, ''));
				break;
		}
	}
}

function* handlerMyVehicleManualBuild(action) {
	try {
		const result = yield restApi.get(URL.VEHICLE_LOOKUP_DATA);
		// console.log('result year: ', result);

		const vehicleYear = result.data;

		const vehicle = {};
		vehicle.year = vehicleYear;

		yield put({
			type: APP_ACTION.REQUEST_VEHICLE_MANUAL_BUILD_SUCCESS,
			vehicle,
		});
	} catch (error) {
		// console.log('ERROR: ', error);
		switch (error.code) {
			case 401:
				yield put(HandlerException.handlerException(error, APP_ACTION.AUTHORIZATION_FAILURE, ''));
				break;
			default:
				yield put(HandlerException.handlerException(error, APP_ACTION.REQUEST_VEHICLE_MANUAL_BUILD_FAILED, ''));
				break;
		}
	}
}

function* handlerProcessFindVehicleByYear(action) {
	try {
		let params = {};
		if (action) {
			params = action.params;
		}
		// console.log('params: ', params);
		const result = yield restApi.get(URL.VEHICLE_LOOKUP_DATA, { params });
		// console.log('result: ', result.data[params.year]);
		const vehicle = {};
		vehicle.make = result.data[params.year];
		yield put({
			type: APP_ACTION.REQUEST_FIND_VEHICLE_BY_YEAR_SUCCESS,
			vehicle,
		})
	} catch (error) {
		switch (error.code) {
			case 401:
				yield put(HandlerException.handlerException(error, APP_ACTION.AUTHORIZATION_FAILURE, ''));
				break;
			default:
				yield put(HandlerException.handlerException(error, APP_ACTION.REQUEST_FIND_VEHICLE_BY_YEAR_FAILED, ''));
				break;
		}
	}
}

function* handlerProcessFindVehicleByYearAndMake(action) {
	try {
		let params = {};
		if (action) {
			params = action.params;
		}
		const { year, make } = params;

		const result = yield restApi.get(URL.VEHICLE_LOOKUP_DATA, { params });
		// console.log('handlerProcessFindVehicleByYearAndMake => result: ', result);
		// console.log('hhhhhhh: ', result.data[year][make]);
		const vehicle = {};
		vehicle.model =  result.data[year][make];
		yield put({
			 type: APP_ACTION.REQUEST_FIND_VEHICLE_BY_YEAR_AND_MAKE_SUCCESS,
			vehicle,
		});
	} catch (error) {
		switch (error.code) {
			case 401:
				yield put(HandlerException.handlerException(error, APP_ACTION.AUTHORIZATION_FAILURE, ''));
				break;
			default:
				yield put(HandlerException.handlerException(error, APP_ACTION.REQUEST_FIND_VEHICLE_BY_YEAR_AND_MAKE_FAILED, ''));
				break;
		}
	}
}

function* handlerProcessFindVehicleByModel(action) {
	try {
		let params = {};
		if (action) {
			params = action.params;
		}
		const { year, make, model } = params;
		console.log('params: ', params);
		const result = yield restApi.get(URL.VEHICLE_LOOKUP_DATA, { params });
		const imake = result.data[year][make][model];
		// console.log('handlerProcessFindVehicleByModel => result: ', result, imake);
		const vehicle = {};
		vehicle.style = imake;
		yield put({
			type: APP_ACTION.REQUEST_FIND_VEHICLE_BY_MODEL_SUCCESS,
			vehicle,
		});
	} catch (error) {
		// console.log('error: ', error);
		switch (error.code) {
			case 401:
				yield put(HandlerException.handlerException(error, APP_ACTION.AUTHORIZATION_FAILURE, ''));
				break;
			default:
				yield put(HandlerException.handlerException(error, APP_ACTION.REQUEST_FIND_VEHICLE_BY_MODEL_FAILED, ''));
				break;
		}
	}
}

function* handlerProcessFindVehicleByStyle(action) {
	try {
		let params = {};
		if (action) {
			params = action.params;
		}
		console.log('handlerProcessFindVehicleByStyle => params: ', params);
		const { year, make, model, style } = params;
		const result = yield restApi.get(URL.VEHICLE_LOOKUP_DATA, { params });
		console.log('handlerProcessFindVehicleByStyle => result: ', result, result.data[year][make][model][style]);
		const vehicle = {};
		vehicle.submodel = result.data[year][make][model][style];
		yield put({
			type: APP_ACTION.REQUEST_FIND_VEHICLE_BY_STYLE_SUCCESS,
			vehicle,
		});
	} catch (error) {
		console.log('error: ', error);
		switch (error.code) {
			case 401:
				yield put(HandlerException.handlerException(error, APP_ACTION.AUTHORIZATION_FAILURE, ''));
				break;
			default:
				yield put(HandlerException.handlerException(error, APP_ACTION.REQUEST_FIND_VEHICLE_BY_STYLE_FAILED, ''));
				break;
		}
	}
}

function* handlerProcessBuildQuote(action) {
	try {
		console.log('REQUEST_BUILD_QUOTE_SUCCESS: ');
		yield put({
			type: APP_ACTION.REQUEST_BUILD_QUOTE_SUCCESS,
		});
	} catch (error) {
		switch (error.code) {
			case 401:
				yield put(HandlerException.handlerException(error, APP_ACTION.AUTHORIZATION_FAILURE, ''));
				break;
			default:
				yield put(HandlerException.handlerException(error, APP_ACTION.REQUEST_BUILD_QUOTE_FAILED, ''));
				break;
		}
	}
}

const userMiddleware = {
	handlerFindMyVehicle,
	handlerMyVehicleManualBuild,
	handlerProcessFindVehicleByYear,
	handlerProcessFindVehicleByYearAndMake,
	handlerProcessFindVehicleByModel,
	handlerProcessFindVehicleByStyle,
	handlerProcessBuildQuote,
};

export default userMiddleware;
