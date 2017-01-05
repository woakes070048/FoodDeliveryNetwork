import React, {
  Component,
  PropTypes,
} from 'react';
import {
  connect,
} from 'react-redux';
import {
  browserHistory,
} from 'react-router';
import UserProfilePresentational from './user-profile-presentational';

class UserProfileContainer extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.userExists) {
      browserHistory.push('/');
    }
  }

  render() {
    return (
      <UserProfilePresentational selectedProfileSubItem={this.props.profileSubItem.toLowerCase()} />
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    userExists: state.firebase.userInfo.userExists,
    profileSubItem: ownProps.params.profileSubIte ? 'public' : ownProps.params.profileSubItem,
  };
}

UserProfileContainer.propTypes = {
  profileSubItem: PropTypes.string,
};

export default connect(mapStateToProps)(UserProfileContainer);
