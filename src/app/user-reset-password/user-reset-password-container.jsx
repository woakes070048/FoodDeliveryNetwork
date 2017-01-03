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
import * as notificationActions from '../notification/actions';
import UserResetPasswordPresentational from './user-reset-password-presentational';

class UserResetPasswordContainer extends Component {
  constructor(props) {
    super(props);

    this.validateState = this.validateState.bind(this);
    this.onResetPasswordClicked = this.onResetPasswordClicked.bind(this);
    this.checkIfEmailAddressProvided = this.checkIfEmailAddressProvided.bind(this);
    this.checkIfEmailAddressFromattedCorrectly = this.checkIfEmailAddressFromattedCorrectly.bind(this);

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

        this.props.firebaseActions.acknowledgeOperaation(lastOperation.operationId);
      }
    }
  }

  onResetPasswordClicked(emailAddress) {
  }

  checkIfEmailAddressProvided(emailAddress, validationMessages) {
    if (validationMessages.emailAddressValidationMessage) {
      return validationMessages;
    }

    return emailAddress ? validationMessages : Object.assign(validationMessages, {
      emailAddressValidationMessage: 'Email address is required.',
    });
  }

  checkIfEmailAddressFromattedCorrectly(emailAddress, validationMessages) {
    if (validationMessages.emailAddressValidationMessage) {
      return validationMessages;
    }

    return emailValidator.validate(emailAddress) ? validationMessages : Object.assign(validationMessages, {
      emailAddressValidationMessage: 'Email address is badly formatted.',
    });
  }

  validateState(emailAddress) {
    let validationMessages = {
      emailAddressValidationMessage: null,
    };

    validationMessages = this.checkIfEmailAddressProvided(emailAddress, validationMessages);
    validationMessages = this.checkIfEmailAddressFromattedCorrectly(emailAddress, validationMessages);

    return Object.assign(validationMessages, {
      emailAddressValidationResult: validationMessages.emailAddressValidationMessage ? 'error' : null,
    });
  }

  render() {
    return (
      <UserResetPasswordPresentational
        onResetPasswordClicked={emailAddress =>
              this.onResetPasswordClicked(emailAddress)}
        validateState={emailAddress =>
              this.validateState(emailAddress)}
      />
    );
  }
}

UserResetPasswordContainer.propTypes = {
  firebaseActions: PropTypes.object.isRequired,
  notificationActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    operations: state.firebase.operations,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    firebaseActions: bindActionCreators(firebaseActions, dispatch),
    notificationActions: bindActionCreators(notificationActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserResetPasswordContainer);
