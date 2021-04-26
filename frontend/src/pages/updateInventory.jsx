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
        id: localStorage.getItem("userID"),
        meds: [],
        pharmacyID: 0,
        medID: 0
    };

	isLoggedIn = () => {
        let loggedIn = localStorage.getItem("userID") != -1 && localStorage.getItem("userID") != "";
        return loggedIn;
    }

	
	submitChange = () => {
        debugger;
        this.state.meds.forEach(med => {
            if(med.name == this.state.medicationID){
                this.state.medID = med.medicationID;
            }
        });
        let json = {
            pharmacyID: this.state.pharmacyID,
            medicationID: this.state.medID,
            quantity: this.state.quantity
        }
        console.log(json);
        this.repo.updateInventory(json).then(data => {
            this.setState({redirect: '/'});
        })
    }

    componentDidMount() {
		debugger;
        console.log("Update Inventory: componentDidMount()")
        this.getMeds();
        this.repo.getUserInfo(this.state.id)
            .then(data => {
                const res = data.data;
                console.log("User Profile - componentDidMount(): res...")
                console.log(res);
                this.setState({
                    pharmacyID: res.data[0].pharmacyID,
                })
        })
    }

    getMeds() {
        this.repo.getMedications()
        .then(data => {
            const res = data.data;
            this.setState({meds: res});
            this.state.meds.forEach((med,j) => {
                let meds = [...this.state.meds];
                med.flagType = 0;
                med.flagID = 0;
                meds[j] = med;
                this.setState({meds});
            })
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
                            <label htmlFor="selectPharmacy">Select a Medication</label>
                            <select className="form-control col-6" 
                                id="selectMed"
                                value={this.state.medication}
                                onChange={e => this.setState({medicationID: e.target.value})}>
                                <option></option>
                                {this.state.meds.map(med => (
                                    <option key={med.medicationID}>{med.name}</option>
                                ))}
                            </select> 
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
