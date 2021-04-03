import React from 'react';
import axios from 'axios';
import {Repository} from '../api/repository';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { EditProfile } from './EditProfile';

class UserProfile extends React.Component{
    repo = new Repository();
    state = {

        
        data: {
            name: "",
            email: "",
            typeName: "",
            phone: "",
            country: "",
            streetAddress: ""
        }

    };
    handleNameChange(e){
        this.setState({name:e.target.value})
      }
      handlePasswordChange(e){
        this.setState({password:e.target.value})
      }
    componentDidMount(){
        const id = this.props.match.params.userId;
        this.repo.getAccountInfo(id)
        .then(userData => this.setState({data: userData[0]})
        
        );
        console.log("user profile mounted");
        
    }
  
    render() {
        return (
            <div class="container">
			  <div class="main-body">
					<nav aria-label="breadcrumb" class="main-breadcrumb">
					  <ol class="breadcrumb">
						<li class="breadcrumb-item"><a href="index.html">Home</a></li>
						<li class="breadcrumb-item"><a href="javascript:void(0)">User</a></li>
						<li class="breadcrumb-item active" aria-current="page">User Profile</li>
					  </ol>
					</nav>
					<div class="row gutters-sm">
					  <div class="col-md-4 mb-3">
						<div class="card">
						  <div class="card-body">
							<div class="d-flex flex-column align-items-center text-center">
							  <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="150"/>
							  <div class="mt-3">
								<h4>Conner</h4>
								<p class="text-muted font-size-sm">Dallas, Tx</p>
								<button class="btn btn-primary">Edit Profile</button>
							  </div>
							</div>
						  </div>
						</div>
					  </div>
					  <div class="col-md-8">
						<div class="card mb-3">
						  <div class="card-body">
							<div class="row">
							  <div class="col-sm-3">
								<h6 class="mb-0">Full Name</h6>
							  </div>
							  <div class="col-sm-9 text-secondary">
								Conner
							  </div>
							</div>
							<hr>
							<div class="row">
							  <div class="col-sm-3">
								<h6 class="mb-0">Email</h6>
							  </div>
							  <div class="col-sm-9 text-secondary">
								conner@testmail.com
							  </div>
							</div>
							</hr>
							<div class="row">
							  <div class="col-sm-3">
								<h6 class="mb-0">Phone</h6>
							  </div>
							  <div class="col-sm-9 text-secondary">
								(281) 816-9029
							  </div>
							</div>
							<hr>
							<div class="row">
							  <div class="col-sm-3">
								<h6 class="mb-0">Mobile</h6>
							  </div>
							  <div class="col-sm-9 text-secondary">
								(713) 380-4539
							  </div>
							</div>
							</hr>
							<div class="row">
							  <div class="col-sm-3">
								<h6 class="mb-0">Address</h6>
							  </div>
							  <div class="col-sm-9 text-secondary">
								3301 Dyer Street
							  </div>
							</div>
							<div class="row">
							  <div class="col-sm-3">
								<h6 class="mb-0">Pharmacy Address</h6>
							  </div>
							  <div class="col-sm-9 text-secondary">
								  3400 Yale Ave
							  </div>
							</div>
						  </div>
						</div>
					  </div>
					</div>
			  </div>
			</div>
        );
    }
    
}
export default withRouter(UserProfile);

