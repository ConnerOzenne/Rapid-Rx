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
		id: localStorage.getItem("userId")
    };

	isLoggedIn = () => {
        let loggedIn = localStorage.getItem("userID") && !(localStorage.getItem("userID") == "null");
        return loggedIn;
    }
	
	updateProfile() {
		let user = {
			userID: this.state.id,
			username: this.state.username,  
		 	email: this.state.email, 
			name: this.state.name, 
			phone: this.state.phone
		};
		let address = {
			city: this.state.city,
			state: this.state.state,
			address: this.state.streetAddress,
			zip: this.state.zip,
			country: this.state.country
		};
		console.log(user);
		this.repo.updateAccount(user);
		//this.repo.updateAddress(this.state.addressID, address);
	}
	
	componentDidMount() {
        console.log("User Profile: componentDidMount()")
        if (this.isLoggedIn()) {
            this.repo.getUserInfo(localStorage.getItem("userID"))
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
								streetAddress: res2.data[0].address,
								zip: res2.data[0].zip,
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
  
    render() {
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
								<label for="fullName">Full Name</label>
								<input type="text" class="form-control" id="fullName" placeholder={this.state.name}
                    			onChange={event => this.state.name =  event.target.value}/>
							</div>
						</div>
						<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
							<div class="form-group">
								<label for="eMail">Email</label>
								<input type="email" class="form-control" id="eMail" placeholder={this.state.email}
                    			onChange={event => this.state.email =  event.target.value}/>
							</div>
						</div>
						<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
							<div class="form-group">
								<label for="phone">Phone</label>
								<input type="text" class="form-control" id="phone" placeholder={this.state.phone}
                    			onChange={event => this.state.phone =  event.target.value}/>
							</div>
						</div>
					</div>
					<div class="row gutters">
						<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
							<h6 class="mt-3 mb-2 text-primary">Address</h6>
						</div>
						<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
							<div class="form-group">
								<label for="street">Street</label>
								<input type="name" class="form-control" id="street" placeholder={this.state.address}
                    			onChange={event => this.state.address =  event.target.value}/>
							</div>
						</div>
						<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
							<div class="form-group">
								<label for="city">City</label>
								<input type="name" class="form-control" id="city" placeholder={this.state.city}
                    			onChange={event => this.state.city =  event.target.value}/>
							</div>
						</div>
						<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
							<div class="form-group">
								<label for="state">State</label>
								<input type="text" class="form-control" id="state" placeholder={this.state.state}
                    			onChange={event => this.state.state =  event.target.value}/>
							</div>
						</div>
						<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
							<div class="form-group">
								<label for="zip">Zip Code</label>
								<input type="text" class="form-control" id="zip" placeholder={this.state.zip}
                    			onChange={event => this.state.zip =  event.target.value}/>
							</div>
						</div>
					</div>
					<div class="row gutters">
						<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
							<div class="text-right">
								<button type="button" id="submit" name="submit" class="btn btn-primary" onClick={this.updateProfile}>Update</button>
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
