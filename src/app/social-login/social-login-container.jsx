import React, {
  Component,
} from 'react';
import SocialLoginPresentation from './social-login-presentation';

class SocialLoginContainer extends Component {
  constructor(props) {
    super(props);
    this.loginWithFacebook = this.loginWithFacebook.bind(this);
    this.loginWithTwitter = this.loginWithTwitter.bind(this);
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    this.loginWithGithub = this.loginWithGithub.bind(this);
  }

  loginWithFacebook() {}

  loginWithTwitter() {}

  loginWithGoogle() {}

  loginWithGithub() {}

  render() {
    return (
        <SocialLoginPresentation
            onFacebookButtonClicked={() => this.loginWithFacebook()}
            onTwitterButtonClicked={() => this.loginWithTwitter()}
            onGoogleButtonClicked={() => this.loginWithGoogle()}
            onGithubButtonClicked={() => this.loginWithGithub()}
        />
    );
  }
}

export default SocialLoginContainer;
