import axios from 'axios';
import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import './Login.css';
import {Repository} from '../api/repository';
import { Navbar } from '../components/Navbar';

export class Login extends React.Component {

    repo = new Repository();

    state = {
      username: "",
      password: "",
      success: false,
      error: false,
      errorMsg: "",
      userID: -1
    }

    printLogin = () => {
        console.log(this.state.username, this.state.password)
    }

    handleLogin = () => {
      this.checkError();
      if (!this.state.error) {

        let newUserID = -1;

        let json = {
          username: this.state.username,
          password: this.state.password,
        }
        this.repo.login(json)
        .then(data => {
          const res = data.data
          console.log("response.response", res.response)
          console.log("response.data[0]", res.data[0])
          
          // If login was successful
          if (res.response) {
            console.log("Login was successful")
            console.log("userID:", res.data[0].userID)

            newUserID = JSON.stringify(res.data[0].userID);
            localStorage.setItem("userID", newUserID)

            this.setState({
              username: "",
              password: "",
              success: true,
              error: false,
              redirect: "/"
            });

          }
          // If the username wasn't found in the Database, let the user know.
          else {  
            console.log('No user found')
            this.setState({
              success: false, 
              errorMsg: "Invalid username or password",
              error: true,
              username: "",
              password: ""
            })
          }

          // Update session storage and state based on newUserID
          
        })
        .catch( e => {
          this.setState({error: true, errorMsg: e});
        });
      }
    }

    checkError = () => {
      if (this.state.username == "")
        this.setState({errorMsg: "Username is required", error: true})
      else if (this.state.password == "")
        this.setState({errorMsg: "Password is required", error: true})
      else {
        this.setState({error: false})
      }
      //Fill in errors from post request
    }

    render() {
      
      if (this.state.redirect) {
        return <Redirect to={ this.state.redirect } />;
      }
      return (<>
        <Navbar></Navbar>
        <div className="container">
          <h3 className="mt-3">Login</h3>
          <label htmlFor="username">Username </label>
          <input className="form-control" 
            type="text" 
            name="username" 
            id="username"
            value={this.state.username}
            onChange={e => this.setState({username: e.target.value})}
          />
          <br></br>
          <label htmlFor="password">Password </label>
          <input className="form-control" 
            type="password" 
            name="password" 
            id="password"
            value={this.state.password}
            onChange={e => this.setState({password: e.target.value})}
          />
          <br></br>
          {this.state.error && <div className="alert alert-danger">{this.state.errorMsg}</div>}
          <button className="form-control btn btn-primary btn-block btn-login" onClick={this.handleLogin}>
            Login
            </button>
          <br></br>
          <span>Don't have an account? </span>
          <Link to="/create">
            Create Account
          </Link>
        </div>
        </>
      );

    }

 }