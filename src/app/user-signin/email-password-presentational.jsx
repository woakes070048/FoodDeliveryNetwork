import React, {
  Component,
  PropTypes,
} from 'react';
import {
  Button,
  HelpBlock,
  Form,
  FormControl,
  FormGroup,
  Glyphicon,
  InputGroup,
} from 'react-bootstrap';

class EmailPasswordPresentational extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailAddressValidationResult: null,
      emailAddressValidationMessage: '',
      emailAddress: this.props.initialEmailAddress,
      emailAddressChanged: false,
      passwordValidationResult: null,
      passwordValidationMessage: '',
      password: '',
      passwordChanged: false,
      signInClicked: false,
    };

    this.onEmailAddressChanged = this.onEmailAddressChanged.bind(this);
    this.onPasswordChanged = this.onPasswordChanged.bind(this);
    this.validateState = this.validateState.bind(this);
    this.validateEmailAddress = this.validateEmailAddress.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.onSignInClicked = this.onSignInClicked.bind(this);
  }

  onEmailAddressChanged(e) {
    this.setState(Object.assign(this.state, {
      emailAddress: e.target.value,
      emailAddressChanged: true,
    }));

    this.validateState();
  }

  onPasswordChanged(e) {
    this.setState(Object.assign(this.state, {
      password: e.target.value,
      passwordChanged: true,
    }));

    this.validateState();
  }

  onSignInClicked() {
    this.setState(Object.assign(this.state, {
      signInClicked: true,
    }));

    this.validateState();

    if (!this.state.emailAddressValidationResult && !this.state.passwordValidationResult) {
      this.props.onSignInClicked(this.state.emailAddress, this.state.password);
    }
  }

  validateEmailAddress() {
    return this.state.emailAddressValidationResult;
  }

  validatePassword() {
    return this.state.passwordValidationResult;
  }

  validateState() {
    const {
      emailAddressValidationResult,
      emailAddressValidationMessage,
      passwordValidationResult,
      passwordValidationMessage,
    } = this.props.validateState(this.state.emailAddress, this.state.password);

    this.setState(Object.assign(this.state, {
      emailAddressValidationResult: this.state.signInClicked || this.state.emailAddressChanged ?
        emailAddressValidationResult : null,
      emailAddressValidationMessage,
      passwordValidationResult: this.state.signInClicked || this.state.passwordChanged ?
        passwordValidationResult : null,
      passwordValidationMessage,
    }));
  }

  render() {
    const emailAddressHelpBlock = this.state.emailAddressValidationResult ?
      <HelpBlock>{this.state.emailAddressValidationMessage}</HelpBlock> :
      <div />;
    const passwordHelpBlock = this.state.passwordValidationResult ?
      <HelpBlock>{this.state.passwordValidationMessage}</HelpBlock> :
      <div />;

    return (
      <Form horizontal>
        <FormGroup validationState={this.validateEmailAddress()}>
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
        <FormGroup validationState={this.validatePassword()}>
          <InputGroup>
            <InputGroup.Addon>
              <Glyphicon glyph="lock" />
            </InputGroup.Addon>
            <FormControl
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onPasswordChanged}
            />
          </InputGroup>
          <FormControl.Feedback />
          {passwordHelpBlock}
        </FormGroup>
        <FormGroup>
          <Button
            bsStyle="primary"
            block
            onClick={this.onSignInClicked}
          >
            Sign in
          </Button>
        </FormGroup>
      </Form>
    );
  }
}

EmailPasswordPresentational.propTypes = {
  initialEmailAddress: PropTypes.string,
  onSignInClicked: PropTypes.func.isRequired,
  validateState: PropTypes.func.isRequired,
};

EmailPasswordPresentational.defaultProps = {
  initialEmailAddress: '',
};

export default EmailPasswordPresentational;
