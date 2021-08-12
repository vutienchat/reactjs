import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import ToolbarMobile from "./components/website/toolbarMobile";
import { ScrollToTop } from "./Util";
const LayoutAdmin = lazy(() => import("./layout/LayoutAdmin"));
const LayoutUser = lazy(() => import("./layout/LayoutUser"));
const Header = lazy(() => import("./components/website/Header"));
const Footer = lazy(() => import("./components/website/Footer"));
const Detail = lazy(() => import("./pages/website/Detail"));
const Category = lazy(() => import("./pages/website/Category"));
const ListProduct = lazy(() => import("./pages/admin/products/ListProduct"));
const FormAddProduct = lazy(() => import("./pages/admin/products/AddProduct"));
const ListCategory = lazy(() => import("./pages/admin/category/ListCategory"));
const AddCategory = lazy(() => import("./pages/admin/category/AddCategory"));
const Erroro404Page = lazy(() => import("./pages/Erroro404"));
const SignUp = lazy(() => import("./pages/website/user/SignUp"));
const SignIn = lazy(() => import("./pages/website/user/signIn"));
const Product = lazy(() => import("./pages/website/Product"));
const EditProduct = lazy(() => import("./pages/admin/products/EditProduct"));
const EditCategory = lazy(() => import("./pages/admin/category/EditCategory"));
const PrivateRoute = lazy(() => import("./pages/admin/privateRoute"));
const CartPage = lazy(() => import("./pages/website/Cart"));
const ListOrder = lazy(() => import("./pages/admin/order/ListOrder"));
const OrderDetail = lazy(() => import("./pages/admin/orderDetail/OrderDetail"));
const HomePage = lazy(() => import("./pages/website/Home"));
const Routers = (props) => {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="h-screen w-screen bg-white flex items-center justify-center">
            <img
              className="object-cover h-20"
              src="http://www.downgraf.com/wp-content/uploads/2014/09/01-progress.gif"
              alt=""
            />
          </div>
        }
      >
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
              <ToolbarMobile />
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
      </Suspense>
    </Router>
  );
};

export default Routers;
