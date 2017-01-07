import React, {
  Component,
  PropTypes,
} from 'react';
import {
  Button,
  Col,
  HelpBlock,
  FormControl,
  FormGroup,
  Glyphicon,
  InputGroup,
} from 'react-bootstrap';

class UpdatePasswordPresentational extends Component {
  static getInitialState() {
    return {
      newPasswordValidationResult: null,
      newPasswordValidationMessage: '',
      newPassword: '',
      newPasswordChanged: false,
      reEnteredPasswordValidationResult: null,
      reEnteredPasswordValidationMessage: '',
      reEnteredPassword: '',
      reEnteredPasswordChanged: false,
      updatePasswordClicked: false,
    };
  }

  constructor(props) {
    super(props);

    this.onKeyPressed = this.onKeyPressed.bind(this);
    this.onNewPasswordChanged = this.onNewPasswordChanged.bind(this);
    this.onReEnteredPasswordChanged = this.onReEnteredPasswordChanged.bind(this);
    this.validateState = this.validateState.bind(this);
    this.onUpdatePasswordClicked = this.onUpdatePasswordClicked.bind(this);

    this.state = UpdatePasswordPresentational.getInitialState();
  }

  onKeyPressed(e) {
    if (e.charCode === 13) {
      this.onUpdatePasswordClicked();
    }
  }

  onNewPasswordChanged(e) {
    this.setState(Object.assign(this.state, {
      newPassword: e.target.value,
      newPasswordChanged: true,
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

  onUpdatePasswordClicked() {
    this.setState(Object.assign(this.state, {
      updatePasswordClicked: true,
    }));

    this.validateState();

    if (!this.state.newPasswordValidationResult &&
      !this.state.reEnteredPasswordValidationResult) {
      this.props.onUpdatePasswordClicked(this.state.newPassword);
      this.setState(UpdatePasswordPresentational.getInitialState());
    }
  }

  validateState() {
    const {
      newPasswordValidationResult,
      newPasswordValidationMessage,
      reEnteredPasswordValidationResult,
      reEnteredPasswordValidationMessage,
    } = this.props.validateState(this.state.newPassword, this.state.reEnteredPassword);

    this.setState(Object.assign(this.state, {
      newPasswordValidationResult: this.state.updateNewPasswordClicked || this.state.newPasswordChanged ?
        newPasswordValidationResult : null,
      newPasswordValidationMessage,
      reEnteredPasswordValidationResult: this.state.updatePasswordClicked || this.state.reEnteredPasswordChanged ?
        reEnteredPasswordValidationResult : null,
      reEnteredPasswordValidationMessage,
    }));
  }

  render() {
    const newPasswordHelpBlock = this.state.newPasswordValidationResult ?
      <HelpBlock>{this.state.newPasswordValidationMessage}</HelpBlock> :
      <div />;
    const reEnteredPasswordHelpBlock = this.state.reEnteredPasswordValidationResult ?
      <HelpBlock>{this.state.reEnteredPasswordValidationMessage}</HelpBlock> :
      <div />;

    return (
      <Col
        sm={6}
        md={6}
        lg={4}
      >
        <h3>Change password</h3>
        <div className="form-divider" />
        <FormGroup validationState={this.state.newPasswordValidationResult}>
          <InputGroup>
            <InputGroup.Addon>
              <Glyphicon glyph="lock" />
            </InputGroup.Addon>
            <FormControl
              type="password"
              placeholder="New password"
              value={this.state.newPassword}
              onChange={this.onNewPasswordChanged}
              onKeyPress={this.onKeyPressed}
            />
          </InputGroup>
          <FormControl.Feedback />
          {newPasswordHelpBlock}
        </FormGroup>
        <FormGroup validationState={this.state.reEnteredPasswordValidationResult}>
          <InputGroup>
            <InputGroup.Addon>
              <Glyphicon glyph="lock" />
            </InputGroup.Addon>
            <FormControl
              type="password"
              placeholder="Confirm new password"
              value={this.state.reEnteredPassword}
              onChange={this.onReEnteredPasswordChanged}
              onKeyPress={this.onKeyPressed}
            />
          </InputGroup>
          <FormControl.Feedback />
          {reEnteredPasswordHelpBlock}
        </FormGroup>
        <FormGroup>
          <Button
            bsStyle="primary"
            onClick={this.onUpdatePasswordClicked}
          >
            Update password
          </Button>
        </FormGroup>
      </Col>
    );
  }
}

UpdatePasswordPresentational.propTypes = {
  onUpdatePasswordClicked: PropTypes.func.isRequired,
  validateState: PropTypes.func.isRequired,
};

UpdatePasswordPresentational.defaultProps = {
  initialNewPassword: '',
  initialReEnteredPassword: '',
};

export default UpdatePasswordPresentational;
