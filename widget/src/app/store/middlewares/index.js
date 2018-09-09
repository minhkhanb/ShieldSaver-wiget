import { all, takeLatest } from 'redux-saga/effects';
import {
	APP_ACTION
} from '../actionTypes';
import appMiddleware from './appMiddleware';
import userMiddleware from './userMiddleware';
import quoteWidgetMiddleware from './quoteWidgetMiddleware';

function* handleRequestContactInfo() {
	yield takeLatest(APP_ACTION.REQUEST_CONTACT_INFO, appMiddleware.handleRequestContactInformation);
}

function* handlerRequestLogin() {
	yield takeLatest(APP_ACTION.REQUEST_LOGIN, userMiddleware.handlerGetLogin);
}

function* handlerFindVehicle() {
	yield takeLatest(APP_ACTION.REQUEST_FIND_VEHICLE, quoteWidgetMiddleware.handlerFindMyVehicle);
}

function* handlerVehicleManualBuild() {
	yield takeLatest(APP_ACTION.REQUEST_VEHICLE_MANUAL_BUILD, quoteWidgetMiddleware.handlerMyVehicleManualBuild);
}

function* handlerFindVehicleByYear() {
	yield takeLatest(APP_ACTION.REQUEST_FIND_VEHICLE_BY_YEAR, quoteWidgetMiddleware.handlerProcessFindVehicleByYear);
}

function* handlerFindVehicleByYearAndMake() {
	yield takeLatest(APP_ACTION.REQUEST_FIND_VEHICLE_BY_YEAR_AND_MAKE, quoteWidgetMiddleware.handlerProcessFindVehicleByYearAndMake);
}

function* handlerFindVehicleByModel() {
	yield takeLatest(APP_ACTION.REQUEST_FIND_VEHICLE_BY_MODEL, quoteWidgetMiddleware.handlerProcessFindVehicleByModel);
}

function* handlerFindVehicleByStyle() {
	yield takeLatest(APP_ACTION.REQUEST_FIND_VEHICLE_BY_STYLE, quoteWidgetMiddleware.handlerProcessFindVehicleByStyle);
}

function* handlerBuildQuote() {
	yield takeLatest(APP_ACTION.REQUEST_BUILD_QUOTE, quoteWidgetMiddleware.handlerProcessBuildQuote);
}

export default function* rootSaga() {
	yield all([
		handleRequestContactInfo(),
		handlerRequestLogin(),
		handlerFindVehicle(),
		handlerVehicleManualBuild(),
		handlerFindVehicleByYear(),
		handlerFindVehicleByYearAndMake(),
		handlerFindVehicleByModel(),
		handlerFindVehicleByStyle(),
		handlerBuildQuote(),
	]);
}
