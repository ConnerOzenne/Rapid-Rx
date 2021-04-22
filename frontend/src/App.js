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
import { pharmManager } from './pages/pharmManager.jsx'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Home } from ./pages/Home.jsx

function App() {

  // Fake news 'state' object...NOT a react-based state.
  const state = {
    userId : 0
  }

  // state for storage of the information on the webpage of forms and list, uses hooks
  const [number, setNumber] = useState("")
  const [values, setValues] = useState([])
  
  // ENTER YOUR EC2 PUBLIC IP/URL HERE
  const ec2_url = ''
  // CHANGE THIS TO TRUE IF HOSTING ON EC2, MAKE SURE TO ADD IP/URL ABOVE
  const ec2 = false;
  // USE localhost OR ec2_url ACCORDING TO ENVIRONMENT
  const url = ec2 ? ec2_url : 'localhost'

  // handle input field state change
  const handleChange = (e) => {
    setNumber(e.target.value);
  }

  const fetchBase = () => {
    axios.get(`http://${url}:8000/`).then((res)=>{
      alert(res.data);
    })
  }

  // fetches vals of db via GET request
  const fetchVals = () => {
    axios.get(`http://${url}:8000/values`).then(
      res => {
        const values = res.data.data;
        console.log(values);
        setValues(values)
    }).catch(err => {
      console.log(err)
    });
  }

  // handle input form submission to backend via POST request
  const handleSubmit = (e) => {
    e.preventDefault();
    let prod = number * number;
    axios.post(`http://${url}:8000/multplynumber`, {product: prod}).then(res => {
      console.log(res);
      fetchVals();
    }).catch(err => {
      console.log(err)
    });;
    setNumber("");
  }

  // handle intialization and setup of database table, can reinitialize to wipe db
  const reset = () => {
    axios.post(`http://${url}:8000/reset`).then(res => {
      console.log(res);
      fetchVals();
    }).catch(err => {
      console.log(err)
    });;
  }

  const onLogin = userID => {
    
  }

  // tell app to fetch values from db on first load (if initialized)
  useEffect(() => {
    fetchVals();
  }, [])

  return (
    <div>
      <Router>
        {/* <div path="/login" component={Login}/> */}
        <Switch>
            <Route path="/create" component={CreateAccount}/>
            <Route path="/pharmacyManager/:pharmacyId" component={pharmManager}/>
            <Route path="/profile/:userId" component={UserProfile}/>
            <Route path="/login" render={() => <Login />}/>
            <Route path="/medlist" component={MedList}/>
            <Route path="/medinfo" component={MedInfo}/>
            <Route path="/" component={HomePage}/>
        </Switch>
      </Router>
        
    </div>
    
  );
}

export default App;
