import React, {
  Component,
} from 'react';
import UserRegisterPresentation from './user-register-presentation';

class UserRegisterContainer extends Component {
  constructor(props) {
    super(props);
    this.registerWithFacebook = this.registerWithFacebook.bind(this);
    this.registerWithTwitter = this.registerWithTwitter.bind(this);
    this.registerWithGoogle = this.registerWithGoogle.bind(this);
    this.registerWithGithub = this.registerWithGithub.bind(this);
  }

  registerWithFacebook() {}

  registerWithTwitter() {}

  registerWithGoogle() {}

  registerWithGithub() {}

  render() {
    return (
        <UserRegisterPresentation
            onFacebookButtonClicked={() => this.registerWithFacebook()}
            onTwitterButtonClicked={() => this.registerWithTwitter()}
            onGoogleButtonClicked={() => this.registerWithGoogle()}
            onGithubButtonClicked={() => this.registerWithGithub()}
        />
    );
  }
}

export default UserRegisterContainer;
