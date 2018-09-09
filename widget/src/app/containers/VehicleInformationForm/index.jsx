import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import appActions from '../../store/actions/appActions';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import SelectField from '../../components/SelectField/SelectField';
import validator, {INPUT_FIELDS} from '../../commons/utils/validator/validator';
import '../../commons/constants/states';
import './VehicleInformationForm.scss';
import US_STATE from '../../commons/constants/states';
import quoteWidgetActions from '../../store/actions/quoteWidgetActions';
import StringHelpers from '../../commons/utils/stringHelpers';
import { APP_ACTION } from '../../store/actionTypes';
import {compose} from "recompose";
import {translate} from "react-i18next";

const ENUM_FIELDS = {
  LICENSE_PLATE: 5,
  STATE: 6,
	YEAR: 7,
	MAKE: 8,
	MODEL: 9,
	STYLE: 10,
	SUBMODEL: 11,
};


class VehicleInformationFrom extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	loaded: false,
	    forceLookup: false,
      license_plate: '',
      state: '',
	    year: '',
	    make: '',
	    model: '',
	    style: '',
	    submodel: '',
      showPopup: false,
      years: [],
			isContinue: true,
      errors: {
        license_plate: '',
        state: '',
	      year: '',
	      make: '',
	      model: '',
	      style: '',
	      submodel: '',
      },
    }
  }

  validateLicense = (value) => {
    const result = validator.validateLicense(this.props.info.licensePlate);
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

  clearSelectedItem = (start, end, value) => {
  	if (start === undefined) {
		  for (let field = ENUM_FIELDS.YEAR; field <= ENUM_FIELDS.SUBMODEL; field++) {
			  this.onChangeFields(field, 'default');
		  }
		  this.setState({isContinue: false, showPopup: false, forceLookup: true});
		  return;
	  }

	 	for (let field = start + 1; field <= end; field++) {
	 		this.onChangeFields(field + 7, value);
	  }
  };

	validateManualBuildFields = (field, value) => {
		const { actions } = this.props;
		let result;
		console.log('field: ', field, 'value: ', value);
		this.onChangeFields(field, value);
		switch (field) {
			case ENUM_FIELDS.YEAR:
				result = validator.validateSelectFieldRequired(this.props.info.year);
				if (!result.valid) {
					this.setState({
						year: '',
						errors: {
							...this.state.errors,
							year: result.errors[0]
						}
					});

					if (value === 'default') {
						this.clearSelectedItem(field - 7, Object.keys(this.props.info).length, value);
					}
					this.onChangeFields(field, value);
					return false;
				}
				this.setState({
					year: value,
					errors: {
						...this.state.errors,
						year: ''
					}
				});
				actions.findVehicleByYear(value);
				break;

			case ENUM_FIELDS.MAKE:
				result = validator.validateSelectFieldRequired(this.props.info.make);
				if (!result.valid) {
					this.setState({
						make: '',
						errors: {
							...this.state.errors,
							make: result.errors[0]
						}
					});
					if (value === 'default') {
						this.clearSelectedItem(field - 7, Object.keys(this.props.info).length, value);
					}
					this.onChangeFields(field, value);
					return false;
				}
				this.setState({
					make: value,
					errors: {
						...this.state.errors,
						make: ''
					}
				});
				console.log('value year: ', this.state.year, 'value: ', value);
				actions.findVehicleByYearAndMake(this.state.year, value);
				break;

			case ENUM_FIELDS.MODEL:
				console.log('model: ', this.props.info.model);
				result = validator.validateSelectFieldRequired(this.props.info.model);
				if (!result.valid) {
					this.setState({
						model: '',
						errors: {
							...this.state.errors,
							model: result.errors[0]
						}
					});
					if (value === 'default') {
						this.clearSelectedItem(field - 7, Object.keys(this.props.info).length, value);
					}
					this.onChangeFields(field, value);
					return false;
				}
				this.setState({
					model: value,
					errors: {
						...this.state.errors,
						model: ''
					}
				});
				const { year, make, model } = this.state;
				actions.findVehicleByModel(this.props.info.year, this.props.info.make, value);
				break;

			case ENUM_FIELDS.STYLE:
				result = validator.validateSelectFieldRequired(this.props.info.style);
				if (!result.valid) {
					this.setState({
						style: '',
						errors: {
							...this.state.errors,
							style: result.errors[0]
						}
					});
					if (value === 'default') {
						this.clearSelectedItem(field - 7, Object.keys(this.props.info).length, value);
					}
					this.onChangeFields(field, value);
					return false;
				}
				this.setState({
					style: value,
					errors: {
						...this.state.errors,
						style: ''
					}
				});
				actions.findVehicleByStyle(this.state.year, this.state.make, this.state.model, value);
				break;

			case ENUM_FIELDS.SUBMODEL:
				result = validator.validateSelectFieldRequired(this.props.info.submodel);
				if (!result.valid) {
					this.setState({
						submodel: '',
						errors: {
							...this.state.errors,
							submodel: result.errors[0]
						}
					});
					this.onChangeFields(field, value);
					return false;
				}
				this.setState({
					submodel: value,
					errors: {
						...this.state.errors,
						submodel: ''
					}
				});
				break;
				
			default:
				break;
		}

		this.onChangeFields(field, value);
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
	    case ENUM_FIELDS.YEAR:
		    this.validateManualBuildFields(field, value);
		    break;

	    case ENUM_FIELDS.MAKE:
		    this.validateManualBuildFields(field, value);
		    break;

	    case ENUM_FIELDS.MODEL:
		    this.validateManualBuildFields(field, value);
		    break;

	    case ENUM_FIELDS.STYLE:
		    this.validateManualBuildFields(field, value);
		    break;

	    case ENUM_FIELDS.SUBMODEL:
		    this.validateManualBuildFields(field, value);
		    break;
      default:
        break;
    }
  };

  onChangeFields = (field, text) => {
    this.props.onChangeText(field, text);
  };

  handleFindVehicle = () => {
    if (this.validateLicense(this.props.info.licensePlate) === true
      && this.validateState(this.props.info.state) === true) {
      
      const { actions, quoteWidgets } = this.props;
      const { license_plate, state } = this.state;

	    this.clearSelectedItem();

      actions.findMyVehicle(state, license_plate);
    }
  };

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
    const { apps, quoteWidgets } = this.props;
    this.handlerProcessContactInfo(prevProps.apps, apps);
	  if (quoteWidgets.isManualBuildVehicle !== prevProps.quoteWidgets.isManualBuildVehicle) {
	  	if (apps.action === APP_ACTION.REQUEST_VEHICLE_MANUAL_BUILD_SUCCESS) {
			  this.setState({showPopup: quoteWidgets.isManualBuildVehicle, loaded: true, forceLookup: false });
		  } else if (apps.action === APP_ACTION.REQUEST_FIND_VEHICLE_SUCCESS) {
			  this.setState({showPopup: quoteWidgets.isManualBuildVehicle, loaded: false, forceLookup: false });
		  }

	  } else if (this.state.showPopup != quoteWidgets.isManualBuildVehicle && apps.action !== APP_ACTION.REQUEST_VEHICLE_MANUAL_BUILD_SUCCESS) {
		  this.setState({showPopup: quoteWidgets.isManualBuildVehicle, loaded: true, forceLookup: false });
	  }

  }

  handleSubmit = (evt) => {
    evt.preventDefault();
  };

  handlerProcessContactInfo = (prev, current) => {
    const { fields } = this.state;
    if (prev !== current) {
      // todo something
    }
  };

  processQuotation = () => {
    this.props.onSubmit();
  };

  processContactInfo = () => {
	  this.props.previousPage();
  };

  processOptionsData = () => {
  	const { quoteWidgets } = this.props;
  	const options = {
  		year: [],
		  make: [],
		  model: [],
		  style: [],
		  submodel: []
	  };

  	if (this.state.forceLookup) {
  		return options;
	  }

  	console.log('quoteWidgets: ', quoteWidgets);
  	if (quoteWidgets.vehicle !== null && this.state.isContinue === true) {
		  Object.keys(quoteWidgets.vehicle).map((item) => {
	      const el = item;
	      if (quoteWidgets.vehicle[el] !== null && typeof quoteWidgets.vehicle[el].map === 'function') {
		      quoteWidgets.vehicle[el].map((item) => {
			      options[el].push({
				      id: StringHelpers.getGUID(),
				      name: item,
			      });
		      });
	      }
	      else if (quoteWidgets.vehicle[el] !== null){
	      	try {
	      		console.log('objec map: ', quoteWidgets.vehicle[el]);
	      		if (quoteWidgets.vehicle[el] === 'None') {
	      			options[el].push({
					      id: StringHelpers.getGUID(),
					      name: 'None',
				      });
			      } else {
				      Object.keys(quoteWidgets.vehicle[el]).map((item) => {
					      options[el].push({
						      id: StringHelpers.getGUID(),
						      name: item,
					      });
				      });
			      }

		      } catch (error) {
	      		
		      }
	      }
		  });
	  }
  	return options;
  };

  handleClosePopup = () => {
    this.setState({
			isContinue: false,
      showPopup: false,
		});
  };

  handleContinue = () => {
		this.setState({
			isContinue: true,
      showPopup: false,
		});
  };

  render() {
    const { t, apps, handleSubmit, quoteWidgets } = this.props;
    const opts = this.processOptionsData();
    console.log('render: ', JSON.stringify(quoteWidgets.vehicle, null, 2));
    return (
      <div className="" style={{ textAlign: 'center', width: '100%',  }}>
        {(apps.action === "APP.REQUEST_VEHICLE_MANUAL_BUILD_SUCCESS" && this.state.showPopup === true) ?
          (<div className='popup'>
						<div className="container-popup-info">
              <div className='popup_inner'>
                <div className="modal-header title-information">
                  <h5 className="modal-title" id="titleModalConfirm">{t('vehicle_information.title-header-popup')}</h5>
                  <button type="button" className="close" onClick={this.handleClosePopup}>
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
								<div className="modal-body">
                  <strong>{t('vehicle_information.title-content-popup')}</strong>
                  <p>{t('vehicle_information.content-info-popup')}</p>
								</div>
								<div className="row modal-footer-info">
                  <div className="form-group text-center col-xm-12 col-sm-6 ">
                    <Button block name="" text="BACK" onClick={this.handleClosePopup}/>
                  </div>
                  <div className="form-group text-center col-xm-12 col-sm-6">
                    <Button primary block name="" text="CONTINUE" onClick={this.handleContinue}/>
                  </div>
								</div>
              </div>
						</div>
          </div>) : null}

        <div className="text-center">
          <h3>
            {t('vehicle_information.title')}
          </h3>
          <h5>
            {t('vehicle_information.step_title')}
          </h5>
        </div>
        <form onSubmit={this.handleSubmit} className="text-center">
          <div className="row text-left">
            <div className="col-xm-12 col-sm-12 col-md-5 offset-md-1 mt-4">
              <div className="card">
                <h5 className="card-header">{t('vehicle_information.title_vehicle_lookup')}</h5>
                <div className="card-body vehicle-lookup">
                  <InputField
                    className="license-plate"
                    type="text"
                    name="License Plate"
                    label="License Plate"
                    placeholder=""
                    uppercase={true}
                    maxLength="20"
                    data={this.props.info.licensePlate !== undefined ? this.props.info.licensePlate : ''}
                    onChangeText={text => this.onChangeFields(ENUM_FIELDS.LICENSEPLATE, text)}
                    onChange={(evt, val) => this.handleFieldChange(INPUT_FIELDS.LICENSE_PLATE, val)}
                    errors={this.state.errors.license_plate}
                  />
									<div className="mb-5">
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

                  <div className="form-group text-center col-xm-12 col-sm-12">
                    <Button primary block name="" text="FIND MY VEHICLE" onClick={this.handleFindVehicle}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xm-12 col-sm-12 col-md-5 mt-4">
              <div className="card">
                <h5 className="card-header">{t('vehicle_information.title_manual_build')}</h5>
                <div className="card-body">
									<div className="select-field-pb">
                    <SelectField
                      label="Year"
                      options={opts.year}
                      data={(this.props.info.year !== undefined
                        && this.props.info.year !== 'default') ? this.props.info.year : 'default'}
                      isManual={quoteWidgets.isManualBuildVehicle }
                      value={quoteWidgets.vehicle !== null && quoteWidgets.vehicle.year !== undefined ? quoteWidgets.vehicle.year : ''}
                      onChange={(evt, val) => this.handleFieldChange(ENUM_FIELDS.YEAR, val)}
                    />
									</div>
									<div className="select-field-pb">
                    <SelectField
                      label="Make"
                      options={opts.make}
                      data={(this.props.info.make !== undefined
                        && this.props.info.make !== 'default') ? this.props.info.make : 'default'}
                      isManual={quoteWidgets.isManualBuildVehicle}
                      value={quoteWidgets.vehicle !== null && quoteWidgets.vehicle.make !== undefined ? quoteWidgets.vehicle.make : ''}
                      onChange={(evt, val) => this.handleFieldChange(ENUM_FIELDS.MAKE, val)}
                    />
									</div>
									<div className="select-field-pb">
                    <SelectField
                      label="Model"
                      options={opts.model}
                      data={(this.props.info.model !== undefined
	                      && this.props.info.model !== 'default') ? this.props.info.model : 'default'}
                      isManual={quoteWidgets.isManualBuildVehicle}
                      value={quoteWidgets.vehicle !== null && quoteWidgets.vehicle.model !== undefined ? quoteWidgets.vehicle.model : ''}
                      onChange={(evt, val) => this.handleFieldChange(ENUM_FIELDS.MODEL, val)}
                    />
									</div>
									<div className="select-field-pb">
                    <SelectField
                      label="Style"
                      options={opts.style}
                      data={(this.props.info.style !== undefined
	                      && this.props.info.style !== 'default') ? this.props.info.style : 'default'}
                      isManual={quoteWidgets.isManualBuildVehicle }
                      value={quoteWidgets.vehicle !== null && quoteWidgets.vehicle.style !== undefined ? quoteWidgets.vehicle.style : ''}
                      onChange={(evt, val) => this.handleFieldChange(ENUM_FIELDS.STYLE, val)}
                    />
									</div>
									<div className="select-field-pb">
                    <SelectField
                      label="Submodel"
                      options={opts.submodel}
                      data={(this.props.info.submodel !== undefined
	                      && this.props.info.submodel !== 'default') ? this.props.info.submodel : 'default'}
                      isManual={quoteWidgets.isManualBuildVehicle }
                      value={quoteWidgets.vehicle !== null && quoteWidgets.vehicle.submodel !== undefined ? quoteWidgets.vehicle.submodel : ''}
                      onChange={(evt, val) => this.handleFieldChange(ENUM_FIELDS.SUBMODEL, val)}
                    />
									</div>
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <div className="input-group mb-3 offset-sm-1">
              <InputField
                type="text"
                name="discount-code"
                label="Discount Code(optional):"
                placeholder=""
                onChange={(evt, val) => this.handleFieldChange(INPUT_FIELDS.DISCOUNT_CODE, val)}
              />
							<div className="input-group-append">
								<button className="btn btn-outline-secondary btn-check" type="button" onClick={this.check}>CHECK</button>
							</div>
            </div>
          </div>
          <div className="row">
            <div className="form-group text-center col-xm-12 col-sm-5 offset-sm-1">
              <Button block name="login" text="BACK" onClick={this.processContactInfo}/>
            </div>
            <div className="form-group text-center col-xm-12 col-sm-5">
              <Button
                primary
                block
                disabled={((quoteWidgets.isManualBuildVehicle !== true && quoteWidgets.vehicle !== null)
                  || (
                    (quoteWidgets.isManualBuildVehicle !== false)
                    && (this.props.info.year !== undefined && this.props.info.year !== 'default')
                    && (this.props.info.make !== undefined && this.props.info.make !== 'default')
                    && (this.props.info.model !== undefined && this.props.info.model !== 'default')
                    && (this.props.info.style !== undefined && this.props.info.style !== 'default')
                  )
                ) ? false : true}
                name="login"
                text="BUILD QUOTE"
                onClick={this.processQuotation}/>
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

export default enhance(connect(mapStateToProps, mapDispatchToProps)(VehicleInformationFrom));
