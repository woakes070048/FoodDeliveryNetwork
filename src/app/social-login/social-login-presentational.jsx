import React, {
  PropTypes,
} from 'react';
import {
  Col,
  Grid,
  Row,
} from 'react-bootstrap';
import '../../../node_modules/bootstrap-social/bootstrap-social.css';

const SocialLoginPresentational = ({
    onFacebookButtonClicked,
    onTwitterButtonClicked,
    onGoogleButtonClicked,
    onGithubButtonClicked,
  }) =>
    <Grid>
      <Row>
        <Col
          xs={12}
          sm={10}
          smOffset={1}
          md={8}
          mdOffset={2}
          lg={6}
          lgOffset={3}
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
          xs={12}
          sm={10}
          smOffset={1}
          md={8}
          mdOffset={2}
          lg={6}
          lgOffset={3}
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
          xs={12}
          sm={10}
          smOffset={1}
          md={8}
          mdOffset={2}
          lg={6}
          lgOffset={3}
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
          xs={12}
          sm={10}
          smOffset={1}
          md={8}
          mdOffset={2}
          lg={6}
          lgOffset={3}
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
