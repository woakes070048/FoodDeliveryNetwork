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

class PublicPresentational extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayName: this.props.initialDisplayName,
      displayNameChanged: false,
    };

    this.onDisplayNameChanged = this.onDisplayNameChanged.bind(this);
    this.onUpdateClicked = this.onUpdateClicked.bind(this);
  }

  onDisplayNameChanged(e) {
    this.setState(Object.assign(this.state, {
      displayName: e.target.value,
      displayNameChanged: true,
    }));
  }

  onUpdateClicked() {
    this.props.onUpdateClicked(this.state.displayName);
  }

  render() {
    return (
      <div>
        <h3>Public profile</h3>
        <FormGroup>
          <InputGroup>
            <div> Display name </div>
            <div>
              <FormControl
                type="text"
                value={this.state.displayName}
                onChange={this.onDisplayNameChanged}
              />
            </div>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Button
            bsStyle="primary"
            onClick={this.onUpdateClicked}
          >
            Update
          </Button>
        </FormGroup>
      </div>
    );
  }
}

PublicPresentational.propTypes = {
  initialDisplayName: PropTypes.string,
  onUpdateClicked: PropTypes.func.isRequired,
};

PublicPresentational.defaultProps = {
  initialDisplayName: '',
};

export default PublicPresentational;
