import "./App.css";
import { Switch, withRouter } from "react-router-dom";
import PrivateRoutes from "./components/routes/PrivateRoutes";
import jwtDecode from "jwt-decode";

import Test from "./components/Test";

import React, { Component } from "react";

class App extends Component {
  getUser = () => {
    const token = localStorage.getItem("ACCESS_TOKEN")
    if(!token) return { role: 'guest' }
    let user = jwtDecode(token)
    return user
  }
  render() {
    let user = this.getUser();
    console.log(user);

    return (
      <div>
        <Switch>
          <PrivateRoutes role={user.role} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
