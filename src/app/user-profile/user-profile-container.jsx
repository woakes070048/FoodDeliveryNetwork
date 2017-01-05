import React, {
  PropTypes,
} from 'react';
import {
  connect,
} from 'react-redux';
import UserProfilePresentational from './user-profile-presentational';

const UserProfileContainer = props =>
  <UserProfilePresentational selectedProfileSubItem={props.profileSubItem.toLowerCase()} />;

function mapStateToProps(state, ownProps) {
  return {
    profileSubItem: ownProps.params.profileSubIte ? 'public' : ownProps.params.profileSubItem,
  };
}

UserProfileContainer.propTypes = {
  profileSubItem: PropTypes.string,
};

export default connect(mapStateToProps)(UserProfileContainer);
