import React, {
  PropTypes,
} from 'react';
import {
  Col,
  Grid,
  Row,
} from 'react-bootstrap';
import 'bootstrap-social/bootstrap-social.css';

const SocialLoginPresentational = ({
    onFacebookButtonClicked,
    onTwitterButtonClicked,
    onGoogleButtonClicked,
    onGithubButtonClicked,
  }) =>
    <Grid>
      <Row>
        <Col
          xsOffset={1}
          xs={8}
          smOffset={1}
          sm={4}
          mdOffset={0}
          md={3}
          lgOffset={0}
          lg={3}
        >
          <a
            className="btn btn-block btn-social btn-facebook social-login-button"
            onClick={() => onFacebookButtonClicked()}
          >
            <span className="fa fa-facebook" />
            Sign in with Facebook
          </a>
        </Col>
      </Row>
      <Row>
        <Col
          xsOffset={1}
          xs={8}
          smOffset={1}
          sm={4}
          mdOffset={0}
          md={3}
          lgOffset={0}
          lg={3}
        >
          <a
            className="btn btn-block btn-social btn-twitter social-login-button"
            onClick={() => onTwitterButtonClicked()}
          >
            <span className="fa fa-twitter" />
            Sign in with Twitter
          </a>
        </Col>
      </Row>
      <Row>
        <Col
          xsOffset={1}
          xs={8}
          smOffset={1}
          sm={4}
          mdOffset={0}
          md={3}
          lgOffset={0}
          lg={3}
        >
          <a
            className="btn btn-block btn-social btn-google social-login-button"
            onClick={() => onGoogleButtonClicked()}
          >
            <span className="fa fa-google" />
            Sign in with Google
          </a>
        </Col>
      </Row>
      <Row>
        <Col
          xsOffset={1}
          xs={8}
          smOffset={1}
          sm={4}
          mdOffset={0}
          md={3}
          lgOffset={0}
          lg={3}
        >
          <a
            className="btn btn-block btn-social btn-github social-login-button"
            onClick={() => onGithubButtonClicked()}
          >
            <span className="fa fa-github" />
            Sign in with Github
          </a>
        </Col>
      </Row>
    </Grid>;

SocialLoginPresentational.propTypes = {
  onFacebookButtonClicked: PropTypes.func.isRequired,
  onTwitterButtonClicked: PropTypes.func.isRequired,
  onGoogleButtonClicked: PropTypes.func.isRequired,
  onGithubButtonClicked: PropTypes.func.isRequired,
};

export default SocialLoginPresentational;
