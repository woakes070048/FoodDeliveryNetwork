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
  Panel,
  Row,
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
      <Panel header="Public profile">
        <Form horizontal>
          <Col
            xsOffset={1}
            smOffset={1}
            mdOffset={1}
            lgOffset={1}
          >
            <FormGroup>
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
  onUpdateClicked: PropTypes.func.isRequired,
};

PublicPresentational.defaultProps = {
  initialDisplayName: '',
};

export default PublicPresentational;
