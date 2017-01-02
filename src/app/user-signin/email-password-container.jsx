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
import EmailPasswordPresentational from './email-password-presentational';

class EmailPasswordContainer extends Component {
  constructor(props) {
    super(props);

    this.validateState = this.validateState.bind(this);
    this.onSignInClicked = this.onSignInClicked.bind(this);
    this.checkIfEmailAddressProvided = this.checkIfEmailAddressProvided.bind(this);
    this.checkIfPasswordProvided = this.checkIfPasswordProvided.bind(this);

    this.state = {
      lastOperationId: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.lastOperationId) {
      const lastOperation =
        nextProps.operations.find(operation => operation.operationId === this.state.lastOperationId);

      if (lastOperation) {
        this.props.firebaseActions.acknowledgeOperaation(lastOperation.operationId);
      }
    }
  }

  onSignInClicked(emailAddress, password) {
    this.setState({
      lastOperationId: this.props.firebaseActions.signInWithEmailAndPassword(emailAddress, password)
        .operationId,
    });
  }

  checkIfEmailAddressProvided(emailAddress, validationMessages) {
    if (validationMessages.emailAddressValidationMessage) {
      return validationMessages;
    }

    return emailAddress ? validationMessages : Object.assign(validationMessages, {
      emailAddressValidationMessage: 'Email address is required.',
    });
  }

  checkIfPasswordProvided(password, validationMessages) {
    if (validationMessages.passwordValidationMessage) {
      return validationMessages;
    }

    return password ? validationMessages : Object.assign(validationMessages, {
      passwordValidationMessage: 'Password is required.',
    });
  }

  validateState(emailAddress, password) {
    let validationMessages = {
      emailAddressValidationMessage: null,
      passwordValidationMessage: null,
    };

    validationMessages = this.checkIfEmailAddressProvided(emailAddress, validationMessages);
    validationMessages = this.checkIfPasswordProvided(password, validationMessages);

    return Object.assign(validationMessages, {
      emailAddressValidationResult: validationMessages.emailAddressValidationMessage ? 'error' : null,
      passwordValidationResult: validationMessages.passwordValidationMessage ? 'error' : null,
    });
  }

  render() {
    return (
      <EmailPasswordPresentational
        onSignInClicked={(emailAddress, password) =>
              this.onSignInClicked(emailAddress, password)}
        validateState={(emailAddress, password) =>
              this.validateState(emailAddress, password)}
      />
    );
  }
}

EmailPasswordContainer.propTypes = {
  firebaseActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    operations: state.firebase.operations,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    firebaseActions: bindActionCreators(firebaseActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailPasswordContainer);
