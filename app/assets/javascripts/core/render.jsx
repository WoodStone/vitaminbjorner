import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import {AutoComplete} from "material-ui";

/**
 * Contains functions for rendering and
 * form-validation to use in redux-form components.
 * @module core/render
 *
 * @example
 * import React from 'react';
 * import { Field, reduxForm } from 'redux-form';
 * import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
 * import {
 *      renderTextField,
 *      renderPassField,
 *      renderSelectField,
 *      renderCheckBox,
 *      renderMultiTextField,
 *      warnNumberField
 * } from 'render.jsx';
 *
 * const validate = values => {
 *      const errors = {};
 *      const requiredField = [ 'textField', 'numberField', 'passField', 'multiTextField', 'selectField' ];
 *      requiredField.forEach(field => {
 *          if (!values[ field ]) {
 *              errors[ field ] = 'Må fylles';
 *          }
 *          if (field === 'numberField' && !/^\d+$/.test(values[field])) {
 *              errors[ field ] = "Må være et tall."
 *          }
 *      });
 *      return errors;
 * }
 *
 * class Form extends React.Component {
 *      render() {
 *          const { handleSubmit, pristine, reset, submitting } = this.props;
 *          return(
 *              <MuiThemeProvider>
 *                  <form onSubmit={handleSubmit}>
 *                      <Field
 *                          name="textField"
 *                          label="TextField"
 *                          component={renderTextField}
 *                      />
 *                      <Field
 *                          name="numberField"
 *                          label="NumberField"
 *                          warn={warnNumberField}
 *                          component={renderTextField}
 *                      />
 *                      <Field
 *                          name="passField"
 *                          label="PassField"
 *                          component={renderPassField}
 *                      />
 *                      <Field
 *                          name="multiTextField"
 *                          label="MultiTextField"
 *                          component={renderMultiTextField}
 *                      />
 *                      <Field
 *                          name="selectField"
 *                          label="SelectField"
 *                          component={renderSelectField}
 *                      >
 *                          <MenuItem key={1} value="Value1" primaryText={Value 1}/>
 *                          <MenuItem key={2} value="Value2" primaryText={Value 2}/>
 *                      </Field>
 *                      <button type="submit" disabled={pristine || submitting}>Submit</button>
 *                      <button type="button" disabled={pristine || submitting} onClick={reset}>Clear</button>
 *                  </form>
 *              </MuiThemeProvider>
 *          );
 *      }
 * }
 *
 * export default reduxForm({
 *      form: 'Form',
 *      validate,
 * })(Form);
 *
 */

/**
 * Sends a warning to the field if the value is not a number.
 * @function
 * @param {string} value
 * @returns {string}
 */
export const warnNumberField = value => {
    if (value && !/^\d+$/.test(value)) {
        return "Må være et tall."
    }
    return null;
};

/**
 * Normalizes TextField with only numeric input.
 * @function
 * @param {string} value
 * @returns {string} onlyNumbers
 */
export const normalizeNumberField = value => {
    if (!value) return value;
    const onlyNumbers = value.replace(/[^\d]/g, '');
    return onlyNumbers;
};

/**
 * Validates {@link ProjectForm}.
 * @see {@link ProjectForm}
 * @function
 * @param {Project} values
 * @returns {{}}
 */
export const validateProjectForm = (values, props) => {
    /** @type Project */
    const errors = {};
    const requiredFields = [ 'name', 'securityLevel', 'transactionVolume', 'userChannel', 'deploymentStyle'];
    requiredFields.forEach(field => {
        if (!values[ field ]) {
            errors[ field ] = 'Må fylles'
        }
        if (field === 'securityLevel' && !/^\d+$/.test(values[field])) {
            errors[ field ] = "Må være et tall."
        }
    });
    if (props.users.filter(user => user.USERNAME === values.managerID).length === 0) {
        errors.managerID = 'Bruker eksisterer ikke'
    }
    return errors
};

/**
 * Validates {@link CreateClassForm} and {@link EditClassForm}.
 * @see {@link CreateClassForm}
 * @function
 * @param {UserClass} values
 * @returns {{}}
 */
export const validateClassForm = values => {
    const errors = {};
    const requiredFields = [ 'NAME', 'description' ];
    requiredFields.forEach(field => {
        if (!values[ field ]) {
            errors[ field ] = 'Må fylles'
        }
    });
    return errors
};

/**
 * Validates {@link ClassInForm} when delete is pressed.
 * @function
 * @param {UserClass} values
 * @param {string} values.replacement
 * @returns {{}}
 */
export const validateDeleteClassForm = values => {
    const errors = {};
    const requiredFields = [ 'NAME', 'description', 'replacement' ];
    requiredFields.forEach(field => {
        if (!values[ field ]) {
            errors[ field ] = 'Må fylles'
        }
    });
    return errors
};

/**
 * Validates {@link CreateUserForm}.
 * @function
 * @param {User} values
 * @param {string} values.pass
 * @returns {{}}
 */
