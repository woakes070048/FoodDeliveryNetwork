import React, {
  Component,
  PropTypes,
} from 'react';
import {
  Button,
  FormControl,
  FormGroup,
  InputGroup,
} from 'react-bootstrap';

class UpdatePasswordPresentational extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: this.props.initialPassword,
      passwordChanged: false,
    };

    this.onPasswordChanged = this.onPasswordChanged.bind(this);
    this.onUpdateClicked = this.onUpdateClicked.bind(this);
  }

  onPasswordChanged(e) {
    this.setState(Object.assign(this.state, {
      password: e.target.value,
      passwordChanged: true,
    }));
  }

  onUpdateClicked() {
    this.props.onUpdateClicked(this.state.password);
  }

  render() {
    return (
      <div>
        <h3>Change password</h3>
        <div className="form-divider" />
        <FormGroup>
          <InputGroup>
            New password
            <FormControl
              type="password"
              value={this.state.password}
              onChange={this.onPasswordChanged}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            Confirm new password
            <FormControl
              type="password"
              value={this.state.password}
              onChange={this.onPasswordChanged}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Button
            bsStyle="primary"
            onClick={this.onUpdateClicked}
          >
            Update password
          </Button>
        </FormGroup>
      </div>
    );
  }
}

UpdatePasswordPresentational.propTypes = {
  initialPassword: PropTypes.string,
  onUpdateClicked: PropTypes.func.isRequired,
};

UpdatePasswordPresentational.defaultProps = {
  initialPassword: '',
};

export default UpdatePasswordPresentational;
