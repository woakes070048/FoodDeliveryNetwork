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
  }

  onSignInClicked(emailAddress, password) {
    this.props.firebaseActions.signInWithEmailAndPassword(emailAddress, password);
  }

  validateState(emailAddress, password) {
    return {
      emailAddressValidationResult: emailAddress ? null : 'error',
      emailAddressValidationMessage: emailAddress ? null : 'Email address is required.',
      passwordValidationResult: password ? null : 'error',
      passwordValidationMessage: password ? null : 'Password is required.',
    };
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
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    firebaseActions: bindActionCreators(firebaseActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailPasswordContainer);
