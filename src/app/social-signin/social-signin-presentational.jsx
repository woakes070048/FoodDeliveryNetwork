import React, {
  PropTypes,
} from 'react';
import 'bootstrap-social/bootstrap-social.css';
import globalConfig from '../global-config';

function getFacebookSignInControl(callback) {
  return globalConfig.supportedSocialNetworks.facebook ? (
    <button
      className="btn btn-block btn-social btn-facebook"
      onClick={callback}
    >
      <span className="fa fa-facebook" />
      Sign in with Facebook
    </button>
  ) : (<span />);
}

function getTwitterSignInControl(callback) {
  return globalConfig.supportedSocialNetworks.twitter ? (
    <button
      className="btn btn-block btn-social btn-twitter"
      onClick={callback}
    >
      <span className="fa fa-twitter" />
      Sign in with Twitter
    </button>
  ) : (<span />);
}

function getGoogleSignInControl(callback) {
  return globalConfig.supportedSocialNetworks.google ? (
    <button
      className="btn btn-block btn-social btn-google"
      onClick={callback}
    >
      <span className="fa fa-google" />
      Sign in with Google
    </button>
  ) : (<span />);
}

function getGithubSignInControl(callback) {
  return globalConfig.supportedSocialNetworks.github ? (
    <button
      className="btn btn-block btn-social btn-github"
      onClick={callback}
    >
      <span className="fa fa-github" />
      Sign in with Github
    </button>
  ) : (<span />);
}

const SocialSignInPresentational = ({
    onFacebookButtonClicked,
    onTwitterButtonClicked,
    onGoogleButtonClicked,
    onGithubButtonClicked,
  }) =>
    <div>
      {getFacebookSignInControl(onFacebookButtonClicked)}
      {getTwitterSignInControl(onTwitterButtonClicked)}
      {getGoogleSignInControl(onGoogleButtonClicked)}
      {getGithubSignInControl(onGithubButtonClicked)}
    </div>;

SocialSignInPresentational.propTypes = {
  onFacebookButtonClicked: PropTypes.func.isRequired,
  onTwitterButtonClicked: PropTypes.func.isRequired,
  onGoogleButtonClicked: PropTypes.func.isRequired,
  onGithubButtonClicked: PropTypes.func.isRequired,
};

export default SocialSignInPresentational;
