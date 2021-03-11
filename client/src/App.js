import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Auth from "../src/hoc/auth";
// pages for this product
import LandingPage from "./component/views/LandingPage/LandingPage";
import NavBar from "./component/views/NavBar/NavBar";
import MovieDetail from './component/views/MovieDetail/MovieDetail'
import LoginPage from './component/views/LoginPage/LoginPage'
import registerPage from './component/views/RegisterPage/Register'
import FavoritePage from './component/views/FavoritePage/FavoritePage'

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <BrowserRouter>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(registerPage, false)} />
          <Route exact path="/movie/:movieId" component={Auth(MovieDetail, null)} />
          <Route exact path="/favorite" component={Auth(FavoritePage, true)} />
        </Switch>
      </div>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;