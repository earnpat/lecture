import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { Redirect } from "react-router";
import Home from "./pages/Home";
import Register from "./pages/Register";
import ContactUs from "./pages/ContactUs";
import Upload from "./pages/Upload";
import ProductLecture from "./pages/ProductLecture";
import ProductPlanner from "./pages/ProductPlanner";
import ProductOthers from "./pages/ProductOthers";
import ProductDetail from "./pages/ProductDetail";
import ShoppingCart from './pages/ShoppingCart'

import Test from "./components/Test";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/contactus" component={ContactUs} />
        <Route exact path="/upload" component={Upload} />
        <Route exact path="/lectures" component={ProductLecture} />
        <Route exact path="/planners" component={ProductPlanner} />
        <Route exact path="/others" component={ProductOthers} />
        <Route exact path="/product/:product_id" component={ProductDetail} />
        <Route exact path="/test" component={Test} />
        <Route exact path="/shoppingcart" component={ShoppingCart} />
        <Redirect to="/home" />
      </Switch>
    </div>
  );
}

export default App;
