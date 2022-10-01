import { Nav } from "./components/navigation/Nav";
import UsersContainer from "./components/users/UsersContainer";
import { Routes, Route, Navigate } from "react-router-dom";
import ProfileContainer from "./components/profile/ProfileContainer";
import React from "react";
import { initializeApp } from "./redux/app-reducer";
import { connect } from "react-redux";
import { Preloader } from "./components/common/preloader/Preloader";
import { getInitializedStatus } from "./redux/app-selector";
import { getMyUserId } from "./redux/auth-selector";
import Login from "./components/login/Login";
import HeaderContainer from "./components/header/HeaderContainer";

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }
    return (
      <>
        <div className="header-wrapper">
          <div className="app-container">
            <HeaderContainer />
          </div>
        </div>
        <div className="app-container">
          <div className="app-grid">
            <Nav />
            <div className="content">
              <Routes>
                <Route
                  path="/"
                  element={<Navigate to={`/profile/${this.props.userId}`} />}
                />
                {/* <Route path="/*" element={<Login />} /> */}
                <Route path="/users/" element={<UsersContainer />} />
                <Route path="/profile/:userId" element={<ProfileContainer />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    initialized: getInitializedStatus(state),
    userId: getMyUserId(state),
  };
};

export default connect(mapStateToProps, { initializeApp })(App);
