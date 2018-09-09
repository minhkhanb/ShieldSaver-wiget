import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {compose} from "recompose";
import {translate} from "react-i18next";
import appActions from '../../store/actions/appActions';
import quoteWidgetActions from '../../store/actions/quoteWidgetActions';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import validator, {INPUT_FIELDS} from '../../commons/utils/validator/validator';
import '../../commons/constants/states';
import './QuotationForm.scss';


const ENUM_FIELDS = {
  LICENSE_PLATE: 5,
  STATE: 6,
};

class QuotationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      license_plate: '',
      state: '',
      errors: {
        license_plate: '',
        state: '',
      },
    }
  }

  validateLicense = (value) => {
    const result = validator.validateElmRequired(this.props.info.licensePlate);
    if (!result.valid) {
      this.setState({
        license_plate: value,
        errors: {
          ...this.state.errors,
          license_plate: result.errors[0]
        }
      });
      this.onChangeFields(ENUM_FIELDS.LICENSE_PLATE, value);
      return false;
    }
    this.setState({
      license_plate: value,
      errors: {
        ...this.state.errors,
        license_plate: ''
      }
    });
    this.onChangeFields(ENUM_FIELDS.LICENSE_PLATE, value);
    return true;
  };

  validateState = (value) => {
    this.onChangeFields(ENUM_FIELDS.STATE, value);
    const result = validator.validateSelectFieldRequired(this.props.info.state);
    if (!result.valid) {
      this.setState({
        state: '',
        errors: {
          ...this.state.errors,
          state: result.errors[0]
        }
      });
      this.onChangeFields(ENUM_FIELDS.STATE, value);
      return false;
    }
    this.setState({
      state: value,
      errors: {
        ...this.state.errors,
        state: ''
      }
    });
    this.onChangeFields(ENUM_FIELDS.STATE, value);
    return true;
  };

  handleFieldChange = (field, value) => {
    // console.log('FIELDS: ', field, value);
    switch (field) {
      case INPUT_FIELDS.LICENSE_PLATE:
        this.validateLicense(value);
        break;
      case INPUT_FIELDS.STATE:
        this.validateState(value);
        break;
      default:
        break;
    }
  };

  onChangeFields = (field, text) => {
    this.props.onChangeText(field, text);
  };

  handleFindVehicle = () => {
    if (this.validateLicense(this.props.info.licensePlate)
      && this.validateState(this.props.info.state) === true) {
      console.log('call find vehicle: ', this.state.license_plate);
      const { actions } = this.props;
      const { license_plate, state } = this.state;
      console.log('license_plate: ', license_plate, 'state: ', state);
      actions.findMyVehicle('CA', license_plate);
    }
  };

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
    const { apps } = this.props;
    this.handlerProcessContactInfo(prevProps.apps, apps);
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
  };

  handlerProcessContactInfo = (prev, current) => {
    const { fields } = this.state;
    if (prev !== current) {
      // this.props.actions.updateContactInfo();
    }
  };

  processQuotation = () => {
    this.props.onSubmit();
    this.props.actions.updateContactInfo();
  };

  processContactInfo = () => {
    this.props.previousPage();
  };

  render() {
    const { t, handleSubmit, quoteWidgets } = this.props;
    return (
      <div style={{ textAlign: 'center', width: '100%',  }}>
        <div className="text-center">
          <h3>
            {t('quotation.title')}
          </h3>
        </div>
        <form onSubmit={this.handleSubmit} className="text-center">
          <div className="row content-quote">
            <div className="col-6 mt-3 content-quote-code">
              <strong>{t('quotation.quote')}</strong>
              <strong>HGVF123</strong>
            </div>
            <div className="col-6 mt-3 content-quote-date">
              <strong>August 02, 2018</strong>
            </div>
          </div>
          <div className="row mt-3 content-replacement-cost">
            <strong className="">{t('quotation.replacement_cost')}</strong>
            <strong>174.40</strong>
          </div>
          <div className="desContent mt-4">
            <p>
              Please call us to arrange an appointment or click "Book an Appointment" to book online.<br/>
              Your windshield replacement is warranted against air and water leaks, defective materials and/or workmanship
              for as long as you own your vehicle.<br/>
              Varying tint color or options may cause the quoted price to differ. Sales tax and  molding additional, if applicable.
            </p>
          </div>
          
          <div className="row">
            <div className="form-group text-center col-xm-12 col-sm-5 offset-sm-1">
              <Button block name="login" text="BACK TO VEHICLE" onClick={this.processContactInfo}/>
            </div>
            <div className="form-group text-center col-xm-12 col-sm-5">
              <Button primary block name="login" text="BOOK AN APPOINTMENT" onClick={this.processQuotation}/>
            </div>
          </div>
        </form>
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
  actions: bindActionCreators({
    ...appActions,
    ...quoteWidgetActions,
  }, dispatch),
});

const enhance = compose(translate('translations'));

export default enhance(connect(mapStateToProps, mapDispatchToProps)(QuotationForm));
