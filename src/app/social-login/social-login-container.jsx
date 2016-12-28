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
import SocialLoginPresentational from './social-login-presentational';
import * as firebaseActions from '../firebase/firebase-actions';

class SocialLoginContainer extends Component {
  constructor(props) {
    super(props);

    this.loginWithProvider = this.loginWithProvider.bind(this);
  }

  loginWithProvider(provider) {
    this.props.firebaseActions.loginWithProvider(provider);
  }

  render() {
    return (
      <SocialLoginPresentational
        onFacebookButtonClicked={() => this.loginWithProvider('facebook')}
        onTwitterButtonClicked={() => this.loginWithProvider('twitter')}
        onGoogleButtonClicked={() => this.loginWithProvider('google')}
        onGithubButtonClicked={() => this.loginWithProvider('github')}
      />
    );
  }
}

SocialLoginContainer.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(SocialLoginContainer);
