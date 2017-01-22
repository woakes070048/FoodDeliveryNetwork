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
  InputGroup,
  Glyphicon,
} from 'react-bootstrap';

class PublicPresentational extends Component {
  constructor(props) {
    super(props);

    this.state = {
      salutation: this.props.userPublicProfileDetails.salutation,
      salutationChanged: false,
      firstName: this.props.userPublicProfileDetails.firstName,
      firstNameChanged: false,
      middleName: this.props.userPublicProfileDetails.middleName,
      middleNameChanged: false,
      lastName: this.props.userPublicProfileDetails.lastName,
      lastNameChanged: false,
      preferredName: this.props.userPublicProfileDetails.preferredName,
      preferredNameChanged: false,
      phone: this.props.userPublicProfileDetails.phone,
      phoneChanged: false,
      mobile: this.props.userPublicProfileDetails.mobile,
      mobileChanged: false,
    };

    this.onSalutationChanged = this.onSalutationChanged.bind(this);
    this.onFirstNameChanged = this.onFirstNameChanged.bind(this);
    this.onMiddleNameChanged = this.onMiddleNameChanged.bind(this);
    this.onLastNameChanged = this.onLastNameChanged.bind(this);
    this.onPreferredNameChanged = this.onPreferredNameChanged.bind(this);
    this.onPhoneChanged = this.onPhoneChanged.bind(this);
    this.onMobileChanged = this.onMobileChanged.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onSalutationChanged(e) {
    this.setState(Object.assign(this.state, {
      salutation: e.target.value,
      salutationChanged: true,
    }));
  }

  onFirstNameChanged(e) {
    this.setState(Object.assign(this.state, {
      firstName: e.target.value,
      firstNameChanged: true,
    }));
  }

  onMiddleNameChanged(e) {
    this.setState(Object.assign(this.state, {
      middleName: e.target.value,
      middleNameChanged: true,
    }));
  }

  onLastNameChanged(e) {
    this.setState(Object.assign(this.state, {
      lastName: e.target.value,
      lastNameChanged: true,
    }));
  }

  onPreferredNameChanged(e) {
    this.setState(Object.assign(this.state, {
      preferredName: e.target.value,
      preferredNameChanged: true,
    }));
  }

  onPhoneChanged(e) {
    this.setState(Object.assign(this.state, {
      phone: e.target.value,
      phoneChanged: true,
    }));
  }

  onMobileChanged(e) {
    this.setState(Object.assign(this.state, {
      mobile: e.target.value,
      mobileChanged: true,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.onUpdateClicked({
      salutation: this.state.salutation,
      firstName: this.state.firstName,
      middleName: this.state.middleName,
      lastName: this.state.lastName,
      preferredName: this.state.preferredName,
      phone: this.state.phone,
      mobile: this.state.mobile,
    });
  }

  render() {
    return (
      <Col
        sm={6}
        md={6}
        lg={4}
      >
        <h3>Public profile</h3>
        <div className="form-divider" />
        <Form onSubmit={this.handleSubmit} horizontal>
          <FormGroup>
            <InputGroup>
              <InputGroup.Addon>
                <Glyphicon glyph="user" />
              </InputGroup.Addon>
              <FormControl
                type="text"
                placeholder="Salutation"
                value={this.state.salutation}
                onChange={this.onSalutationChanged}
              />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <InputGroup>
              <InputGroup.Addon>
                <Glyphicon glyph="user" />
              </InputGroup.Addon>
              <FormControl
                type="text"
                placeholder="First name"
                value={this.state.firstName}
                onChange={this.onFirstNameChanged}
              />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <InputGroup>
              <InputGroup.Addon>
                <Glyphicon glyph="user" />
              </InputGroup.Addon>
              <FormControl
                type="text"
                placeholder="Middle name"
                value={this.state.middleName}
                onChange={this.onMiddleNameChanged}
              />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <InputGroup>
              <InputGroup.Addon>
                <Glyphicon glyph="user" />
              </InputGroup.Addon>
              <FormControl
                type="text"
                placeholder="Last name"
                value={this.state.lastName}
                onChange={this.onLastNameChanged}
              />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <InputGroup>
              <InputGroup.Addon>
                <Glyphicon glyph="user" />
              </InputGroup.Addon>
              <FormControl
                type="text"
                placeholder="Preferred name"
                value={this.state.preferredName}
                onChange={this.onPreferredNameChanged}
              />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <InputGroup>
              <InputGroup.Addon>
                <Glyphicon glyph="phone-alt" />
              </InputGroup.Addon>
              <FormControl
                type="tel"
                placeholder="Phone"
                value={this.state.phone}
                onChange={this.onPhoneChanged}
              />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <InputGroup>
              <InputGroup.Addon>
                <Glyphicon glyph="phone" />
              </InputGroup.Addon>
              <FormControl
                type="tel"
                placeholder="Mobile"
                value={this.state.mobile}
                onChange={this.onMobileChanged}
              />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Button
              bsStyle="primary"
              type="submit"
            >
            Update
          </Button>
          </FormGroup>
        </Form>
      </Col>
    );
  }
}

PublicPresentational.propTypes = {
  userPublicProfileDetails: React.PropTypes.shape({
    salutation: PropTypes.string,
    firstName: PropTypes.string,
    middleName: PropTypes.string,
    lastName: PropTypes.string,
    preferredName: PropTypes.string,
    phone: PropTypes.string,
    mobile: PropTypes.string,
  }),
  onUpdateClicked: PropTypes.func.isRequired,
};

PublicPresentational.defaultProps = {
  userPublicProfileDetails: {
    salutation: '',
    firstName: '',
    middleName: '',
    lastName: '',
    preferredName: '',
    phone: '',
    mobile: '',
  },
};

export default PublicPresentational;
