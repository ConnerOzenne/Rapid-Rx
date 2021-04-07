import axios from 'axios';
import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import './Login.css';
import {Repository} from '../api/repository';

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
        let json = {
          username: this.state.username,
          password: this.state.password,
        }
        this.repo.login(json).then(data => {
          const res = data.data
          console.log("response.response", res.response)
          console.log("response.data[0]", res.data[0])
          
          if (res.data[0]) {
            console.log("Login was successful")
            console.log("userID:", res.data[0].userID)
            this.setState({userID: res.data[0].userID})
            // this.props.onLogin(this.state.userID)
            this.setState({success: true, error: false})
          }
          else {
            console.log('No user found')
            this.setState({error: true, success: false, errorMsg: "Invalid username or password"})
          }
          // if (data == "invalid") {
          //     this.setState({error: true, errorMsg: "Invalid username or password"});
          //     return;
          // }
          // this.setState({uid: data.data.split(":")[0]});
          // window.cookie = data.data;
          // setTimeout(() => {
          //     this.props.onLogin(this.state.uid);
          //     this.setState({success: true});
          // }, 1000);
        })
        // .catch( e => {
        //   this.setState({error: true, errorMsg: "Invalid username or password"});
        // });
      }
    }

    checkError = () => {
      if (this.state.username == "")
        this.setState({errorMsg: "Username is required", error: true})
      if (this.state.password == "")
        this.setState({errorMsg: "Password is required", error: true})
      //Fill in errors from post request
    }

    render() {

      return (
        <div className="container">
          <h3>Login</h3>
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
          {this.state.error && <div className="alert alert-danger" role="alert">User doesnt exist or wrong password</div>}
          <button className="btn btn-primary btn-block btn-login" onClick={this.handleLogin}>Login</button>
          <br></br>
          <span>Don't have an account? </span>
          <Link to="/create">
            Create Account
          </Link>
          {this.state.success && console.log('THE LOGIN WAS SUCCESSFUL')}
          {/* {this.state.success && <Redirect to="/home"/>} */}
        </div>
      );

    }

 }