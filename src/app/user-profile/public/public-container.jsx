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
import PublicPresentational from './public-presentational';

class PublicContainer extends Component {
  constructor(props) {
    super(props);

    this.onUpdateClicked = this.onUpdateClicked.bind(this);
    this.handleUpdateOperation = this.handleUpdateOperation.bind(this);
    this.handleFetchUserOperation = this.handleFetchUserOperation.bind(this);
    this.fetchUser = this.fetchUser.bind(this);

    this.state = {
      lastUpdateOperationId: '',
      lastFetchUserOperationId: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    this.handleUpdateOperation(nextProps);
    this.handleFetchUserOperation(nextProps);
  }

  onUpdateClicked(displayName) {
    this.setState(Object.assign(this.state, {
      lastUpdateOperationId: this.props.userAccessActions.updateUserPublicProfile(displayName)
        .operationId,
    }));

    this.props.loadingActions.startTransparent();
  }

  handleUpdateOperation(nextProps) {
    if (this.state.lastUpdateOperationId) {
      const lastOperation =
        nextProps.operations.find(operation => operation.operationId === this.state.lastUpdateOperationId);

      if (lastOperation) {
        if (lastOperation.failed) {
          this.props.notificationActions.addError(lastOperation.errorMessage);
        } else {
          this.props.notificationActions.addSuccess('Public profile successfully updated.');
          this.fetchUser();
        }

        this.props.userAccessActions.acknowledgeOperation(lastOperation.operationId);
        this.props.loadingActions.stop();
      }
    }
  }

  handleFetchUserOperation(nextProps) {
    if (this.state.lastFetchUserOperationId) {
      const lastOperation =
        nextProps.operations.find(operation => operation.operationId === this.state.lastFetchUserOperationId);

      if (lastOperation) {
        if (lastOperation.failed) {
          this.props.notificationActions.addError(lastOperation.errorMessage);
        }

        this.props.userAccessActions.acknowledgeOperation(lastOperation.operationId);
        this.props.loadingActions.stop();
      }
    }
  }

  fetchUser() {
    this.setState(Object.assign(this.state, {
      lastFetchUserOperationId: this.props.userAccessActions.fetchUser()
        .operationId,
    }));

    this.props.loadingActions.startTransparent();
  }

  render() {
    return (
      <PublicPresentational
        onUpdateClicked={this.onUpdateClicked}
        initialDisplayName={this.props.displayName}
      />
    );
  }
}

PublicContainer.propTypes = {
  userAccessActions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  loadingActions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  notificationActions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  displayName: PropTypes.string,
};

PublicContainer.defaultProps = {
  displayName: '',
};

function mapStateToProps(state) {
  return {
    operations: state.userAccess.operations,
    displayName: state.userAccess.userInfo.displayName || '',
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userAccessActions: bindActionCreators(userAccessActions, dispatch),
    loadingActions: bindActionCreators(loadingActions, dispatch),
    notificationActions: bindActionCreators(notificationActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicContainer);
