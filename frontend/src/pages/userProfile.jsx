import React from 'react';
import axios from 'axios';
import {Repository} from '../api/repository';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { Navbar } from '../components/Navbar.jsx'
import {User} from '../models/user';
import './userProfile.css';
import { event } from 'jquery';

export class UserProfile extends React.Component{
    repo = new Repository();
    state = {
		id: localStorage.getItem("userID"),
		authorityLevel: '',
		name: '',
		email: '',
		phone: '',
		username: ' ',
		path: '/edit'
    };

	isLoggedIn = () => {
        let loggedIn = localStorage.getItem("userID") != -1 && localStorage.getItem("userID") != "";
        return loggedIn;
    }

	
	
	componentDidMount() {
		debugger;
        console.log("User Profile: componentDidMount()")
        if (this.isLoggedIn()) {
            this.repo.getUserInfo(this.state.id)
                .then(data => {
                    const res = data.data;
                    console.log("User Profile - componentDidMount(): res...")
                    console.log(res);
                    this.setState({name: res.data[0].name, 
						authorityLevel: res.data[0].authorityLevel,
						username: res.data[0].username,
						addressID: res.data[0].addressID,
						email: res.data[0].email,
						password: res.data[0].password,
						pharmacyID: res.data[0].pharmacyID,
						phone: res.data[0].phone
					})
					this.repo.getAddressInfo(this.state.addressID)
						.then(aData => {
							const res2 = aData.data;
							console.log("User Profile - componentDidMount(): res...")
							console.log(res);
							this.setState({state: res2.data[0].state, 
								city: res2.data[0].city,
								address: res2.data[0].address,
								zip: res2.data[0].zipcode,
								country: res2.data[0].country
							})
						})
						.catch(err => {
							console.log("No address info found")
						})
                })
                .catch(err => {
                    console.log("No user info found")
                })
        }
    }

	handleRedirect= () => {
		this.setState({redirect: this.state.path});
	}

  
    render() {
		if (this.state.redirect) {
            return <Redirect to={ this.state.redirect } />;
        }

        return ( <>
			<Navbar></Navbar>
            <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
			<div class="card h-100">
				<div class="card-body">
					<div class="row gutters">
						<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
							<h6 class="mb-2 text-primary">Personal Details</h6>
						</div>
						<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
							<div class="form-group">
								<p><strong>Name:  </strong> {this.state.name}</p>
							</div>
						</div>
						<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
							<div class="form-group">
								<p><strong>Email:  </strong> {this.state.email}</p>
							</div>
						</div>
						<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
							<div class="form-group">
								<p><strong>Phone:  </strong> {this.state.phone}</p>
							</div>
						</div>
					</div>
					<div class="row gutters">
						<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
							<h6 class="mt-3 mb-2 text-primary">Address</h6>
						</div>
						<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
							<div class="form-group">
								<p><strong>Street Address:  </strong> {this.state.address}</p>
							</div>
						</div>
						<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
							<div class="form-group">
								<p><strong>City:  </strong> {this.state.city}</p>
							</div>
						</div>
						<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
							<div class="form-group">
								<p><strong>State:  </strong> {this.state.state}</p>
							</div>
						</div>
						<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
							<div class="form-group">
								<p><strong>Zipcode:  </strong> {this.state.zip}</p>
							</div>
						</div>
					</div>
					<div class="row gutters">
						<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
							<div class="text-right">
								<button type="button" id="submit" name="submit" class="btn btn-primary" onClick={this.handleRedirect}>Update</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			</div>
        </>
		);
    }
    
}
