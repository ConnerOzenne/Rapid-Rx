import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Login } from './pages/Login.jsx'
import { Navbar } from './components/Navbar.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { CreateAccount } from './pages/CreateAccount.jsx'
import { MedList } from './pages/MedList.jsx';
import { MedInfo } from './pages/MedInfo.jsx';
import { UserProfile } from './pages/userProfile.jsx';
import { PharmManager } from './pages/pharmManager.jsx'
import { PharmacyHistory } from './pages/PharmacyHistory.jsx'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { pharmManager } from './pages/pharmManager';
import { PharmacyPortal } from './pages/PharmacyPortal';
import { EditMed } from './pages/EditMed';
import { Appointments } from './pages/Appointments';
import { BookAppt } from './pages/BookAppt'
// import { Home } from ./pages/Home.jsx

function App() {
  return (
    <div>
      <Router>
        {/* <Navbar norender={false}></Navbar> */}
        {/* <div path="/login" component={Login}/> */}
        <Switch>
            <Route path="/create" component={CreateAccount}/>
            <Route path="/pharmacyManager/:pharmacyID" component={PharmManager}/>
            <Route path="/pharmacyHistory/:pharmacyID/history" component={PharmacyHistory}/>
            <Route path="/pharmacyPortal" component={PharmacyPortal}/>
            <Route path="/profile/:userId" component={UserProfile}/>
            <Route path="/medlist/edit/:medId" component={EditMed}/>
            <Route path="/login" render={() => <Login />}/>
            <Route path="/medlist" component={MedList}/>
            <Route path="/medinfo/:medicationID" component={MedInfo}/>
            {/* <Route path="/appointments/:employeeId" component={BookAppt}/>
            <Route path="/appointments" component={Appointments}/> */}
            <Route path="/" component={HomePage}/>
        </Switch>
      </Router>
        
    </div>
    
  );
}

export default App;
