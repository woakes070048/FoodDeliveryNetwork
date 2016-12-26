import React, {
  PropTypes,
} from 'react';
import SocialLoginPresentation from '../social-login/social-login-presentation';

const UserRegisterPresentation = ({
    onFacebookButtonClicked,
    onTwitterButtonClicked,
    onGoogleButtonClicked,
    onGithubButtonClicked,
  }) =>
      <div className="col-md-4">
          <SocialLoginPresentation
              onFacebookButtonClicked={() => onFacebookButtonClicked()}
              onTwitterButtonClicked={() => onTwitterButtonClicked()}
              onGoogleButtonClicked={() => onGoogleButtonClicked()}
              onGithubButtonClicked={() => onGithubButtonClicked()} />
      </div>;

UserRegisterPresentation.propTypes = {
  onFacebookButtonClicked: PropTypes.func.isRequired,
  onTwitterButtonClicked: PropTypes.func.isRequired,
  onGoogleButtonClicked: PropTypes.func.isRequired,
  onGithubButtonClicked: PropTypes.func.isRequired,
};

export default UserRegisterPresentation;
