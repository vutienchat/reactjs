import React from "react";
import LayoutAdmin from "./layout/LayoutAdmin";
import LayoutUser from "./layout/LayoutUser";
import Header from "./components/website/Header";
import HomePage from "./pages/website/Home";
import Footer from "./components/website/Footer";
import Detail from "./pages/website/Detail";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Category from "./pages/website/Category";
import ListProduct from "./pages/admin/products/ListProduct";
import FormAddProduct from "./pages/admin/products/AddProduct";
import ListCategory from "./pages/admin/category/ListCategory";
import AddCategory from "./pages/admin/category/AddCategory";
import Erroro404Page from "./pages/Erroro404";
import SignUp from "./pages/website/user/SignUp";
import SignIn from "./pages/website/user/signIn";
import Product from "./pages/website/Product";
import EditProduct from "./pages/admin/products/EditProduct";
import EditCategory from "./pages/admin/category/EditCategory";
import PrivateRoute from "./pages/admin/privateRoute";
import CartPage from "./pages/website/Cart";
import ListOrder from "./pages/admin/order/ListOrder";
import OrderDetail from "./pages/admin/orderDetail/OrderDetail";
import { ScrollToTop } from "./Util";
const Routers = (props) => {
  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route exact path="/admin/:path?/:action?">
          <PrivateRoute>
            <LayoutAdmin>
              <Switch>
                <Route exact path="/admin">
                  <Redirect exact to="/admin/product" />
                </Route>
                <Route exact path="/admin/product">
                  <ListProduct />
                </Route>
                <Route exact path="/admin/product/add">
                  <FormAddProduct />
                </Route>
                <Route exact path="/admin/product/edit">
                  <EditProduct />
                </Route>
                <Route exact path="/admin/category">
                  <ListCategory />
                </Route>
                <Route exact path="/admin/category/add">
                  <AddCategory />
                </Route>
                <Route exact path="/admin/category/edit">
                  <EditCategory />
                </Route>
                <Route exact path="/admin/order">
                  <ListOrder />
                </Route>
                <Route exact path="/admin/order/:idorder">
                  <OrderDetail />
                </Route>
                <Route path="*">
                  {" "}
                  <Erroro404Page />
                </Route>
              </Switch>
            </LayoutAdmin>
          </PrivateRoute>
        </Route>

        <Route>
          <LayoutUser>
            <Header {...props} />
            <Switch>
              <Route exact path="/">
                <HomePage {...props} />
              </Route>
              <Route exact path="/product/:productId">
                <Detail />
              </Route>
              <Route exact path="/category/:nameCategory">
                <Category {...props} />
              </Route>
              <Route exact path="/products">
                <Product {...props} />
              </Route>
              <Route exact path="/cart">
                <CartPage {...props} />
              </Route>
              <Route exact path="/signup">
                <SignUp />
              </Route>
              <Route exact path="/signin">
                <SignIn />
              </Route>
              <Route path="*">
                {" "}
                <Erroro404Page />
              </Route>
            </Switch>
            <Footer />
          </LayoutUser>
        </Route>
      </Switch>
    </Router>
  );
};

export default Routers;
