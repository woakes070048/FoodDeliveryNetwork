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
import * as userAccessActions from '../user-access/actions';
import * as loadingActions from '../loading/actions';
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

  static onReturnToSignInClicked() {
    browserHistory.push('/signin');
  }

  constructor(props) {
    super(props);

    this.onResetPasswordClicked = this.onResetPasswordClicked.bind(this);

    this.state = {
      lastOperationId: '',
      resetPasswordEmailSent: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.lastOperationId) {
      const lastOperation =
        nextProps.operations.find(operation => operation.operationId === this.state.lastOperationId);

      if (lastOperation) {
        if (lastOperation.failed) {
          this.props.notificationActions.addError(lastOperation.errorMessage);
        } else {
          this.setState(Object.assign(this.state, {
            resetPasswordEmailSent: true,
          }));
        }

        this.props.userAccessActions.acknowledgeOperation(lastOperation.operationId);
        this.props.loadingActions.stop();
      }
    }
  }

  onResetPasswordClicked(emailAddress) {
    this.setState(Object.assign(this.state, {
      lastOperationId: this.props.userAccessActions.resetPassword(emailAddress)
        .operationId,
    }));

    this.props.loadingActions.startTransparent();
  }

  render() {
    return (
      <UserResetPasswordPresentational
        onResetPasswordClicked={this.onResetPasswordClicked}
        onReturnToSignInClicked={UserResetPasswordContainer.onReturnToSignInClicked}
        validateState={UserResetPasswordContainer.validateState}
        resetPasswordEmailSent={this.state.resetPasswordEmailSent}
        initialEmailAddress={this.props.emailAddress}
      />
    );
  }
}

UserResetPasswordContainer.propTypes = {
  userAccessActions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  loadingActions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  notificationActions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  emailAddress: PropTypes.string,
};

UserResetPasswordContainer.defaultProps = {
  emailAddress: '',
};

function mapStateToProps(state) {
  return {
    operations: state.userAccess.operations,
    emailAddress: state.userAccess.userInfo.userExists ? state.userAccess.userInfo.emailAddress : '',
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userAccessActions: bindActionCreators(userAccessActions, dispatch),
    loadingActions: bindActionCreators(loadingActions, dispatch),
    notificationActions: bindActionCreators(notificationActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserResetPasswordContainer);
