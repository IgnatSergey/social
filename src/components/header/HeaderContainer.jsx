import React from "react";
import { Header } from "./Header";
import { connect } from "react-redux";
import { getAuthStatus, getLogin } from "../../redux/auth-selector";
import { logout } from "../../redux/auth-reducer";

class HeaderContainer extends React.Component {
  render() {
    return (
      <Header
        isAuth={this.props.isAuth}
        login={this.props.login}
        onLogout={this.props.logout}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: getAuthStatus(state),
    login: getLogin(state),
  };
};

export default connect(mapStateToProps, { logout })(HeaderContainer);
