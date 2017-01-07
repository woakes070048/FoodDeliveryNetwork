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
      <Form horizontal>
        <Col
          sm={6}
          md={4}
          lg={4}
        >
          <h3>Public profile</h3>
          <div className="form-divider" />
          <FormGroup>
            <InputGroup>
              <InputGroup.Addon>
                <Glyphicon glyph="user" />
              </InputGroup.Addon>
              <FormControl
                type="text"
                placeholder="Display name"
                value={this.state.displayName}
                onChange={this.onDisplayNameChanged}
              />
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
        </Col>
      </Form>
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
