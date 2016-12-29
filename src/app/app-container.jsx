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
import AppPresentational from './app-presentational';
import * as firebaseActions from './firebase/actions';

class AppContainer extends Component {
  constructor(props) {
    super(props);

    this.props.firebaseActions.fetchUser();
  }

  render() {
    return (
      <AppPresentational children={this.props.children} />
    );
  }
}

AppContainer.propTypes = {
  children: PropTypes.object.isRequired,
  firebaseActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    firebaseActions: bindActionCreators(firebaseActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
