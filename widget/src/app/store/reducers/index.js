import { combineReducers } from 'redux';
import apps from './appReducers';
import users from './userReducers';
import quoteWidgets from './quoteWidgetReducers';


export default combineReducers({
	// add reducers component
	apps,
	users,
	quoteWidgets,
});
