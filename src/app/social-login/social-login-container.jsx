import React, {
  Component,
} from 'react';
import SocialLoginPresentation from './social-login-presentation';

class SocialLoginContainer extends Component {
  constructor(props) {
    super(props);
    this.loginWithProvider = this.loginWithProvider.bind(this);
  }

  loginWithProvider(provider) {}

  render() {
    return (
      <SocialLoginPresentation
        onFacebookButtonClicked={() => this.loginWithProvider('facebook')}
        onTwitterButtonClicked={() => this.loginWithProvider('twitter')}
        onGoogleButtonClicked={() => this.loginWithProvider('google')}
        onGithubButtonClicked={() => this.loginWithProvider('github')}
      />
    );
  }
}

export default SocialLoginContainer;
