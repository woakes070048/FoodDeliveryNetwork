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
import * as firebaseActions from '../../firebase/actions';
import * as loadingActions from '../../loading/actions';
import * as notificationActions from '../../notification/actions';
import PublicPresentational from './public-presentational';

class PublicContainer extends Component {
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

    validationMessages = PublicContainer.checkIfEmailAddressProvided(emailAddress, validationMessages);
    validationMessages = PublicContainer.checkIfEmailAddressFromattedCorrectly(emailAddress, validationMessages);

    return Object.assign(validationMessages, {
      emailAddressValidationResult: validationMessages.emailAddressValidationMessage ? 'error' : null,
    });
  }

  constructor(props) {
    super(props);

    this.onUpdateClicked = this.onUpdateClicked.bind(this);
    this.handleFetchUserOperation = this.handleFetchUserOperation.bind(this);
    this.handleFetchUserOperation = this.handleFetchUserOperation.bind(this);
    this.fetchUser = this.fetchUser.bind(this);

    this.state = {
      lastUpdateOperationId: '',
      lastFetchUserOperationId: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    this.handleUpdateOperation(nextProps);
    this.handleFetchUserOperation(nextProps);
  }

  onUpdateClicked(displayName, emailAddress) {
    this.setState(Object.assign(this.state, {
      lastUpdateOperationId: this.props.firebaseActions.updateUserPublicProfile(displayName, emailAddress)
        .operationId,
    }));

    this.props.loadingActions.startTransparent();
  }

  handleUpdateOperation(nextProps) {
    if (this.state.lastUpdateOperationId) {
      const lastOperation =
        nextProps.operations.find(operation => operation.operationId === this.state.lastUpdateOperationId);

      if (lastOperation) {
        if (lastOperation.failed) {
          this.props.notificationActions.addError(lastOperation.errorMessage);
        } else {
          this.props.notificationActions.addSuccess('Public profile successfully updated.');
          this.fetchUser();
        }

        this.props.firebaseActions.acknowledgeOperation(lastOperation.operationId);
        this.props.loadingActions.stop();
      }
    }
  }

  handleFetchUserOperation(nextProps) {
    if (this.state.lastFetchUserOperationId) {
      const lastOperation =
        nextProps.operations.find(operation => operation.operationId === this.state.lastFetchUserOperationId);

      if (lastOperation) {
        if (lastOperation.failed) {
          this.props.notificationActions.addError(lastOperation.errorMessage);
        }

        this.props.firebaseActions.acknowledgeOperation(lastOperation.operationId);
        this.props.loadingActions.stop();
      }
    }
  }

  fetchUser() {
    this.setState(Object.assign(this.state, {
      lastFetchUserOperationId: this.props.firebaseActions.fetchUser()
        .operationId,
    }));

    this.props.loadingActions.startTransparent();
  }

  render() {
    return (
      <PublicPresentational
        onUpdateClicked={(displayName, emailAddress) =>
            this.onUpdateClicked(displayName, emailAddress)}
        validateState={emailAddress =>
            PublicContainer.validateState(emailAddress)}
        initialDisplayName={this.props.displayName}
        initialEmailAddress={this.props.emailAddress}
      />
    );
  }
}

PublicContainer.propTypes = {
  firebaseActions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  loadingActions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  notificationActions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  displayName: PropTypes.string,
  emailAddress: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    operations: state.firebase.operations,
    displayName: state.firebase.userInfo.displayName || '',
    emailAddress: state.firebase.userInfo.emailAddress,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    firebaseActions: bindActionCreators(firebaseActions, dispatch),
    loadingActions: bindActionCreators(loadingActions, dispatch),
    notificationActions: bindActionCreators(notificationActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicContainer);
