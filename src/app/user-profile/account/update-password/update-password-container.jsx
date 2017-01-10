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
import * as userAccessActions from '../../../user-access/actions';
import * as loadingActions from '../../../loading/actions';
import * as notificationActions from '../../../notification/actions';
import UpdatePasswordPresentational from './update-password-presentational';

class PublicPasswordContainer extends Component {
  static checkIfNewPasswordProvided(newPassword, validationMessages) {
    if (validationMessages.newPasswordValidationMessage) {
      return validationMessages;
    }

    return newPassword ? validationMessages : Object.assign(validationMessages, {
      newPasswordValidationMessage: 'New password is required.',
    });
  }

  static checkIfNewPasswordAndReEnteredPasswordMatch(newPassword, reEnteredPassword, validationMessages) {
    if (validationMessages.newPasswordValidationMessage || validationMessages.reEnteredPasswordValidationMessage) {
      return validationMessages;
    }

    return newPassword === reEnteredPassword ? validationMessages : Object.assign(validationMessages, {
      reEnteredPasswordValidationMessage: 'Should match the new password',
    });
  }

  static validateState(newPassword, reEnteredPassword) {
    let validationMessages = {
      newPasswordValidationMessage: null,
      reEnteredPasswordValidationMessage: null,
    };

    validationMessages = PublicPasswordContainer.checkIfNewPasswordProvided(newPassword, validationMessages);
    validationMessages = PublicPasswordContainer.checkIfNewPasswordAndReEnteredPasswordMatch(
          newPassword,
          reEnteredPassword,
          validationMessages);

    return Object.assign(validationMessages, {
      newPasswordValidationResult: validationMessages.newPasswordValidationMessage ? 'error' : null,
      reEnteredPasswordValidationResult: validationMessages.reEnteredPasswordValidationMessage ? 'error' : null,
    });
  }

  constructor(props) {
    super(props);

    this.onUpdatePasswordClicked = this.onUpdatePasswordClicked.bind(this);

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
        } else {
          this.props.notificationActions.addSuccess('Password successfully updated.');
        }

        this.props.userAccessActions.acknowledgeOperation(lastOperation.operationId);
        this.props.loadingActions.stop();
      }
    }
  }

  onUpdatePasswordClicked(newPassword) {
    this.setState({
      lastOperationId: this.props.userAccessActions.updatePassword(newPassword)
        .operationId,
    });

    this.props.loadingActions.startTransparent();
  }

  render() {
    return (
      <UpdatePasswordPresentational
        onUpdatePasswordClicked={this.onUpdatePasswordClicked}
        validateState={PublicPasswordContainer.validateState}
      />
    );
  }
}

PublicPasswordContainer.propTypes = {
  userAccessActions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  loadingActions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  notificationActions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

function mapStateToProps(state) {
  return {
    operations: state.userAccess.operations,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userAccessActions: bindActionCreators(userAccessActions, dispatch),
    loadingActions: bindActionCreators(loadingActions, dispatch),
    notificationActions: bindActionCreators(notificationActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicPasswordContainer);
