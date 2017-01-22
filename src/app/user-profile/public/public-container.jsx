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
    this.handleGetUserPublicProfileOperation = this.handleGetUserPublicProfileOperation.bind(this);
    this.handleUpdateOperation = this.handleUpdateOperation.bind(this);
    this.handleFetchUserOperation = this.handleFetchUserOperation.bind(this);
    this.fetchUser = this.fetchUser.bind(this);

    this.state = {
      lastGetUserPublicProfileOperationId: '',
      lastUpdateOperationId: '',
      lastFetchUserOperationId: '',
    };
  }

  componentWillMount() {
    this.setState(Object.assign(this.state, {
      lastGetUserPublicProfileOperationId: this.props.userAccessActions.getUserPublicProfile()
        .operationId,
    }));

    this.props.loadingActions.startMain();
  }

  componentWillReceiveProps(nextProps) {
    this.handleGetUserPublicProfileOperation(nextProps);
    this.handleUpdateOperation(nextProps);
    this.handleFetchUserOperation(nextProps);
  }

  onUpdateClicked(details) {
    this.setState(Object.assign(this.state, {
      lastUpdateOperationId: this.props.userAccessActions.updateUserPublicProfile(details)
        .operationId,
    }));

    this.props.loadingActions.startTransparent();
  }

  handleGetUserPublicProfileOperation(nextProps) {
    if (this.state.lastGetUserPublicProfileOperationId) {
      const lastOperation =
        nextProps
        .operations.find(operation => operation.operationId === this.state.lastGetUserPublicProfileOperationId);

      if (lastOperation) {
        if (lastOperation.failed) {
          this.props.notificationActions.addError(lastOperation.errorMessage);
        }

        this.props.userAccessActions.acknowledgeOperation(lastOperation.operationId);
        this.props.loadingActions.stop();
      }
    }
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
        userPublicProfileDetails={this.props.userPublicProfileDetails}
      />
    );
  }
}

PublicContainer.propTypes = {
  userAccessActions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  loadingActions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  notificationActions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  userPublicProfileDetails: React.PropTypes.shape({
    salutation: PropTypes.string,
    firstName: PropTypes.string,
    middleName: PropTypes.string,
    lastName: PropTypes.string,
    preferredName: PropTypes.string,
    phone: PropTypes.string,
    mobile: PropTypes.string,
  }),
};

PublicContainer.defaultProps = {
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

function mapStateToProps(state) {
  return {
    operations: state.userAccess.operations,
    userPublicProfileDetails: state.userAccess.userInfo.userPublicProfileDetails || {},
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
