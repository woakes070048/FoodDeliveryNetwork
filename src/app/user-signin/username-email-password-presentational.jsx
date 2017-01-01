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
      signInClicked: false,
    };

    this.onUsernameOrEmailAddressChanged = this.onUsernameOrEmailAddressChanged.bind(this);
    this.onPasswordChanged = this.onPasswordChanged.bind(this);
    this.validateState = this.validateState.bind(this);
    this.validateUsernameOrEmailAddress = this.validateUsernameOrEmailAddress.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.onSignInClicked = this.onSignInClicked.bind(this);
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

  onSignInClicked() {
    this.setState(Object.assign(this.state, {
      signInClicked: true,
    }));

    this.validateState();

    if (!this.state.usernameOrEmailAddressValidationResult && !this.state.passwordValidationResult) {
      this.props.onSignInClicked(this.state.usernameOrEmailAddress, this.state.password);
    }
  }

  validateUsernameOrEmailAddress() {
    return this.state.usernameOrEmailAddressValidationResult;
  }

  validatePassword() {
    return this.state.passwordValidationResult;
  }

  validateState() {
    const {
      usernameOrEmailAddressValidationResult,
      usernameOrEmailAddressValidationMessage,
      passwordValidationResult,
      passwordValidationMessage,
    } = this.props.validateState(this.state.usernameOrEmailAddress, this.state.password);

    this.setState(Object.assign(this.state, {
      usernameOrEmailAddressValidationResult: this.state.signInClicked || this.state.usernameOrEmailAddressChanged ?
        usernameOrEmailAddressValidationResult : null,
      usernameOrEmailAddressValidationMessage,
      passwordValidationResult: this.state.signInClicked || this.state.passwordChanged ?
        passwordValidationResult : null,
      passwordValidationMessage,
    }));
  }

  render() {
    const usernameOrEmailAddressHelpBlock = this.state.usernameOrEmailAddressValidationResult ?
      <HelpBlock>{this.state.usernameOrEmailAddressValidationMessage}</HelpBlock> :
      <div />;
    const passwordHelpBlock = this.state.passwordValidationResult ?
      <HelpBlock>{this.state.passwordValidationMessage}</HelpBlock> :
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

UsernameEmailPasswordPresentational.propTypes = {
  initialUsernameOrEmailAddress: PropTypes.string,
  onSignInClicked: PropTypes.func.isRequired,
  validateState: PropTypes.func.isRequired,
};

UsernameEmailPasswordPresentational.defaultProps = {
  initialUsernameOrEmailAddress: '',
};

export default UsernameEmailPasswordPresentational;
