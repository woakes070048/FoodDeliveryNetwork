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
    this.onSignUpClicked = this.onSignUpClicked.bind(this);

    this.state = {
      lastOperationId: '',
    };
  }

  onSignUpClicked(emailAddress, password) {
    this.setState({
      operationId: this.props.firebaseActions.signUpWithEmailAndPassword(emailAddress, password)
        .operationId,
    });
  }

  validateState(emailAddress, password, reEnteredPassword) {
    return {
      emailAddressValidationResult: emailAddress ? null : 'error',
      emailAddressValidationMessage: emailAddress ? null : 'Email address is required.',
      passwordValidationResult: password ? null : 'error',
      passwordValidationMessage: password ? null : 'Password is required.',
      reEnteredPasswordValidationResult: reEnteredPassword === password ? null : 'error',
      reEnteredPasswordValidationMessage: reEnteredPassword === password ? null : 'Should match the above Password.',
    };
  }

  render() {
    return (
      <EmailPasswordPresentational
        onSignUpClicked={(emailAddress, password) =>
              this.onSignUpClicked(emailAddress, password)}
        validateState={(emailAddress, password, reEnteredPassword) =>
              this.validateState(emailAddress, password, reEnteredPassword)}
      />
    );
  }
}

EmailPasswordContainer.propTypes = {
  firebaseActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    firebaseActions: bindActionCreators(firebaseActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailPasswordContainer);
