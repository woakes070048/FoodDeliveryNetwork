import React, {
  Component,
  PropTypes,
} from 'react';
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  Glyphicon,
  HelpBlock,
  InputGroup,
  Panel,
  Well,
} from 'react-bootstrap';

class UserResetPasswordPresentational extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailAddressValidationResult: null,
      emailAddressValidationMessage: '',
      emailAddress: this.props.initialEmailAddress,
      emailAddressChanged: false,
      resetPasswordClicked: false,
    };

    this.onEmailAddressChanged = this.onEmailAddressChanged.bind(this);
    this.validateState = this.validateState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onReturnToSignInClicked = this.onReturnToSignInClicked.bind(this);
    this.getResetPasswordUI = this.getResetPasswordUI.bind(this);
    this.getResetPasswordEmailSentUI = this.getResetPasswordEmailSentUI.bind(this);
  }

  onEmailAddressChanged(e) {
    this.setState(Object.assign(this.state, {
      emailAddress: e.target.value,
      emailAddressChanged: true,
    }));

    this.validateState();
  }

  onReturnToSignInClicked() {
    this.props.onReturnToSignInClicked();
  }

  getResetPasswordUI() {
    const emailAddressHelpBlock = this.state.emailAddressValidationResult ?
      <HelpBlock>{this.state.emailAddressValidationMessage}</HelpBlock> :
      <div />;

    return (
      <div>
        <Form onSubmit={this.handleSubmit} horizontal>
          <FormGroup validationState={this.state.emailAddressValidationResult}>
            <InputGroup>
              <InputGroup.Addon>
                <Glyphicon glyph="user" />
              </InputGroup.Addon>
              <FormControl
                type="email"
                placeholder="Email address"
                value={this.state.emailAddress}
                onChange={this.onEmailAddressChanged}
              />
            </InputGroup>
            <FormControl.Feedback />
            {emailAddressHelpBlock}
          </FormGroup>
          <FormGroup>
            <Button
              bsStyle="primary"
              block
              type="submit"
            >
            Send password reset email
          </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }

  getResetPasswordEmailSentUI() {
    const message = 'Check your email for a link to reset your password.' +
      'If it doesn\'t appear within a few minutes, check your spam folder.';

    return (
      <Panel header={<strong>Reset your password</strong>}>
        <Well>
          {message}
        </Well>
        <Button
          bsStyle="primary"
          block
          onClick={this.onReturnToSignInClicked}
        >
            Return to sign in
          </Button>
      </Panel>
    );
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState(Object.assign(this.state, {
      resetPasswordClicked: true,
    }));

    this.validateState();

    if (!this.state.emailAddressValidationResult && !this.state.passwordValidationResult) {
      this.props.onResetPasswordClicked(this.state.emailAddress, this.state.password);
    }
  }

  validateState() {
    const {
      emailAddressValidationResult,
      emailAddressValidationMessage,
    } = this.props.validateState(this.state.emailAddress);

    this.setState(Object.assign(this.state, {
      emailAddressValidationResult: this.state.resetPasswordClicked || this.state.emailAddressChanged ?
        emailAddressValidationResult : null,
      emailAddressValidationMessage,
    }));
  }

  render() {
    return (
      <Col
        smOffset={2}
        sm={8}
        mdOffset={3}
        md={6}
        lgOffset={4}
        lg={4}
      >
        {this.props.resetPasswordEmailSent ? this.getResetPasswordEmailSentUI() : this.getResetPasswordUI()}
      </Col>
    );
  }
}

UserResetPasswordPresentational.propTypes = {
  initialEmailAddress: PropTypes.string,
  onResetPasswordClicked: PropTypes.func.isRequired,
  onReturnToSignInClicked: PropTypes.func.isRequired,
  validateState: PropTypes.func.isRequired,
  resetPasswordEmailSent: PropTypes.bool.isRequired,
};

UserResetPasswordPresentational.defaultProps = {
  initialEmailAddress: '',
};

export default UserResetPasswordPresentational;
