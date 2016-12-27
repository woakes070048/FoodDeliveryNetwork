import React, {
  Component,
} from 'react';
import SocialLoginPresentational from './social-login-presentational';

class SocialLoginContainer extends Component {
  constructor(props) {
    super(props);
    this.loginWithProvider = this.loginWithProvider.bind(this);
  }

  loginWithProvider(provider) {}

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

export default SocialLoginContainer;
