import React from "react";
import { connect } from "react-redux/es/exports";
import { compose } from "redux";
import { getFollowingInProcess } from "../../redux/following-selector";
import {
  getUsersThunkCreator,
  setCurrentPage,
  followThunkCreator,
  unFollowThunkCreator,
} from "../../redux/users-reducer";
import {
  getUsers,
  getCurrentPage,
  getPageSize,
  getUsersCount,
  getCountPagesPortion,
  getFetchingStatus
} from "../../redux/users-selectors";
import { Preloader } from "../common/preloader/Preloader";
import { WithAuthRedirect } from "../hoc/WithAuthRedirect";
import { Users } from "./Users";

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.getUsersThunkCreator(
      this.props.currentPage,
      this.props.pageSize
    );
  }

  onPageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    this.props.getUsersThunkCreator(pageNumber, this.props.pageSize);
  };

  render() {
    return this.props.isFetching ? (
      <Preloader />
    ) : (
      <Users
        totalUsersCount={this.props.totalUsersCount}
        pageSize={this.props.pageSize}
        currentPage={this.props.currentPage}
        onPageChanged={this.onPageChanged}
        users={this.props.users}
        countPagesPortion={this.props.countPagesPortion}
        onFollow={this.props.followThunkCreator}
        onUnFollow={this.props.unFollowThunkCreator}
        isFollowInProcess={this.props.isFollowInProcess}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getUsersCount(state),
    currentPage: getCurrentPage(state),
    countPagesPortion: getCountPagesPortion(state),
    isFetching: getFetchingStatus(state),
    isFollowInProcess: getFollowingInProcess(state),
  };
};

export default compose(
  connect(mapStateToProps, {
    getUsersThunkCreator,
    setCurrentPage,
    followThunkCreator,
    unFollowThunkCreator
  }), WithAuthRedirect
)(UsersContainer);
