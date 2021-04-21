import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Login } from './pages/Login.jsx'
import { CreateAccount } from './pages/CreateAccount.jsx'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ClosestPharmacies } from './models/ClosestPharmacies';
import { PharmacyPortal } from './pages/PharmacyPortal';
// import { Home } from ./pages/Home.jsx



// React functional component
function App () {
  // state for storage of the information on the webpage of forms and list, uses hooks
  const [number, setNumber] = useState("")
  const [values, setValues] = useState([])
  
  // ENTER YOUR EC2 PUBLIC IP/URL HERE
  const ec2_url = ''
  // CHANGE THIS TO TRUE IF HOSTING ON EC2, MAKE SURE TO ADD IP/URL ABOVE
  const ec2 = false;
  // USE localhost OR ec2_url ACCORDING TO ENVIRONMENT
  const url = ec2 ? ec2_url : 'localhost'

  return (
    <div>
      <Router>
        {/* <div path="/login" component={Login}/> */}
        <Switch>
            {/* <Route path="/create" component={CreateAccount}/> */}
            {/* <Route path= "/distInfo/:listingID" component={DistContact}/>
            <Route path="/orders/:orderId" component={OrderHistory}/>
            <Route path="/home" component={Home}/>
            <Route path="/user/edit/:userId" component={EditProfile}/>
            <Route path="/user/:userId" component={UserProfile}/>
            <Route path="/cart" component={MyCart}/> */}
            {/* <Route path="/" render={() => <Login />}/> */}
            <Route path="/" render={() => <PharmacyPortal></PharmacyPortal>}/>
        </Switch>
      </Router>
        
    </div>
    
  );
}

export default App;
