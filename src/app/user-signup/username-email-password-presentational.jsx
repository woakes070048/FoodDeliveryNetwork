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

class UsernameEmailPasswordPresentational extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usernameOrEmailAddressValidationResult: null,
      usernameOrEmailAddressValidationMessage: '',
      usernameOrEmailAddress: this.props.initialUsernameOrEmailAddress,
      usernameOrEmailAddressChanged: false,
      passwordValidationResult: null,
      passwordValidationMessage: '',
      password: '',
      passwordChanged: false,
      reEnteredPasswordValidationResult: null,
      reEnteredPasswordValidationMessage: '',
      reEnteredPassword: '',
      reEnteredPasswordChanged: false,
      signupClicked: false,
    };

    this.onUsernameOrEmailAddressChanged = this.onUsernameOrEmailAddressChanged.bind(this);
    this.onPasswordChanged = this.onPasswordChanged.bind(this);
    this.onReEnteredPasswordChanged = this.onReEnteredPasswordChanged.bind(this);
    this.validateState = this.validateState.bind(this);
    this.validateUsernameOrEmailAddress = this.validateUsernameOrEmailAddress.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validateReEnteredPassword = this.validateReEnteredPassword.bind(this);
    this.onSignUpClicked = this.onSignUpClicked.bind(this);
  }

  onUsernameOrEmailAddressChanged(e) {
    this.setState(Object.assign(this.state, {
      usernameOrEmailAddress: e.target.value,
      usernameOrEmailAddressChanged: true,
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
      signupClicked: true,
    }));

    this.validateState();

    if (!this.state.usernameOrEmailAddressValidationResult &&
      !this.state.passwordValidationResult &&
      !this.state.reEnteredPasswordValidationResult) {
      this.props.onSignUpClicked(this.state.usernameOrEmailAddress, this.state.password);
    }
  }

  validateUsernameOrEmailAddress() {
    return this.state.usernameOrEmailAddressValidationResult;
  }

  validatePassword() {
    return this.state.passwordValidationResult;
  }

  validateReEnteredPassword() {
    return this.state.reEnteredPasswordValidationResult;
  }

  validateState() {
    const {
      usernameOrEmailAddressValidationResult,
      usernameOrEmailAddressValidationMessage,
      passwordValidationResult,
      passwordValidationMessage,
      reEnteredPasswordValidationResult,
      reEnteredPasswordValidationMessage,
    } = this.props.validateState(this.state.usernameOrEmailAddress, this.state.password, this.state.reEnteredPassword);

    this.setState(Object.assign(this.state, {
      usernameOrEmailAddressValidationResult: this.state.signupClicked || this.state.usernameOrEmailAddressChanged ?
        usernameOrEmailAddressValidationResult : null,
      usernameOrEmailAddressValidationMessage,
      passwordValidationResult: this.state.signupClicked || this.state.passwordChanged ?
        passwordValidationResult : null,
      passwordValidationMessage,
      reEnteredPasswordValidationResult: this.state.signupClicked || this.state.reEnteredPasswordChanged ?
        reEnteredPasswordValidationResult : null,
      reEnteredPasswordValidationMessage,
    }));
  }

  render() {
    const usernameOrEmailAddressHelpBlock = this.state.usernameOrEmailAddressValidationResult ?
      <HelpBlock>{this.state.usernameOrEmailAddressValidationMessage}</HelpBlock> :
      <div />;
    const passwordHelpBlock = this.state.passwordValidationResult ?
      <HelpBlock>{this.state.passwordValidationMessage}</HelpBlock> :
      <div />;
    const reEnteredPasswordHelpBlock = this.state.reEnteredPasswordValidationResult ?
      <HelpBlock>{this.state.reEnteredPasswordValidationMessage}</HelpBlock> :
      <div />;

    return (
      <Form horizontal>
        <FormGroup validationState={this.validateUsernameOrEmailAddress()}>
          <InputGroup>
            <InputGroup.Addon>
              <Glyphicon glyph="user" />
            </InputGroup.Addon>
            <FormControl
              type="text"
              placeholder="Username or email"
              value={this.state.usernameOrEmailAddress}
              onChange={this.onUsernameOrEmailAddressChanged}
            />
          </InputGroup>
          <FormControl.Feedback />
          {usernameOrEmailAddressHelpBlock}
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
        <FormGroup validationState={this.validateReEnteredPassword()}>
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

UsernameEmailPasswordPresentational.propTypes = {
  initialUsernameOrEmailAddress: PropTypes.string,
  onSignUpClicked: PropTypes.func.isRequired,
  validateState: PropTypes.func.isRequired,
};

UsernameEmailPasswordPresentational.defaultProps = {
  initialUsernameOrEmailAddress: '',
};

export default UsernameEmailPasswordPresentational;
