import React, {
  Component,
  PropTypes,
} from 'react';
import {
  bindActionCreators,
} from 'redux';
import {
  connect,
} from 'react-redux';
import * as firebaseActions from '../../firebase/actions';
import * as loadingActions from '../../loading/actions';
import * as notificationActions from '../../notification/actions';
import EmailsPresentational from './emails-presentational';

class EmailsContainer extends Component {
  constructor(props) {
    super(props);

    this.sendEmailVerification = this.sendEmailVerification.bind(this);

    this.state = {
      lastOperationId: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.lastOperationId) {
      const lastOperation =
        nextProps.operations.find(operation => operation.operationId === this.state.lastOperationId);

      if (lastOperation) {
        if (lastOperation.failed) {
          this.props.notificationActions.addError(lastOperation.errorMessage);
        } else {
          this.props.notificationActions.addSuccess('Verification email sent.');
        }

        this.props.firebaseActions.acknowledgeOperation(lastOperation.operationId);
        this.props.loadingActions.stop();
      }
    }
  }

  sendEmailVerification() {
    this.setState({
      lastOperationId: this.props.firebaseActions.sendEmailVerification()
        .operationId,
    });

    this.props.loadingActions.startTransparent();
  }

  render() {
    return (
      <EmailsPresentational
        emails={this.props.emails}
        sendEmailVerification={this.sendEmailVerification}
      />

    );
  }
}
EmailsContainer.propTypes = {
  firebaseActions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  loadingActions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  notificationActions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  emails: PropTypes.arrayOf(
    React.PropTypes.shape({
      emailAddress: PropTypes.string.isRequired,
      emailAddressVerified: PropTypes.bool.isRequired,
    }),
  ),
};

function mapStateToProps(state) {
  return {
    operations: state.firebase.operations,
    emails: [{
      emailAddress: state.firebase.userInfo.emailAddress,
      emailAddressVerified: state.firebase.userInfo.emailAddressVerified,
    }],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    firebaseActions: bindActionCreators(firebaseActions, dispatch),
    loadingActions: bindActionCreators(loadingActions, dispatch),
    notificationActions: bindActionCreators(notificationActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailsContainer);
