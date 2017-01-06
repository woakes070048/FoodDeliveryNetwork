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
      emailAddressValidationResult,
      emailAddressValidationMessage,
    } = this.props.validateState(this.state.emailAddress);

    this.setState(Object.assign(this.state, {
      emailAddressValidationResult: this.state.UpdateClicked || this.state.emailAddressChanged ?
        emailAddressValidationResult : null,
      emailAddressValidationMessage,
    }));
  }

  render() {
    const emailAddressHelpBlock = this.state.emailAddressValidationResult ?
      <HelpBlock>{this.state.emailAddressValidationMessage}</HelpBlock> :
      <div />;

    return (
      <Panel header="Public profile">
        <Form horizontal>
          <Col
            xsOffset={1}
            smOffset={1}
            mdOffset={1}
            lgOffset={1}
          >
            <FormGroup validationState={this.state.displayNameValidationResult}>
              <InputGroup>
                <Row> Display name </Row>
                <Row>
                  <FormControl
                    type="text"
                    value={this.state.displayName}
                    onChange={this.onDisplayNameChanged}
                  />
                </Row>
              </InputGroup>
            </FormGroup>
            <FormGroup validationState={this.state.emailAddressValidationResult}>
              <InputGroup>
                <Row> Email address </Row>
                <Row>
                  <FormControl
                    type="email"
                    value={this.state.emailAddress}
                    onChange={this.onEmailAddressChanged}
                  />
                </Row>
              </InputGroup>
              <FormControl.Feedback />
              {emailAddressHelpBlock}
            </FormGroup>
            <FormGroup>
              <Button
                bsStyle="primary"
                onClick={this.onUpdateClicked}
              >
                Update
              </Button>
            </FormGroup>
          </Col>
        </Form>
      </Panel>
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
