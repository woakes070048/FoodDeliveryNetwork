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
import {
  browserHistory,
} from 'react-router';
import * as firebaseActions from '../firebase/actions';
import * as notificationActions from '../notification/actions';
import UserResetPasswordPresentational from './user-reset-password-presentational';

class UserResetPasswordContainer extends Component {
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

  static validateState(emailAddress) {
    let validationMessages = {
      emailAddressValidationMessage: null,
    };

    validationMessages = UserResetPasswordContainer.checkIfEmailAddressProvided(emailAddress, validationMessages);
    validationMessages = UserResetPasswordContainer.checkIfEmailAddressFromattedCorrectly(emailAddress,
      validationMessages);

    return Object.assign(validationMessages, {
      emailAddressValidationResult: validationMessages.emailAddressValidationMessage ? 'error' : null,
    });
  }

  constructor(props) {
    super(props);

    this.onResetPasswordClicked = this.onResetPasswordClicked.bind(this);

    this.state = {
      lastOperationId: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userExists) {
      browserHistory.push('/');

      return;
    }

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
    this.setState({
      lastOperationId: this.props.firebaseActions.resetPassword(emailAddress)
        .operationId,
    });
  }

  render() {
    return (
      <UserResetPasswordPresentational
        onResetPasswordClicked={emailAddress =>
              this.onResetPasswordClicked(emailAddress)}
        validateState={emailAddress =>
              UserResetPasswordContainer.validateState(emailAddress)}
      />
    );
  }
}

UserResetPasswordContainer.propTypes = {
  firebaseActions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  notificationActions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

function mapStateToProps(state) {
  return {
    operations: state.firebase.operations,
    userExists: state.firebase.userInfo.userExists,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    firebaseActions: bindActionCreators(firebaseActions, dispatch),
    notificationActions: bindActionCreators(notificationActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserResetPasswordContainer);
