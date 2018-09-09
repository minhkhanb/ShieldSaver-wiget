import { APP_ACTION } from '../actionTypes';

const updateContactInfo = (status, message = '') => ({
	type: APP_ACTION.REQUEST_CONTACT_INFO,
	status,
	message,
});

const appActions = {
	updateContactInfo,
};

export default appActions;
