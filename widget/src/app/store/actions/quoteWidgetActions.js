import {
	APP_ACTION,
} from '../../store/actionTypes'

const findMyVehicle = (state, lisence) => ({
	type: APP_ACTION.REQUEST_FIND_VEHICLE,
	params: {
		state,
		license_plate: lisence,
	},
});

const findVehicleByYear = year => ({
	type: APP_ACTION.REQUEST_FIND_VEHICLE_BY_YEAR,
	params: {
		year,
	},
});

const findVehicleByYearAndMake = (year, make) => ({
	type: APP_ACTION.REQUEST_FIND_VEHICLE_BY_YEAR_AND_MAKE,
	params: {
		year,
		make,
	}
});

const findVehicleByModel = (year, make, model) => ({
	type: APP_ACTION.REQUEST_FIND_VEHICLE_BY_MODEL,
	params: {
		year,
		make,
		model,
	}
});

const findVehicleByStyle = (year, make, model, style) => ({
	type: APP_ACTION.REQUEST_FIND_VEHICLE_BY_STYLE,
	params: {
		year,
		make,
		model,
		style,
	}
});

const createQuote = () => ({
	type: APP_ACTION.REQUEST_BUILD_QUOTE,
	params: {
		
	}
});


const quoteWidgetActions = {
	findMyVehicle,
	findVehicleByYear,
	findVehicleByYearAndMake,
	findVehicleByModel,
	findVehicleByStyle,
	createQuote,
};

export default quoteWidgetActions;