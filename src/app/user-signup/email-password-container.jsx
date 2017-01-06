import emailValidator from 'email-validator';
import React, {
  Component,
  PropTypes,
} from 'react';
import {
  bindActionCreators,
} from 'redux';
import {
  connect,
} from 'react-redux';
import * as firebaseActions from '../firebase/actions';
import * as loadingActions from '../loading/actions';
import * as notificationActions from '../notification/actions';
import EmailPasswordPresentational from './email-password-presentational';

class EmailPasswordContainer extends Component {
  static checkIfEmailAddressProvided(emailAddress, validationMessages) {
    if (validationMessages.emailAddressValidationMessage) {
      return validationMessages;
    }

    return emailAddress ? validationMessages : Object.assign(validationMessages, {
      emailAddressValidationMessage: 'Email address is required.',
    });
  }

  static checkIfEmailAddressFromattedCorrectly(emailAddress, validationMessages) {
    if (validationMessages.emailAddressValidationMessage) {
      return validationMessages;
    }

    return emailValidator.validate(emailAddress) ? validationMessages : Object.assign(validationMessages, {
      emailAddressValidationMessage: 'Email address is badly formatted.',
    });
  }

  static checkIfPasswordProvided(password, validationMessages) {
    if (validationMessages.passwordValidationMessage) {
      return validationMessages;
    }

    return password ? validationMessages : Object.assign(validationMessages, {
      passwordValidationMessage: 'Password is required.',
    });
  }

  static checkIfPasswordAndReEnteredPasswordMatch(password, reEnteredPassword, validationMessages) {
    if (validationMessages.passwordValidationMessage || validationMessages.reEnteredPasswordValidationMessage) {
      return validationMessages;
    }

    return password === reEnteredPassword ? validationMessages : Object.assign(validationMessages, {
      reEnteredPasswordValidationMessage: 'Should match the above Password',
    });
  }

  static validateState(emailAddress, password, reEnteredPassword) {
    let validationMessages = {
      emailAddressValidationMessage: null,
      passwordValidationMessage: null,
      reEnteredPasswordValidationMessage: null,
    };

    validationMessages = EmailPasswordContainer.checkIfEmailAddressProvided(emailAddress, validationMessages);
    validationMessages = EmailPasswordContainer.checkIfEmailAddressFromattedCorrectly(emailAddress,
      validationMessages);
    validationMessages = EmailPasswordContainer.checkIfPasswordProvided(password, validationMessages);
    validationMessages = EmailPasswordContainer.checkIfPasswordAndReEnteredPasswordMatch(password, reEnteredPassword,
      validationMessages);

    return Object.assign(validationMessages, {
      emailAddressValidationResult: validationMessages.emailAddressValidationMessage ? 'error' : null,
      passwordValidationResult: validationMessages.passwordValidationMessage ? 'error' : null,
      reEnteredPasswordValidationResult: validationMessages.reEnteredPasswordValidationMessage ? 'error' : null,
    });
  }

  constructor(props) {
    super(props);

    this.onSignUpClicked = this.onSignUpClicked.bind(this);

    this.state = {
      lastOperationId: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.lastOperationId) {
      const lastOperation =
        nextProps.operations.find(operation => operation.operationId === this.state.lastOperationId);

      if (lastOperation) {
        if (lastOperation.failed) {
          this.props.notificationActions.addError(lastOperation.errorMessage);
        }

        this.props.firebaseActions.acknowledgeOperation(lastOperation.operationId);
        this.props.loadingActions.stop();
      }
    }
  }

  onSignUpClicked(emailAddress, password) {
    this.setState({
      lastOperationId: this.props.firebaseActions.signUpWithEmailAndPassword(emailAddress, password)
        .operationId,
    });

    this.props.loadingActions.startTransparent();
  }

  render() {
    return (
      <EmailPasswordPresentational
        onSignUpClicked={(emailAddress, password) =>
              this.onSignUpClicked(emailAddress, password)}
        validateState={(emailAddress, password, reEnteredPassword) =>
              EmailPasswordContainer.validateState(emailAddress, password, reEnteredPassword)}
      />
    );
  }
}

EmailPasswordContainer.propTypes = {
  firebaseActions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  loadingActions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  notificationActions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

function mapStateToProps(state) {
  return {
    operations: state.firebase.operations,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    firebaseActions: bindActionCreators(firebaseActions, dispatch),
    loadingActions: bindActionCreators(loadingActions, dispatch),
    notificationActions: bindActionCreators(notificationActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailPasswordContainer);
