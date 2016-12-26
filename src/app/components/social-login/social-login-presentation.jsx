import React, {
  PropTypes,
} from 'react';
import {
    Col,
} from 'react-bootstrap';

import 'bootstrap-social';

const SocialLoginPresentation = ({
    onFacebookButtonClicked,
    onTwitterButtonClicked,
    onGoogleButtonClicked,
    onGithubButtonClicked,
}) =>
    <Col
        xs={12}
        smOffset={1}
        sm={10}
        mdOffset={2}
        md={8}
        lgOffset={4}
        lg={4}
    >
        <div className="social-buttons">
            <a
                className="btn btn-block btn-social btn-facebook"
                onClick={() => onFacebookButtonClicked()}
            >
                <span className="fa fa-facebook" />
                Sign in with Facebook
            </a>

            <a
                className="btn btn-block btn-social btn-twitter"
                onClick={() => onTwitterButtonClicked()}
            >
                <span className="fa fa-twitter" />
                Sign in with Twitter
            </a>

            <a
                className="btn btn-block btn-social btn-google"
                onClick={() => onGoogleButtonClicked()}
            >
                <span className="fa fa-google" />
                Sign in with Google
            </a>

            <a
                className="btn btn-block btn-social btn-github"
                onClick={() => onGithubButtonClicked()}
            >
                <span className="fa fa-github" />
                Sign in with Github
            </a>
        </div>
    </Col>;

SocialLoginPresentation.propTypes = {
  onFacebookButtonClicked: PropTypes.func.isRequired,
  onTwitterButtonClicked: PropTypes.func.isRequired,
  onGoogleButtonClicked: PropTypes.func.isRequired,
  onGithubButtonClicked: PropTypes.func.isRequired,
};

export default SocialLoginPresentation;
