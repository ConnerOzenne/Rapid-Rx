import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Login } from './pages/Login.jsx'
import { Navbar } from './components/Navbar.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { CreateAccount } from './pages/CreateAccount.jsx'
import { MedList } from './pages/MedList.jsx';
import { UserProfile } from './pages/userProfile.jsx';
import { PharmManager } from './pages/pharmManager.jsx'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { pharmManager } from './pages/pharmManager';
import PharmacyPortal from './pages/PharmacyPortal';
// import { Home } from ./pages/Home.jsx

function App() {

  

  return (
    <div>
      <Router>
        {/* <div path="/login" component={Login}/> */}
        <Switch>
            <Route path="/create" component={CreateAccount}/>
            {/* <Route path= "/distInfo/:listingID" component={DistContact}/>
            <Route path="/orders/:orderId" component={OrderHistory}/> */}
            <Route path="/pharmacyManager/:pharmacyId" component={PharmManager}/>
            <Route path="/pharmacyPortal" component={PharmacyPortal}/>
            <Route path="/profile/:userId" component={UserProfile}/>
            <Route path="/login" render={() => <Login />}/>
            <Route path="/medlist" component={MedList}/>
            <Route path="/" component={HomePage}/>
        </Switch>
      </Router>
        
    </div>
    
  );
}

export default App;
