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
  HelpBlock,
  InputGroup,
  Panel,
  Row,
} from 'react-bootstrap';

class PublicPresentational extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayNameValidationResult: null,
      displayNameValidationMessage: '',
      displayName: this.props.initialDisplayName,
      displayNameChanged: false,
      emailAddressValidationResult: null,
      emailAddressValidationMessage: '',
      emailAddress: this.props.initialEmailAddress,
      emailAddressChanged: false,
      updateClicked: false,
    };

    this.onDisplayNameChanged = this.onDisplayNameChanged.bind(this);
    this.onEmailAddressChanged = this.onEmailAddressChanged.bind(this);
    this.validateState = this.validateState.bind(this);
    this.onUpdateClicked = this.onUpdateClicked.bind(this);
  }

  onDisplayNameChanged(e) {
    this.setState(Object.assign(this.state, {
      displayName: e.target.value,
      displayNameChanged: true,
    }));

    this.validateState();
  }

  onEmailAddressChanged(e) {
    this.setState(Object.assign(this.state, {
      emailAddress: e.target.value,
      emailAddressChanged: true,
    }));

    this.validateState();
  }

  onUpdateClicked() {
    this.setState(Object.assign(this.state, {
      updatelicked: true,
    }));

    this.validateState();

    if (!this.state.displayNameValidationResult && !this.state.emailAddressValidationResult) {
      this.props.onUpdateClicked(this.state.displayName, this.state.emailAddress);
    }
  }

  validateState() {
    const {
      displayNameValidationResult,
      displayNameValidationMessage,
      emailAddressValidationResult,
      emailAddressValidationMessage,
    } = this.props.validateState(this.state.displayName, this.state.emailAddress);

    this.setState(Object.assign(this.state, {
      displayNameValidationResult: this.state.UpdateClicked || this.state.displayNameChanged ?
        displayNameValidationResult : null,
      displayNameValidationMessage,
      emailAddressValidationResult: this.state.UpdateClicked || this.state.emailAddressChanged ?
        emailAddressValidationResult : null,
      emailAddressValidationMessage,
    }));
  }

  render() {
    const displayNameHelpBlock = this.state.displayNameValidationResult ?
      <HelpBlock>{this.state.displayNameValidationMessage}</HelpBlock> :
      <div />;
    const emailAddressHelpBlock = this.state.emailAddressValidationResult ?
      <HelpBlock>{this.state.emailAddressValidationMessage}</HelpBlock> :
      <div />;

    return (
      <Col
        sm={8}
        md={8}
        lg={8}
      >
        <Panel header="Public profile">
          <Form horizontal>
            <Row>
              <Col
                smOffset={1}
                sm={10}
                mdOffset={1}
                md={10}
                lgOffset={1}
                lg={10}
              >
                <FormGroup validationState={this.state.displayNameValidationResult}>
                  <InputGroup>
                    <InputGroup.Addon>
                      <div>Display name</div>
                    </InputGroup.Addon>
                    <FormControl
                      type="text"
                      value={this.state.displayName}
                      onChange={this.onDisplayNameChanged}
                    />
                  </InputGroup>
                  <FormControl.Feedback />
                  {displayNameHelpBlock}
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col
                smOffset={1}
                sm={10}
                mdOffset={1}
                md={10}
                lgOffset={1}
                lg={10}
              >
                <FormGroup validationState={this.state.emailAddressValidationResult}>
                  <InputGroup>
                    <InputGroup.Addon>
                      <div>Email</div>
                    </InputGroup.Addon>
                    <FormControl
                      type="email"
                      value={this.state.emailAddress}
                      onChange={this.onEmailAddressChanged}
                    />
                  </InputGroup>
                  <FormControl.Feedback />
                  {emailAddressHelpBlock}
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col
                smOffset={1}
                sm={1}
                mdOffset={1}
                md={1}
                lgOffset={1}
                lg={1}
              >
                <FormGroup>
                  <Button
                    bsStyle="primary"
                    onClick={this.onUpdateClicked}
                  >
                    Update
                  </Button>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </Panel>
      </Col>
    );
  }
}

PublicPresentational.propTypes = {
  initialDisplayName: PropTypes.string,
  initialEmailAddress: PropTypes.string.isRequired,
  onUpdateClicked: PropTypes.func.isRequired,
  validateState: PropTypes.func.isRequired,
};

PublicPresentational.defaultProps = {
  initialDisplayName: '',
  initialEmailAddress: '',
};

export default PublicPresentational;
