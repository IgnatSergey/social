import React from "react";
import { connect } from "react-redux/es/exports";
import { compose } from "redux";
import {
  getProfileThunkCreator,
  getProfileStatusThunkCreator,
  getFollowedStatusThunkCreator,
  followThunkCreator,
  unFollowThunkCreator,
  toggleTypeProfile,
  toggleEditMode,
  updateProfileThunkCreator,
  updateProfileStatusThunkCreator,
  updateProfilePhotoThunkCreator,
} from "../../redux/profile-reducer";
import {
  getProfile,
  getProfileFolowedStatus,
  getProfileStatus,
  getFetchingStatus,
  getTypeProfile,
  getEditModeStatus,
} from "../../redux/profile-selectore";
import { Profile } from "./Profile";
import { useParams } from "react-router-dom";
import { Preloader } from "../common/preloader/Preloader";
import { getFollowingInProcess } from "../../redux/following-selector";
import { getMyUserId } from "../../redux/auth-selector";
import { WithAuthRedirect } from "../hoc/WithAuthRedirect";

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.routerParameter.userId;
    if (Number(userId) === this.props.myUserId) {
      this.props.toggleTypeProfile(true);
    }
    this.props.getProfileThunkCreator(userId);
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.routerParameter.userId !== prevProps.routerParameter.userId
    ) {
      this.props.getProfileThunkCreator(this.props.routerParameter.userId);
      if (Number(this.props.routerParameter.userId) === this.props.myUserId) {
        this.props.toggleTypeProfile(true);
      }
    }
  }

  componentWillUnmount() {
    this.props.toggleTypeProfile(false);
  }

  render() {
    return this.props.isFetching ? (
      <Preloader />
    ) : (
      <Profile
        profile={this.props.profile}
        status={this.props.status}
        isFollowed={this.props.isFollowed}
        onFollow={this.props.followThunkCreator}
        onUnFollow={this.props.unFollowThunkCreator}
        isFollowInProcess={this.props.isFollowInProcess}
        isMyProfile={this.props.isMyProfile}
        onToggleEditMode={this.props.toggleEditMode}
        isEditMode={this.props.isEditMode}
        updateProfileThunkCreator={this.props.updateProfileThunkCreator}
        updateStatus={this.props.updateProfileStatusThunkCreator}
        updatePhoto={this.props.updateProfilePhotoThunkCreator}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: getProfile(state),
    status: getProfileStatus(state),
    isFollowed: getProfileFolowedStatus(state),
    isFollowInProcess: getFollowingInProcess(state),
    isFetching: getFetchingStatus(state),
    myUserId: getMyUserId(state),
    isMyProfile: getTypeProfile(state),
    isEditMode: getEditModeStatus(state),
  };
};

const componentWithRouterParameterWrapper = (Component) => {
  const ComponentWithRouterParameter = (props) => {
    return <Component {...props} routerParameter={useParams()} />;
  };
  return ComponentWithRouterParameter;
};

export default compose(
  connect(mapStateToProps, {
    getProfileThunkCreator,
    getProfileStatusThunkCreator,
    followThunkCreator,
    unFollowThunkCreator,
    getFollowedStatusThunkCreator,
    toggleTypeProfile,
    toggleEditMode,
    updateProfileThunkCreator,
    updateProfileStatusThunkCreator,
    updateProfilePhotoThunkCreator,
  }),
  WithAuthRedirect,
  componentWithRouterParameterWrapper
)(ProfileContainer);
