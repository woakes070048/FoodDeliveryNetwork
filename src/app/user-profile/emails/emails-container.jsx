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
import * as userAccessActions from '../../user-access/actions';
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

        this.props.userAccessActions.acknowledgeOperation(lastOperation.operationId);
        this.props.loadingActions.stop();
      }
    }
  }

  sendEmailVerification() {
    this.setState({
      lastOperationId: this.props.userAccessActions.sendEmailVerification()
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
  userAccessActions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
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
    operations: state.userAccess.operations,
    emails: [{
      emailAddress: state.userAccess.userInfo.emailAddress,
      emailAddressVerified: state.userAccess.userInfo.emailAddressVerified,
    }],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userAccessActions: bindActionCreators(userAccessActions, dispatch),
    loadingActions: bindActionCreators(loadingActions, dispatch),
    notificationActions: bindActionCreators(notificationActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailsContainer);
