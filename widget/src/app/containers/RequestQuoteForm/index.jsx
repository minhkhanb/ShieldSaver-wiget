import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import appActions from '../../store/actions/appActions';
import userActions from '../../store/actions/userActions';
import ContactInformationForm from '../ContactInformationForm';
import VehicleInformationForm from '../VehicleInformationForm';
import QuotationForm from '../QuotationForm';
import ConfirmContactInfomationForm from '../ConfirmContactInformationForm';
import './RequestQuoteForm.scss';
import quoteWidgetActions from '../../store/actions/quoteWidgetActions';

const ENUM_STEP = {
	CONTACT_INFORMATION: 0,
	FIND_VEHICLE: 1,
	QUOTATION: 2,
  CONFIRM_CONTACT_INFORMATION: 3,
};

const ENUM_FIELDS = {
	FIRSTNAME: 0,
	LASTNAME: 1,
	ZIPCODE: 2,
	PHONE: 3,
	EMAIL: 4,
	LICENSEPLATE: 5,
	STATE: 6,
	YEAR: 7,
	MAKE: 8,
	MODEL: 9,
	STYLE: 10,
	SUBMODEL: 11,
	VIN: 12,
};

class RequestQuoteForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			step: ENUM_STEP.CONTACT_INFORMATION,
			contactInfo: {},
		};
	}

	componentDidMount() {
		this.props.actions.requestLogin();
		console.log('call action get users');
	}

	setStep(nextStep) {
		this.setState({step: nextStep});
	}

	onSubmitHandler = (step) => {
		// build quote
		switch (step) {
			case ENUM_STEP.CONTACT_INFORMATION:
			case ENUM_STEP.CONFIRM_CONTACT_INFORMATION:
			case ENUM_STEP.FIND_VEHICLE:
				this.setStep(step);
				break;

			case ENUM_STEP.QUOTATION:
				let isAwesome = false;
				const { actions } = this.props;
				actions.createQuote();
				if (isAwesome) {
					this.setStep(step);
				}
				break;
		}
	};


	onChangeText = (field, text) => {
		switch (field) {
			case ENUM_FIELDS.FIRSTNAME:
				this.state.contactInfo.firstName = text;
				break;

			case ENUM_FIELDS.LASTNAME:
				this.state.contactInfo.lastName = text;
				break;

			case ENUM_FIELDS.ZIPCODE:
				this.state.contactInfo.zipCode = text;
				break;

			case ENUM_FIELDS.PHONE:
				this.state.contactInfo.phone = text;
				break;

			case ENUM_FIELDS.EMAIL:
				this.state.contactInfo.email = text;
				break;

			case ENUM_FIELDS.LICENSEPLATE:
				this.state.contactInfo.licensePlate = text;
				break;

			case ENUM_FIELDS.STATE:
				this.state.contactInfo.state = text;
				break;

			case ENUM_FIELDS.YEAR:
				this.state.contactInfo.year = text;
				break;

			case ENUM_FIELDS.MAKE:
				this.state.contactInfo.make = text;
				break;

			case ENUM_FIELDS.MODEL:
				this.state.contactInfo.model = text;
				break;

			case ENUM_FIELDS.STYLE:
				this.state.contactInfo.style = text;
				break;

			case ENUM_FIELDS.SUBMODEL:
				this.state.contactInfo.submodel = text;
				break;

			case ENUM_FIELDS.VIN:
				this.state.contactInfo.vin = text;
				break;

			default:
				break;
		}
		this.setState(this.state.contactInfo);
	};

	onCheckboxHandler = (checked) => {
		this.state.contactInfo.isRemember = checked;
		this.setState(this.state.contactInfo);
	};

	renderContactInformation = () => {
		return (
			<ContactInformationForm
				onCheck={checked => this.onCheckboxHandler(checked)}
				onChangeText={(field, text) => this.onChangeText(field, text)}
				info={this.state.contactInfo}
				onSubmit={() => this.onSubmitHandler(ENUM_STEP.FIND_VEHICLE)}
			/>
		);
	};

	renderFindVehicle = () => {
		return (
			<VehicleInformationForm
				onChangeText={(field, text) => this.onChangeText(field, text)}
				info={this.state.contactInfo}
				previousPage={() => this.setStep(ENUM_STEP.CONTACT_INFORMATION)}
				onSubmit={() => this.onSubmitHandler(ENUM_STEP.QUOTATION)}
			/>
		);
	};

	renderQuotation = () => {
		return (
			<div>
				<QuotationForm
          onChangeText={(field, text) => this.onChangeText(field, text)}
          info={this.state.contactInfo}
          previousPage={() => this.setStep(ENUM_STEP.FIND_VEHICLE)}
          onSubmit={() => this.setStep(ENUM_STEP.CONFIRM_CONTACT_INFORMATION)}
				/>
			</div>
		);
	};

	renderConfirmContactInformation = () => {
		return (
			<div>
				<ConfirmContactInfomationForm
          onChangeText={(field, text) => this.onChangeText(field, text)}
          info={this.state.contactInfo}
          previousPage={() => this.setStep(ENUM_STEP.QUOTATION)}
          onSubmit={() => this.setStep(ENUM_STEP.SUBMIT)}
				/>
			</div>
		);
	};

	renderRequestQuoteForm = () => {
		switch (this.state.step) {
			case ENUM_STEP.CONTACT_INFORMATION:
				return this.renderContactInformation();
			case ENUM_STEP.FIND_VEHICLE:
				return this.renderFindVehicle();
			case ENUM_STEP.QUOTATION:
				return this.renderQuotation();
			case ENUM_STEP.CONFIRM_CONTACT_INFORMATION:
				return this.renderConfirmContactInformation();
			default:
				break;
		}
	};

	render() {
		const {onSubmit} = this.props;
		const {page} = this.state;
		// console.log(this.state.contactInfo);
		return (
			<div>
				{
					this.renderRequestQuoteForm()
				}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const {
		      apps,
		      quoteWidgets,
	      } = state;
	return {
		apps,
		quoteWidgets,
	};
};

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({...userActions, ...appActions, ...quoteWidgetActions}, dispatch),
});

RequestQuoteForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestQuoteForm);