export const validateUserForm = values => {
    const errors = {};
    const requiredFields = [ 'USERNAME', 'firstName', 'lastName', 'email', 'ucName', 'pass' ];
    requiredFields.forEach(field => {
        if (!values[ field ]) {
            if (field !== 'pass') {
                errors[ field ] = 'Må fylles'
            } else {
                if (!values.oldUSERNAME) {
                    errors[ field ] = 'Må fylles'
                }
            }
        }
    });
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Ugyldig epost'
    }
    return errors
};

export const validateRegisterForm = values => {
    const errors = {};
    if (values.pass !== values.pass_rep) {
        errors.pass_rep = 'Passordene er ulike'
    }
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Ugyldig epost'
    }
    return errors
};

/**
 * Maps UserClasses to MenuItem components.
 * @function
 * @param {Array.<UserClass>} classes
 */
export const menuItemsClasses = (classes) => {
    return classes.map((item, index) => {
        return <MenuItem key={index} value={item.NAME} primaryText={item.NAME}/>
    })
};

export const menuItemsUsers = (users) => {
    return users.map((item, index) => {
        return <MenuItem key={index} value={item.USERNAME} primaryText={item.USERNAME}/>
    })
};

export const menuItemsCategories = (classes) => {
    return classes.map((item, index) => {
        return <MenuItem key={index} value={item.scID} primaryText={item.NAME}/>
    })
};

/**
 * Renders a SelectField from Material-UI.
 * Redux-form injects parameters.
 * @param {Function} onChange
 * @param {String} value
 * @param {Function} onBlur
 * @param {Object} inputProps
 * @param {Function} onChangeField
 * @param {Object} props
 */
export const renderSelectField = ({input: {onChange, value, onBlur, ...inputProps}, onChange: onChangeField, ...props}) => (
    <SelectField
        {...error(props)}
        {...inputProps}
        onChange={(event, index, value) => {
            onChange(value);
            if (onChangeField) {
                onChangeField(value);
            }
        }}
        onBlur={() => onBlur(value)}
        value={value}
    />
);

/**
 * Renders a TextField from Material-UI.
 * Redux-form injects parameters.
 * @function
 * @param {Array} input
 * @param {string} label
 * @param {boolean} touched
 * @param {string} error
 * @param {string} warning
 * @param {Array} custom
 */
export const renderTextField = ({ input, label, meta: { touched, error, warning }, ...custom }) => (
    <TextField hintText={label}
               floatingLabelText={label}
               errorText={(touched && error) || warning}
               {...input}
               {...custom}
    />
);

/**
 * Renders a TextField from Material-UI with multiLine={true}.
 * Redux-form injects parameters.
 * @function
 * @param {Array} input
 * @param {string} label
 * @param {boolean} touched
 * @param {string} error
 * @param {Array} custom
 */
export const renderMultiTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField multiLine={true}
               style={{width: '256px'}}
               rows={1}
               rowsMax={4}
               floatingLabelText={label}
               errorText={touched && error}
               {...input}
               {...custom}
    />
);

/**
 * Renders a AutoComplete component from Material-ui.
 * @param {Function} onChange
 * @param {String} value
 * @param {Array} data
 * @param {Object} dataConfig
 * @param {Function} onNewRequest
 * @param {Object} props
 */
export const renderAutoComplete = ({ input: { onChange, value }, data, dataConfig, onNewRequest, ...props}) => (
    <AutoComplete
        {...error(props)}
        dataSource={data}
        dataSourceConfig={dataConfig}
        searchText={ dataConfig && data ? (data.find(item => item[dataConfig.value] === value) || {})[dataConfig.text] : value}
        onNewRequest={value => {
            onChange(typeof  value === 'object' && dataConfig ? value[dataConfig.value] : value);
            if (onNewRequest) {
                onNewRequest(value);
            }
        }}
        onUpdateInput={value => {
            if (!dataConfig) {
                onChange(value);
            }
        }}
        filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
        listStyle={{maxHeight: '256px', overflow: 'auto'}}
    />
);

/**
 * Renders a TextField from Material-UI with type="password".
 * Redux-form injects parameters.
 * @function
 * @param {Array} input
 * @param {string} label
 * @param {boolean} touched
 * @param {string} error
 * @param {Array} custom
 */
export const renderPassField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField hintText={label}
               floatingLabelText={label}
               errorText={touched && error}
               type="password"
               {...input}
               {...custom}
    />
);

/**
 * Renders a CheckBox from Material-UI.
 * Redux-form injects arguments.
 * @function
 * @param {Array} input
 * @param {string} label
 * @param {boolean} touched
 * @param {string} error
 * @param {Array} custom
 */
export const renderCheckbox = ({ input, label, meta: { touched, error }, ...custom }) => (
    <Checkbox label={label}
              checked={input.value ? true : false}
              onCheck={input.onChange}
              {...custom}
    />
);

const error = ({meta: {touched, error, warning} = {}, input, ...props}) => {
    return (touched && (error || warning)) ? { ...props, ...input, ['errorText']: error || warning} : {...input, ...props};
};
