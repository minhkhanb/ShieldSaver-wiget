import { APP_ACTION } from '../../store/actionTypes';

const initialData = () => ({
	action: '',
	isRequesting: false,
	success: false,
	isFailure: false,
});

const setRequestSuccess = (action = '') => ({
	action,
	isRequesting: false,
	success: false,
	isFailure: false,
});

const setIsRequesting = (action = '') => ({
	action,
	isRequesting: true,
	success: false,
	isFailure: false,
});

const appStateObject = {
	initialData,
	setRequestSuccess,
	setIsRequesting,
};

export default appStateObject;
