import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Auth from "../src/hoc/auth";
// pages for this product
import LandingPage from "./component/views/LandingPage/LandingPage.js";
import NavBar from "./component/views/NavBar/NavBar";


function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{minHeight: 'calc(100vh - 80px)' }}>
        <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
        </Switch>
        </BrowserRouter>
      </div>  
    </Suspense>
  );
}

export default App;