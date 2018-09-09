const ENUM_OBJ = {
	YEAR: 0,
	MAKE: 1,
	MODEL: 2,
	STYLE: 3,
	SUBMODEL: 4,
};

const initialData = () => ({
	quoteWidgetErrorMessage: '',
	vehicle: {
		license_plate: null,
		state: null,
		make: null,
		model: null,
		year: null,
		style: null,
		submodel: null,
		vin: null,
	},
	isManualBuildVehicle: undefined,
});

const updateVehicle = vehicle => ({ vehicle })

const wrapObjectToArray = (data, isIgnore = true) => {
	const s_data = [];

	if (typeof data !== 'object' || !isIgnore) {
		return data;
	}

	for (let prop in data) {
		if (data.hasOwnProperty(prop)) {
			console.log('string: ', typeof data[prop] === 'string')
			if (typeof data[prop] === 'string') {
				data[prop] = 'None';
			}
			s_data.push({
				[prop]: data[prop]
			});
		}
	}

	return s_data;
};

const wrapJSONVehicleToObject = (data, isManual) => {
	let submodel = 'None';
	if (isManual) {
		if (typeof data.submodel === 'object') {
			submodel = data.submodel;
		}
	} else {
		if (data.submodel.trim() !== '') {
			submodel = data.submodel;
		}
	}
	
	return {
		license_plate: data.license_plate,
		state: data.state,
		make: data.make,
		model: data.model,
		year: data.year,
		style: data.style,
		submodel,
		vin: data.vin,
	};
}

const setManualBuildVehicle = isManual => ({ isManualBuildVehicle: isManual });

const quoteWidgetStateObject = {
	initialData,
	updateVehicle,
	setManualBuildVehicle,
	wrapJSONVehicleToObject,
};

export default quoteWidgetStateObject;
