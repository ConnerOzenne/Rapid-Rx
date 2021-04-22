import React from 'react';
import axios from 'axios';
import {Repository} from '../api/repository';
import { Link, Redirect, withRouter } from 'react-router-dom';
import './userProfile.css';
import { Navbar } from '../components/Navbar';

export class UserProfile extends React.Component{
    repo = new Repository();
    state = {
        data: {
            name: "",
            email: "",
            phone: "",
			state: "",
			city: "",
            streetAddress: "",
			zip: ""
        }

    };
	// getAccount(id) {
    //     return new Promise((resolve, reject) => {
    //         axios.get(`${this.url}/${id}`, this.config)
    //             .then(x => resolve(x.data))
    //             .catch(error => {
    //                 alert(error);
    //                 reject(error);
    //             });
    //     });
    // }


    updateAccount(id, account) {
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/${id}`, account, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    alert(error);
                    reject(error);
                });
        });
    }
  
    render() {
		// this.getAccount(id)
        return (<>
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
								<input type="text" class="form-control" id="fullName" placeholder="Enter full name" 
								value={this.state.name}
                    			onChange={e => this.setState({name: e.target.value})}/>
							</div>
						</div>
						<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
							<div class="form-group">
								<label for="eMail">Email</label>
								<input type="email" class="form-control" id="eMail" placeholder="Enter email"
								value={this.state.email}
                    			onChange={e => this.setState({email: e.target.value})}/>
							</div>
						</div>
						<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
							<div class="form-group">
								<label for="phone">Phone</label>
								<input type="text" class="form-control" id="phone" placeholder="Enter phone number"
								value={this.state.phone}
                    			onChange={e => this.setState({phone: e.target.value})}/>
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
								<input type="name" class="form-control" id="street" placeholder="Enter Street"
								value={this.state.streetAddress}
                    			onChange={e => this.setState({streetAddress: e.target.value})}/>
							</div>
						</div>
						<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
							<div class="form-group">
								<label for="city">City</label>
								<input type="name" class="form-control" id="city" placeholder="Enter City"
								value={this.state.city}
                    			onChange={e => this.setState({city: e.target.value})}/>
							</div>
						</div>
						<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
							<div class="form-group">
								<label for="state">State</label>
								<input type="text" class="form-control" id="state" placeholder="Enter State"
								value={this.state.state}
                    			onChange={e => this.setState({state: e.target.value})}/>
							</div>
						</div>
						<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
							<div class="form-group">
								<label for="zip">Zip Code</label>
								<input type="text" class="form-control" id="zip" placeholder="Zip Code"
								value={this.state.zip}
                    			onChange={e => this.setState({zip: e.target.value})}/>
							</div>
						</div>
					</div>
					<div class="row gutters">
						<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
							<div class="text-right">
								<button type="button" id="submit" name="submit" class="btn btn-primary" onClick={this.updateAccount}>Save</button>
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
