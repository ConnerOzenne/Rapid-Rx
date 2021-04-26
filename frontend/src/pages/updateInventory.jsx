import React from 'react';
import axios from 'axios';
import {Repository} from '../api/repository';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { Navbar } from '../components/Navbar.jsx'
import './userProfile.css';
import { event } from 'jquery';

export class UpdateInventory extends React.Component{
    repo = new Repository();
    state = {
        pharmacyID: +this.props.match.params.pharmacyID,
        medID: 1,
    };

	isLoggedIn = () => {
        let loggedIn = localStorage.getItem("userID") != -1 && localStorage.getItem("userID") != "";
        return loggedIn;
    }

	
	submitChange = () => {
        let json = {
            pharmacyID: this.state.pharmacyID,
            medID: this.state.medID,
            quantity: this.state.quantity
        }
        console.log(json);
        this.repo.updateInventory(json);
        this.setState({redirect: '/'});
    }

    componentDidMount() {
		debugger;
        console.log("Update Inventory: componentDidMount()")
        this.setState({
            medID: +this.props.match.params.medcationID
        })
    }
	
  
    render() {
        if (this.state.redirect) {
            return <Redirect to={ '/' } />;
        }

        return ( <>
			<Navbar></Navbar>
            <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
			<div class="card h-100">
				<div class="card-body">
                <form>
					<div class="row gutters">
						<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
							<h6 class="mb-2 text-primary">Medication:</h6>
						</div>
							<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
								<div class="form-group">
									<label for="fullName">Quantity:</label>
									<input type="text" class="form-control" id="fullName" placeholder={this.state.name}
									onChange={event => this.setState({quantity: event.target.value})}/>
								</div>
							</div>
                         </div>    
                    <button type="button" id="submit" name="submit" class="btn btn-primary"onClick={this.submitChange}>Update</button>
				</form>
				</div>
			</div>
		</div>
        </>
		);
    }
    
}
