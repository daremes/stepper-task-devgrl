import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';
import Home from './components/Home';
import Subscription from './components/Subscription/Subscription';
import ThankYou from './components/ThankYou';

export default function App() {
  return (
    <Router>
      <DefaultLayout>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/subscription'>
          <Subscription />
        </Route>
        <Route path='/thankyou'>
          <ThankYou />
        </Route>
      </DefaultLayout>
    </Router>
  );
}

const DefaultLayout = styled.div`
  body {
    margin: 0;
    padding: 0;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    color: rgba(0, 0, 0, 0.8);
    position: relative;
    min-height: 100vh;
  }
  display: flex;
  justify-content: center;
  font-family: 'Montserrat', sans-serif;
`;
