
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
      reEnteredPasswordValidationResult: null,
      reEnteredPasswordValidationMessage: '',
      reEnteredPassword: '',
      reEnteredPasswordChanged: false,
      signUpClicked: false,
    };

    this.onEmailAddressChanged = this.onEmailAddressChanged.bind(this);
    this.onPasswordChanged = this.onPasswordChanged.bind(this);
    this.onReEnteredPasswordChanged = this.onReEnteredPasswordChanged.bind(this);
    this.validateState = this.validateState.bind(this);
    this.onSignUpClicked = this.onSignUpClicked.bind(this);
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

  onReEnteredPasswordChanged(e) {
    this.setState(Object.assign(this.state, {
      reEnteredPassword: e.target.value,
      reEnteredPasswordChanged: true,
    }));

    this.validateState();
  }

  onSignUpClicked() {
    this.setState(Object.assign(this.state, {
      signUpClicked: true,
    }));

    this.validateState();

    if (!this.state.emailAddressValidationResult &&
      !this.state.passwordValidationResult &&
      !this.state.reEnteredPasswordValidationResult) {
      this.props.onSignUpClicked(this.state.emailAddress, this.state.password);
    }
  }

  validateState() {
    const {
      emailAddressValidationResult,
      emailAddressValidationMessage,
      passwordValidationResult,
      passwordValidationMessage,
      reEnteredPasswordValidationResult,
      reEnteredPasswordValidationMessage,
    } = this.props.validateState(this.state.emailAddress, this.state.password, this.state.reEnteredPassword);

    this.setState(Object.assign(this.state, {
      emailAddressValidationResult: this.state.signUpClicked || this.state.emailAddressChanged ?
        emailAddressValidationResult : null,
      emailAddressValidationMessage,
      passwordValidationResult: this.state.signUpClicked || this.state.passwordChanged ?
        passwordValidationResult : null,
      passwordValidationMessage,
      reEnteredPasswordValidationResult: this.state.signUpClicked || this.state.reEnteredPasswordChanged ?
        reEnteredPasswordValidationResult : null,
      reEnteredPasswordValidationMessage,
    }));
  }

  render() {
    const emailAddressHelpBlock = this.state.emailAddressValidationResult ?
      <HelpBlock>{this.state.emailAddressValidationMessage}</HelpBlock> :
      <div />;
    const passwordHelpBlock = this.state.passwordValidationResult ?
      <HelpBlock>{this.state.passwordValidationMessage}</HelpBlock> :
      <div />;
    const reEnteredPasswordHelpBlock = this.state.reEnteredPasswordValidationResult ?
      <HelpBlock>{this.state.reEnteredPasswordValidationMessage}</HelpBlock> :
      <div />;

    return (
      <Form horizontal>
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
        <FormGroup validationState={this.state.passwordValidationResult}>
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
        <FormGroup validationState={this.state.reEnteredPasswordValidationResult}>
          <InputGroup>
            <InputGroup.Addon>
              <Glyphicon glyph="lock" />
            </InputGroup.Addon>
            <FormControl
              type="password"
              placeholder="Re-enter password"
              value={this.state.reEnteredPassword}
              onChange={this.onReEnteredPasswordChanged}
            />
          </InputGroup>
          <FormControl.Feedback />
          {reEnteredPasswordHelpBlock}
        </FormGroup>
        <FormGroup>
          <Button
            bsStyle="primary"
            block
            onClick={this.onSignUpClicked}
          >
            Sign up
          </Button>
        </FormGroup>
      </Form>
    );
  }
}

EmailPasswordPresentational.propTypes = {
  initialEmailAddress: PropTypes.string,
  onSignUpClicked: PropTypes.func.isRequired,
  validateState: PropTypes.func.isRequired,
};

EmailPasswordPresentational.defaultProps = {
  initialEmailAddress: '',
};

export default EmailPasswordPresentational;
