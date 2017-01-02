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
import * as firebaseActions from '../firebase/actions';

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
        this.props.firebaseActions.acknowledgeOperaation(lastOperation.operationId);
      }
    }
  }

  signUpOrSignInWithProvider(provider) {
    this.setState({
      lastOperationId: this.props.signup ? this.props.firebaseActions.signUpWithProvider(provider)
        .opertionId : this.props.firebaseActions.signInWithProvider(provider)
        .operationId,
    });
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
  firebaseActions: PropTypes.object.isRequired,
  signin: PropTypes.bool,
  signup: PropTypes.bool,
};

SocialSignInContainer.defaultProps = {
  signin: false,
  signup: false,
};

function mapStateToProps(state) {
  return {
    operations: state.firebase.operations,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    firebaseActions: bindActionCreators(firebaseActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SocialSignInContainer);
