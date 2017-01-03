import React, {
  Component,
  PropTypes,
} from 'react';
import {
  Button,
  Col,
  HelpBlock,
  Form,
  FormControl,
  FormGroup,
  Glyphicon,
  InputGroup,
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
    this.onResetPasswordClicked = this.onResetPasswordClicked.bind(this);
  }

  onEmailAddressChanged(e) {
    this.setState(Object.assign(this.state, {
      emailAddress: e.target.value,
      emailAddressChanged: true,
    }));

    this.validateState();
  }

  onResetPasswordClicked() {
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
    const emailAddressHelpBlock = this.state.emailAddressValidationResult ?
      <HelpBlock>{this.state.emailAddressValidationMessage}</HelpBlock> :
      <div />;

    return (
      <Col
        smOffset={2}
        sm={8}
        mdOffset={3}
        md={6}
        lgOffset={4}
        lg={4}
      >
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
          <FormGroup>
            <Button
              bsStyle="primary"
              block
              onClick={this.onResetPasswordClicked}
            >
            Reset password
          </Button>
          </FormGroup>
        </Form>
      </Col>
    );
  }
}

UserResetPasswordPresentational.propTypes = {
  initialEmailAddress: PropTypes.string,
  onResetPasswordClicked: PropTypes.func.isRequired,
  validateState: PropTypes.func.isRequired,
};

UserResetPasswordPresentational.defaultProps = {
  initialEmailAddress: '',
};

export default UserResetPasswordPresentational;
