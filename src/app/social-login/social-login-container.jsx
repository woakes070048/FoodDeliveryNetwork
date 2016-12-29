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
import * as firebaseActions from '../firebase/actions';

class SocialLoginContainer extends Component {
  constructor(props) {
    super(props);

    this.loginWithProvider = this.loginWithProvider.bind(this);

    if (this.props.login && this.props.register) {
      throw new Error('register and login property both provided!!!');
    }

    if (!this.props.login && !this.props.register) {
      throw new Error('Neither register nor login property is provided!!!');
    }
  }

  registerWithProvider(provider) {
    this.props.firebaseActions.registerWithProvider(provider);
  }

  loginWithProvider(provider) {
    this.props.firebaseActions.loginWithProvider(provider);
  }

  render() {
    if (this.props.register) {
      return (
        <SocialLoginPresentational
          onFacebookButtonClicked={() => this.registerWithProvider('facebook')}
          onTwitterButtonClicked={() => this.registerWithProvider('twitter')}
          onGoogleButtonClicked={() => this.registerWithProvider('google')}
          onGithubButtonClicked={() => this.registerWithProvider('github')}
        />
      );
    } else {
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
}

SocialLoginContainer.propTypes = {
  firebaseActions: PropTypes.object.isRequired,
  login: PropTypes.bool,
  register: PropTypes.bool,
};

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    firebaseActions: bindActionCreators(firebaseActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  SocialLoginContainer);
