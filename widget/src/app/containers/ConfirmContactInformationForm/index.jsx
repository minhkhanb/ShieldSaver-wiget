import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import $ from 'jquery';
import 'jquery-mask-plugin';
import appActions from '../../store/actions/appActions';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import validator, {INPUT_FIELDS} from '../../commons/utils/validator/validator';
import './ConfirmContactInformationForm.scss';
import US_STATE from "../../commons/constants/states";
import SelectField from "../../components/SelectField/SelectField";

const ENUM_VEHICLE_IS_CURRENT = true;
const ENUM_FIELDS = {
	FIRSTNAME: 0,
	LASTNAME: 1,
	ZIPCODE: 2,
	PHONE: 3,
	EMAIL: 4,
};

class ConfirmContactInformationFrom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      checkedA: true,
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
      zip_code: '',
      errors: {
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        zip_code: ''
      },
    }
  }

  validateFistName = (value) => {
    const result = validator.validateElmRequired(this.props.info.firstName);
    if (!result.valid) {
      this.setState({
        first_name: value,
        errors: {
          ...this.state.errors,
          first_name: result.errors[0]
        }
      });
      this.onChangeFields(ENUM_FIELDS.FIRSTNAME, value);
      return false;
    }
    this.setState({
      first_name: value,
      errors: {
        ...this.state.errors,
        first_name: ''
      }
    });
    this.onChangeFields(ENUM_FIELDS.FIRSTNAME, value);
    return true;
  };

  validateLastName = (value) => {
    const result = validator.validateElmRequired(this.props.info.lastName);
    if (!result.valid) {
      this.setState({
        last_name: value,
        errors: {
          ...this.state.errors,
          last_name: result.errors[0]
        }
      });
      this.onChangeFields(ENUM_FIELDS.LASTNAME, value);
      return false;
    }
    this.setState({
      last_name: value,
      errors: {
        ...this.state.errors,
        last_name: ''
      }
    });
    this.onChangeFields(ENUM_FIELDS.LASTNAME, value);
    return true;
  };

  validatePhone = (value) => {
    this.onChangeFields(ENUM_FIELDS.PHONE, value);
    const result = validator.validatePhone(this.props.info.phone);
    if (!result.valid) {
      this.setState({
        phone: value,
        errors: {
          ...this.state.errors,
          phone: result.errors[0]
        }
      });
      return false;
    }
    this.setState({
      phone: value,
      errors: {
        ...this.state.errors,
        phone: ''
      }
    });
    return true;
  };

  validateEmail = (value) => {
    const result = validator.validateEmail(this.props.info.email);
    if (!result.valid) {
      this.setState({
        email: value,
        errors: {
          ...this.state.errors,
          email: result.errors[0]
        }
      });
      this.onChangeFields(ENUM_FIELDS.EMAIL, value);
      return false;
    }
    this.setState({
      email: value,
      errors: {
        ...this.state.errors,
        email: ''
      }
    });
    this.onChangeFields(ENUM_FIELDS.EMAIL, value);
    return true;
  };

  validateZip = (value) => {
    this.onChangeFields(ENUM_FIELDS.ZIPCODE, value);
    const result = validator.validateZip(this.props.info.zipCode);
    if (!result.valid) {
      this.setState({
        zip_code: value,
        errors: {
          ...this.state.errors,
          zip_code: result.errors[0]
        }
      });
      return false;
    }
    this.setState({
      zip_code: value,
      errors: {
        ...this.state.errors,
        zip_code: ''
      }
    });
    return true;
  };

  handleFieldChange = (field, value) => {
    // console.log('VALUE++++', value);
    switch (field) {
      case INPUT_FIELDS.FIRST_NAME:
        this.validateFistName(value);
        break;

      case INPUT_FIELDS.LAST_NAME:
        this.validateLastName(value);
        break;
      case INPUT_FIELDS.PHONE:
        this.validatePhone(value);
        break;
      case INPUT_FIELDS.EMAIL:
        this.validateEmail(value);
        break;
      case INPUT_FIELDS.ZIP_CODE:
        this.validateZip(value);
        break;
      default:
        break;
    }
  };

  componentDidMount() {
    $('.phone').mask('(000) 000-0000', {
      placeholder: '(000) 000-0000'
    });
    $('.zip_code').mask('00000-0000', {
      placeholder: '00000-0000'
    });
  }

  componentDidUpdate(prevProps) {
    const { apps } = this.props;
	  this.handlerProcessContactInfo(prevProps.apps, apps);
  }

  handleSubmit = (evt) => {
    // evt.preventDefault();
  };

  handlerProcessContactInfo = (prev, current) => {
	  const { fields } = this.state;
	  if (prev !== current) {
	    // this.props.actions.updateContactInfo();
	  }
  };

  onChangeFields = (field, text) => {
    this.props.onChangeText(field, text);
  };

  onCheckHandler = (evt) => {
    this.props.onCheck(evt.target.checked);
  };

  processQuotation = () => {
    this.props.previousPage();
  };

  processSubmit = () => {
    if (!ENUM_VEHICLE_IS_CURRENT) {
	    if (this.validateFistName(this.props.info.firstName)
		    && this.validateLastName(this.props.info.lastName)
		    && this.validateZip(this.props.info.zipCode)
		    && this.validatePhone(this.props.info.phone)
		    && this.validateEmail(this.props.info.email) === true) {
		    this.props.onSubmit();
	    }
    } else {
	    this.props.onSubmit();
    }
  };

  render() {
    const { t, handleSubmit } = this.props;
    return (
      <div className="container justify-content">
        <div className="text-center">
          <h3>
            {t('confirm_contact_information.title')}
          </h3>
          <h6>
            {t('confirm_contact_information.title_child')}
          </h6>
        </div>
        <form style={{ textAlign: 'left' }}>
          <div className="">
            <div className="row">
              <div className="col-xm-12 col-sm-12 col-md-5 offset-md-1 content-inline">
                <InputField
                  type="text"
                  name={t('user_information.first_name')}
                  label={t('user_information.first_name')}
                  placeholder=""
                  data={this.props.info.firstName !== undefined ? this.props.info.firstName : ''}
                  onChangeText={text => this.onChangeFields(ENUM_FIELDS.FIRSTNAME, text)}
                  onChange={(evt, val) => this.handleFieldChange(INPUT_FIELDS.FIRST_NAME, val)}
                  errors={this.state.errors.first_name}
                />
              </div>
              <div className="col-xm-12 col-sm-12 col-md-5">
                <InputField
                  type="text"
                  name={t('user_information.last_name')}
                  label={t('user_information.last_name')}
                  placeholder=""
                  data={this.props.info.lastName !== undefined ? this.props.info.lastName : ''}
                  onChangeText={text => this.onChangeFields(ENUM_FIELDS.LASTNAME, text)}
                  onChange={(evt, val) => this.handleFieldChange(INPUT_FIELDS.LAST_NAME, val)}
                  errors={this.state.errors.last_name}
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group-checkbox-confirm offset-md-1">
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="customCheck"
                         checked={this.props.info.isRemember !== undefined ? this.props.info.isRemember : false}
                         onChange={evt => this.onCheckHandler(evt)}
                  />
                  <label className="custom-control-label" htmlFor="customCheck">
                    {t('contact_information.lbl_checkbox')}
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xm-12 col-sm-12 col-md-5 offset-md-1 content-inline">
                <InputField
                  type="text"
                  name={t('user_information.address_1')}
                  label={t('user_information.address_1')}
                  placeholder=""
                  data={this.props.info.firstName !== undefined ? this.props.info.firstName : ''}
                  onChangeText={text => this.onChangeFields(ENUM_FIELDS.FIRSTNAME, text)}
                  onChange={(evt, val) => this.handleFieldChange(INPUT_FIELDS.FIRST_NAME, val)}
                  errors={this.state.errors.first_name}
                />
              </div>
              <div className="col-xm-12 col-sm-12 col-md-5">
                <InputField
                  type="text"
                  name={t('user_information.address_2')}
                  label={t('user_information.address_2')}
                  placeholder=""
                  data={this.props.info.lastName !== undefined ? this.props.info.lastName : ''}
                  onChangeText={text => this.onChangeFields(ENUM_FIELDS.LASTNAME, text)}
                  onChange={(evt, val) => this.handleFieldChange(INPUT_FIELDS.LAST_NAME, val)}
                  errors={this.state.errors.last_name}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-xm-12 col-sm-12 col-md-5 offset-md-1 content-inline">
                <InputField
                  type="text"
                  name={t('user_information.city')}
                  label={t('user_information.city')}
                  placeholder=""
                  data={this.props.info.firstName !== undefined ? this.props.info.firstName : ''}
                  onChangeText={text => this.onChangeFields(ENUM_FIELDS.FIRSTNAME, text)}
                  onChange={(evt, val) => this.handleFieldChange(INPUT_FIELDS.FIRST_NAME, val)}
                  errors={this.state.errors.first_name}
                />
              </div>
              <div className="col-xm-12 col-sm-12 col-md-5">
                <SelectField
                  label="State"
                  options={US_STATE}
                  block
                  data={(this.props.info.state !== undefined
                    && this.props.info.state !== 'default') ? this.props.info.state : 'default'}
                  onChangeText={text => this.onChangeFields(ENUM_FIELDS.LICENSEPLATE, text)}
                  onChange={(evt, val) => this.handleFieldChange(INPUT_FIELDS.STATE, val)}
                  errors={this.state.errors.state}
                  isManual='true'
                />
              </div>
            </div>
            <div className="row">
              <div className="col-xm-12 col-sm-12 col-md-5 offset-md-1 content-inline">
                <InputField
                  type="text"
                  name='zip_code'
                  label={t('user_information.zip_code')}
                  placeholder=""
                  data={this.props.info.zipCode !== undefined ? this.props.info.zipCode : ''}
                  onChangeText={text => this.onChangeFields(ENUM_FIELDS.ZIPCODE, text)}
                  onChange={(evt, val) => this.handleFieldChange(INPUT_FIELDS.ZIP_CODE, val)}
                  errors={this.state.errors.zip_code}
                />
              </div>
              <div className="col-xm-12 col-sm-12 col-md-5">
                <InputField
                  type="text"
                  name={t('user_information.email')}
                  label={t('user_information.email')}
                  placeholder=""
                  data={this.props.info.email !== undefined ? this.props.info.email : ''}
                  onChangeText={text => this.onChangeFields(ENUM_FIELDS.EMAIL, text)}
                  onChange={(evt, val) => this.handleFieldChange(INPUT_FIELDS.EMAIL, val)}
                  errors={this.state.errors.email}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-xm-12 col-sm-12 col-md-5 offset-md-1 content-inline">
                <InputField
                  type="text"
                  name='phone'
                  label={t('user_information.phone')}
                  placeholder=""
                  data={this.props.info.phone !== undefined ? this.props.info.phone : ''}
                  onChangeText={text => this.onChangeFields(ENUM_FIELDS.PHONE, text)}
                  onChange={(evt, val) => this.handleFieldChange(INPUT_FIELDS.PHONE, val)}
                  errors={this.state.errors.phone}
                />
              </div>
              <div className="col-xm-12 col-sm-12 col-md-5 offset-md-1 content-inline">
              </div>
            </div>
          </div>
          <div className="clearfix"/>

          <div className="row">
            <div className="form-group text-center col-xm-12 col-sm-5 offset-sm-1">
              <Button block name="" text="BACK TO ESTIMATE" onClick={this.processQuotation}/>
            </div>
            <div className="form-group text-center col-xm-12 col-sm-5">
              <Button primary block name="" text="SCHEDULE WORK" onClick={this.processSubmit}/>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
	const {
    apps
  } = state;
	return {
		apps,
    // error: state.error,
	};
};

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({
		appActions,
	}, dispatch),
});

const enhance = compose(translate('translations'));

export default enhance(connect(mapStateToProps, mapDispatchToProps)(ConfirmContactInformationFrom));
