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
import SocialSignInPresentational from './social-signin-presentational';
import * as userAccessActions from '../user-access/actions';
import * as loadingActions from '../loading/actions';
import * as notificationActions from '../notification/actions';

class SocialSignInContainer extends Component {
  constructor(props) {
    super(props);

    this.signUpOrSignInWithProvider = this.signUpOrSignInWithProvider.bind(this);

    if (this.props.signin && this.props.signup) {
      throw new Error('signin and signup properties are both provided!!!');
    }

    if (!this.props.signin && !this.props.signup) {
      throw new Error('Neither signin nor signup property is provided!!!');
    }

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
        }

        this.props.userAccessActions.acknowledgeOperation(lastOperation.operationId);
        this.props.loadingActions.stop();
      }
    }
  }

  signUpOrSignInWithProvider(provider) {
    this.setState({
      lastOperationId: this.props.signup ? this.props.userAccessActions.signUpWithProvider(provider)
        .operationId : this.props.userAccessActions.signInWithProvider(provider)
        .operationId,
    });

    this.props.loadingActions.startTransparent();
  }

  render() {
    return (
      <SocialSignInPresentational
        onFacebookButtonClicked={() => this.signUpOrSignInWithProvider('facebook')}
        onTwitterButtonClicked={() => this.signUpOrSignInWithProvider('twitter')}
        onGoogleButtonClicked={() => this.signUpOrSignInWithProvider('google')}
        onGithubButtonClicked={() => this.signUpOrSignInWithProvider('github')}
      />
    );
  }
}

SocialSignInContainer.propTypes = {
  userAccessActions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  loadingActions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  notificationActions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  signin: PropTypes.bool,
  signup: PropTypes.bool,
};

SocialSignInContainer.defaultProps = {
  signin: false,
  signup: false,
};

function mapStateToProps(state) {
  return {
    operations: state.userAccess.operations,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userAccessActions: bindActionCreators(userAccessActions, dispatch),
    loadingActions: bindActionCreators(loadingActions, dispatch),
    notificationActions: bindActionCreators(notificationActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SocialSignInContainer);
